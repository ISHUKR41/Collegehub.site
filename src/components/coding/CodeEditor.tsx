/**
 * CodeEditor.tsx — Multi-language in-browser code editor using Monaco
 *
 * Supported languages: C, C++, Java, Python
 * Execution via Piston API (free, no backend needed)
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, RotateCcw, Loader2, Terminal, Type,
  Copy, Check, ChevronDown, Settings2
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Language configuration                                             */
/* ------------------------------------------------------------------ */

interface LangConfig {
  id: string;
  label: string;
  monacoLang: string;
  pistonLang: string;
  pistonVersion: string;
  fileName: string;
  color: string;
  boilerplate: string;
}

const LANGUAGES: LangConfig[] = [
  {
    id: 'c',
    label: 'C',
    monacoLang: 'c',
    pistonLang: 'c',
    pistonVersion: '10.2.0',
    fileName: 'main.c',
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
    pistonLang: 'c++',
    pistonVersion: '10.2.0',
    fileName: 'main.cpp',
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
    pistonLang: 'java',
    pistonVersion: '15.0.2',
    fileName: 'Main.java',
    color: '#ED8B00',
    boilerplate: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    id: 'python',
    label: 'Python',
    monacoLang: 'python',
    pistonLang: 'python',
    pistonVersion: '3.10.0',
    fileName: 'main.py',
    color: '#3776AB',
    boilerplate: `print("Hello, World!")`,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface CodeEditorProps {
  defaultCode?: string;
  defaultLanguage?: string;
  title?: string;
  height?: string;
}

export default function CodeEditor({
  defaultCode,
  defaultLanguage = 'c',
  title = 'Code Editor',
  height = '350px',
}: CodeEditorProps) {
  const initialLang = useMemo(
    () => LANGUAGES.find((l) => l.id === defaultLanguage) || LANGUAGES[0],
    [defaultLanguage],
  );

  const [lang, setLang] = useState<LangConfig>(initialLang);
  const [code, setCode] = useState(defaultCode || initialLang.boilerplate);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('output');
  const [copied, setCopied] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  /* Switch language */
  const switchLanguage = useCallback(
    (newLang: LangConfig) => {
      setLang(newLang);
      setCode(newLang.boilerplate);
      setOutput('');
      setExecTime(null);
      setLangMenuOpen(false);
    },
    [],
  );

  /* Run code via Piston */
  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setActiveTab('output');
    setExecTime(null);
    const start = performance.now();

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.pistonLang,
          version: lang.pistonVersion,
          files: [{ name: lang.fileName, content: code }],
          stdin: input,
        }),
      });

      const data = await response.json();
      const elapsed = Math.round(performance.now() - start);
      setExecTime(elapsed);

      if (data.run) {
        const result = data.run.stderr
          ? `Error:\n${data.run.stderr}`
          : data.run.stdout || '(No output)';
        setOutput(result);
      } else if (data.compile?.stderr) {
        setOutput(`Compilation Error:\n${data.compile.stderr}`);
      } else {
        setOutput('Error: Could not execute code. Please try again.');
      }
    } catch {
      setOutput('Network error. Please check your internet connection and try again.');
    } finally {
      setIsRunning(false);
    }
  }, [code, input, lang]);

  const resetCode = useCallback(() => {
    setCode(defaultCode || lang.boilerplate);
    setInput('');
    setOutput('');
    setExecTime(null);
  }, [defaultCode, lang]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [code]);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-white/10 bg-white/[0.02] gap-2 flex-wrap">
        {/* Left: dots + title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
          </div>
          <span className="text-xs text-[#64748b] font-mono truncate">{title}</span>
        </div>

        {/* Right: language selector + buttons */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm font-medium hover:bg-white/[0.06] transition-all"
              style={{ color: lang.color }}
            >
              <Settings2 className="w-3.5 h-3.5" />
              {lang.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
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
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => switchLanguage(l)}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-all ${
                        l.id === lang.id
                          ? 'bg-white/[0.08] font-semibold'
                          : 'hover:bg-white/[0.04]'
                      }`}
                      style={{ color: l.id === lang.id ? l.color : '#94a3b8' }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                      {l.label}
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

      {/* ─── Editor ─── */}
      <div style={{ height }}>
        <Editor
          height="100%"
          language={lang.monacoLang}
          value={code}
          onChange={(val) => setCode(val || '')}
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

      {/* ─── Input / Output ─── */}
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
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program here (stdin)..."
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
                  <span
                    className={
                      output.startsWith('Error') || output.startsWith('Compilation')
                        ? 'text-[#ef4444]'
                        : 'text-[#22c55e]'
                    }
                  >
                    {output}
                  </span>
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
