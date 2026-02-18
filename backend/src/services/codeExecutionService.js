/**
 * codeExecutionService.js - Safe-ish server-side code execution for learning use.
 *
 * Supported languages:
 * - C
 * - C++
 * - Java
 * - Python
 *
 * Notes:
 * - Runs in a temporary directory per request.
 * - Applies timeout and output-size caps.
 * - Intended for educational sandbox workloads.
 */

const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const AppError = require('../utils/AppError');
const { HTTP } = require('../constants');

const MAX_CODE_SIZE = Number(process.env.CODE_EXEC_MAX_CODE_SIZE || 60000);
const MAX_INPUT_SIZE = Number(process.env.CODE_EXEC_MAX_INPUT_SIZE || 20000);
const MAX_OUTPUT_SIZE = Number(process.env.CODE_EXEC_MAX_OUTPUT_SIZE || 60000);
const COMPILE_TIMEOUT_MS = Number(process.env.CODE_EXEC_COMPILE_TIMEOUT_MS || 10000);
const RUN_TIMEOUT_MS = Number(process.env.CODE_EXEC_RUN_TIMEOUT_MS || 7000);

const C_CANDIDATES = (process.env.CODE_EXEC_C_COMPILERS || 'gcc,clang')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const CPP_CANDIDATES = (process.env.CODE_EXEC_CPP_COMPILERS || 'g++,clang++')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const PYTHON_CANDIDATES = (
    process.env.CODE_EXEC_PYTHON_COMMANDS ||
    (process.platform === 'win32' ? 'python,py' : 'python3,python')
)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const JAVA_RUNTIME_CANDIDATES = (process.env.CODE_EXEC_JAVA_COMMANDS || 'java')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const JAVAC_CANDIDATES = (process.env.CODE_EXEC_JAVAC_COMMANDS || 'javac')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const appendWithLimit = (current, chunk, state) => {
    if (state.outputLimitHit) {
        return current;
    }

    const incoming = chunk.toString('utf8');
    if (current.length + incoming.length <= MAX_OUTPUT_SIZE) {
        return current + incoming;
    }

    state.outputLimitHit = true;
    const remaining = Math.max(0, MAX_OUTPUT_SIZE - current.length);
    return current + incoming.slice(0, remaining);
};

const executeProcess = ({
    command,
    args,
    cwd,
    stdin = '',
    timeoutMs,
}) =>
    new Promise((resolve, reject) => {
        const state = { timedOut: false, outputLimitHit: false };
        const startedAt = Date.now();

        const child = spawn(command, args, {
            cwd,
            windowsHide: true,
            stdio: ['pipe', 'pipe', 'pipe'],
        });

        let stdout = '';
        let stderr = '';

        const timeoutHandle = setTimeout(() => {
            state.timedOut = true;
            child.kill('SIGKILL');
        }, timeoutMs);

        child.stdout.on('data', (chunk) => {
            stdout = appendWithLimit(stdout, chunk, state);
            if (state.outputLimitHit) {
                child.kill('SIGKILL');
            }
        });

        child.stderr.on('data', (chunk) => {
            stderr = appendWithLimit(stderr, chunk, state);
            if (state.outputLimitHit) {
                child.kill('SIGKILL');
            }
        });

        child.on('error', (error) => {
            clearTimeout(timeoutHandle);
            reject(error);
        });

        child.on('close', (exitCode, signal) => {
            clearTimeout(timeoutHandle);
            resolve({
                command,
                exitCode: exitCode ?? -1,
                signal: signal || null,
                stdout: stdout.trimEnd(),
                stderr: stderr.trimEnd(),
                timedOut: state.timedOut,
                outputLimitHit: state.outputLimitHit,
                durationMs: Date.now() - startedAt,
            });
        });

        if (typeof stdin === 'string' && stdin.length > 0) {
            child.stdin.write(stdin);
        }
        child.stdin.end();
    });

const runWithCandidates = async ({ candidates, args, cwd, stdin = '', timeoutMs }) => {
    let commandMissing = true;

    for (const command of candidates) {
        try {
            const result = await executeProcess({
                command,
                args,
                cwd,
                stdin,
                timeoutMs,
            });
            return result;
        } catch (error) {
            if (error.code === 'ENOENT') {
                continue;
            }
            commandMissing = false;
            throw error;
        }
    }

    if (commandMissing) {
        throw new AppError(
            HTTP.SERVICE_UNAVAILABLE,
            `Execution environment is missing required command(s): ${candidates.join(', ')}.`
        );
    }

    throw new AppError(HTTP.INTERNAL_ERROR, 'Unable to run compiler/runtime process.');
};

const normalizeStep = (result) => ({
    command: result.command,
    exitCode: result.exitCode,
    signal: result.signal,
    stdout: result.stdout,
    stderr: result.stderr,
    timedOut: result.timedOut,
    outputLimitHit: result.outputLimitHit,
    durationMs: result.durationMs,
    success: result.exitCode === 0 && !result.timedOut && !result.outputLimitHit,
});

const validatePayload = ({ code, input }) => {
    if (code.length > MAX_CODE_SIZE) {
        throw new AppError(
            HTTP.BAD_REQUEST,
            `Code size exceeded. Maximum allowed is ${MAX_CODE_SIZE} characters.`
        );
    }
    if (input.length > MAX_INPUT_SIZE) {
        throw new AppError(
            HTTP.BAD_REQUEST,
            `Input size exceeded. Maximum allowed is ${MAX_INPUT_SIZE} characters.`
        );
    }
};

const executeCode = async ({ language, code, input = '' }) => {
    validatePayload({ code, input });

    const workspace = await fs.mkdtemp(path.join(os.tmpdir(), 'collegehub-exec-'));

    try {
        const binaryName = process.platform === 'win32' ? 'main.exe' : 'main';
        const binaryPath = path.join(workspace, binaryName);
        let compileStep = null;
        let runStep = null;

        if (language === 'c') {
            await fs.writeFile(path.join(workspace, 'main.c'), code, 'utf8');

            const compileResult = await runWithCandidates({
                candidates: C_CANDIDATES,
                args: ['main.c', '-O2', '-std=c11', '-o', binaryPath],
                cwd: workspace,
                timeoutMs: COMPILE_TIMEOUT_MS,
            });
            compileStep = normalizeStep(compileResult);

            if (compileStep.success) {
                const runResult = await executeProcess({
                    command: binaryPath,
                    args: [],
                    cwd: workspace,
                    stdin: input,
                    timeoutMs: RUN_TIMEOUT_MS,
                });
                runStep = normalizeStep(runResult);
            }
        } else if (language === 'cpp') {
            await fs.writeFile(path.join(workspace, 'main.cpp'), code, 'utf8');

            const compileResult = await runWithCandidates({
                candidates: CPP_CANDIDATES,
                args: ['main.cpp', '-O2', '-std=c++17', '-o', binaryPath],
                cwd: workspace,
                timeoutMs: COMPILE_TIMEOUT_MS,
            });
            compileStep = normalizeStep(compileResult);

            if (compileStep.success) {
                const runResult = await executeProcess({
                    command: binaryPath,
                    args: [],
                    cwd: workspace,
                    stdin: input,
                    timeoutMs: RUN_TIMEOUT_MS,
                });
                runStep = normalizeStep(runResult);
            }
        } else if (language === 'java') {
            await fs.writeFile(path.join(workspace, 'Main.java'), code, 'utf8');

            const compileResult = await runWithCandidates({
                candidates: JAVAC_CANDIDATES,
                args: ['Main.java'],
                cwd: workspace,
                timeoutMs: COMPILE_TIMEOUT_MS,
            });
            compileStep = normalizeStep(compileResult);

            if (compileStep.success) {
                const runResult = await runWithCandidates({
                    candidates: JAVA_RUNTIME_CANDIDATES,
                    args: ['-cp', workspace, 'Main'],
                    cwd: workspace,
                    stdin: input,
                    timeoutMs: RUN_TIMEOUT_MS,
                });
                runStep = normalizeStep(runResult);
            }
        } else if (language === 'python') {
            await fs.writeFile(path.join(workspace, 'main.py'), code, 'utf8');

            const runResult = await runWithCandidates({
                candidates: PYTHON_CANDIDATES,
                args: ['main.py'],
                cwd: workspace,
                stdin: input,
                timeoutMs: RUN_TIMEOUT_MS,
            });
            runStep = normalizeStep(runResult);
        } else {
            throw new AppError(HTTP.BAD_REQUEST, 'Unsupported language requested.');
        }

        const status = !compileStep || compileStep.success
            ? runStep?.success
                ? 'success'
                : 'runtime_error'
            : 'compile_error';

        return {
            language,
            status,
            compile: compileStep,
            run: runStep,
        };
    } finally {
        await fs.rm(workspace, { recursive: true, force: true });
    }
};

module.exports = {
    executeCode,
};

