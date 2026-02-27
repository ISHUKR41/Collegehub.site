'use client';

/**
 * day1-advanced-components.tsx — Phase 2 Advanced Interactive Components
 * Stack/Heap Visualizer, Bit Manipulation, Compiler Simulator, ASCII Explorer,
 * CPU Pipeline, Memory Explorer, and more animated & 3D components
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, HardDrive, MemoryStick, Layers, Binary, Hash,
  ChevronDown, ChevronUp, ChevronRight, Play, Pause, RotateCcw,
  Zap, AlertTriangle, CheckCircle, XCircle, Search, Copy,
  ArrowDown, ArrowUp, ArrowRight as ArrowR, Settings, Eye,
  Database, Monitor, Server, Sparkles, BookOpen, Lightbulb,
  Activity, BarChart3, Box, Grid3X3, Terminal, Code2,
} from 'lucide-react';

const PHASE_COLOR = '#22c55e';

/* ─── Stack vs Heap Visualizer ─── */
export function StackHeapVisualizer() {
  const [stackItems, setStackItems] = useState<{ name: string; value: string; addr: string }[]>([
    { name: 'main()', value: 'frame', addr: '0xFFFF' },
  ]);
  const [heapItems, setHeapItems] = useState<{ name: string; size: string; addr: string; freed: boolean }[]>([]);
  const [log, setLog] = useState<string[]>(['Program started — main() pushed to stack']);
  const stepRef = useRef(0);

  const steps = [
    () => {
      setStackItems(prev => [...prev, { name: 'int x = 10', value: '10', addr: '0xFFFE' }]);
      setLog(prev => [...prev, '📦 int x = 10; → Pushed to STACK (auto, fast, 4 bytes)']);
    },
    () => {
      setStackItems(prev => [...prev, { name: 'int y = 20', value: '20', addr: '0xFFFD' }]);
      setLog(prev => [...prev, '📦 int y = 20; → Pushed to STACK (auto, fast, 4 bytes)']);
    },
    () => {
      setHeapItems(prev => [...prev, { name: '*ptr', size: '40 bytes', addr: '0x1000', freed: false }]);
      setStackItems(prev => [...prev, { name: 'ptr', value: '0x1000', addr: '0xFFFC' }]);
      setLog(prev => [...prev, '🔧 int *ptr = malloc(10 * sizeof(int)); → 40 bytes on HEAP, pointer on STACK']);
    },
    () => {
      setHeapItems(prev => [...prev, { name: '*name', size: '64 bytes', addr: '0x1028', freed: false }]);
      setStackItems(prev => [...prev, { name: 'name', value: '0x1028', addr: '0xFFFB' }]);
      setLog(prev => [...prev, '🔧 char *name = malloc(64); → 64 bytes on HEAP for string']);
    },
    () => {
      setHeapItems(prev => prev.map(h => h.addr === '0x1000' ? { ...h, freed: true } : h));
      setLog(prev => [...prev, '♻️ free(ptr); → Released 40 bytes back to OS. Ptr still exists on stack (DANGLING!)']);
    },
    () => {
      setStackItems(prev => prev.filter(s => s.name !== 'name' && s.name !== 'ptr' && s.name !== 'int y = 20' && s.name !== 'int x = 10'));
      setLog(prev => [...prev, '⚠️ main() returns — Stack auto-cleaned. BUT name on HEAP still allocated = MEMORY LEAK!']);
    },
  ];

  const handleStep = () => {
    if (stepRef.current < steps.length) {
      steps[stepRef.current]();
      stepRef.current += 1;
    }
  };

  const handleReset = () => {
    setStackItems([{ name: 'main()', value: 'frame', addr: '0xFFFF' }]);
    setHeapItems([]);
    setLog(['Program started — main() pushed to stack']);
    stepRef.current = 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#a855f7]/[0.04] to-[#3b82f6]/[0.04] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#a855f7]" />
          <h4 className="text-white font-bold text-sm">🔬 Stack vs Heap — Live Memory Simulation</h4>
        </div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleStep} disabled={stepRef.current >= steps.length}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer disabled:opacity-40"
            style={{ borderColor: `${PHASE_COLOR}50`, background: `${PHASE_COLOR}15`, color: PHASE_COLOR }}>
            <Play className="w-3 h-3 inline mr-1" /> Step {stepRef.current + 1}/{steps.length}
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/[0.1] bg-white/[0.04] text-[#94a3b8] cursor-pointer">
            <RotateCcw className="w-3 h-3 inline mr-1" /> Reset
          </motion.button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Stack */}
        <div className="rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.04] p-4">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDown className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-[#3b82f6] font-bold text-xs uppercase tracking-wider">Stack (Auto — LIFO)</span>
          </div>
          <p className="text-[10px] text-[#64748b] mb-3">Grows downward ↓ | Auto-allocated | Auto-freed</p>
          <div className="space-y-1.5">
            <AnimatePresence>
              {[...stackItems].reverse().map((item, i) => (
                <motion.div key={item.name + item.addr}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-xs">
                  <span className="font-mono text-[#3b82f6] font-bold">{item.name}</span>
                  <span className="text-[#94a3b8]">{item.value}</span>
                  <span className="text-[10px] text-[#475569] font-mono">{item.addr}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Heap */}
        <div className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.04] p-4">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUp className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#f59e0b] font-bold text-xs uppercase tracking-wider">Heap (Manual — Dynamic)</span>
          </div>
          <p className="text-[10px] text-[#64748b] mb-3">Grows upward ↑ | malloc() to allocate | free() to release</p>
          <div className="space-y-1.5">
            <AnimatePresence>
              {heapItems.map((item) => (
                <motion.div key={item.addr}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs ${
                    item.freed
                      ? 'border-[#ef4444]/20 bg-[#ef4444]/[0.06] line-through opacity-60'
                      : 'border-[#f59e0b]/15 bg-[#f59e0b]/[0.06]'
                  }`}>
                  <span className={`font-mono font-bold ${item.freed ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>{item.name}</span>
                  <span className="text-[#94a3b8]">{item.size}</span>
                  <span className="text-[10px] text-[#475569] font-mono">{item.addr}</span>
                  {item.freed && <span className="text-[10px] text-[#ef4444] font-bold">FREED</span>}
                </motion.div>
              ))}
            </AnimatePresence>
            {heapItems.length === 0 && (
              <div className="text-center py-4 text-[10px] text-[#475569] italic">No heap allocations yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Log */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] p-3 max-h-36 overflow-y-auto">
        <div className="flex items-center gap-1.5 mb-2">
          <Terminal className="w-3 h-3 text-[#64748b]" />
          <span className="text-[10px] text-[#64748b] font-mono uppercase tracking-wider">Execution Log</span>
        </div>
        {log.map((l, i) => (
          <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] text-[#94a3b8] font-mono leading-relaxed">{l}</motion.p>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Bit Manipulation Playground ─── */
export function BitManipulationPlayground() {
  const [inputA, setInputA] = useState(170); // 10101010
  const [inputB, setInputB] = useState(204); // 11001100
  const [operation, setOperation] = useState<'AND' | 'OR' | 'XOR' | 'NOT' | 'LSHIFT' | 'RSHIFT'>('AND');

  const toBin = (n: number) => (n >>> 0).toString(2).padStart(8, '0');

  const getResult = () => {
    switch (operation) {
      case 'AND': return inputA & inputB;
      case 'OR': return inputA | inputB;
      case 'XOR': return inputA ^ inputB;
      case 'NOT': return (~inputA) & 0xFF;
      case 'LSHIFT': return (inputA << 1) & 0xFF;
      case 'RSHIFT': return (inputA >>> 1) & 0xFF;
    }
  };

  const getSymbol = () => {
    switch (operation) {
      case 'AND': return '&';
      case 'OR': return '|';
      case 'XOR': return '^';
      case 'NOT': return '~';
      case 'LSHIFT': return '<<';
      case 'RSHIFT': return '>>';
    }
  };

  const result = getResult();

  const BitRow = ({ label, val, color }: { label: string; val: number; color: string }) => (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono text-[#64748b] w-6">{label}</span>
      <div className="flex gap-0.5">
        {toBin(val).split('').map((bit, i) => (
          <motion.div key={i}
            animate={{ backgroundColor: bit === '1' ? `${color}30` : 'rgba(255,255,255,0.03)' }}
            className="w-8 h-8 rounded-md border flex items-center justify-center text-xs font-mono font-bold"
            style={{ borderColor: bit === '1' ? `${color}50` : 'rgba(255,255,255,0.08)', color: bit === '1' ? color : '#475569' }}>
            {bit}
          </motion.div>
        ))}
      </div>
      <span className="text-xs text-[#94a3b8] font-mono w-10 text-right">{val}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#06b6d4]/[0.04] to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Binary className="w-5 h-5 text-[#06b6d4]" />
        <h4 className="text-white font-bold text-sm">🔢 Bit Manipulation Playground</h4>
      </div>

      {/* Operation Selector */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(['AND', 'OR', 'XOR', 'NOT', 'LSHIFT', 'RSHIFT'] as const).map(op => (
          <motion.button key={op}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setOperation(op)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer transition-all ${
              operation === op ? 'border-[#06b6d4]/50 bg-[#06b6d4]/15 text-[#06b6d4]' : 'border-white/[0.08] bg-white/[0.02] text-[#64748b]'
            }`}>
            {op}
          </motion.button>
        ))}
      </div>

      {/* Input Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div>
          <label className="text-[10px] text-[#64748b] block mb-1 font-mono">A (0-255)</label>
          <input type="range" min={0} max={255} value={inputA} onChange={e => setInputA(+e.target.value)}
            className="w-32 accent-[#06b6d4]" />
          <span className="ml-2 text-xs text-[#06b6d4] font-mono">{inputA}</span>
        </div>
        {operation !== 'NOT' && operation !== 'LSHIFT' && operation !== 'RSHIFT' && (
          <div>
            <label className="text-[10px] text-[#64748b] block mb-1 font-mono">B (0-255)</label>
            <input type="range" min={0} max={255} value={inputB} onChange={e => setInputB(+e.target.value)}
              className="w-32 accent-[#a855f7]" />
            <span className="ml-2 text-xs text-[#a855f7] font-mono">{inputB}</span>
          </div>
        )}
      </div>

      {/* Visual */}
      <div className="space-y-2 font-mono">
        <BitRow label="A" val={inputA} color="#06b6d4" />
        {operation !== 'NOT' && operation !== 'LSHIFT' && operation !== 'RSHIFT' && (
          <BitRow label="B" val={inputB} color="#a855f7" />
        )}
        <div className="flex items-center gap-3 my-1">
          <span className="text-[10px] text-[#64748b] w-6">{getSymbol()}</span>
          <div className="h-px flex-1 bg-white/[0.1]" />
        </div>
        <BitRow label="=" val={result} color={PHASE_COLOR} />
      </div>

      <p className="text-[10px] text-[#475569] mt-3 italic">
        {operation === 'AND' && 'AND (&): Both bits must be 1 for result to be 1. Used for masking.'}
        {operation === 'OR' && 'OR (|): Either bit can be 1 for result to be 1. Used for setting flags.'}
        {operation === 'XOR' && 'XOR (^): Bits must differ for result to be 1. Used for toggling/encryption.'}
        {operation === 'NOT' && 'NOT (~): Flips every bit. 0→1, 1→0. One\'s complement.'}
        {operation === 'LSHIFT' && 'Left Shift (<<): Shifts all bits left by 1. Equivalent to multiplying by 2.'}
        {operation === 'RSHIFT' && 'Right Shift (>>): Shifts all bits right by 1. Equivalent to dividing by 2.'}
      </p>
    </motion.div>
  );
}

/* ─── ASCII Table Explorer ─── */
export function ASCIITableExplorer() {
  const [search, setSearch] = useState('');
  const [selectedChar, setSelectedChar] = useState<number | null>(65);

  const toBin = (n: number) => n.toString(2).padStart(8, '0');
  const toHex = (n: number) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
  const getChar = (n: number) => {
    if (n < 32) return ['NUL','SOH','STX','ETX','EOT','ENQ','ACK','BEL','BS','TAB','LF','VT','FF','CR','SO','SI','DLE','DC1','DC2','DC3','DC4','NAK','SYN','ETB','CAN','EM','SUB','ESC','FS','GS','RS','US'][n];
    if (n === 32) return 'SPC';
    if (n === 127) return 'DEL';
    return String.fromCharCode(n);
  };

  const filteredRange = Array.from({ length: 128 }, (_, i) => i).filter(i => {
    if (!search) return true;
    const s = search.toLowerCase();
    return getChar(i).toLowerCase().includes(s) || i.toString().includes(s) || toHex(i).toLowerCase().includes(s);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#f59e0b]/[0.04] to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-[#f59e0b]" />
          <h4 className="text-white font-bold text-sm">📋 Interactive ASCII Table</h4>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#475569]" />
          <input type="text" placeholder="Search char, dec, hex..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="pl-7 pr-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs text-white placeholder:text-[#475569] w-44 outline-none focus:border-[#f59e0b]/40" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 mb-4 max-h-52 overflow-y-auto">
        {filteredRange.slice(0, 128).map(i => (
          <motion.button key={i}
            whileHover={{ scale: 1.15 }}
            onClick={() => setSelectedChar(i)}
            className={`w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-mono cursor-pointer border transition-all ${
              selectedChar === i
                ? 'border-[#f59e0b]/50 bg-[#f59e0b]/15 text-[#f59e0b] font-bold'
                : i < 32 || i === 127
                  ? 'border-white/[0.04] bg-white/[0.02] text-[#475569]'
                  : 'border-white/[0.06] bg-white/[0.03] text-[#94a3b8] hover:border-[#f59e0b]/30'
            }`}>
            {getChar(i)}
          </motion.button>
        ))}
      </div>

      {/* Selected Detail */}
      {selectedChar !== null && (
        <motion.div
          key={selectedChar}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] p-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { label: 'Character', value: getChar(selectedChar), color: '#f59e0b' },
              { label: 'Decimal', value: selectedChar.toString(), color: '#3b82f6' },
              { label: 'Binary', value: toBin(selectedChar), color: PHASE_COLOR },
              { label: 'Hex', value: toHex(selectedChar), color: '#a855f7' },
            ].map(d => (
              <div key={d.label}>
                <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">{d.label}</p>
                <p className="text-lg font-bold font-mono" style={{ color: d.color }}>{d.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── CPU Pipeline Simulator ─── */
export function CPUPipelineSimulator() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const pipeline = [
    { stage: 'Fetch', icon: '📥', desc: 'CPU reads the next instruction from RAM using the Instruction Pointer (Program Counter). The binary instruction at the pointed address is loaded into the Instruction Register.', color: '#3b82f6', detail: 'IP reads address 0x1004 → loads binary 01001000 11001010' },
    { stage: 'Decode', icon: '🔍', desc: 'The Control Unit decodes the binary instruction into a meaningful operation. It identifies WHAT operation to perform (ADD, MOV, CMP) and WHICH registers/addresses are operands.', color: '#a855f7', detail: 'Opcode 01001000 = MOV instruction, operands = register RAX + value 42' },
    { stage: 'Execute', icon: '⚡', desc: 'The Arithmetic Logic Unit (ALU) performs the actual computation. For arithmetic, it adds/subtracts/multiplies. For logic, it compares bits. For memory, it reads/writes RAM addresses.', color: '#f59e0b', detail: 'ALU moves value 42 (00101010) into register RAX' },
    { stage: 'Memory', icon: '💾', desc: 'If the instruction requires reading from or writing to RAM (not just registers), the Memory Unit handles the data transfer between CPU and RAM via the system bus.', color: '#ef4444', detail: 'If needed: result written to RAM address 0x2000 via data bus' },
    { stage: 'Write Back', icon: '✅', desc: 'The final result is written back to the destination register inside the CPU. The Instruction Pointer advances to the next instruction address. Cycle repeats billions of times per second.', color: PHASE_COLOR, detail: 'Result stored in RAX. IP advances to 0x1008. Ready for next cycle.' },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(prev => {
        if (prev >= pipeline.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying, pipeline.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.04] to-[#a855f7]/[0.03] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#3b82f6]" />
          <h4 className="text-white font-bold text-sm">⚙️ CPU Instruction Cycle — Fetch-Decode-Execute</h4>
        </div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setIsPlaying(!isPlaying); if (step >= pipeline.length - 1) setStep(0); }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer"
            style={{ borderColor: `${PHASE_COLOR}50`, background: `${PHASE_COLOR}15`, color: PHASE_COLOR }}>
            {isPlaying ? <><Pause className="w-3 h-3 inline mr-1" /> Pause</> : <><Play className="w-3 h-3 inline mr-1" /> Play</>}
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setStep(0); setIsPlaying(false); }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/[0.1] bg-white/[0.04] text-[#94a3b8] cursor-pointer">
            <RotateCcw className="w-3 h-3 inline mr-1" /> Reset
          </motion.button>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="space-y-3">
        {pipeline.map((p, i) => (
          <motion.div key={p.stage}
            animate={{
              borderColor: i === step ? `${p.color}60` : 'rgba(255,255,255,0.06)',
              backgroundColor: i === step ? `${p.color}08` : 'transparent',
            }}
            className="rounded-xl border p-4 transition-all"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  scale: i === step ? 1.2 : 1,
                  opacity: i <= step ? 1 : 0.4,
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: i <= step ? `${p.color}15` : 'rgba(255,255,255,0.03)', border: `1px solid ${i <= step ? `${p.color}30` : 'rgba(255,255,255,0.06)'}` }}>
                {i < step ? '✅' : p.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-sm">{i + 1}. {p.stage}</span>
                  {i === step && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-[10px] px-2 py-0.5 rounded-md font-bold"
                      style={{ background: `${p.color}20`, color: p.color }}>
                      ACTIVE
                    </motion.span>
                  )}
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{p.desc}</p>
                {i === step && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="text-[10px] font-mono mt-2 px-3 py-2 rounded-lg border"
                    style={{ borderColor: `${p.color}20`, background: `${p.color}06`, color: p.color }}>
                    → {p.detail}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-[#475569] mt-4 text-center italic">
        This cycle repeats ~5 billion times per second on a modern 5GHz CPU. Each stage takes just ~0.2 nanoseconds.
      </p>
    </motion.div>
  );
}

/* ─── Compiler Output Simulator ─── */
export function CompilerOutputSimulator() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      name: 'Source Code (.c)',
      icon: Code2,
      color: '#22c55e',
      code: `#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    printf("Value: %d\\n", x);\n    return 0;\n}`,
    },
    {
      name: 'Preprocessed (.i)',
      icon: Settings,
      color: '#3b82f6',
      code: `// ... 800+ lines from stdio.h pasted here ...\n// All comments STRIPPED\n// All macros EXPANDED\n\nextern int printf(const char *, ...);\n\nint main(void) {\n    int x = 42;\n    printf("Value: %d\\n", x);\n    return 0;\n}`,
    },
    {
      name: 'Assembly (.s)',
      icon: Cpu,
      color: '#a855f7',
      code: `.section .rodata\n.LC0:\n    .string "Value: %d\\n"\n\nmain:\n    pushq   %rbp          ; save frame\n    movq    %rsp, %rbp    ; set stack\n    subq    $16, %rsp     ; reserve 16B\n    movl    $42, -4(%rbp) ; x = 42\n    movl    -4(%rbp), %esi\n    leaq    .LC0(%rip), %rdi\n    call    printf        ; call printf\n    movl    $0, %eax      ; return 0\n    leave\n    ret`,
    },
    {
      name: 'Object Code (.o)',
      icon: Binary,
      color: '#f59e0b',
      code: `48 89 e5        ; mov rbp, rsp\n48 83 ec 10     ; sub rsp, 16\nc7 45 fc 2a 00  ; mov [rbp-4], 42\n8b 75 fc        ; mov esi, [rbp-4]\n48 8d 3d xx xx  ; lea rdi, "Value..."\ne8 xx xx xx xx  ; call printf\nb8 00 00 00 00  ; mov eax, 0\nc9              ; leave\nc3              ; ret\n\n(Raw binary machine code)`,
    },
    {
      name: 'Executable (.out)',
      icon: Play,
      color: '#ef4444',
      code: `ELF Header:\n  Magic:   7f 45 4c 46 (\\x7fELF)\n  Class:   64-bit\n  Entry:   0x401000 (main)\n\nProgram Headers:\n  LOAD  0x400000  r-x  (code)\n  LOAD  0x600000  rw-  (data)\n\nSymbol Table:\n  main    0x401000  FUNC\n  printf  0x401040  FUNC (linked)\n\n> ./a.out\nOutput: Value: 42`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-5 h-5 text-[#22c55e]" />
        <h4 className="text-white font-bold text-sm">🔬 Compilation Pipeline — See What Happens at Each Stage</h4>
      </div>

      {/* Stage Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {stages.map((s, i) => (
          <motion.button key={s.name}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setActiveStage(i)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-semibold border whitespace-nowrap cursor-pointer transition-all ${
              activeStage === i ? '' : 'border-white/[0.06] bg-white/[0.02] text-[#64748b]'
            }`}
            style={activeStage === i ? { borderColor: `${s.color}50`, background: `${s.color}12`, color: s.color } : {}}>
            {i > 0 && <ArrowR className="w-3 h-3 opacity-40" />}
            <s.icon className="w-3 h-3" />
            {s.name}
          </motion.button>
        ))}
      </div>

      {/* Code Output */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-xl border bg-[#0d1117] overflow-hidden"
          style={{ borderColor: `${stages[activeStage].color}20` }}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: `${stages[activeStage].color}15` }}>
            <span className="text-xs font-bold" style={{ color: stages[activeStage].color }}>
              Stage {activeStage + 1}: {stages[activeStage].name}
            </span>
            <span className="text-[10px] text-[#475569] font-mono">
              {['gcc -E', 'gcc -S', 'gcc -c', 'gcc', 'ld'][activeStage]}
            </span>
          </div>
          <pre className="p-4 text-[11px] font-mono text-[#b0bec5] leading-[1.7] overflow-x-auto max-h-64">
            {stages[activeStage].code}
          </pre>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Number System Converter ─── */
export function NumberSystemConverter() {
  const [decimal, setDecimal] = useState(42);

  const toBin = (n: number) => (n >>> 0).toString(2);
  const toOct = (n: number) => n.toString(8);
  const toHex = (n: number) => n.toString(16).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5" style={{ color: PHASE_COLOR }} />
        <h4 className="text-white font-bold text-sm">🔄 Number System Converter</h4>
      </div>

      <div className="mb-4">
        <label className="text-[10px] text-[#64748b] block mb-1.5 font-mono">Decimal (0-255)</label>
        <input type="range" min={0} max={255} value={decimal} onChange={e => setDecimal(+e.target.value)}
          className="w-full accent-green-500" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Decimal (Base-10)', value: decimal.toString(), color: '#f59e0b', prefix: '' },
          { label: 'Binary (Base-2)', value: toBin(decimal).padStart(8, '0'), color: PHASE_COLOR, prefix: '0b' },
          { label: 'Octal (Base-8)', value: toOct(decimal), color: '#3b82f6', prefix: '0o' },
          { label: 'Hexadecimal (Base-16)', value: toHex(decimal), color: '#a855f7', prefix: '0x' },
        ].map(sys => (
          <div key={sys.label} className="rounded-xl border p-3 text-center"
            style={{ borderColor: `${sys.color}20`, background: `${sys.color}06` }}>
            <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1.5">{sys.label}</p>
            <p className="text-lg font-bold font-mono" style={{ color: sys.color }}>
              <span className="text-[10px] opacity-50">{sys.prefix}</span>{sys.value}
            </p>
          </div>
        ))}
      </div>

      {decimal > 0 && (
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#0d1117] p-3">
          <p className="text-[10px] text-[#64748b] mb-1 font-mono">Binary Breakdown:</p>
          <div className="flex flex-wrap gap-1">
            {toBin(decimal).padStart(8, '0').split('').map((bit, i) => {
              const pos = 7 - i;
              const val = bit === '1' ? Math.pow(2, pos) : 0;
              return (
                <div key={i} className="text-center">
                  <div className={`w-10 h-8 rounded-md border flex items-center justify-center text-xs font-mono font-bold ${
                    bit === '1' ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-white/[0.06] text-[#475569]'
                  }`}>{bit}</div>
                  <p className="text-[8px] text-[#475569] mt-0.5">2^{pos}</p>
                  <p className="text-[8px] font-mono" style={{ color: bit === '1' ? PHASE_COLOR : '#334155' }}>{val}</p>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-[#94a3b8] mt-2 font-mono">
            = {toBin(decimal).padStart(8, '0').split('').map((bit, i) => bit === '1' ? Math.pow(2, 7 - i) : null).filter(Boolean).join(' + ')} = {decimal}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Fun Facts Carousel ─── */
export function FunFactCard({ facts }: { facts: { icon: string; title: string; text: string; color: string }[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % facts.length), 6000);
    return () => clearInterval(timer);
  }, [facts.length]);

  const fact = facts[current];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] overflow-hidden relative"
      style={{ background: `linear-gradient(135deg, ${fact.color}08, transparent)` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        {facts.map((_, i) => (
          <div key={i} className="flex-1 mx-0.5">
            <motion.div
              className="h-full rounded-full"
              animate={{
                width: i === current ? '100%' : i < current ? '100%' : '0%',
                opacity: i <= current ? 1 : 0.2,
              }}
              style={{ backgroundColor: fact.color }}
            />
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">{fact.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3" style={{ color: fact.color }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: fact.color }}>Did You Know?</span>
                <span className="text-[10px] text-[#475569]">{current + 1}/{facts.length}</span>
              </div>
              <h5 className="text-white font-bold text-sm mb-1.5">{fact.title}</h5>
              <p className="text-xs text-[#94a3b8] leading-relaxed">{fact.text}</p>
            </div>
          </div>
          <div className="flex justify-center mt-3 gap-1.5">
            {facts.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === current ? '' : 'bg-white/[0.15]'}`}
                style={i === current ? { backgroundColor: fact.color, transform: 'scale(1.5)' } : {}} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Real-World Where C Runs ─── */
export function WhereCRunsToday() {
  const items = [
    { name: 'Linux Kernel', desc: '27M+ lines of C code. Powers Android, servers, NASA systems.', icon: '🐧', percent: 95 },
    { name: 'Windows Kernel', desc: 'Core NT kernel written in C. Runs 1.4 billion devices.', icon: '🪟', percent: 85 },
    { name: 'PostgreSQL', desc: 'World\'s most advanced open-source database. 100% C.', icon: '🗄️', percent: 100 },
    { name: 'Git', desc: 'Version control for all software. Written entirely in C.', icon: '📦', percent: 100 },
    { name: 'Python Interpreter', desc: 'CPython (default Python) is written IN C language.', icon: '🐍', percent: 90 },
    { name: 'Mars Rover', desc: 'NASA\'s Curiosity & Perseverance rovers run C code.', icon: '🚀', percent: 80 },
    { name: 'Game Engines', desc: 'Unreal Engine, id Tech use C/C++ for peak performance.', icon: '🎮', percent: 75 },
    { name: 'IoT & Embedded', desc: 'Your car\'s ECU, smart watch, medical devices — all C.', icon: '⌚', percent: 90 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5" style={{ color: PHASE_COLOR }} />
        <h4 className="text-white font-bold text-sm">🌍 Where C Runs Today — Real-World Impact</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default"
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-bold text-xs">{item.name}</span>
                <span className="text-[10px] font-mono" style={{ color: PHASE_COLOR }}>{item.percent}% C</span>
              </div>
              <p className="text-[10px] text-[#64748b] leading-relaxed">{item.desc}</p>
              <div className="mt-1.5 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: PHASE_COLOR }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Memory Leak Consequences ─── */
export function MemoryLeakDemo() {
  const [leaked, setLeaked] = useState(0);
  const [isLeaking, setIsLeaking] = useState(false);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    if (!isLeaking || crashed) return;
    const timer = setInterval(() => {
      setLeaked(prev => {
        const next = prev + Math.floor(Math.random() * 50) + 20;
        if (next >= 1024) {
          setCrashed(true);
          setIsLeaking(false);
          return 1024;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [isLeaking, crashed]);

  const reset = () => {
    setLeaked(0);
    setIsLeaking(false);
    setCrashed(false);
  };

  const usedPercent = (leaked / 1024) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#ef4444]/[0.04] to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
        <h4 className="text-white font-bold text-sm">⚠️ Memory Leak Simulation — What Happens Without free()</h4>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#64748b]">RAM Usage</span>
          <span className={`font-mono font-bold ${crashed ? 'text-[#ef4444]' : usedPercent > 70 ? 'text-[#f59e0b]' : 'text-[#94a3b8]'}`}>
            {leaked} / 1024 MB
          </span>
        </div>
        <div className="h-6 rounded-xl bg-white/[0.06] overflow-hidden relative">
          <motion.div
            animate={{ width: `${usedPercent}%` }}
            className="h-full rounded-xl"
            style={{
              background: crashed
                ? '#ef4444'
                : usedPercent > 70
                  ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                  : `linear-gradient(90deg, ${PHASE_COLOR}, #3b82f6)`,
            }}
          />
          {crashed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              💥 SYSTEM CRASH — OUT OF MEMORY
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsLeaking(!isLeaking)} disabled={crashed}
          className="px-4 py-2 rounded-lg text-xs font-bold border cursor-pointer disabled:opacity-40"
          style={{ borderColor: '#ef444450', background: '#ef444415', color: '#ef4444' }}>
          {isLeaking ? <><Pause className="w-3 h-3 inline mr-1" /> Stop Leak</> : <><Play className="w-3 h-3 inline mr-1" /> Start Leaking (no free)</>}
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="px-4 py-2 rounded-lg text-xs font-semibold border border-white/[0.1] bg-white/[0.04] text-[#94a3b8] cursor-pointer">
          <RotateCcw className="w-3 h-3 inline mr-1" /> Reset
        </motion.button>
      </div>

      <p className="text-[10px] text-[#64748b] mt-3 leading-relaxed">
        {crashed
          ? '💀 When malloc() is called without free(), allocated memory is NEVER returned to the OS. Eventually, RAM fills completely, and the OS forcefully terminates the process (OOM Killer on Linux). In production servers, this can cause catastrophic downtime.'
          : 'Click "Start Leaking" to simulate a program that calls malloc() in a loop without ever calling free(). Watch how memory fills up and eventually crashes the system.'}
      </p>
    </motion.div>
  );
}
