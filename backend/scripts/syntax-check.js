/**
 * syntax-check.js - Lightweight JS syntax verification for backend files.
 *
 * Why this exists:
 * - Catches syntax regressions quickly in CI/local workflows.
 * - Does not require DB/Redis connection to validate source parsing.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const scriptsDir = path.join(rootDir, 'scripts');
const topLevelFiles = [path.join(rootDir, 'app.js'), path.join(rootDir, 'server.js')];

const collectJsFiles = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) return collectJsFiles(fullPath);
        if (entry.isFile() && fullPath.endsWith('.js')) return [fullPath];
        return [];
    });
};

const files = [...topLevelFiles, ...collectJsFiles(srcDir), ...collectJsFiles(scriptsDir)];
let hasError = false;

files.forEach((filePath) => {
    const code = fs.readFileSync(filePath, 'utf8');
    try {
        new vm.Script(code, { filename: filePath });
    } catch (error) {
        hasError = true;
        process.stderr.write(`Syntax error in ${filePath}\n${error.stack}\n`);
    }
});

if (hasError) {
    process.exit(1);
}

process.stdout.write(`Syntax check passed for ${files.length} files.\n`);
