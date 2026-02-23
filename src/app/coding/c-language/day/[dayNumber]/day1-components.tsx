'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronUp, Zap, Code2 } from 'lucide-react';

export const PHASE_COLOR = '#22c55e';

/* ─── Floating Particles Background ─── */
export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2, height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#3b82f6' : '#a855f7',
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.06]" style={{ backgroundColor: PHASE_COLOR }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.04] blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/[0.03] blur-[180px]" />
    </div>
  );
}

/* ─── Animated Binary Stream ─── */
export function BinaryStream() {
  const [bits, setBits] = useState('01001000 01100101 01101100 01101100 01101111');
  useEffect(() => {
    const id = setInterval(() => {
      setBits(Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0')
        .reduce((s, b, i) => s + b + (i % 8 === 7 && i < 39 ? ' ' : ''), ''));
    }, 150);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="font-mono text-xs text-[#22c55e]/60 overflow-hidden whitespace-nowrap tracking-widest">
      {bits}
    </div>
  );
}

/* ─── 3D Tilt Card ─── */
export function Card3D({ children, className = '', glowColor = PHASE_COLOR }: {
  children: React.ReactNode; className?: string; glowColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ rotateX: -2, rotateY: 3, scale: 1.02, transition: { duration: 0.3 } }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm
        p-5 sm:p-6 hover:border-white/[0.15] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        relative overflow-hidden ${className}`}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-[0.08] transition-opacity"
        style={{ backgroundColor: glowColor }} />
      {children}
    </motion.div>
  );
}

/* ─── Section Badge ─── */
export function SectionBadge({ number, title }: { number: number; title: string }) {
  return (
    <motion.div className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <div className="relative">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black"
          style={{ background: `${PHASE_COLOR}18`, color: PHASE_COLOR, border: `1px solid ${PHASE_COLOR}30` }}>
          {number}
        </div>
        <motion.div className="absolute inset-0 rounded-xl" style={{ border: `2px solid ${PHASE_COLOR}` }}
          animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }} />
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.15em] block" style={{ color: PHASE_COLOR }}>Part {number}</span>
        <span className="text-[10px] text-[#64748b] uppercase tracking-wider">{title}</span>
      </div>
    </motion.div>
  );
}

/* ─── Info Card with Icon ─── */
export function InfoCard({ icon: Icon, title, children, color = PHASE_COLOR }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string; children: React.ReactNode; color?: string;
}) {
  return (
    <Card3D glowColor={color}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}14`, border: `1px solid ${color}25` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h4 className="text-white font-bold text-base">{title}</h4>
      </div>
      <div className="text-[#b0bec5] text-sm leading-[1.8] space-y-3">{children}</div>
    </Card3D>
  );
}

/* ─── Collapsible Deep Dive ─── */
export function Collapsible({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div layout className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden backdrop-blur-sm">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors">
        <span className="text-white font-semibold text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#64748b]" /> : <ChevronDown className="w-4 h-4 text-[#64748b]" />}
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="px-4 pb-5 text-[#94a3b8] text-sm leading-[1.8]">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Key Point Callout ─── */
export function KeyPoint({ children }: { children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }}
      className="flex items-start gap-3 p-4 rounded-xl bg-[#22c55e]/[0.06] border border-[#22c55e]/[0.15] backdrop-blur-sm">
      <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#22c55e]" />
      <span className="text-sm text-[#c8d0db] leading-[1.8]">{children}</span>
    </motion.div>
  );
}

/* ─── Warning/Important Callout ─── */
export function ImportantNote({ children, color = '#f59e0b' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm"
      style={{ background: `${color}08`, borderColor: `${color}20` }}>
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
        style={{ background: `${color}20`, color }}>!</div>
      <span className="text-sm text-[#c8d0db] leading-[1.8]">{children}</span>
    </div>
  );
}

/* ─── Code Block ─── */
export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <motion.div whileHover={{ scale: 1.005 }}
      className="rounded-xl overflow-hidden border border-white/[0.08] shadow-lg">
      {title && (
        <div className="px-4 py-2.5 bg-[#1e1e2e] border-b border-white/[0.06] flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <Code2 className="w-3.5 h-3.5 text-[#22c55e] ml-2" />
          <span className="text-xs font-medium text-[#94a3b8]">{title}</span>
        </div>
      )}
      <SyntaxHighlighter language="c" style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.25rem', background: '#0d1117', fontSize: '13px', lineHeight: '1.7' }}>
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
}

/* ─── Data Table ─── */
export function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] shadow-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-white/[0.05] to-white/[0.02]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[#94a3b8] border-b border-white/[0.08]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3.5 leading-relaxed ${j === 0 ? 'text-white font-semibold' : 'text-[#b0bec5]'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Memory Box Visualization ─── */
export function MemoryBoxes() {
  return (
    <div className="flex gap-1 flex-wrap justify-center my-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.15, borderColor: '#22c55e' }}
          className="w-12 h-14 rounded-lg border border-white/[0.1] bg-white/[0.03] flex flex-col items-center justify-center cursor-default"
        >
          <span className="text-[9px] text-[#64748b] font-mono">0x{(1024 + i).toString(16)}</span>
          <span className="text-xs text-[#22c55e] font-bold font-mono mt-0.5">
            {i < 4 ? ['0','0','2','A'][i] : i < 8 ? ['H','e','l','l'][i-4] : '00'}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── IPOS Animated Flow ─── */
export function IPOSFlow() {
  const items = [
    { letter: 'I', title: 'Input', desc: 'Raw data enters — keyboard, camera, microphone, sensors, touch screens, network signals.', color: '#3b82f6', examples: 'Typing, clicking, voice commands, swiping' },
    { letter: 'P', title: 'Process', desc: 'CPU performs mathematical, logical, and organizational operations. The brain manipulates data.', color: '#f59e0b', examples: 'Calculations, encryption, sorting, filtering' },
    { letter: 'O', title: 'Output', desc: 'Processed information delivered back — display, speaker, printer, actuators, network.', color: '#22c55e', examples: 'Screen pixels, audio, printed documents, LED' },
    { letter: 'S', title: 'Storage', desc: 'Data retained for future use — temporarily in RAM during processing, permanently on SSD/HDD.', color: '#a855f7', examples: 'Files, databases, session data, cookies' },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {items.map((item, idx) => (
        <motion.div key={item.letter}
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.12, duration: 0.6, type: 'spring' }}
          whileHover={{ y: -6, scale: 1.03, rotateY: 5 }}
          style={{ perspective: 800, transformStyle: 'preserve-3d' }}
          className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
          <motion.div
            animate={{ boxShadow: [`0 0 20px ${item.color}20`, `0 0 40px ${item.color}40`, `0 0 20px ${item.color}20`] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-black"
            style={{ background: `${item.color}15`, color: item.color, border: `2px solid ${item.color}30` }}>
            {item.letter}
          </motion.div>
          <h4 className="text-white font-bold mb-2 text-base">{item.title}</h4>
          <p className="text-xs text-[#94a3b8] leading-relaxed mb-2">{item.desc}</p>
          <p className="text-[10px] text-[#64748b] italic">{item.examples}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Abstraction Layers Visual ─── */
export function AbstractionLayers() {
  const layers = [
    { name: 'High-Level Languages', sub: 'C, Python, Java, JavaScript', color: '#22c55e', width: '100%' },
    { name: 'Assembly Language', sub: 'MOV, ADD, SUB, JMP', color: '#3b82f6', width: '88%' },
    { name: 'Machine Code', sub: '01001000 11001010...', color: '#f59e0b', width: '76%' },
    { name: 'CPU Microarchitecture', sub: 'Pipelines, Registers, ALU', color: '#ef4444', width: '64%' },
    { name: 'Logic Gates', sub: 'AND, OR, NOT, XOR, NAND', color: '#a855f7', width: '52%' },
    { name: 'Transistors', sub: 'Billions of tiny switches', color: '#ec4899', width: '40%' },
    { name: 'Physics (Electrons)', sub: 'Electrical voltage flow', color: '#64748b', width: '28%' },
  ];
  return (
    <div className="space-y-2 my-6">
      {layers.map((layer, i) => (
        <motion.div key={layer.name}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="mx-auto"
          style={{ width: layer.width }}
        >
          <div className="rounded-lg border p-3 flex items-center justify-between backdrop-blur-sm"
            style={{ borderColor: `${layer.color}30`, background: `${layer.color}08` }}>
            <div>
              <span className="text-sm font-semibold text-white">{layer.name}</span>
              <span className="text-xs text-[#94a3b8] ml-2">{layer.sub}</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: layer.color, background: `${layer.color}15` }}>
              L{7 - i}
            </span>
          </div>
        </motion.div>
      ))}
      <p className="text-center text-xs text-[#64748b] mt-3">↑ Higher abstraction (easier for humans) &nbsp;&nbsp; ↓ Lower abstraction (closer to hardware)</p>
    </div>
  );
}

/* ─── Language Spectrum Bar ─── */
export function LanguageSpectrum() {
  const langs = [
    { name: 'Machine Code', pos: 2, color: '#ef4444' },
    { name: 'Assembly', pos: 18, color: '#f97316' },
    { name: 'C', pos: 42, color: '#22c55e', highlight: true },
    { name: 'C++', pos: 55, color: '#3b82f6' },
    { name: 'Java', pos: 72, color: '#8b5cf6' },
    { name: 'Python', pos: 92, color: '#06b6d4' },
  ];
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 mb-6">
      <h4 className="text-white font-bold text-sm mb-4">Language Abstraction Spectrum</h4>
      <div className="relative h-4 rounded-full bg-gradient-to-r from-[#ef4444]/30 via-[#22c55e]/30 to-[#3b82f6]/30 mb-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#22c55e] via-[#3b82f6] to-[#06b6d4] opacity-40" />
        {langs.map(l => (
          <motion.div key={l.name} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${l.pos}%` }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ type: 'spring', delay: l.pos / 200 }}>
            <div className={`w-4 h-4 rounded-full border-2 ${l.highlight ? 'scale-150' : ''}`}
              style={{ borderColor: l.color, background: `${l.color}40` }} />
            <span className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold ${l.highlight ? 'text-[#22c55e] text-xs' : 'text-[#94a3b8]'}`}>
              {l.name}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[#64748b] mt-2">
        <span>← Low Level (Hardware)</span>
        <span>High Level (Human Readable) →</span>
      </div>
    </div>
  );
}

/* ─── Compilation Pipeline Visual ─── */
export function CompilationPipeline() {
  const stages = [
    { name: 'Preprocessing', input: '.c', output: '.i', color: '#3b82f6', desc: 'Strips comments, expands #include, handles macros' },
    { name: 'Compilation', input: '.i', output: '.s', color: '#f59e0b', desc: 'Validates syntax, translates C → Assembly' },
    { name: 'Assembly', input: '.s', output: '.o', color: '#22c55e', desc: 'Converts Assembly → binary machine code' },
    { name: 'Linking', input: '.o', output: '.exe', color: '#a855f7', desc: 'Merges object files + libraries → executable' },
  ];
  return (
    <div className="flex flex-col sm:flex-row gap-3 my-6">
      {stages.map((s, i) => (
        <motion.div key={s.name} className="flex-1 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}>
          <div className="rounded-xl border p-4 h-full" style={{ borderColor: `${s.color}25`, background: `${s.color}06` }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: `${s.color}20`, color: s.color }}>{i + 1}</span>
              <span className="text-white font-bold text-xs">{s.name}</span>
            </div>
            <p className="text-[11px] text-[#94a3b8] leading-relaxed mb-2">{s.desc}</p>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#64748b] font-mono">{s.input}</span>
              <span className="text-[#64748b]">→</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold" style={{ background: `${s.color}15`, color: s.color }}>{s.output}</span>
            </div>
          </div>
          {i < 3 && <div className="hidden sm:block absolute top-1/2 -right-2 w-4 text-[#64748b] text-lg">→</div>}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Interactive Binary Converter ─── */
export function InteractiveBinaryConverter() {
  const [char, setChar] = useState('A');
  const ascii = char.charCodeAt(0);
  const binary = ascii.toString(2).padStart(8, '0');
  return (
    <motion.div whileHover={{ scale: 1.01 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-[#3b82f6]/[0.03] p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
        <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="inline-block">⚡</motion.span>
        Interactive ASCII → Binary Converter
      </h4>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center">
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-2">Type a Character</p>
          <input type="text" maxLength={1} value={char}
            onChange={(e) => setChar(e.target.value || 'A')}
            className="w-20 h-20 rounded-xl bg-[#0d1117] border-2 border-[#22c55e]/30 text-center text-4xl font-bold text-[#22c55e] focus:outline-none focus:border-[#22c55e] transition-colors font-mono" />
        </div>
        <div className="flex items-center gap-2">
          <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#22c55e] text-2xl font-bold">→</motion.div>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-2">ASCII Decimal</p>
          <motion.div key={ascii} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-xl bg-[#f59e0b]/[0.1] border-2 border-[#f59e0b]/30 flex items-center justify-center text-3xl font-bold text-[#f59e0b] font-mono">
            {ascii}
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="text-[#f59e0b] text-2xl font-bold">→</motion.div>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-2">8-bit Binary</p>
          <div className="flex gap-0.5">
            {binary.split('').map((bit, i) => (
              <motion.div key={`${char}-${i}`}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                className={`w-8 h-12 rounded-lg flex items-center justify-center text-lg font-bold font-mono border-2 ${
                  bit === '1' ? 'bg-[#22c55e]/20 border-[#22c55e]/40 text-[#22c55e]' : 'bg-white/[0.03] border-white/[0.1] text-[#475569]'
                }`}>
                {bit}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-[#64748b] mt-4 text-center italic">
        Try typing different characters! Each keystroke sends this exact binary pattern as electrical signals to the CPU.
      </p>
    </motion.div>
  );
}

/* ─── Voltage Threshold Diagram ─── */
export function VoltageThresholdDiagram() {
  const [voltage, setVoltage] = useState(3.5);
  const isOn = voltage >= 2.5;
  return (
    <motion.div whileHover={{ scale: 1.005 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
        <span>🔌</span> Why Binary Works — Voltage Threshold Visualization
      </h4>
      <p className="text-xs text-[#94a3b8] mb-5 leading-relaxed">
        Drag the slider to see how binary is noise-resistant. Even severely degraded signals are correctly interpreted.
      </p>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <input type="range" min="0" max="5" step="0.1" value={voltage}
            onChange={(e) => setVoltage(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(90deg, #ef4444 0%, #ef4444 50%, #22c55e 50%, #22c55e 100%)` }} />
          <div className="flex justify-between text-[10px] text-[#64748b] mt-1">
            <span>0V</span><span className="text-[#f59e0b] font-bold">2.5V threshold</span><span>5V</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">Signal</p>
            <motion.div key={voltage} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="text-3xl font-bold font-mono text-white">{voltage.toFixed(1)}V</motion.div>
          </div>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
            className="text-2xl">→</motion.div>
          <div className="text-center">
            <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">CPU Reads</p>
            <motion.div key={isOn ? 'on' : 'off'} initial={{ rotateY: 90 }} animate={{ rotateY: 0 }}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black border-2 ${
                isOn ? 'bg-[#22c55e]/20 border-[#22c55e]/50 text-[#22c55e]' : 'bg-[#ef4444]/20 border-[#ef4444]/50 text-[#ef4444]'
              }`}>
              {isOn ? '1' : '0'}
            </motion.div>
            <p className={`text-xs font-bold mt-1 ${isOn ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {isOn ? 'ON (HIGH)' : 'OFF (LOW)'}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-[#ef4444]/[0.06] border border-[#ef4444]/[0.15]">
          <p className="text-xs text-[#94a3b8]"><strong className="text-[#ef4444]">Base-10 Problem:</strong> If 4.5V arrives — is it 4 or 5? Hardware cannot tell. <strong className="text-white">Catastrophic data corruption.</strong></p>
        </div>
        <div className="p-3 rounded-lg bg-[#22c55e]/[0.06] border border-[#22c55e]/[0.15]">
          <p className="text-xs text-[#94a3b8]"><strong className="text-[#22c55e]">Binary Solution:</strong> 4.5V is clearly above 2.5V threshold → definitely <strong className="text-white">1 (ON)</strong>. Zero ambiguity!</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Determinism Domino Demo ─── */
export function DeterminismDemo() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const runCalc = () => {
    setRunning(true);
    setResults([]);
    let i = 0;
    const id = setInterval(() => {
      setResults(prev => [...prev, 5]);
      i++;
      if (i >= 10) { clearInterval(id); setRunning(false); }
    }, 200);
  };
  return (
    <motion.div whileHover={{ scale: 1.005 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🎯</span> Determinism in Action — The Domino Effect
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        Click to compute 2 + 3 ten times. Watch: the result is <strong className="text-white">always 5</strong> — no deviation, no hesitation, no error. This is deterministic behavior.
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        <button onClick={runCalc} disabled={running}
          className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
          style={{ background: running ? '#475569' : PHASE_COLOR, color: '#000' }}>
          {running ? 'Computing...' : '▶ Run   2 + 3   ×10'}
        </button>
        <div className="flex gap-1.5 flex-wrap">
          {results.map((r, i) => (
            <motion.div key={i}
              initial={{ scale: 0, rotateZ: -90 }}
              animate={{ scale: 1, rotateZ: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 rounded-lg bg-[#22c55e]/20 border border-[#22c55e]/30 flex items-center justify-center text-sm font-bold text-[#22c55e] font-mono">
              {r}
            </motion.div>
          ))}
        </div>
      </div>
      {results.length === 10 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs text-[#22c55e] mt-3 font-semibold">
          ✅ 10/10 identical results. Zero deviation. This is why computers are reliable — pure determinism.
        </motion.p>
      )}
    </motion.div>
  );
}

/* ─── CPU Cache Visual ─── */
export function CPUCacheVisual() {
  const [hoveredType, setHoveredType] = useState<'array' | 'linked' | null>(null);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-4">🚀 CPU Cache Hit vs Miss — Visual Comparison</h4>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          onHoverStart={() => setHoveredType('array')}
          onHoverEnd={() => setHoveredType(null)}
          className="rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/[0.04] p-4">
          <h5 className="text-[#22c55e] font-bold text-sm mb-3">✅ Array (Contiguous Memory)</h5>
          <div className="flex gap-0.5 mb-3 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i}
                animate={hoveredType === 'array' ? {
                  backgroundColor: ['rgba(34,197,94,0.1)', 'rgba(34,197,94,0.4)', 'rgba(34,197,94,0.1)'],
                  borderColor: ['rgba(34,197,94,0.2)', 'rgba(34,197,94,0.8)', 'rgba(34,197,94,0.2)'],
                } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="w-10 h-10 rounded border border-[#22c55e]/20 bg-[#22c55e]/10 flex items-center justify-center text-xs font-mono text-[#22c55e]">
                D{i}
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] text-[#94a3b8] leading-relaxed">
            Data stored side-by-side → CPU grabs entire chunk into cache → <strong className="text-[#22c55e]">Cache HIT every time</strong> → Blazing fast sequential access
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-[#22c55e]/20 overflow-hidden">
              <motion.div className="h-full bg-[#22c55e] rounded-full"
                initial={{ width: 0 }} whileInView={{ width: '95%' }} viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }} />
            </div>
            <span className="text-xs text-[#22c55e] font-bold">95%</span>
          </div>
        </motion.div>

        <motion.div
          onHoverStart={() => setHoveredType('linked')}
          onHoverEnd={() => setHoveredType(null)}
          className="rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/[0.04] p-4">
          <h5 className="text-[#ef4444] font-bold text-sm mb-3">❌ Linked List (Scattered Memory)</h5>
          <div className="flex gap-0.5 mb-3 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i}
                animate={hoveredType === 'linked' ? {
                  backgroundColor: ['rgba(239,68,68,0.1)', i % 3 === 0 ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.05)', 'rgba(239,68,68,0.1)'],
                } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`w-10 h-10 rounded border flex items-center justify-center text-xs font-mono ${
                  i % 3 === 0 ? 'border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]' : 'border-white/[0.06] bg-white/[0.02] text-[#475569]'
                }`}>
                {i % 3 === 0 ? `D${Math.floor(i/3)}` : '??'}
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] text-[#94a3b8] leading-relaxed">
            Data scattered across RAM → CPU cache grabs wrong chunks → <strong className="text-[#ef4444]">Cache MISS repeatedly</strong> → Must fetch from slow RAM each time
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-[#ef4444]/20 overflow-hidden">
              <motion.div className="h-full bg-[#ef4444] rounded-full"
                initial={{ width: 0 }} whileInView={{ width: '25%' }} viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }} />
            </div>
            <span className="text-xs text-[#ef4444] font-bold">25%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Music Box vs Computer 3D Flip ─── */
export function MusicBoxVsComputer() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer select-none" onClick={() => setFlipped(!flipped)}>
      <p className="text-xs text-[#64748b] mb-2 text-center">👆 Click to flip and compare</p>
      <div className="relative h-52 rounded-2xl" style={{ perspective: 1200 }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute inset-0">
          {/* Front - Music Box */}
          <div className="absolute inset-0 rounded-2xl border border-[#f59e0b]/20 bg-gradient-to-br from-[#f59e0b]/[0.08] to-transparent p-6 flex flex-col justify-center"
            style={{ backfaceVisibility: 'hidden' }}>
            <h4 className="text-2xl font-bold text-[#f59e0b] mb-2">🎵 Fixed-Function Machine</h4>
            <h5 className="text-white font-semibold mb-3">The Mechanical Music Box</h5>
            <p className="text-sm text-[#b0bec5] leading-relaxed">
              Internal brass cylinder with unalterable metal pins. Plays ONE predefined melody. To hear a different song?
              You must <strong className="text-white">physically dismantle the machine</strong> and forge a new cylinder.
            </p>
            <p className="text-[10px] text-[#64748b] mt-2 italic">Hardware = Function. Change function = rebuild hardware.</p>
          </div>
          {/* Back - Computer */}
          <div className="absolute inset-0 rounded-2xl border border-[#22c55e]/20 bg-gradient-to-br from-[#22c55e]/[0.08] to-transparent p-6 flex flex-col justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <h4 className="text-2xl font-bold text-[#22c55e] mb-2">💻 Programmable Machine</h4>
            <h5 className="text-white font-semibold mb-3">The Modern Computer</h5>
            <p className="text-sm text-[#b0bec5] leading-relaxed">
              Same physical silicon chip acts as TV, GPS, trading terminal, communication device, and game console.
              Hardware stays <strong className="text-white">100% static</strong> — only the <strong className="text-white">software instructions</strong> change.
            </p>
            <p className="text-[10px] text-[#64748b] mt-2 italic">Hardware = Universal Canvas. Software = Infinite Configurations.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Animated Step-by-Step Flow ─── */
export function StepByStepFlow({ steps, color = PHASE_COLOR }: { steps: { title: string; desc: string }[]; color?: string }) {
  return (
    <div className="relative pl-8 space-y-4 my-4">
      <div className="absolute left-3 top-2 bottom-2 w-[2px]" style={{ backgroundColor: `${color}20` }} />
      {steps.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}>
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: i * 0.3, duration: 1.5, repeat: Infinity }}
              className="absolute left-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: color, backgroundColor: `${color}20`, marginTop: 2 }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            </motion.div>
            <div className="ml-2">
              <span className="text-white font-semibold text-sm">{s.title}</span>
              <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Glowing Gradient Text ─── */
export function GlowText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 5, repeat: Infinity }}
      className={`bg-gradient-to-r from-[#22c55e] via-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent bg-[length:200%_200%] ${className}`}
    >
      {children}
    </motion.span>
  );
}

/* ─── Animated Counter ─── */
export function AnimatedCounter({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const inc = target / 60;
    const id = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="text-center">
      <motion.span className="text-3xl sm:text-4xl font-black text-white block"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {count.toLocaleString()}{suffix}
      </motion.span>
      <span className="text-xs text-[#64748b] uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ─── Pulsing Connection Dot ─── */
export function PulsingDot({ color = PHASE_COLOR }: { color?: string }) {
  return (
    <span className="relative inline-flex h-3 w-3">
      <motion.span animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: color }} />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NEW ENHANCED COMPONENTS — Added for massive detail upgrade
   ═══════════════════════════════════════════════════════════════ */

/* ─── Transistor Animation — ON/OFF Toggle ─── */
export function TransistorAnimation() {
  const [isOn, setIsOn] = useState(false);
  return (
    <motion.div whileHover={{ scale: 1.005 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#a855f7]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>⚡</span> Transistor — The Microscopic Switch (Billions Inside Your CPU)
      </h4>
      <p className="text-xs text-[#94a3b8] mb-5 leading-relaxed">
        A transistor is an incredibly tiny electronic switch. It has only two states: <strong className="text-white">ON</strong> (electricity flows = 1) and <strong className="text-white">OFF</strong> (electricity blocked = 0). Click to toggle the transistor and watch the electricity flow.
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {/* Gate */}
        <div className="text-center">
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-2">Gate Signal</p>
          <motion.button onClick={() => setIsOn(!isOn)}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-3xl font-black transition-all duration-300 cursor-pointer ${
              isOn ? 'bg-[#22c55e]/20 border-[#22c55e]/60 text-[#22c55e] shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                   : 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
            }`}>
            {isOn ? 'ON' : 'OFF'}
          </motion.button>
          <p className="text-[10px] text-[#64748b] mt-1">Click to toggle</p>
        </div>
        {/* Flow Arrow */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={isOn ? { x: [0, 12, 0], opacity: [0.5, 1, 0.5] } : { opacity: 0.2 }}
            transition={{ duration: 0.8, repeat: isOn ? Infinity : 0 }}
            className="flex items-center gap-1">
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                animate={isOn ? { backgroundColor: ['#22c55e', '#4ade80', '#22c55e'] } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, repeat: Infinity }}
                className={`w-3 h-3 rounded-full ${isOn ? 'bg-[#22c55e]' : 'bg-[#334155]'}`} />
            ))}
            <span className={`text-xl font-bold ${isOn ? 'text-[#22c55e]' : 'text-[#334155]'}`}>→</span>
          </motion.div>
          <span className="text-[9px] text-[#64748b]">{isOn ? 'Electricity Flowing' : 'Blocked'}</span>
        </div>
        {/* Output */}
        <div className="text-center">
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-2">Binary Output</p>
          <motion.div
            key={isOn ? 'bit1' : 'bit0'}
            initial={{ rotateY: 90, scale: 0.8 }} animate={{ rotateY: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl font-black ${
              isOn ? 'bg-[#22c55e]/20 border-[#22c55e]/60 text-[#22c55e] shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                   : 'bg-white/[0.03] border-white/[0.1] text-[#475569]'
            }`}>
            {isOn ? '1' : '0'}
          </motion.div>
          <p className={`text-xs font-bold mt-1 ${isOn ? 'text-[#22c55e]' : 'text-[#475569]'}`}>
            {isOn ? 'HIGH Voltage' : 'LOW Voltage'}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <p className="text-[#a855f7] font-bold text-lg">~15B</p>
          <p className="text-[9px] text-[#64748b]">Transistors in Apple M2 chip</p>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <p className="text-[#3b82f6] font-bold text-lg">3nm</p>
          <p className="text-[9px] text-[#64748b]">Size of latest transistors</p>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
          <p className="text-[#22c55e] font-bold text-lg">5 GHz</p>
          <p className="text-[9px] text-[#64748b]">Switching speed per second</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Universal Turing Machine Concept ─── */
export function UniversalTuringMachine() {
  const [activeApp, setActiveApp] = useState(0);
  const apps = [
    { name: 'Calculator', icon: '🔢', desc: 'Arithmetic operations on numbers', output: '5 + 3 = 8' },
    { name: 'Music Player', icon: '🎵', desc: 'Decode audio files, drive speakers', output: '♫ Playing: Beethoven' },
    { name: 'Camera', icon: '📷', desc: 'Capture light, process pixels', output: '📸 Photo saved!' },
    { name: 'GPS Navigator', icon: '🗺️', desc: 'Triangulate satellite signals', output: '→ Turn left in 200m' },
    { name: 'Video Game', icon: '🎮', desc: 'Real-time 3D rendering + physics', output: '🏆 Score: 1500' },
  ];
  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.05] to-[#a855f7]/[0.03] p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🖥️</span> Universal Turing Machine — Same Hardware, Infinite Functions
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        A computer is a <strong className="text-white">Universal Turing Machine</strong> — given enough time and memory, it can simulate any other machine. Click each app to see the <strong className="text-white">same silicon chip</strong> perform completely different tasks.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {apps.map((app, i) => (
          <motion.button key={i}
            onClick={() => setActiveApp(i)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeApp === i
                ? 'border-[#22c55e]/50 bg-[#22c55e]/15 text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8] hover:border-white/[0.15]'
            }`}>
            <span className="text-base">{app.icon}</span> {app.name}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={activeApp}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="rounded-xl border border-[#22c55e]/20 bg-[#0d1117] p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center text-xl">
            {apps[activeApp].icon}
          </div>
          <div>
            <p className="text-white font-bold text-sm">{apps[activeApp].name}</p>
            <p className="text-[10px] text-[#64748b]">{apps[activeApp].desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-8 rounded-lg bg-[#22c55e]/[0.08] border border-[#22c55e]/20 flex items-center px-3">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#22c55e] font-mono text-xs">{apps[activeApp].output}</motion.span>
          </div>
        </div>
        <p className="text-[10px] text-[#475569] mt-3 italic text-center">
          Same CPU • Same RAM • Same Silicon • Different Software Instructions = Different Machine
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Human vs Machine Comparison Table (Animated) ─── */
export function HumanVsMachineTable() {
  const rows = [
    { attribute: 'Instruction Interpretation', human: 'Contextual and intuitive — fills missing details using common sense', machine: 'Literal and absolute — executes exactly what is written, nothing more', humanIcon: '🧠', machineIcon: '🤖' },
    { attribute: 'Error Handling', human: 'Adapts to ambiguity — reads misspelled words and understands intent', machine: 'Fails completely — even slight syntax deviation causes total failure', humanIcon: '🔄', machineIcon: '💥' },
    { attribute: 'Consistency', human: 'Prone to fatigue, emotions, cognitive bias causing variable outputs', machine: 'Flawless consistency over infinite repetitions — deterministic', humanIcon: '😓', machineIcon: '✅' },
    { attribute: 'Learning', human: 'Generalizes broad concepts from few examples effortlessly', machine: 'Requires billions of data points and explicit brute-force programming', humanIcon: '💡', machineIcon: '📊' },
    { attribute: 'Speed', human: 'Processes ~50 bits/sec consciously — slow but highly creative', machine: 'Processes billions of operations/sec — fast but zero creativity', humanIcon: '🐢', machineIcon: '⚡' },
    { attribute: 'Context', human: 'Massive implicit background knowledge from life experience', machine: 'Zero background knowledge — only knows what it is explicitly told', humanIcon: '🌍', machineIcon: '📋' },
  ];
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden backdrop-blur-sm">
      <div className="bg-gradient-to-r from-[#3b82f6]/10 to-[#ef4444]/10 px-5 py-3 border-b border-white/[0.06]">
        <h4 className="text-white font-bold text-sm flex items-center gap-2">
          <span>⚔️</span> Human Cognition vs Machine Execution — Complete Comparison
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#94a3b8] border-b border-white/[0.06]">Attribute</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#3b82f6] border-b border-white/[0.06]">🧠 Human</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#ef4444] border-b border-white/[0.06]">🤖 Machine</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                <td className="px-4 py-3.5 text-white font-semibold text-xs">{row.attribute}</td>
                <td className="px-4 py-3.5 text-[#b0bec5] text-xs leading-relaxed">
                  <span className="mr-1.5">{row.humanIcon}</span>{row.human}
                </td>
                <td className="px-4 py-3.5 text-[#b0bec5] text-xs leading-relaxed">
                  <span className="mr-1.5">{row.machineIcon}</span>{row.machine}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Memory Segment Diagram ─── */
export function MemorySegmentDiagram() {
  const segments = [
    { name: 'Stack', desc: 'Function calls, local variables, return addresses. Grows downward. LIFO order. Automatically managed.', color: '#22c55e', size: '15%', icon: '📚' },
    { name: '↓ Free Space ↑', desc: 'Unallocated memory between Stack and Heap. Grows/shrinks as stack and heap expand.', color: '#475569', size: '30%', icon: '🔲' },
    { name: 'Heap', desc: 'Dynamic memory (malloc/free). Grows upward. Manually managed by the programmer. Memory leaks happen here.', color: '#f59e0b', size: '20%', icon: '🏗️' },
    { name: 'BSS Segment', desc: 'Uninitialized global/static variables. Automatically zeroed by the OS at program start.', color: '#a855f7', size: '10%', icon: '0️⃣' },
    { name: 'Data Segment', desc: 'Initialized global/static variables. Values set at compile time. Read-write segment.', color: '#3b82f6', size: '10%', icon: '📦' },
    { name: 'Text Segment', desc: 'Compiled machine code instructions (the actual program). Read-only — CPU executes from here.', color: '#ef4444', size: '15%', icon: '📜' },
  ];
  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🧱</span> Program Memory Layout — How RAM is Organized for Your C Program
      </h4>
      <p className="text-xs text-[#94a3b8] mb-5 leading-relaxed">
        When the OS Loader places your program into RAM, it organizes memory into strict segments. Understanding this layout is critical for debugging <strong className="text-white">segmentation faults</strong> and <strong className="text-white">memory leaks</strong>.
      </p>
      <div className="flex flex-col gap-1.5 max-w-lg mx-auto">
        <div className="text-center text-[10px] text-[#64748b] mb-1">High Memory Address (0xFFFF...)</div>
        {segments.map((seg, i) => (
          <motion.div key={seg.name}
            initial={{ opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="rounded-xl border p-3.5 flex items-center gap-3 cursor-default transition-all"
            style={{ borderColor: `${seg.color}30`, background: `${seg.color}08` }}>
            <span className="text-xl">{seg.icon}</span>
            <div className="flex-1">
              <span className="text-sm font-bold" style={{ color: seg.color }}>{seg.name}</span>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed mt-0.5">{seg.desc}</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${seg.color}15`, color: seg.color }}>{seg.size}</span>
          </motion.div>
        ))}
        <div className="text-center text-[10px] text-[#64748b] mt-1">Low Memory Address (0x0000...)</div>
      </div>
    </motion.div>
  );
}

/* ─── Execution Flow Animator — Instruction Pointer ─── */
export function ExecutionFlowAnimator() {
  const [currentLine, setCurrentLine] = useState(-1);
  const [output, setOutput] = useState<string[]>([]);
  const lines = [
    { code: '#include <stdio.h>', comment: 'Preprocessor copies stdio.h contents', type: 'preprocessor' },
    { code: '', comment: '', type: 'blank' },
    { code: 'int main(void) {', comment: 'OS points instruction pointer HERE', type: 'function' },
    { code: '    int x = 5;', comment: 'Reserve 4 bytes → store binary of 5', type: 'variable' },
    { code: '    int y = 10;', comment: 'Reserve 4 more bytes → store binary of 10', type: 'variable' },
    { code: '    int sum = x + y;', comment: 'ALU adds → store result (15) in new 4 bytes', type: 'operation' },
    { code: '    printf("%d\\n", sum);', comment: 'Convert 15 → ASCII → pixels on screen', type: 'output' },
    { code: '    return 0;', comment: 'Signal OS: "Success, no errors"', type: 'return' },
    { code: '}', comment: 'Scope ends — all variables freed', type: 'scope' },
  ];
  const outputMessages = ['', '', 'IP → main() entry point', 'Allocated: x = 5 at 0x1000', 'Allocated: y = 10 at 0x1004', 'ALU: 5 + 10 = 15 → sum at 0x1008', 'Output: 15', 'Exit code: 0', 'Program terminated'];

  const runExecution = () => {
    setCurrentLine(-1);
    setOutput([]);
    let i = 0;
    const id = setInterval(() => {
      setCurrentLine(i);
      if (outputMessages[i]) {
        setOutput(prev => [...prev, outputMessages[i]]);
      }
      i++;
      if (i >= lines.length) { clearInterval(id); }
    }, 700);
  };

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className="text-white font-bold text-sm flex items-center gap-2">
          <span>▶️</span> Instruction Pointer — Watch the CPU Execute Line by Line
        </h4>
        <motion.button onClick={runExecution}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs cursor-pointer">
          ▶ Run Program
        </motion.button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#0d1117] border border-white/[0.08] overflow-hidden">
          <div className="px-3 py-2 bg-[#1e1e2e] border-b border-white/[0.06] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] text-[#64748b]">program.c</span>
          </div>
          <div className="p-3 font-mono text-xs space-y-0.5">
            {lines.map((line, i) => (
              <motion.div key={i}
                animate={currentLine === i ? { backgroundColor: 'rgba(34,197,94,0.15)', x: 2 } : { backgroundColor: 'transparent', x: 0 }}
                className="flex items-center gap-2 px-2 py-1 rounded transition-all">
                <span className="text-[#475569] w-4 text-right text-[10px]">{i + 1}</span>
                {currentLine === i && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#22c55e] text-[10px]">→</motion.span>}
                <span className={`${currentLine === i ? 'text-[#22c55e]' : 'text-[#b0bec5]'} ${line.type === 'preprocessor' ? 'text-[#c586c0]' : ''}`}>
                  {line.code}
                </span>
                {currentLine === i && line.comment && (
                  <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] text-[#f59e0b] ml-auto whitespace-nowrap hidden lg:inline">
                    // {line.comment}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-[#0d1117] border border-white/[0.08] overflow-hidden">
          <div className="px-3 py-2 bg-[#1e1e2e] border-b border-white/[0.06]">
            <span className="text-[10px] text-[#64748b]">CPU Execution Log</span>
          </div>
          <div className="p-3 font-mono text-xs space-y-1 min-h-[200px]">
            {output.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="text-[#22c55e] flex items-center gap-1.5">
                <span className="text-[#475569]">[{i}]</span> {msg}
              </motion.div>
            ))}
            {output.length === 0 && <p className="text-[#334155] italic">Click "Run Program" to watch...</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Error Type Comparison — 4 Error Types ─── */
export function ErrorTypeComparison() {
  const [activeError, setActiveError] = useState(0);
  const errors = [
    {
      type: 'Syntax Error', phase: 'Compilation', icon: '📝', color: '#f59e0b',
      desc: 'Grammar violation — missing semicolons, unclosed braces, misspelled keywords. Compiler immediately halts and refuses to proceed.',
      code: 'printf("Hello")  // ❌ Missing semicolon!\nreturn 0;',
      fix: 'Add the missing semicolon after the printf statement.',
    },
    {
      type: 'Semantic Error', phase: 'Compilation', icon: '🔤', color: '#a855f7',
      desc: 'Grammar is correct but logic violates language rules — assigning a string to an integer, type mismatches. Compiler understands but refuses.',
      code: 'int x = "hello";  // ❌ Type mismatch!\n// Cannot assign string to integer',
      fix: 'Use compatible types: int x = 42; or char* x = "hello";',
    },
    {
      type: 'Linker Error', phase: 'Linking', icon: '🔗', color: '#3b82f6',
      desc: 'Code compiles to .o file, but Linker cannot find referenced functions or libraries. E.g., typo in function name (print instead of printf).',
      code: 'print("Hello");  // ❌ print not found!\n// Linker searches libraries, fails',
      fix: 'Use the correct function name: printf("Hello");',
    },
    {
      type: 'Runtime Error', phase: 'Execution', icon: '💥', color: '#ef4444',
      desc: 'Compiles and links successfully, but crashes during CPU execution — division by zero, null pointer access, buffer overflow, stack overflow.',
      code: 'int x = 10 / 0;  // 💥 CPU CRASH!\n// Math unit cannot divide by zero',
      fix: 'Add a guard: if (y != 0) { result = x / y; }',
    },
  ];
  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
        <span>🐛</span> The Four Types of Programming Errors — Complete Breakdown
      </h4>
      <div className="flex flex-wrap gap-2 mb-5">
        {errors.map((err, i) => (
          <motion.button key={i} onClick={() => setActiveError(i)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
              activeError === i
                ? `shadow-lg`
                : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}
            style={activeError === i ? { borderColor: `${err.color}50`, background: `${err.color}15`, color: err.color } : {}}>
            <span>{err.icon}</span> {err.type}
          </motion.button>
        ))}
      </div>
      <motion.div key={activeError}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border" style={{ borderColor: `${errors[activeError].color}20`, background: `${errors[activeError].color}06` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{errors[activeError].icon}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: errors[activeError].color }}>{errors[activeError].type}</p>
                <p className="text-[10px] text-[#64748b]">Detected during: {errors[activeError].phase} phase</p>
              </div>
            </div>
            <p className="text-xs text-[#b0bec5] leading-relaxed mb-3">{errors[activeError].desc}</p>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-[#64748b] mb-1 uppercase tracking-wider">💡 How to Fix</p>
              <p className="text-xs text-[#22c55e]">{errors[activeError].fix}</p>
            </div>
          </div>
          <div className="rounded-xl bg-[#0d1117] border border-white/[0.08] overflow-hidden">
            <div className="px-3 py-2 bg-[#1e1e2e] border-b border-white/[0.06] flex items-center gap-2">
              <span className="text-[10px]" style={{ color: errors[activeError].color }}>{errors[activeError].icon}</span>
              <span className="text-[10px] text-[#64748b]">{errors[activeError].type} Example</span>
            </div>
            <pre className="p-4 text-xs font-mono text-[#b0bec5] leading-relaxed whitespace-pre-wrap">{errors[activeError].code}</pre>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Data Size Visualizer ─── */
export function DataSizeVisualizer() {
  const [activeType, setActiveType] = useState(0);
  const types = [
    { name: 'char', bytes: 1, bits: 8, color: '#22c55e', example: "'A'", binary: '01000001', range: '-128 to 127', desc: 'Single character or small integer. Maps directly to ASCII table values.' },
    { name: 'int', bytes: 4, bits: 32, color: '#3b82f6', example: '42', binary: '00000000 00000000 00000000 00101010', range: '-2.1B to +2.1B', desc: 'Standard integer for whole numbers. Most commonly used data type in C.' },
    { name: 'float', bytes: 4, bits: 32, color: '#f59e0b', example: '3.14', binary: '01000000 01001000 11110101 11000011', range: '±3.4 × 10³⁸', desc: 'Single-precision floating point. 6-7 significant decimal digits accuracy.' },
    { name: 'double', bytes: 8, bits: 64, color: '#a855f7', example: '3.14159265', binary: '01000000 00001001 00100001 11111011...', range: '±1.7 × 10³⁰⁸', desc: 'Double-precision floating point. 15-16 significant digits. Used for scientific calculations.' },
    { name: 'pointer', bytes: 8, bits: 64, color: '#ef4444', example: '0x7FFF1024', binary: '00000000 00000000 01111111 11111111...', range: 'Full 64-bit space', desc: 'Stores a memory address. On 64-bit systems, always 8 bytes regardless of what it points to.' },
  ];
  const active = types[activeType];
  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>📐</span> Data Size Visualizer — See How Much Memory Each Type Consumes
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">Click each type to see its memory footprint at the <strong className="text-white">bit level</strong>.</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {types.map((t, i) => (
          <motion.button key={i} onClick={() => setActiveType(i)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-all ${
              activeType === i ? 'shadow-lg' : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}
            style={activeType === i ? { borderColor: `${t.color}50`, background: `${t.color}15`, color: t.color } : {}}>
            {t.name}
          </motion.button>
        ))}
      </div>
      <motion.div key={activeType} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color: active.color }}>{active.bytes}</p>
            <p className="text-[10px] text-[#64748b]">{active.bytes === 1 ? 'Byte' : 'Bytes'}</p>
          </div>
          <div className="text-[#475569] text-xl">=</div>
          <div className="text-center">
            <p className="text-4xl font-black text-white">{active.bits}</p>
            <p className="text-[10px] text-[#64748b]">Bits</p>
          </div>
          <div className="text-[#475569] text-xl">=</div>
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color: active.color }}>{active.bytes}</p>
            <p className="text-[10px] text-[#64748b]">Memory Boxes</p>
          </div>
        </div>
        <div className="flex gap-0.5 flex-wrap mb-4 justify-center">
          {Array.from({ length: active.bytes }).map((_, i) => (
            <motion.div key={i}
              initial={{ scale: 0, rotateZ: -45 }}
              animate={{ scale: 1, rotateZ: 0 }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              className="w-12 h-14 rounded-lg border flex flex-col items-center justify-center"
              style={{ borderColor: `${active.color}40`, background: `${active.color}10` }}>
              <span className="text-[8px] font-mono" style={{ color: `${active.color}80` }}>0x{(1000 + i).toString(16)}</span>
              <span className="text-xs font-bold font-mono" style={{ color: active.color }}>byte {i}</span>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] text-[#64748b]">Example</p>
            <p className="text-xs font-mono font-bold" style={{ color: active.color }}>{active.example}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] text-[#64748b]">Range</p>
            <p className="text-xs font-bold text-white">{active.range}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] col-span-2">
            <p className="text-[10px] text-[#64748b]">Description</p>
            <p className="text-[11px] text-[#94a3b8]">{active.desc}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── C Language Historical Timeline ─── */
export function CLanguageTimeline() {
  const events = [
    { year: '1969', title: 'UNIX Born', desc: 'Ken Thompson creates UNIX OS at Bell Labs in Assembly language. Extremely difficult to maintain and port.', color: '#64748b' },
    { year: '1972', title: 'C Language Created', desc: 'Dennis Ritchie creates C at Bell Labs specifically to rewrite UNIX. C provides high-level syntax with low-level power.', color: '#22c55e', highlight: true },
    { year: '1978', title: 'K&R C Published', desc: 'Kernighan & Ritchie publish "The C Programming Language" — the definitive reference book that standardized C worldwide.', color: '#3b82f6' },
    { year: '1989', title: 'ANSI C (C89)', desc: 'The American National Standards Institute standardizes C. Also known as C90. First official standardization.', color: '#f59e0b' },
    { year: '1999', title: 'C99 Standard', desc: 'Major update adding inline functions, variable-length arrays, // comments, and new data types (long long).', color: '#a855f7' },
    { year: '2011', title: 'C11 Standard', desc: 'Adds multi-threading support, anonymous structures, improved Unicode support, and atomic operations.', color: '#ef4444' },
    { year: '2023', title: 'C23 (Latest)', desc: 'Latest revision adding nullptr, typeof, improved attributes, binary literals, and modern safety features.', color: '#06b6d4' },
    { year: 'Today', title: 'C Powers Everything', desc: 'Linux kernel, Windows kernel, macOS kernel, databases (SQLite, PostgreSQL), game engines, embedded systems — all built in C.', color: '#22c55e' },
  ];
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-5 flex items-center gap-2">
        <span>📜</span> C Language — A History of Power (1972 to Today)
      </h4>
      <div className="relative pl-8 space-y-4">
        <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#64748b] via-[#22c55e] to-[#06b6d4]" />
        {events.map((ev, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}>
            <div className="flex items-start gap-3 relative">
              <motion.div
                animate={ev.highlight ? { scale: [1, 1.3, 1], boxShadow: [`0 0 0 ${ev.color}`, `0 0 15px ${ev.color}`, `0 0 0 ${ev.color}`] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-[-22px] w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: ev.color, backgroundColor: `${ev.color}20` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ev.color }} />
              </motion.div>
              <div className="ml-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black px-2 py-0.5 rounded-md" style={{ background: `${ev.color}15`, color: ev.color }}>{ev.year}</span>
                  <span className="text-white font-semibold text-sm">{ev.title}</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">{ev.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Printf Under The Hood — Step-by-Step ─── */
export function PrintfUnderTheHood() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: 'Step 1: String Processing',
      desc: 'printf receives the format string "Hello\\n". It scans character by character. When it encounters \\n, it resolves it to ASCII decimal 10 (Line Feed). The entire string is assembled into a temporary memory buffer.',
      visual: '"H" → 72 | "e" → 101 | "l" → 108 | "l" → 108 | "o" → 111 | "\\n" → 10',
      icon: '📝', color: '#3b82f6',
    },
    {
      title: 'Step 2: System Call',
      desc: 'The C standard library issues a low-level system call (write() on Linux, WriteFile() on Windows). This crosses the security boundary from User Space into Kernel Space, passing the buffer to the OS kernel.',
      visual: 'User Space → syscall(write, fd=1, buffer, 6) → Kernel Space',
      icon: '🔐', color: '#f59e0b',
    },
    {
      title: 'Step 3: Device Driver',
      desc: 'The kernel communicates with the graphics card\'s device driver (GPU driver). The driver receives the character data and prepares to send raw electrical signals to the monitor hardware.',
      visual: 'Kernel → GPU Driver → Frame Buffer → Display Controller',
      icon: '🖥️', color: '#a855f7',
    },
    {
      title: 'Step 4: Pixel Illumination',
      desc: 'The display controller selectively illuminates specific physical pixels on the screen. Each character is rendered by activating thousands of tiny LED/LCD pixels in specific patterns defined by the active font file.',
      visual: 'Electrical signals → Pixel matrix → "Hello" appears on screen ✨',
      icon: '💡', color: '#22c55e',
    },
  ];
  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🔍</span> Under the Hood of printf("Hello\n") — What Actually Happens
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        This &quot;simple&quot; one-line command triggers a <strong className="text-white">4-layer cascade</strong> from your source code to actual photons hitting your eyes:
      </p>
      <div className="flex gap-2 mb-5 flex-wrap">
        {steps.map((s, i) => (
          <motion.button key={i} onClick={() => setActiveStep(i)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
              activeStep === i ? 'shadow-lg' : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}
            style={activeStep === i ? { borderColor: `${s.color}50`, background: `${s.color}15`, color: s.color } : {}}>
            <span>{s.icon}</span> Step {i + 1}
          </motion.button>
        ))}
      </div>
      <motion.div key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="rounded-xl p-5 border"
        style={{ borderColor: `${steps[activeStep].color}20`, background: `${steps[activeStep].color}06` }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{steps[activeStep].icon}</span>
          <div>
            <p className="text-white font-bold text-sm">{steps[activeStep].title}</p>
          </div>
        </div>
        <p className="text-[#b0bec5] text-xs leading-[1.9] mb-4">{steps[activeStep].desc}</p>
        <div className="rounded-lg bg-[#0d1117] border border-white/[0.08] p-3">
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">Execution Flow</p>
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-mono leading-relaxed" style={{ color: steps[activeStep].color }}>
            {steps[activeStep].visual}
          </motion.p>
        </div>
      </motion.div>
      <div className="mt-4 flex items-center justify-center gap-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm border"
              style={{ borderColor: `${s.color}40`, background: `${s.color}15` }}>
              {s.icon}
            </div>
            {i < 3 && (
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="mx-1 text-[#475569]">→</motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEEP ENHANCEMENT COMPONENTS — Added for maximum detail
   ═══════════════════════════════════════════════════════════════ */

/* ─── Variable Anatomy Visualizer — Interactive 3D Anatomy ─── */
export function VariableAnatomyVisualizer() {
  const [varName, setVarName] = useState('playerAge');
  const [varValue, setVarValue] = useState('25');
  const [varType, setVarType] = useState('int');

  const typeInfo: Record<string, { bytes: number; color: string; binary: string }> = {
    'int': { bytes: 4, color: '#3b82f6', binary: '00000000 00000000 00000000 00011001' },
    'char': { bytes: 1, color: '#22c55e', binary: '01000001' },
    'float': { bytes: 4, color: '#f59e0b', binary: '01000001 11001000 00000000 00000000' },
    'double': { bytes: 8, color: '#a855f7', binary: '01000000 00111001 00000000 00000000...' },
  };

  const info = typeInfo[varType] || typeInfo['int'];

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-[#3b82f6]/[0.03] p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🧬</span> Variable Anatomy Lab — Build Your Own Variable
      </h4>
      <p className="text-xs text-[#94a3b8] mb-5 leading-relaxed">
        Every variable in C is a <strong className="text-white">4-component container</strong>. Experiment below to see how changing any property affects the underlying memory representation.
      </p>

      <div className="grid md:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-[10px] text-[#64748b] uppercase tracking-wider block mb-1">Variable Name</label>
          <input type="text" value={varName} onChange={e => setVarName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0d1117] border border-white/[0.1] text-white text-sm font-mono focus:outline-none focus:border-[#22c55e]/50" />
        </div>
        <div>
          <label className="text-[10px] text-[#64748b] uppercase tracking-wider block mb-1">Data Type</label>
          <select value={varType} onChange={e => setVarType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0d1117] border border-white/[0.1] text-white text-sm font-mono focus:outline-none focus:border-[#22c55e]/50">
            <option value="int">int (4 bytes)</option>
            <option value="char">char (1 byte)</option>
            <option value="float">float (4 bytes)</option>
            <option value="double">double (8 bytes)</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] text-[#64748b] uppercase tracking-wider block mb-1">Value</label>
          <input type="text" value={varValue} onChange={e => setVarValue(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0d1117] border border-white/[0.1] text-white text-sm font-mono focus:outline-none focus:border-[#22c55e]/50" />
        </div>
      </div>

      <div className="rounded-xl bg-[#0d1117] border border-white/[0.08] p-4">
        <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-3">C Declaration</p>
        <p className="text-sm font-mono mb-4">
          <span style={{ color: info.color }}>{varType}</span>{' '}
          <span className="text-[#22c55e]">{varName || 'x'}</span>{' '}
          <span className="text-[#64748b]">=</span>{' '}
          <span className="text-[#f59e0b]">{varValue || '0'}</span>
          <span className="text-[#64748b]">;</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[
          { label: 'Name (Identifier)', value: varName || 'x', color: '#22c55e', desc: 'Human-readable label' },
          { label: 'Address (Identity)', value: '0x7FFF1024', color: '#3b82f6', desc: 'Fixed RAM location' },
          { label: 'Value (Content)', value: varValue || '0', color: '#f59e0b', desc: 'Transient data inside' },
          { label: 'Type (Blueprint)', value: `${varType} (${info.bytes}B)`, color: '#a855f7', desc: `Reserves ${info.bytes} bytes` },
        ].map((item, i) => (
          <motion.div key={item.label}
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -3 }}
            className="rounded-xl p-3 border text-center"
            style={{ borderColor: `${item.color}30`, background: `${item.color}08` }}>
            <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: `${item.color}90` }}>{item.label}</p>
            <p className="text-sm font-bold font-mono" style={{ color: item.color }}>{item.value}</p>
            <p className="text-[9px] text-[#64748b] mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex gap-0.5 flex-wrap justify-center">
        {Array.from({ length: info.bytes }).map((_, i) => (
          <motion.div key={i}
            initial={{ scale: 0, rotateZ: -30 }} whileInView={{ scale: 1, rotateZ: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08, type: 'spring' }}
            className="w-14 h-16 rounded-lg border flex flex-col items-center justify-center"
            style={{ borderColor: `${info.color}40`, background: `${info.color}10` }}>
            <span className="text-[7px] font-mono" style={{ color: `${info.color}70` }}>0x{(0x1024 + i).toString(16)}</span>
            <span className="text-[10px] font-bold font-mono" style={{ color: info.color }}>Byte {i}</span>
            <span className="text-[8px] text-[#64748b]">📦</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Algorithm Thinking Drill — Reorder Steps ─── */
export function AlgorithmThinkingDrill() {
  const drills = [
    {
      title: '🚦 Crossing a Street',
      correctOrder: [
        'Walk to the edge of the sidewalk',
        'Stop at the curb, plant both feet',
        'Look left for oncoming traffic',
        'Look right for oncoming traffic',
        'Look left again to confirm',
        'If clear, step off the curb with left foot',
        'Walk at steady pace to the opposite side',
        'Step onto the opposite sidewalk curb',
      ],
    },
    {
      title: '🍋 Making Lemon Juice',
      correctOrder: [
        'Pick up a lemon from the table',
        'Place lemon on cutting board',
        'Pick up knife with dominant hand',
        'Cut lemon in half with a single slice',
        'Pick up one lemon half',
        'Hold lemon half over a glass',
        'Squeeze the lemon half firmly',
        'Add sugar and water to the glass',
        'Stir with a spoon for 10 seconds',
      ],
    },
  ];

  const [activeDrill, setActiveDrill] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const drill = drills[activeDrill];

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#f59e0b]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🧩</span> Unplugged Logic Drill — Think Like an Algorithm
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        Before touching a keyboard, practice <strong className="text-white">decomposing mundane tasks into atomic, sequential steps</strong>. 
        This is the exact mental exercise that separates beginner programmers from FAANG-level engineers. 
        Can you identify the <strong className="text-white">correct order</strong>?
      </p>

      <div className="flex gap-2 mb-4">
        {drills.map((d, i) => (
          <motion.button key={i}
            onClick={() => { setActiveDrill(i); setRevealed(false); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              activeDrill === i
                ? 'border-[#f59e0b]/50 bg-[#f59e0b]/15 text-[#f59e0b]'
                : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}>{d.title}
          </motion.button>
        ))}
      </div>

      <div className="relative pl-8 space-y-2">
        <div className="absolute left-3 top-1 bottom-1 w-[2px] bg-[#f59e0b]/20" />
        {drill.correctOrder.map((step, i) => (
          <motion.div key={`${activeDrill}-${i}`}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: revealed ? 1 : 0.5, x: 0 }}
            transition={{ delay: revealed ? i * 0.08 : 0 }}
            className="flex items-center gap-3 relative">
            <div className="absolute left-[-22px] w-5 h-5 rounded-full border-2 border-[#f59e0b]/40 bg-[#f59e0b]/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#f59e0b]">{i + 1}</span>
            </div>
            <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
              <span className={`text-xs ${revealed ? 'text-[#b0bec5]' : 'text-[#334155]'} transition-colors`}>
                {revealed ? step : '█'.repeat(Math.min(step.length, 30))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setRevealed(!revealed)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="mt-4 px-5 py-2.5 rounded-xl bg-[#f59e0b] text-black font-bold text-xs cursor-pointer">
        {revealed ? '🔒 Hide Steps' : '🔓 Reveal Correct Algorithm'}
      </motion.button>
      
      <p className="text-[10px] text-[#64748b] mt-3 italic">
        💡 Tip: Try writing these steps on paper BEFORE revealing. Missing even one micro-step means the &quot;robot&quot; fails — just like in programming.
      </p>
    </motion.div>
  );
}

/* ─── Compilation Live Demo — See File Contents at Each Stage ─── */
export function CompilationLiveDemo() {
  const [stage, setStage] = useState(0);
  const stages = [
    {
      name: 'Source Code (.c)',
      icon: '📝', color: '#22c55e',
      content: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello!\\n");\n    return 0;\n}`,
      desc: 'Human-readable C source code. This is what the programmer writes in their text editor. Saved as a .c file.',
    },
    {
      name: 'Preprocessed (.i)',
      icon: '📋', color: '#3b82f6',
      content: `/* stdio.h contents pasted here */\nextern int printf(const char *, ...);\n/* ... 800+ lines of declarations ... */\n\nint main(void) {\n    printf("Hello!\\n");\n    return 0;\n}`,
      desc: 'Preprocessor runs FIRST. It strips all comments, expands #include by copy-pasting the ENTIRE stdio.h file (800+ lines), and expands any macros.',
    },
    {
      name: 'Assembly (.s)',
      icon: '⚙️', color: '#f59e0b',
      content: `    .section .rodata\n.LC0:\n    .string "Hello!\\n"\n    .text\n    .globl main\nmain:\n    pushq   %rbp\n    movq    %rsp, %rbp\n    leaq    .LC0(%rip), %rdi\n    call    printf@PLT\n    movl    $0, %eax\n    popq    %rbp\n    ret`,
      desc: 'Compiler translates C logic into CPU-specific Assembly instructions (x86-64 shown). Each line maps to exactly ONE CPU operation. Architecture-specific (Intel vs ARM produce different assembly).',
    },
    {
      name: 'Object Code (.o)',
      icon: '🔧', color: '#a855f7',
      content: `48 89 e5 48 8d 3d 00 00\n00 00 e8 00 00 00 00 b8\n00 00 00 00 5d c3 48 65\n6c 6c 6f 21 0a 00 00 00\n[Raw binary machine code]\n[CPU can read this directly]\n[Humans cannot read this]`,
      desc: 'Assembler converts symbolic Assembly into raw binary machine code. These hexadecimal numbers represent actual voltage patterns the CPU executes. Still missing external library connections.',
    },
    {
      name: 'Executable (.out)',
      icon: '🚀', color: '#ef4444',
      content: `ELF Header:\n  Magic: 7f 45 4c 46\n  Class: ELF64\n  Entry: 0x401000 → main()\n\n[.text] Program code\n[.rodata] "Hello!\\n"\n[.symtab] Symbol table\n[.dynamic] Linked libraries\n  → libc.so (printf code)`,
      desc: 'Linker merges .o file with pre-compiled library code (libc contains actual printf binary). Creates final ELF executable with headers telling the OS how to load and run it.',
    },
  ];

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🔬</span> Compilation Pipeline — See What Each Stage Actually Produces
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        Click each stage to see the <strong className="text-white">actual file contents</strong> generated. Watch how your simple C code transforms through 4 stages into raw binary the CPU executes.
      </p>

      <div className="flex gap-1 mb-5 flex-wrap">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center">
            <motion.button onClick={() => setStage(i)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                stage === i ? 'shadow-lg' : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
              }`}
              style={stage === i ? { borderColor: `${s.color}50`, background: `${s.color}15`, color: s.color } : {}}>
              <span>{s.icon}</span> {s.name}
            </motion.button>
            {i < 4 && <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }} className="mx-1 text-[#475569] text-xs">→</motion.span>}
          </div>
        ))}
      </div>

      <motion.div key={stage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#0d1117] border border-white/[0.08] overflow-hidden">
            <div className="px-3 py-2 border-b border-white/[0.06] flex items-center gap-2" style={{ background: `${stages[stage].color}08` }}>
              <span>{stages[stage].icon}</span>
              <span className="text-[10px] font-bold" style={{ color: stages[stage].color }}>{stages[stage].name}</span>
            </div>
            <pre className="p-4 text-xs font-mono text-[#b0bec5] leading-relaxed whitespace-pre-wrap overflow-auto max-h-64">{stages[stage].content}</pre>
          </div>
          <div className="rounded-xl p-5 border" style={{ borderColor: `${stages[stage].color}20`, background: `${stages[stage].color}06` }}>
            <h5 className="font-bold text-sm mb-2" style={{ color: stages[stage].color }}>What Happens Here?</h5>
            <p className="text-xs text-[#b0bec5] leading-[1.9]">{stages[stage].desc}</p>
            <div className="mt-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] text-[#64748b]">Stage {stage + 1} of 5</p>
              <div className="h-1.5 rounded-full bg-white/[0.06] mt-1 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: stages[stage].color }}
                  initial={{ width: 0 }} animate={{ width: `${((stage + 1) / 5) * 100}%` }} transition={{ duration: 0.5 }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── IPOS Real World Simulator — Clickable ─── */
export function IPOSRealWorldSimulator() {
  const [activeDevice, setActiveDevice] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const devices = [
    {
      name: 'ATM Machine', icon: '🏧', color: '#3b82f6',
      phases: [
        { phase: 'INPUT', desc: 'User inserts debit card into magnetic card reader. Keypad registers each PIN digit press as an electrical signal. Card reader scans magnetic stripe data.', visual: '💳 → 🔢 PIN: ****' },
        { phase: 'PROCESS', desc: 'CPU encrypts PIN using AES-256. Sends encrypted packet over secure network to bank servers. Server verifies credentials against database. Checks balance > requested amount.', visual: '🔐 Encrypting → 📡 Bank Server → ✅ Verified' },
        { phase: 'OUTPUT', desc: 'Mechanical rollers inside the ATM count and push physical currency notes through the dispensing slot. LCD screen updates to show success confirmation and remaining balance.', visual: '💵💵💵 Dispensed! → 📺 "Success"' },
        { phase: 'STORAGE', desc: 'Transaction details (timestamp, GPS location, amount, ATM ID, account number) permanently recorded in bank distributed database. Receipt data stored locally.', visual: '💾 DB Updated → 🧾 Receipt Printed' },
      ],
    },
    {
      name: 'Smartphone Camera', icon: '📷', color: '#22c55e',
      phases: [
        { phase: 'INPUT', desc: 'User taps shutter button. CMOS sensor captures millions of photon readings. Each pixel sensor converts light intensity into an analog electrical signal.', visual: '👆 Tap! → 📸 Sensor captures 12MP of light data' },
        { phase: 'PROCESS', desc: 'Image Signal Processor (ISP) converts raw analog signals to digital. CPU applies autofocus, auto-exposure, HDR processing, noise reduction, and color-correction algorithms.', visual: '🔄 ISP → AI Enhancement → Color Grading' },
        { phase: 'OUTPUT', desc: 'GPU composites the fully processed image. Display controller renders it on the AMOLED screen at 120Hz. Preview thumbnail shown in the camera app gallery.', visual: '🖥️ GPU Render → 📱 Display at 120Hz' },
        { phase: 'STORAGE', desc: 'Image compressed to JPEG/HEIF format. Written to NAND flash memory. EXIF metadata (time, GPS, aperture, shutter speed) embedded in the file header.', visual: '📁 photo_001.heif → 💾 NAND Flash + EXIF' },
      ],
    },
    {
      name: 'Google Search', icon: '🔍', color: '#f59e0b',
      phases: [
        { phase: 'INPUT', desc: 'User types query into search bar. Each keypress generates ASCII codes. Browser encodes the query and sends HTTP GET request over TCP/IP to Google servers.', visual: '⌨️ "C programming" → 📡 HTTP GET request' },
        { phase: 'PROCESS', desc: 'Google distributes query across thousands of servers. PageRank algorithm scores billions of indexed pages. Search relevance, user location, and personalization algorithms applied.', visual: '🏢 1000+ servers → 📊 PageRank → 🎯 Top 10' },
        { phase: 'OUTPUT', desc: 'Server compiles HTML response with ranked results. Data transmitted back via CDN. Browser parses HTML/CSS/JS and GPU renders pixel-perfect search results page.', visual: '📄 HTML Response → 🖥️ Rendered Results' },
        { phase: 'STORAGE', desc: 'Search query logged in Google database for analytics. Browser caches page assets locally. Search history stored in user Google account for personalization.', visual: '📊 Analytics DB → 🍪 Cache → 👤 History' },
      ],
    },
  ];

  const device = devices[activeDevice];

  const playSimulation = () => {
    setIsPlaying(true);
    setCurrentPhase(0);
    let phase = 0;
    const id = setInterval(() => {
      phase++;
      if (phase >= 4) { clearInterval(id); setIsPlaying(false); }
      else setCurrentPhase(phase);
    }, 1500);
  };

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🎬</span> IPOS Cycle Simulator — Watch Real-World Devices in Action
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        Select a device and watch the <strong className="text-white">complete IPOS cycle</strong> execute step by step. Every device on Earth follows this identical pattern.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {devices.map((d, i) => (
          <motion.button key={i} onClick={() => { setActiveDevice(i); setCurrentPhase(0); setIsPlaying(false); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
              activeDevice === i ? 'shadow-lg' : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}
            style={activeDevice === i ? { borderColor: `${d.color}50`, background: `${d.color}15`, color: d.color } : {}}>
            <span className="text-base">{d.icon}</span> {d.name}
          </motion.button>
        ))}
        <motion.button onClick={playSimulation}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs cursor-pointer ml-auto">
          {isPlaying ? '⏳ Running...' : '▶ Auto-Play'}
        </motion.button>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {['INPUT', 'PROCESS', 'OUTPUT', 'STORAGE'].map((phase, i) => (
          <motion.button key={phase}
            onClick={() => { setCurrentPhase(i); setIsPlaying(false); }}
            animate={currentPhase === i ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.8, repeat: currentPhase === i ? Infinity : 0 }}
            className={`py-2 rounded-lg border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              currentPhase === i
                ? `text-white shadow-lg`
                : 'border-white/[0.08] bg-white/[0.02] text-[#64748b]'
            }`}
            style={currentPhase === i ? { borderColor: `${device.color}50`, background: `${device.color}20`, color: device.color } : {}}>
            {phase}
          </motion.button>
        ))}
      </div>

      <motion.div key={`${activeDevice}-${currentPhase}`}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }}
        className="rounded-xl p-5 border" style={{ borderColor: `${device.color}20`, background: `${device.color}06` }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{device.icon}</span>
          <div>
            <p className="text-white font-bold text-sm">{device.phases[currentPhase].phase}</p>
            <p className="text-[10px] text-[#64748b]">{device.name} — Phase {currentPhase + 1} of 4</p>
          </div>
        </div>
        <p className="text-xs text-[#b0bec5] leading-[1.9] mb-3">{device.phases[currentPhase].desc}</p>
        <div className="rounded-lg bg-[#0d1117] border border-white/[0.08] p-3">
          <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-mono" style={{ color: device.color }}>{device.phases[currentPhase].visual}</motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Binary Math Animator — Step-by-Step Addition ─── */
export function BinaryMathAnimator() {
  const [step, setStep] = useState(-1);
  const num1 = [0, 1, 0, 1]; // 5
  const num2 = [0, 0, 1, 1]; // 3
  const result = [1, 0, 0, 0]; // 8
  const carries = [0, 1, 1, 0];

  const runAnimation = () => {
    setStep(-1);
    let s = 3;
    const id = setInterval(() => {
      setStep(s);
      s--;
      if (s < -1) { clearInterval(id); setStep(4); }
    }, 800);
  };

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#a855f7]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🧮</span> Binary Addition — Watch 5 + 3 = 8 at the Bit Level
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        This is exactly how the CPU&apos;s <strong className="text-white">Arithmetic Logic Unit (ALU)</strong> adds numbers — bit by bit from right to left, carrying over when needed. The same process happens billions of times per second inside your processor.
      </p>

      <div className="flex justify-center mb-5">
        <motion.button onClick={runAnimation}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 rounded-xl bg-[#a855f7] text-white font-bold text-xs cursor-pointer">
          ▶ Animate Addition
        </motion.button>
      </div>

      <div className="max-w-xs mx-auto font-mono">
        {/* Carry row */}
        <div className="flex justify-end gap-1 mb-1 pr-1">
          <span className="text-[10px] text-[#64748b] mr-auto">Carry:</span>
          {carries.map((c, i) => (
            <motion.span key={`c${i}`}
              animate={step <= i && step >= 0 ? { opacity: 1, scale: 1, color: '#f59e0b' } : { opacity: c && step === 4 ? 0.5 : 0.2, scale: 0.9 }}
              className="w-8 h-6 rounded flex items-center justify-center text-xs font-bold bg-[#f59e0b]/10">
              {c}
            </motion.span>
          ))}
        </div>
        {/* Num1 */}
        <div className="flex justify-end gap-1 mb-1 pr-1">
          <span className="text-[10px] text-[#64748b] mr-auto">5 →</span>
          {num1.map((b, i) => (
            <motion.span key={`a${i}`}
              animate={step === i ? { backgroundColor: 'rgba(59,130,246,0.3)', scale: 1.1 } : { backgroundColor: 'rgba(59,130,246,0.08)', scale: 1 }}
              className="w-8 h-8 rounded border border-[#3b82f6]/30 flex items-center justify-center text-sm font-bold text-[#3b82f6]">
              {b}
            </motion.span>
          ))}
        </div>
        {/* Num2 */}
        <div className="flex justify-end gap-1 mb-1 pr-1">
          <span className="text-[10px] text-[#64748b] mr-auto">3 →</span>
          {num2.map((b, i) => (
            <motion.span key={`b${i}`}
              animate={step === i ? { backgroundColor: 'rgba(34,197,94,0.3)', scale: 1.1 } : { backgroundColor: 'rgba(34,197,94,0.08)', scale: 1 }}
              className="w-8 h-8 rounded border border-[#22c55e]/30 flex items-center justify-center text-sm font-bold text-[#22c55e]">
              {b}
            </motion.span>
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-white/[0.15] my-2" />
        {/* Result */}
        <div className="flex justify-end gap-1 pr-1">
          <span className="text-[10px] text-[#64748b] mr-auto">8 →</span>
          {result.map((b, i) => (
            <motion.span key={`r${i}`}
              animate={step <= i || step === 4 ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }}
              className="w-8 h-8 rounded border border-[#a855f7]/40 bg-[#a855f7]/15 flex items-center justify-center text-sm font-bold text-[#a855f7]">
              {b}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-[#3b82f6]/[0.08] border border-[#3b82f6]/20">
          <p className="text-xs font-bold text-[#3b82f6]">0101</p>
          <p className="text-[9px] text-[#64748b]">= 5 in decimal</p>
        </div>
        <div className="p-2 rounded-lg bg-[#22c55e]/[0.08] border border-[#22c55e]/20">
          <p className="text-xs font-bold text-[#22c55e]">0011</p>
          <p className="text-[9px] text-[#64748b]">= 3 in decimal</p>
        </div>
        <div className="p-2 rounded-lg bg-[#a855f7]/[0.08] border border-[#a855f7]/20">
          <p className="text-xs font-bold text-[#a855f7]">1000</p>
          <p className="text-[9px] text-[#64748b]">= 8 in decimal</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Memory Allocation Simulator ─── */
export function MemoryAllocationSim() {
  const [variables, setVariables] = useState<{ name: string; type: string; value: string; address: number; bytes: number; color: string }[]>([]);
  const [nextAddr, setNextAddr] = useState(1000);

  const addVariable = (type: string) => {
    const configs: Record<string, { bytes: number; color: string; value: string; prefix: string }> = {
      'char': { bytes: 1, color: '#22c55e', value: "'A'", prefix: 'c' },
      'int': { bytes: 4, color: '#3b82f6', value: '42', prefix: 'n' },
      'float': { bytes: 4, color: '#f59e0b', value: '3.14', prefix: 'f' },
      'double': { bytes: 8, color: '#a855f7', value: '2.718', prefix: 'd' },
    };
    const cfg = configs[type];
    const name = `${cfg.prefix}${variables.length + 1}`;
    setVariables(prev => [...prev, { name, type, value: cfg.value, address: nextAddr, bytes: cfg.bytes, color: cfg.color }]);
    setNextAddr(prev => prev + cfg.bytes);
  };

  const resetMemory = () => {
    setVariables([]);
    setNextAddr(1000);
  };

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🏢</span> Memory Allocation Simulator — Claim Post Office Boxes
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        Click to <strong className="text-white">declare variables</strong> and watch them claim consecutive post office boxes on the memory street. 
        Notice how different types consume different numbers of boxes.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['char', 'int', 'float', 'double'].map(type => (
          <motion.button key={type} onClick={() => addVariable(type)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-3 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-xs font-mono font-bold text-[#94a3b8] hover:text-white cursor-pointer transition-all">
            + {type}
          </motion.button>
        ))}
        <motion.button onClick={resetMemory}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-3 py-2 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/10 text-xs font-bold text-[#ef4444] cursor-pointer ml-auto">
          🗑️ free() all
        </motion.button>
      </div>

      {/* Memory Street */}
      <div className="rounded-xl bg-[#0d1117] border border-white/[0.08] p-4 overflow-x-auto">
        <p className="text-[10px] text-[#64748b] mb-2">📬 RAM Memory Street (Linear Address Space)</p>
        <div className="flex gap-0.5 min-h-[60px] flex-wrap">
          {variables.length === 0 && (
            <p className="text-xs text-[#334155] italic py-4">Click buttons above to allocate variables...</p>
          )}
          {variables.map((v, vi) => (
            Array.from({ length: v.bytes }).map((_, bi) => (
              <motion.div key={`${vi}-${bi}`}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: bi * 0.05, type: 'spring' }}
                className="w-12 h-14 rounded border flex flex-col items-center justify-center"
                style={{ borderColor: `${v.color}50`, background: `${v.color}12` }}>
                <span className="text-[7px] font-mono" style={{ color: `${v.color}80` }}>{v.address + bi}</span>
                <span className="text-[9px] font-bold" style={{ color: v.color }}>
                  {bi === 0 ? v.name : `+${bi}`}
                </span>
                <span className="text-[7px] text-[#64748b]">{v.type}</span>
              </motion.div>
            ))
          ))}
        </div>
      </div>

      {/* Variable Log */}
      {variables.length > 0 && (
        <div className="mt-3 rounded-xl bg-[#0d1117] border border-white/[0.08] p-3">
          <p className="text-[10px] text-[#64748b] mb-2">Declaration Log:</p>
          {variables.map((v, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="text-[11px] font-mono mb-0.5">
              <span style={{ color: v.color }}>{v.type}</span>{' '}
              <span className="text-white">{v.name}</span>{' '}
              <span className="text-[#64748b]">=</span>{' '}
              <span className="text-[#f59e0b]">{v.value}</span>
              <span className="text-[#64748b]">;</span>{' '}
              <span className="text-[#475569]">// addr: {v.address}, {v.bytes} byte{v.bytes > 1 ? 's' : ''}</span>
            </motion.p>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Escape Sequence Playground ─── */
export function EscapeSequencePlayground() {
  const [input, setInput] = useState('Hello, World!\\nThis is C\\tprogramming\\n');
  
  const renderOutput = (text: string) => {
    return text
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\\\/g, '\\')
      .replace(/\\"/g, '"')
      .replace(/\\0/g, '')
      .replace(/\\a/g, '🔔');
  };

  const presets = [
    { label: 'Hello World', code: 'Hello, World!\\n' },
    { label: 'Tabular Data', code: 'Name\\tAge\\tCity\\nJohn\\t25\\tNYC\\nJane\\t30\\tSF\\n' },
    { label: 'Multi-line', code: 'Line 1\\nLine 2\\nLine 3\\n' },
    { label: 'All Escapes', code: 'Tab:\\there\\nQuote: \\"hi\\"\\nBackslash: \\\\\\nBell: \\a\\n' },
  ];

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🎮</span> Escape Sequence Playground — Type and See Live Output
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        Type C-style strings with escape sequences and see the <strong className="text-white">actual console output</strong> in real-time. 
        Try <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">\n</code> for newline, 
        <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">\t</code> for tab, 
        <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">\\</code> for backslash.
      </p>

      <div className="flex gap-2 mb-3 flex-wrap">
        {presets.map(p => (
          <motion.button key={p.label} onClick={() => setInput(p.code)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[10px] font-semibold text-[#94a3b8] hover:text-white cursor-pointer transition-all">
            {p.label}
          </motion.button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">printf(&quot; ... &quot;)</p>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 rounded-lg bg-[#0d1117] border border-white/[0.1] text-[#22c55e] text-xs font-mono focus:outline-none focus:border-[#22c55e]/50 resize-none" />
        </div>
        <div>
          <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">Console Output</p>
          <div className="rounded-lg bg-[#0d1117] border border-white/[0.1] p-3 min-h-[120px]">
            <pre className="text-xs text-white font-mono whitespace-pre-wrap">{renderOutput(input)}</pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Logical Sequencing Drill ─── */
export function LogicalSequencingDrill() {
  const scenarios = [
    {
      title: '🍰 Baking a Cake', icon: '🍰',
      wrong: ['Put cake in oven', 'Preheat oven to 180°C', 'Mix flour, sugar, eggs in bowl', 'Grease the baking pan', 'Pour batter into pan', 'Remove from oven after 30 min', 'Let it cool completely', 'Add frosting'],
      correct: ['Preheat oven to 180°C', 'Grease the baking pan', 'Mix flour, sugar, eggs in bowl', 'Pour batter into pan', 'Put cake in oven', 'Remove from oven after 30 min', 'Let it cool completely', 'Add frosting'],
      why: 'Putting the cake in the oven BEFORE preheating means uneven baking. Just like in code, executing step 5 before step 1 causes a logic failure!',
    },
    {
      title: '👟 Putting On Shoes', icon: '👟',
      wrong: ['Tie the shoelaces', 'Put on shoes', 'Pick up socks from drawer', 'Put on socks', 'Stand up and walk'],
      correct: ['Pick up socks from drawer', 'Put on socks', 'Put on shoes', 'Tie the shoelaces', 'Stand up and walk'],
      why: 'Tying laces before putting shoes on is physically impossible. Similarly, accessing a variable before declaring it causes a compilation error in C!',
    },
  ];

  const [activeScenario, setActiveScenario] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const scenario = scenarios[activeScenario];

  return (
    <motion.div whileHover={{ scale: 1.003 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#ef4444]/[0.04] to-transparent p-6 backdrop-blur-sm">
      <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        <span>🔄</span> Order of Execution — Spot the Bug in These Algorithms
      </h4>
      <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
        In programming, <strong className="text-white">sequence matters absolutely</strong>. The CPU&apos;s instruction pointer reads top-to-bottom. 
        Can you spot why these scrambled sequences would fail?
      </p>

      <div className="flex gap-2 mb-4">
        {scenarios.map((s, i) => (
          <motion.button key={i}
            onClick={() => { setActiveScenario(i); setShowCorrect(false); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              activeScenario === i
                ? 'border-[#ef4444]/50 bg-[#ef4444]/15 text-[#ef4444]'
                : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}>{s.title}
          </motion.button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/[0.04] p-4">
          <h5 className="text-[#ef4444] font-bold text-xs mb-3 uppercase tracking-wider">❌ Wrong Order (Buggy)</h5>
          {scenario.wrong.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#ef4444]/15 border border-[#ef4444]/30 flex items-center justify-center text-[9px] font-bold text-[#ef4444]">{i + 1}</span>
              <span className="text-xs text-[#b0bec5]">{step}</span>
            </motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/[0.04] p-4">
          <h5 className="text-[#22c55e] font-bold text-xs mb-3 uppercase tracking-wider">✅ Correct Order (Fixed)</h5>
          {showCorrect ? scenario.correct.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[9px] font-bold text-[#22c55e]">{i + 1}</span>
              <span className="text-xs text-[#b0bec5]">{step}</span>
            </motion.div>
          )) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-[#334155] italic">Click reveal to see correct order...</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <motion.button onClick={() => setShowCorrect(!showCorrect)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 rounded-xl bg-[#22c55e] text-black font-bold text-xs cursor-pointer">
          {showCorrect ? '🔒 Hide' : '🔓 Reveal Correct Order'}
        </motion.button>
        {showCorrect && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] text-[#f59e0b] leading-relaxed flex-1">
            💡 {scenario.why}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
