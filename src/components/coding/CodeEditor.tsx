/**
 * CodeEditor.tsx - Multi-language in-browser editor with backend execution API.
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Loader2,
  Terminal,
  Type,
  Copy,
  Check,
  ChevronDown,
  Settings2,
} from 'lucide-react';

interface LangConfig {
  id: 'c' | 'cpp' | 'java' | 'python';
  label: string;
  monacoLang: string;
  color: string;
  boilerplate: string;
}

interface ExecutionStep {
  command: string;
  exitCode: number;
  signal: string | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  outputLimitHit: boolean;
  durationMs: number;
  success: boolean;
}

interface ExecutionResult {
  language: string;
  status: 'success' | 'compile_error' | 'runtime_error';
  compile: ExecutionStep | null;
  run: ExecutionStep | null;
}

interface ExecutionEnvelope {
  success?: boolean;
  message?: string;
  data?: {
    result?: ExecutionResult;
  };
}

interface CodeEditorProps {
  defaultCode?: string;
  defaultLanguage?: string;
  title?: string;
  height?: string;
}

const LANGUAGES: LangConfig[] = [
  {
    id: 'c',
    label: 'C',
    monacoLang: 'c',
    color: '#A8B9CC',
    boilerplate: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  {
    id: 'cpp',
    label: 'C++',
    monacoLang: 'cpp',
    color: '#00599C',
    boilerplate: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    id: 'java',
    label: 'Java',
    monacoLang: 'java',
    color: '#ED8B00',
    boilerplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    id: 'python',
    label: 'Python',
    monacoLang: 'python',
    color: '#3776AB',
    boilerplate: `print("Hello, World!")`,
  },
];

const EXECUTE_API_URL =
  process.env.NEXT_PUBLIC_CODE_EXECUTE_URL || '/api/code/execute';

const toOutputMessage = (result: ExecutionResult): { text: string; isError: boolean } => {
  if (result.compile && !result.compile.success) {
    const compileMessage =
      result.compile.stderr || result.compile.stdout || 'Compilation failed with no output.';
    return {
      text: `Compilation Error:\n${compileMessage}`,
      isError: true,
    };
  }

  if (!result.run) {
    return {
      text: 'Execution failed before runtime started.',
      isError: true,
    };
  }

  if (result.run.timedOut) {
    return {
      text: `Execution timed out after ${result.run.durationMs}ms.`,
      isError: true,
    };
  }

  if (result.run.outputLimitHit) {
    return {
      text: 'Output limit reached. Reduce print statements and try again.',
      isError: true,
    };
  }

  if (result.run.success) {
    const stdout = result.run.stdout?.trim();
    const stderr = result.run.stderr?.trim();

    if (stdout && stderr) {
      return { text: `${stdout}\n\nWarnings:\n${stderr}`, isError: false };
    }
    if (stdout) {
      return { text: stdout, isError: false };
    }
    if (stderr) {
      return { text: `Warnings:\n${stderr}`, isError: false };
    }
    return { text: '(No output)', isError: false };
  }

  const runtimeMessage =
    result.run.stderr ||
    result.run.stdout ||
    `Program exited with code ${result.run.exitCode}.`;

  return {
    text: `Runtime Error:\n${runtimeMessage}`,
    isError: true,
  };
};

export default function CodeEditor({
  defaultCode,
  defaultLanguage = 'c',
  title = 'Code Editor',
  height = '350px',
}: CodeEditorProps) {
  const initialLang = useMemo(
    () => LANGUAGES.find((item) => item.id === defaultLanguage) || LANGUAGES[0],
    [defaultLanguage]
  );

  const resolveDefaultCode = useCallback(
    (language: LangConfig) => {
      if (defaultCode && language.id === defaultLanguage) {
        return defaultCode;
      }
      return language.boilerplate;
    },
    [defaultCode, defaultLanguage]
  );

  const [lang, setLang] = useState<LangConfig>(initialLang);
  const [code, setCode] = useState(resolveDefaultCode(initialLang));
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isErrorOutput, setIsErrorOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('output');
  const [copied, setCopied] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  const switchLanguage = useCallback(
    (nextLanguage: LangConfig) => {
      setLang(nextLanguage);
      setCode(resolveDefaultCode(nextLanguage));
      setOutput('');
      setIsErrorOutput(false);
      setExecTime(null);
      setLangMenuOpen(false);
    },
    [resolveDefaultCode]
  );

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setIsErrorOutput(false);
    setActiveTab('output');
    setExecTime(null);

    const controller = new AbortController();
    const requestStart = performance.now();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(EXECUTE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.id,
          code,
          input,
        }),
        signal: controller.signal,
      });

      const rawResponse = await response.text();
      const payload = (() => {
        if (!rawResponse) return {};
        try {
          return JSON.parse(rawResponse);
        } catch {
          return {};
        }
      })() as ExecutionEnvelope;

      if (!response.ok || !payload?.success || !payload?.data?.result) {
        const message =
          payload?.message ||
          (response.status === 404
            ? 'Code execution endpoint not found.'
            : `Execution server returned ${response.status}.`);
        throw new Error(message);
      }

      const result = payload.data.result;
      const resultMessage = toOutputMessage(result);
      const measuredTime =
        (result.compile?.durationMs || 0) + (result.run?.durationMs || 0);
      const fallbackTime = Math.round(performance.now() - requestStart);

      setExecTime(measuredTime > 0 ? measuredTime : fallbackTime);
      setOutput(resultMessage.text);
      setIsErrorOutput(resultMessage.isError);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setOutput('Execution request timed out. Please simplify your code and retry.');
      } else if (error instanceof Error) {
        setOutput(
          `${error.message}\n\nFix: Ensure backend server is running and NEXT.js rewrite proxy for /api is active.`
        );
      } else {
        setOutput('Unable to execute code right now. Please try again.');
      }
      setIsErrorOutput(true);
    } finally {
      clearTimeout(timeoutId);
      setIsRunning(false);
    }
  }, [code, input, lang.id]);

  const resetCode = useCallback(() => {
    setCode(resolveDefaultCode(lang));
    setInput('');
    setOutput('');
    setIsErrorOutput(false);
    setExecTime(null);
  }, [lang, resolveDefaultCode]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  }, [code]);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-white/10 bg-white/[0.02] gap-2 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
          </div>
          <span className="text-xs text-[#64748b] font-mono truncate">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm font-medium hover:bg-white/[0.06] transition-all"
              style={{ color: lang.color }}
            >
              <Settings2 className="w-3.5 h-3.5" />
              {lang.label}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 z-50 w-40 rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden"
                >
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => switchLanguage(item)}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-all ${
                        item.id === lang.id ? 'bg-white/[0.08] font-semibold' : 'hover:bg-white/[0.04]'
                      }`}
                      style={{ color: item.id === lang.id ? item.color : '#94a3b8' }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={copyCode}
            className="p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-white/5 transition-all"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCode}
            className="p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-white/5 transition-all"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <motion.button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#22c55e] text-black text-sm font-semibold hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Run Code</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div style={{ height }}>
        <Editor
          height="100%"
          language={lang.monacoLang}
          value={code}
          onChange={(nextValue) => setCode(nextValue || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            roundedSelection: true,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </div>

      <div className="border-t border-white/10">
        <div className="flex items-center justify-between border-b border-white/5">
          <div className="flex">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === 'input'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              Input
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === 'output'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Output
              {output && <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />}
            </button>
          </div>

          {execTime !== null && (
            <span className="text-[10px] text-[#64748b] font-mono pr-4">{execTime}ms</span>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-4 min-h-[120px]"
          >
            {activeTab === 'input' ? (
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter stdin input for your program..."
                className="w-full h-[100px] bg-transparent text-sm text-white font-mono resize-none outline-none placeholder-[#475569]"
              />
            ) : (
              <pre className="text-sm font-mono whitespace-pre-wrap min-h-[100px]">
                {isRunning ? (
                  <span className="text-[#f59e0b] flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Compiling and running...
                  </span>
                ) : output ? (
                  <span className={isErrorOutput ? 'text-[#ef4444]' : 'text-[#22c55e]'}>{output}</span>
                ) : (
                  <span className="text-[#475569]">Click &quot;Run Code&quot; to see output here...</span>
                )}
              </pre>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
