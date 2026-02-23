'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowLeft, Cpu, HardDrive, MemoryStick, Monitor, Brain, Cog, Play, Target, Server, Code2, BookOpen, Lightbulb, AlertTriangle, Shield } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import {
  PHASE_COLOR, FloatingParticles, BinaryStream, SectionBadge, InfoCard, Collapsible, KeyPoint,
  ImportantNote, CodeBlock, DataTable, MemoryBoxes, IPOSFlow, AbstractionLayers,
  LanguageSpectrum, CompilationPipeline, Card3D, InteractiveBinaryConverter,
  VoltageThresholdDiagram, DeterminismDemo, CPUCacheVisual, MusicBoxVsComputer,
  StepByStepFlow, GlowText, AnimatedCounter,
  TransistorAnimation, UniversalTuringMachine, HumanVsMachineTable,
  MemorySegmentDiagram, ExecutionFlowAnimator, ErrorTypeComparison,
  DataSizeVisualizer, CLanguageTimeline, PrintfUnderTheHood,
  VariableAnatomyVisualizer, AlgorithmThinkingDrill, CompilationLiveDemo,
  IPOSRealWorldSimulator, BinaryMathAnimator, MemoryAllocationSim,
  EscapeSequencePlayground, LogicalSequencingDrill,
} from './day1-components';

/* ─── PARTS NAV ─── */
const PARTS = ['What Is a Machine?','Computer Anatomy','How Computer Understands','What Is Programming?','Why C Language?','Memory Architecture','Variables','C Program Structure','Compilation Process','First Safe Code'];

export default function Day1Content() {
  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <FloatingParticles />

      <div className="relative z-10">
        {/* ─── Top Bar ─── */}
        <div className="border-b border-white/[0.06] sticky top-0 z-50 bg-[#0a0a12]/80 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Link href="/coding/c-language" className="flex items-center gap-1.5 text-[#64748b] hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">C Mastery Blueprint</span><span className="sm:hidden">Back</span>
                </Link>
                <span className="text-[#334155]">/</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: `${PHASE_COLOR}15`, color: PHASE_COLOR }}>Brain Reset</span>
                <span className="text-[#334155]">/</span>
                <span className="text-[#94a3b8] font-medium">Day 1</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-xs text-[#475569]">3% complete</span>
                <div className="w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: PHASE_COLOR }}
                    initial={{ width: 0 }} animate={{ width: '3%' }} transition={{ duration: 0.8 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Hero Section ─── */}
        <section className="pt-10 sm:pt-16 pb-10 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring' }}>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <motion.div whileHover={{ rotateY: 15, scale: 1.05 }} style={{ perspective: 600 }}
                  className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                  <div className="absolute inset-0 rounded-2xl" style={{ background: `${PHASE_COLOR}12`, border: `1px solid ${PHASE_COLOR}25` }} />
                  <motion.div className="absolute inset-0 rounded-2xl" style={{ border: `2px solid ${PHASE_COLOR}` }}
                    animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }} />
                  <span className="text-4xl font-bold relative z-10" style={{ color: PHASE_COLOR }}>D1</span>
                </motion.div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md" style={{ backgroundColor: `${PHASE_COLOR}15`, color: PHASE_COLOR }}>Phase 1 - Brain Reset</span>
                    <span className="text-xs text-[#475569]">Day 1 of 40</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                    How Computer Thinks
                  </h1>
                  <p className="text-[#94a3b8] text-sm sm:text-base max-w-2xl leading-relaxed">
                    Building a FAANG-Ready Mental Model of Computing — from the nature of machines to memory architecture,
                    binary systems to C programming. This is the foundation that separates elite engineers from average coders.
                  </p>
                  <div className="mt-2"><BinaryStream /></div>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Parts', value: '10', icon: '📚' },
                      { label: 'Read Time', value: '45 min', icon: '⏱️' },
                      { label: 'Concepts', value: '50+', icon: '🧠' },
                      { label: 'Level', value: 'Foundation', icon: '🏗️' },
                    ].map(s => (
                      <motion.div key={s.label} whileHover={{ scale: 1.05, y: -2 }}
                        className="rounded-xl border border-white/[0.08] bg-[#0f172a]/65 px-3 py-3 backdrop-blur-sm">
                        <span className="text-lg mr-1">{s.icon}</span>
                        <p className="text-lg font-bold text-white leading-none inline">{s.value}</p>
                        <p className="text-[11px] uppercase tracking-wide text-[#64748b] mt-1">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Part quick nav */}
            <div className="mt-8 flex flex-wrap gap-2">
              {PARTS.map((p, i) => (
                <a key={i} href={`#part-${i + 1}`}
                  className="px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all hover:scale-105"
                  style={{ borderColor: `${PHASE_COLOR}25`, color: `${PHASE_COLOR}cc`, background: `${PHASE_COLOR}08` }}>
                  {i + 1}. {p}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Content ─── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-20">

{/* ════════════════════ PART 1 ════════════════════ */}
<RevealOnScroll><section id="part-1">
  <SectionBadge number={1} title="Deconstructing the Machine" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What Is a Machine?</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">The journey toward becoming a top-tier software engineer does not begin with syntax — it begins with understanding what a machine actually is.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-4">
    In the broadest sense, a <strong className="text-white">machine</strong> is any physical system designed to alter, transmit, or direct forces to perform a specific task. A machine channels energy to perform work, automate a process, or achieve a specific outcome. For centuries, humanity relied exclusively on <strong className="text-white">fixed-function machines</strong>. A fixed-function machine is physically wired, constructed, or forged to do exactly one thing. Its internal circuitry and interconnections are permanent and cannot be modified after manufacturing. The logic is <strong className="text-white">frozen in the physical arrangement</strong> of its parts.
  </p>

  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <InfoCard icon={Cog} title="Fixed-Function Machines" color="#f59e0b">
      <p>Physically wired to do <strong className="text-white">exactly one thing</strong>. Consider a traditional mechanical music box — its internal brass cylinder contains tiny metal pins arranged in a highly specific, unalterable pattern. When the cylinder rotates, it plucks metal teeth to play a single, predefined melody.</p>
      <p>If you wish to hear a different song, you cannot simply ask the music box to change — you must <strong className="text-white">physically dismantle the machine</strong> and install a newly forged cylinder. Similarly, a basic pocket calculator is a fixed-function device — its electronic circuits are hardwired specifically for basic arithmetic. If a user wants the calculator to play a video, it is <strong className="text-white">physically impossible</strong> because its hardware dictates a singular function.</p>
      <p className="text-[#64748b] italic text-xs mt-2">Examples: Digital thermometer, basic calculator, mechanical clock, toaster, simple electronic logic gates.</p>
    </InfoCard>
    <InfoCard icon={Monitor} title="Programmable Machines (Computers)" color="#22c55e">
      <p>A computer&apos;s physical hardware remains entirely static, yet its behavior can be altered <strong className="text-white">infinitely and dynamically</strong>. A modern smartphone operates as a high-definition television, GPS, financial trading terminal, communication device, and video game console.</p>
      <p>All using the <strong className="text-white">exact same physical glass screen, battery, and silicon chip</strong>. The hardware is a blank, universal canvas — it is the <strong className="text-white">software (programmed instructions)</strong> that temporarily configures it. A programmable machine completely <strong className="text-white">decouples the hardware from the task</strong>. By changing the written instructions, the exact same hardware can perform entirely different tasks.</p>
      <p className="text-[#64748b] italic text-xs mt-2">In computational theory, this is recognized as a &quot;Universal Turing Machine&quot; — a machine that can simulate any other machine.</p>
    </InfoCard>
  </div>

  <div className="mb-6">
    <MusicBoxVsComputer />
  </div>

  <div className="mb-6">
    <UniversalTuringMachine />
  </div>

  <Collapsible title="🔬 Deep Dive: Deterministic Behavior — The Domino Effect" defaultOpen>
    <p className="mb-3">This incredible flexibility is governed by a rigid principle known as <strong className="text-white">deterministic behavior</strong>. Determinism dictates that a system, given the exact same initial conditions and the exact same inputs, will <strong className="text-white">unconditionally and endlessly produce the exact same output</strong>, passing through the identical sequence of internal states every single time.</p>
    <p className="mb-3">A deterministic system is one where the behavior is entirely predictable. Deterministic algorithms provide precise solutions and possess a well-defined worst-case time complexity, making them entirely predictable. Non-deterministic behavior in computing only occurs when external, unpredictable variables (like network latency, random number generators, or hardware degradation) are introduced.</p>
    <KeyPoint>If a computer is programmed to add 2 + 3, it will output 5. If it is asked to perform this calculation ten billion times, it will output 5 ten billion times — without a single deviation, hesitation, or spontaneous error. Computers possess no intuition, mood, subconscious thought, or fatigue.</KeyPoint>
    <div className="mt-4"><DeterminismDemo /></div>
    <ImportantNote>This deterministic nature is both the computer&apos;s greatest strength (absolute reliability) and its greatest limitation (zero contextual awareness). Understanding this duality is the first step toward thinking like a programmer.</ImportantNote>
    <p className="text-[#b0bec5] leading-[1.9] mt-4 mb-2">
      Think of it like a row of dominoes — once the first domino is pushed, every single subsequent domino falls in a <strong className="text-white">perfectly predictable, predetermined sequence</strong>. No domino will spontaneously decide to fall in a different direction. No domino will skip its neighbor. The entire cascade is governed by the physical arrangement established by the human who placed them. A computer program behaves identically: the programmer establishes the arrangement (the code), and the CPU executes the cascade with <strong className="text-white">absolute, unwavering fidelity</strong> to that arrangement.
    </p>
    <p className="text-[#b0bec5] leading-[1.9] mb-2">
      Non-deterministic behavior in computing only occurs when <strong className="text-white">external, unpredictable variables</strong> are introduced — such as network latency (the time it takes for data to travel across the internet varies unpredictably), random number generators (which use hardware entropy sources like electrical noise), or physical hardware degradation (a worn-out memory cell may corrupt a stored bit). In pure algorithmic execution, without these external variables, the computer is <strong className="text-white">a perfect mathematical automaton</strong>.
    </p>
  </Collapsible>

  <div className="mt-4">
    <Collapsible title="🧠 The Human Assumption Gap — Why Beginners Struggle" defaultOpen>
      <p className="mb-3">This introduces the <strong className="text-white">single greatest difference between humans and machines</strong>, and the primary hurdle for beginners learning to program. Beginners often struggle because they <strong className="text-white">project human cognitive traits onto the computer</strong>.</p>
      <p className="mb-3">Humans navigate the world relying heavily on <strong className="text-white">context, assumption, inference, and implicit knowledge</strong>. If a human asks a friend to &quot;make a peanut butter and jelly sandwich,&quot; the friend inherently knows to walk to the pantry, open the plastic bag holding the bread, unscrew the lid of the peanut butter jar, and use a knife to spread it. The human brain <strong className="text-white">automatically fills in the missing instructional gaps</strong>.</p>
      <KeyPoint>A machine possesses absolutely no contextual awareness. If given the command &quot;make a PB&amp;J sandwich&quot; without explicitly programmed intermediate steps, it will likely attempt to smash an unopened glass jar of peanut butter directly through a sealed plastic bag of bread.</KeyPoint>
      <p className="mt-3 mb-3">The machine is <strong className="text-white">completely and flawlessly obedient</strong> (incredibly powerful), but also <strong className="text-white">completely blind</strong> (entirely dependent on the flawless precision of the human giving commands). When interacting with a computer, the programmer must <strong className="text-white">completely abandon human assumptions</strong>. The machine possesses zero common sense; it relies entirely on the explicit precision of the instructions provided.</p>
      <p className="mb-3">Humans possess approximately <strong className="text-white">86 billion neurons</strong> in their brains, forming trillions of synaptic connections that allow for incredible pattern recognition, emotional intelligence, and abstract reasoning. Yet humans can only consciously process about <strong className="text-white">50 bits per second</strong> — incredibly slow compared to machines. In contrast, a modern CPU can process <strong className="text-white">billions of operations per second</strong> but has <strong className="text-white">absolutely zero understanding</strong> of what those operations mean. The human advantage is <strong className="text-white">quality and contextual depth</strong> of processing; the machine advantage is <strong className="text-white">raw speed and unwavering consistency</strong>.</p>
      <HumanVsMachineTable />
      <p className="text-[#b0bec5] leading-[1.9] mt-4">
        Understanding this fundamental asymmetry is what allows elite engineers to write code that <strong className="text-white">bridges both worlds</strong>: leveraging the machine&apos;s speed while compensating for its complete lack of contextual awareness through rigorous, explicit, assumption-free programming.
      </p>
    </Collapsible>
  </div>
</section></RevealOnScroll>

{/* ════════════════════ PART 2 ════════════════════ */}
<RevealOnScroll><section id="part-2">
  <SectionBadge number={2} title="The Anatomy of a Computer" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">The Anatomy of a Computer — IPOS Model</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">Regardless of whether you are looking at a smart thermostat or a massive server farm powering Google — every computer operates on this framework.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-4">
    Every single computer operates on a foundational framework known as the <strong className="text-white">Input-Process-Output-Storage (IPOS)</strong> model. It represents the absolute flow of data through a digital system — the circulatory system of computation. Understanding this cycle is the first step to understanding any computing device, from a smart thermostat to a 500,000-server cloud infrastructure powering Google Search.
  </p>
  <p className="text-[#b0bec5] leading-[1.9] mb-6">
    The IPOS cycle is <strong className="text-white">universally inescapable</strong> — there is no computing device on Earth that does not follow this exact sequence. First, raw data enters the system (<strong className="text-white">Input</strong>). Then the computer performs mathematical, logical, or organizational operations on it (<strong className="text-white">Process</strong>). Next, the system delivers the processed, now-meaningful information back to the outside world (<strong className="text-white">Output</strong>). Finally, data is retained for future use (<strong className="text-white">Storage</strong>) — either temporarily during active processing or permanently for long-term archiving.
  </p>

  <IPOSFlow />

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 mb-4">
    <Card3D glowColor="#f59e0b">
      <AnimatedCounter target={5} label="Billion ops/sec" suffix="B+" />
      <p className="text-[10px] text-[#64748b] mt-1">Modern CPU Speed</p>
    </Card3D>
    <Card3D glowColor="#3b82f6">
      <AnimatedCounter target={64} label="GB Max RAM" suffix="" />
      <p className="text-[10px] text-[#64748b] mt-1">Consumer Laptops</p>
    </Card3D>
    <Card3D glowColor="#a855f7">
      <AnimatedCounter target={7000} label="MB/s SSD Speed" suffix="" />
      <p className="text-[10px] text-[#64748b] mt-1">NVMe Gen4 SSD</p>
    </Card3D>
    <Card3D glowColor="#22c55e">
      <AnimatedCounter target={128} label="ASCII Characters" suffix="" />
      <p className="text-[10px] text-[#64748b] mt-1">Standard Set</p>
    </Card3D>
  </div>

  <h3 className="text-xl font-bold text-white mb-4 mt-8">🍳 Core Hardware — The Restaurant Kitchen Analogy</h3>
  <p className="text-[#b0bec5] leading-[1.9] mb-4">To physically execute the IPOS cycle, the computer relies on a <strong className="text-white">trinity of core hardware components</strong>. The most effective analogy is a commercial restaurant kitchen:</p>

  <div className="grid md:grid-cols-3 gap-4 mb-6">
    <InfoCard icon={Cpu} title="CPU — The Head Chef" color="#f59e0b">
      <p>The <strong className="text-white">brain of the computer</strong>. An unimaginably complex silicon chip capable of executing <strong className="text-white">billions of microscopic mathematical operations every second</strong>.</p>
      <p>The chef is incredibly fast and skilled, but can only work on a few ingredients at a precise moment and requires a dedicated workspace (RAM counter) to function efficiently.</p>
      <p>However, the CPU operates at such blistering speeds that it <strong className="text-white">cannot afford to wait</strong> for data from slow long-term storage.</p>
    </InfoCard>
    <InfoCard icon={MemoryStick} title="RAM — The Kitchen Counter" color="#3b82f6">
      <p>The computer&apos;s <strong className="text-white">short-term memory / active workspace</strong>. Holds data and instructions the CPU is actively using at that exact moment.</p>
      <p>A larger countertop allows the chef to chop, prepare, and mix simultaneously without walking to the pantry.</p>
      <p>Because RAM is engineered for extreme speed, it is <strong className="text-white">volatile memory</strong> — the electrical charges leak power quickly. <strong className="text-white">When the computer turns off, RAM is wiped completely clean</strong>.</p>
    </InfoCard>
    <InfoCard icon={HardDrive} title="Storage — The Pantry" color="#a855f7">
      <p><strong className="text-white">Permanent vault</strong> for data. Holds the OS, all applications, and user files even when power is completely severed.</p>
      <p>The pantry holds massive amounts of food (data), but <strong className="text-white">retrieving items takes significantly more time</strong> than grabbing from the countertop.</p>
      <p>When a user clicks to open a browser, the OS copies the code from the <strong className="text-white">slow Storage pantry → fast RAM counter</strong>, letting the CPU chef process smoothly.</p>
    </InfoCard>
  </div>

  <h3 className="text-xl font-bold text-white mb-4">📌 Real-Life IPOS Examples</h3>
  <Collapsible title="🏧 ATM Machine — Complete IPOS Breakdown" defaultOpen>
    <DataTable headers={['Phase', 'What Happens', 'Technical Detail']} rows={[
      ['Input', 'User inserts debit card + enters PIN on keypad', 'Magnetic card reader detects data, keypad generates electrical signals for each digit pressed'],
      ['Process', 'ATM encrypts data, communicates with bank servers', 'CPU encrypts PIN, sends encrypted packet to bank central servers via secure network, verifies credentials, checks account balance'],
      ['Output', 'Machine dispenses cash + shows success message', 'Mechanical rollers count and push physical currency, LCD screen updates pixel display for confirmation'],
      ['Storage', 'Bank updates account ledger in database', 'Transaction details (time, location, amount, ATM ID) permanently recorded in distributed database'],
    ]} />
  </Collapsible>
  <div className="mt-3"><Collapsible title="📱 Mobile Phone — Opening a Social Media App">
    <DataTable headers={['Phase', 'What Happens', 'Technical Detail']} rows={[
      ['Input', 'Tapping app icon on touch-sensitive screen', 'Screen generates electrical coordinates (X, Y position) of the touch point'],
      ['Process', 'CPU calculates which app is at those coordinates', 'OS maps coordinates to app icon, commands Storage to load application binary into RAM'],
      ['Output', 'Screen displays the application interface', 'GPU renders UI elements pixel by pixel, display refreshes at 60-120Hz'],
      ['Storage', 'Login session saved locally', 'Session token written to local flash memory for future automatic login'],
    ]} />
  </Collapsible></div>
  <div className="mt-3"><Collapsible title="� Mobile Phone Camera — Photo Capture">
    <DataTable headers={['Phase', 'What Happens', 'Technical Detail']} rows={[
      ['Input', 'Photons of light hit the camera\'s digital sensor', 'User taps shutter button, CMOS sensor captures millions of photon readings'],
      ['Process', 'CPU + ISP convert raw light data to colored pixels', 'Image Signal Processor applies focus, exposure, HDR, and color-correction algorithms'],
      ['Output', 'Fully rendered image displayed on screen instantly', 'GPU composites the processed frame into the display pipeline at 60-120fps'],
      ['Storage', 'Image file compressed and saved permanently', 'JPEG/HEIF compression applied, written to NAND flash memory with EXIF metadata'],
    ]} />
  </Collapsible></div>
  <div className="mt-3"><Collapsible title="�🔢 Calculator — Simple Arithmetic Example">
    <DataTable headers={['Phase', 'What Happens']} rows={[
      ['Input', "Pressing '5', '+', '5' — each keypress generates a specific electrical signal"],
      ['Process', 'Internal circuitry receives signals, converts to binary, performs binary addition (0101 + 0101 = 1010)'],
      ['Output', 'LCD screen activates specific pixels to display the number 10'],
    ]} />
  </Collapsible></div>

  <div className="mt-6"><IPOSRealWorldSimulator /></div>

  <div className="mt-4">
    <ImportantNote>The IPOS cycle is universally inescapable — there is no computing device on Earth that does not follow this exact sequence. Even the most complex AI systems, autonomous vehicles, and space station computers follow this same fundamental Input → Process → Output → Storage pattern.</ImportantNote>
  </div>
</section></RevealOnScroll>

{/* ════════════════════ PART 3 ════════════════════ */}
<RevealOnScroll><section id="part-3">
  <SectionBadge number={3} title="Binary, ASCII & Abstraction" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">How the Computer Understands the World</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">To truly master programming, one must descend below the user interface and confront the physical reality of the machine.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-4">
    At its absolute lowest, microscopic level, a computer does <strong className="text-white">not understand English, Hindi, mathematics, logic, or video games</strong>. A computer only understands <strong className="text-white">electricity</strong> — specifically, the <em>presence</em> of electrical voltage (ON = 1) and the <em>absence</em> of electrical voltage (OFF = 0). Electronic devices operate using <strong className="text-white">billions of microscopic electrical switches called transistors</strong>. Because evaluating varying degrees of electricity is prone to error, these transistors are engineered to recognize only two distinct, extreme states.
  </p>

  <div className="mb-6"><TransistorAnimation /></div>

  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <InfoCard icon={Lightbulb} title="Bits and Bytes — The Atomic Units" color="#f59e0b">
      <p>A single 0 or 1 = a <strong className="text-white">Bit</strong> (Binary Digit) — the absolute smallest, indivisible unit of data in computing.</p>
      <p>By grouping exactly <strong className="text-white">8 bits together</strong>, we get a <strong className="text-white">Byte</strong>. A single byte can represent <strong className="text-white">256 different combinations</strong> (2⁸ = 256, from 00000000 to 11111111).</p>
      <p>Every photograph, video, text message, and application in existence is ultimately just a <strong className="text-white">massive, organized collection</strong> of these 8-bit bytes.</p>
    </InfoCard>
    <InfoCard icon={Shield} title="Why Binary? Hardware Reliability" color="#ef4444">
      <p>Inside circuits, signals degrade. A 5V signal might drop to 4.5V due to resistance, temperature, or noise.</p>
      <p>If using base-10 (where 1V=1, 2V=2... 10V=10), a 4.5V signal causes <strong className="text-white">catastrophic confusion</strong> — is it 4 or 5?</p>
      <p>With binary: anything above ~2.5V = <strong className="text-white">1 (ON)</strong>, below = <strong className="text-white">0 (OFF)</strong>. Even if 5V degrades to 3V, it&apos;s still clearly &quot;ON.&quot; This guarantees <strong className="text-white">signal integrity, error resistance, and efficient circuit design</strong>.</p>
      <p>Furthermore, adding more states requires exponentially more complex hardware. As voltage increases for each new logic level, <strong className="text-white">power consumption increases exponentially</strong>, leading to excessive heat that physically damages delicate electronic components. Binary ensures pristine accuracy, high power efficiency, and optimal thermal regulation.</p>
    </InfoCard>
  </div>

  <div className="mb-6"><VoltageThresholdDiagram /></div>

  <h3 className="text-xl font-bold text-white mb-3">🔤 ASCII — The Translation Bridge</h3>
  <p className="text-[#b0bec5] leading-[1.9] mb-4">
    Since hardware only understands 1s and 0s, <strong className="text-white">ASCII</strong> (American Standard Code for Information Interchange) acts as a standardized translation dictionary — essentially a massive lookup table that maps numeric values to human-readable characters. When a programmer types the capital letter &apos;A&apos; on a keyboard, the keyboard hardware sends the decimal number 65 to the CPU. The computer converts 65 into the binary byte <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">01000001</code> and stores it in memory. There are <strong className="text-white">128 standard ASCII characters</strong>. The computer has no concept of the alphabet — it merely processes integers.
  </p>
  <DataTable headers={['Character', 'ASCII Decimal', 'Binary (8-bit)', 'Description']} rows={[
    ['A', '65', '01000001', 'Uppercase A — when you press A, keyboard sends this binary to CPU'],
    ['a', '97', '01100001', 'Lowercase a — different binary than uppercase!'],
    ['Z', '90', '01011010', 'Uppercase Z'],
    ['0', '48', '00110000', 'The character zero (NOT the number zero in math)'],
    ['9', '57', '00111001', 'The character nine'],
    ['Space', '32', '00100000', 'Spacebar — even spaces have binary codes'],
    ['Enter (LF)', '10', '00001010', 'Line Feed — moves to next line'],
    ['!', '33', '00100001', 'Exclamation mark'],
    ['@', '64', '01000000', 'At symbol — used in emails'],
  ]} />

  <div className="mt-6"><InteractiveBinaryConverter /></div>

  <div className="mt-6"><BinaryMathAnimator /></div>

  <div className="mt-8">
    <h3 className="text-xl font-bold text-white mb-3">🏗️ The Concept of Abstraction — The Most Critical Pillar</h3>
    <p className="text-[#b0bec5] leading-[1.9] mb-4">
      <strong className="text-white">Abstraction</strong> is arguably the single most critical conceptual pillar in all of computer science. It is the fundamental process of hiding incredibly complex underlying physical and mathematical details behind a simple, easy-to-use interface. Consider the analogy of driving a car. A human driver interacts with a highly abstracted interface: a steering wheel, a gas pedal, and a brake. The driver does <strong className="text-white">not need to understand</strong> the thermodynamic combustion cycle of the engine, the fluid dynamics of the transmission, or the electrical routing of the spark plugs to successfully drive to a destination. The steering wheel completely <strong className="text-white">shields the user from the underlying mechanical complexity</strong>.
    </p>
    <p className="text-[#b0bec5] leading-[1.9] mb-4">
      In computing, the abstraction hierarchy is massive and deeply layered: quantum physics is abstracted into transistors → transistors are abstracted into <strong className="text-white">logic gates</strong> (AND, OR, NOT, XOR) → logic gates are combined into a <strong className="text-white">CPU&apos;s microarchitecture</strong> → the CPU&apos;s raw machine code (1s and 0s) is abstracted into <strong className="text-white">Assembly language</strong> (human-readable CPU instructions) → Assembly is abstracted into <strong className="text-white">high-level programming languages</strong> like C → and modern frameworks abstract C into even higher layers. Software developers operate at these higher levels, building massive applications without manually soldering circuits or writing raw binary.
    </p>
    <AbstractionLayers />
    <KeyPoint>
      Abstraction allows a programmer to type a simple command like <code className="text-[#22c55e] bg-white/[0.05] px-1.5 py-0.5 rounded">printf(&quot;Hello&quot;)</code> without manually mapping ASCII codes, managing RAM addresses, or flipping billions of microscopic electrical switches inside the CPU. Without abstraction, every programmer would need to be a simultaneous expert in quantum physics, electrical engineering, circuit design, and device driver programming just to display a single character on screen.
    </KeyPoint>
  </div>
</section></RevealOnScroll>

{/* ════════════════════ PART 4 ════════════════════ */}
<RevealOnScroll><section id="part-4">
  <SectionBadge number={4} title="The Art of Algorithmic Thinking" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What Is Programming?</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">Programming is not merely typing code — it is the precise art of providing contextual logic that machines inherently lack.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-6">
    At its core, programming is the precise, logical art of breaking down a complex human objective into a series of <strong className="text-white">explicit, unambiguous, deterministic instructions</strong> that a machine can blindly execute. It is the act of providing the computer with contextual logic and step-by-step reasoning that it inherently lacks.
  </p>

  <InfoCard icon={Target} title="What Is an Algorithm?" color="#3b82f6">
    <p>An <strong className="text-white">algorithm</strong> is defined as a finite, highly specific, step-by-step sequence of instructions designed to solve a particular problem, perform a calculation, or complete a task.</p>
    <p>Thinking in algorithms requires a <strong className="text-white">fundamental rewiring of the brain</strong>. It requires stripping away all human assumptions, emotions, and leaps of logic.</p>
  </InfoCard>

  <div className="mt-6"><Collapsible title="🥪 The PB&J Robot Experiment — Classic CS Drill" defaultOpen>
    <p className="mb-3">In this famous university computer science exercise, the instructor acts as a <strong className="text-white">deterministic robot</strong>, and students act as programmers. The students must instruct the robot to make a peanut butter and jelly sandwich using only explicit, unambiguous commands.</p>
    <p className="mb-3">If a student says <em>&quot;Put the peanut butter on the bread,&quot;</em> the instructor might place the <strong className="text-white">unopened glass jar directly on top of the sealed loaf of bread</strong>. The students quickly realize that <strong className="text-white">precision is everything</strong> — the robot has zero contextual understanding.</p>
    <p className="mb-3">A true algorithmic sequence must be <strong className="text-white">agonizingly, painfully specific</strong>:</p>
    <StepByStepFlow color="#f59e0b" steps={[
      { title: 'Step 1: Locate bread bag', desc: 'Move left hand to the bread bag sitting on the counter surface.' },
      { title: 'Step 2: Grip bag opening', desc: 'Close left hand grip firmly around the top opening of the bread bag.' },
      { title: 'Step 3: Locate bag tie', desc: 'Move right hand to the twist-tie securing the bag shut.' },
      { title: 'Step 4: Untwist tie', desc: 'Rotate right hand counter-clockwise 180 degrees to loosen the twist-tie.' },
      { title: 'Step 5: Remove tie', desc: 'Pull the bag tie completely off with right hand, place it on the counter.' },
      { title: 'Step 6: Release grip', desc: 'Open left hand grip on the bag to widen the opening.' },
      { title: 'Step 7: Insert hand', desc: 'Insert right hand through the bag opening, reaching downward.' },
      { title: 'Step 8: Grip bread', desc: 'Grip the first slice of bread between right thumb and forefinger.' },
      { title: 'Step 9: Extract bread', desc: 'Lift bread slice upward and completely out through the bag opening.' },
      { title: 'Step 10: Place bread', desc: 'Place bread slice flat on the counter surface, crust-side facing up.' },
    ]} />
    <ImportantNote>This exercise demonstrates the fundamental reality of programming: computers have <strong className="text-white">zero contextual awareness</strong>. Every single micro-action that a human brain performs automatically must be explicitly, painstakingly spelled out for the machine. This is why top-tier FAANG interviews test your ability to think at this level of precision.</ImportantNote>
  </Collapsible></div>

  <div className="mt-6"><AlgorithmThinkingDrill /></div>

  <div className="mt-6"><LogicalSequencingDrill /></div>

  <div className="mt-6">
    <Collapsible title="📝 Why You Should Practice Unplugged Before Coding" defaultOpen>
      <p className="mb-3">To bridge the gap between human thinking and computational thinking, beginners should practice <strong className="text-white">unplugged logic drills</strong> before ever touching a keyboard. This involves attempting to write down the algorithm for mundane tasks — like crossing a street, making lemon juice, or navigating a physical maze — <strong className="text-white">without missing a single step</strong>.</p>
      <p className="mb-3">Solving Sudoku puzzles, playing Tic-Tac-Toe perfectly, or completing logic grid problems trains the brain to recognize <strong className="text-white">strict patterns, dependencies, and conditional constraints</strong>, which translates directly to writing high-quality code. The best programmers are not those who type fastest — they are those who <strong className="text-white">think most precisely</strong> before writing a single line.</p>
      <KeyPoint>Every line of code is an instruction in an algorithm. If your algorithm has gaps, ambiguities, or incorrect ordering — your program will fail. The gap between &quot;this should work&quot; and &quot;this will work&quot; is entirely filled by algorithmic precision.</KeyPoint>
    </Collapsible>
  </div>

  <div className="mt-4 grid md:grid-cols-2 gap-4">
    <InfoCard icon={Play} title="The Instruction Pointer — Sequential Execution" color="#f59e0b">
      <p>A computer possesses an internal hardware mechanism called an <strong className="text-white">Instruction Pointer</strong> (also known as a Program Counter). This pointer reads instructions <strong className="text-white">sequentially, line by line, from the top of the file to the very bottom</strong>.</p>
      <p>It will <strong className="text-white">never arbitrarily skip a step</strong> unless explicitly commanded to do so via logical control flows (like <code className="text-[#f59e0b] bg-white/[0.05] px-1 rounded">if</code> statements or <code className="text-[#f59e0b] bg-white/[0.05] px-1 rounded">loops</code>), and it will <strong className="text-white">absolutely never execute step 3 before step 2</strong>.</p>
      <p>Understanding this strict, rigid order of execution is absolutely critical — it is the backbone of all control flow and debugging logic in programming.</p>
      <p className="mt-2">In computing, execution flows linearly, from top to bottom. If a daily algorithm instructs a person to <strong className="text-white">put their shoes on before putting their socks on</strong>, the logic fails. If a recipe says to put the cake in the oven before turning the oven on, the desired outcome will not occur. Establishing the correct logical sequence is the <strong className="text-white">absolute foundation</strong> of software engineering.</p>
    </InfoCard>
    <InfoCard icon={AlertTriangle} title="Human Assumptions vs Machine Precision" color="#ef4444">
      <p>If a human accountant is tallying a ledger and sees an instruction to <strong className="text-white">divide a company&apos;s revenue by zero</strong>, the human instantly recognizes this as a mathematical impossibility, flags it as an error, and skips to the next calculation.</p>
      <p>A computer <strong className="text-white">will not skip it</strong>. The instruction pointer will hit the &quot;divide by zero&quot; command, the CPU will attempt to execute it, the mathematical logic unit will fail, and the <strong className="text-white">entire multi-million-dollar software application will instantly crash</strong>.</p>
      <p>The machine assumes that if the programmer wrote it, the programmer <strong className="text-white">wanted it to happen</strong>.</p>
      <p className="text-xs text-[#64748b] italic mt-2">FAANG companies test candidates heavily on the ability to foresee edge cases, eliminate assumptions, and architect bulletproof logical sequences.</p>
    </InfoCard>
  </div>
</section></RevealOnScroll>

{/* ════════════════════ PART 5 ════════════════════ */}
<RevealOnScroll><section id="part-5">
  <SectionBadge number={5} title="The Mid-Level Powerhouse" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Why the C Language?</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">Created in 1972 by Dennis Ritchie at Bell Labs to rewrite the legendary UNIX operating system.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-4">
    C occupies a unique, highly revered position as a <strong className="text-white">mid-level language</strong>. Developed in 1972 at Bell Labs by the legendary Dennis Ritchie to rewrite the UNIX operating system, C was specifically designed to provide high-level human readability while maintaining brutal, low-level, direct access to the computer&apos;s memory and physical hardware registers. Learning C is universally considered a <strong className="text-white">fundamental rite of passage</strong> for aspiring FAANG engineers.
  </p>

  <p className="text-[#b0bec5] leading-[1.9] mb-4">
    Programming languages exist on a vast continuum ranging from <strong className="text-white">Low-Level</strong> to <strong className="text-white">High-Level</strong>. Low-Level Languages like Assembly or raw Machine Code exist incredibly close to the physical hardware — they are extraordinarily difficult for humans to read, write, or debug, but because they require almost no abstraction or translation, they execute at <strong className="text-white">blistering, uncompromising speeds</strong>. High-Level Languages like Python, Java, or JavaScript are highly abstracted — they read almost like plain English and automatically handle background tasks like hardware management, memory allocation, and garbage collection. However, this heavy automation adds <strong className="text-white">massive hidden computational costs</strong>, making them inherently slower and heavier than their low-level counterparts.
  </p>

  <LanguageSpectrum />

  <div className="mb-6">
    <Collapsible title="💡 Why Top Companies Revere C Knowledge" defaultOpen>
      <p className="mb-3">Top-tier technology companies (FAANG) operate at an <strong className="text-white">unfathomable scale</strong>. When a backend system handles <strong className="text-white">billions of user requests per second</strong>, micro-inefficiencies in memory utilization or processing speed result in massive financial costs, latency, and server overloads. Modern high-level languages automatically handle memory allocation, which creates a <strong className="text-white">&quot;black box&quot;</strong> for developers — a developer who only knows Python might inadvertently write code that wastes massive amounts of memory because they do not fundamentally understand how data structures work underneath the abstraction layer.</p>
      <p className="mb-3">In Python, if a developer needs a list for 10,000 records, they simply type a command. Python silently requests memory, tracks usage, and <strong className="text-white">automatically deletes it when no longer needed</strong>. The developer learns nothing about the hardware cost.</p>
      <p className="mb-3">In C, there is <strong className="text-white">no safety net, no background automation, no automatic cleanup</strong> (Garbage Collection). The developer must:</p>
      <div className="space-y-1.5 ml-4 text-sm">
        <p>• Manually <strong className="text-white">calculate the exact bytes</strong> required for 10,000 records</p>
        <p>• Manually <strong className="text-white">request that space</strong> from the operating system using <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">malloc()</code></p>
        <p>• <strong className="text-white">Track physical memory addresses</strong> using complex tools called pointers</p>
        <p>• Manually <strong className="text-white">release the memory back</strong> to the system using <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">free()</code> when finished</p>
      </div>
      <KeyPoint>Elite companies prioritize candidates with C knowledge because C strips away the training wheels. Even if a developer is ultimately hired to write Java or Python, the algorithmic rigor and low-level mechanical awareness forged by mastering C guarantees that they will write highly optimized, resource-efficient code in any language.</KeyPoint>
    </Collapsible>
  </div>

  <h3 className="text-lg font-bold text-white mb-3">Feature Comparison Table</h3>
  <DataTable headers={['Feature', 'C Language (Mid-Level)', 'Python / Java (High-Level)']}
    rows={[
      ['Memory Management', 'Manual — developer explicitly controls bytes and physical addresses using malloc/free', 'Automatic — language silently handles allocation and garbage collection in background'],
      ['Execution Speed', 'Extremely fast — compiled directly to native machine code the CPU natively executes', 'Slower — interpreted line-by-line or run via intermediate virtual machines (JVM)'],
      ['Hardware Access', 'Direct, unrestricted access to hardware registers, memory pointers, and bit manipulation', 'Shielded via thick abstraction layers; direct hardware access is restricted or impossible'],
      ['Learning Curve', 'Steep — forces understanding of deep computer architecture, memory models, and CPU behavior', 'Gentle — allows focus purely on logical business outcomes without hardware knowledge'],
      ['Error Handling', 'No built-in exceptions — programmer must manually check every operation for errors', 'Built-in try/catch exception handling automatically catches and manages errors'],
      ['Safety Net', 'None — forgotten memory release = memory leaks, wrong address = segmentation fault crash', 'Extensive — automatic memory management, bounds checking, type safety features'],
      ['Portability', 'Highly portable — C compilers exist for virtually every processor architecture in existence', 'Varies — Python needs interpreter, Java needs JVM, JavaScript needs browser/Node.js runtime'],
      ['Use Today', 'Linux kernel, Windows kernel, macOS kernel, databases, embedded systems, game engines', 'Web apps, data science, mobile apps, enterprise backend, scripting, automation'],
    ]} />

  <div className="mt-4"><ImportantNote color="#ef4444">
    The limitation of C is that this exactness makes it incredibly unforgiving. A single forgotten memory release leads to <strong className="text-white">application-killing memory leaks</strong>, and accessing the wrong memory address leads to instantaneous crashes known as <strong className="text-white">segmentation faults</strong>. C lacks Object-Oriented Programming (no classes or inheritance), built-in exception handling (no try-catch), and built-in string handling. Requires strict <strong className="text-white">manual memory management</strong> (malloc and free). If a programmer forgets to free memory, it causes severe memory leaks or buffer overflows, leading to system crashes or security vulnerabilities.
  </ImportantNote></div>

  <div className="mt-6"><CLanguageTimeline /></div>
</section></RevealOnScroll>

{/* ════════════════════ PART 6 ════════════════════ */}
<RevealOnScroll><section id="part-6">
  <SectionBadge number={6} title="The Foundation of Performance" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Memory Architecture — Very Important</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">To truly master programming and excel in FAANG interviews, an engineer must achieve absolute clarity regarding memory architecture.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-6">
    In C, memory is <strong className="text-white">not</strong> perceived as an abstract cloud or an infinite void. It is a <strong className="text-white">rigid, physical, heavily structured space</strong>. The most effective mental model is to visualize RAM as a massive, perfectly linear street of post office boxes — a <strong className="text-white">linear address space</strong>.
  </p>

  <InfoCard icon={Server} title="The Post Office Analogy — Linear Address Space" color="#3b82f6">
    <p>Each individual post office box represents exactly <strong className="text-white">1 byte of RAM</strong>. Every box has a unique, sequential, permanent, unalterable number (the <strong className="text-white">Memory Address</strong>) — starting from 0 up to several billion (depending on RAM size). This system is called <strong className="text-white">byte-level addressing</strong>.</p>
    <p>The <strong className="text-white">Memory Address</strong> is the specific number engraved on the outside of the P.O. Box (e.g., Box #1004). This number is permanent and never changes; it strictly identifies the physical location. The <strong className="text-white">Data</strong> is the physical letter placed inside the box. The contents of the box can be removed, changed, or replaced at any time.</p>
    <p>A running program operates by constantly sending instructions to the CPU to either <strong className="text-white">&quot;read the letter currently inside Box #1004&quot;</strong> or <strong className="text-white">&quot;erase the current letter and put a new mathematical result in Box #1004&quot;</strong>.</p>
    <p>When a program stores data, the <strong className="text-white">physical size determines how many consecutive boxes</strong> it must rent from the OS. For example, a standard <code className="text-[#3b82f6] bg-white/[0.05] px-1 rounded">int</code> requires 4 bytes. If the OS assigns it to address 2000, the hardware will reserve contiguous addresses 2000, 2001, 2002, and 2003 to hold that single piece of data.</p>
  </InfoCard>

  <MemoryBoxes />

  <div className="mt-6"><MemoryAllocationSim /></div>

  <h3 className="text-lg font-bold text-white mb-3 mt-6">Data Size Reference</h3>
  <DataTable headers={['Data Type', 'Size', 'Boxes Needed', 'Example', 'Range']}
    rows={[
      ['char', '1 byte (8 bits)', '1 box', "'A' = 01000001", '-128 to 127 or 0 to 255'],
      ['int', '4 bytes (32 bits)', '4 consecutive boxes', '42 = 00000000 00000000 00000000 00101010', '-2.1 billion to +2.1 billion'],
      ['float', '4 bytes (32 bits)', '4 consecutive boxes', '3.14 in IEEE 754 floating-point format', '±3.4 × 10³⁸ (6-7 significant digits)'],
      ['double', '8 bytes (64 bits)', '8 consecutive boxes', 'Higher precision decimal numbers', '±1.7 × 10³⁰⁸ (15-16 significant digits)'],
      ['pointer', '8 bytes (64-bit OS)', '8 consecutive boxes', 'Stores a memory address like 0x7FFFC00', 'Full 64-bit address range'],
    ]} />

  <div className="mt-6"><DataSizeVisualizer /></div>

  <div className="mt-6"><MemorySegmentDiagram /></div>

  <div className="mt-6"><Collapsible title="⚡ Contiguous Memory & CPU Cache — Critical Performance Concept" defaultOpen>
    <p className="mb-3"><strong className="text-white">Contiguous memory</strong> means that related pieces of data are stored in adjacent memory addresses, placed perfectly side-by-side in a continuous block without any gaps. In high-performance systems — the kind built by Apple or Google — contiguous memory is a <strong className="text-white">paramount concern</strong> for execution speed.</p>
    <p className="mb-3">Modern CPUs operate so rapidly that physically waiting for data electrical signals to travel from the RAM sticks to the CPU chip is considered a <strong className="text-white">massive bottleneck</strong>. To solve this, CPU manufacturers build tiny, ultra-fast internal memory banks directly onto the CPU silicon, known as <strong className="text-white">Caches</strong>.</p>
    <p className="mb-3">When a CPU requests data from address 100, it doesn&apos;t just grab box 100 — the CPU hardware assumes that if the programmer is reading box 100, they will likely need boxes 101, 102, and 103 very soon. Therefore, it automatically grabs <strong className="text-white">a large chunk of contiguous memory (say, boxes 100 through 164)</strong> and pulls the entire block into the ultra-fast Cache. This behavior principle is called <strong className="text-white">spatial locality</strong>.</p>
    <p className="mb-3">Certain foundational data structures, most notably <strong className="text-white">Arrays</strong>, rely entirely on contiguous memory allocation. This means all elements within the array are placed side-by-side without any gaps in the linear address space. If an array of integers begins at base address 1000, the first integer occupies 1000-1003. The second integer is located precisely at 1004, the third at 1008, and so on. Because the memory is perfectly contiguous, the computer can use <strong className="text-white">simple math to instantly calculate the exact address</strong> of the millionth item in the array:</p>
    <CodeBlock title="Array Address Calculation Formula" code={`// Address of element[i] = BaseAddress + (i × sizeof(type))\n// Example: int array starting at address 1000\n// array[0] → 1000 + (0 × 4) = address 1000\n// array[1] → 1000 + (1 × 4) = address 1004\n// array[2] → 1000 + (2 × 4) = address 1008\n// ...\n// array[999999] → 1000 + (999999 × 4) = address 4000996\n// Instant O(1) access to ANY element!`} />
    <div className="mt-4"><CPUCacheVisual /></div>
    <ImportantNote>System design interviews at top tech companies consistently test a candidate&apos;s understanding of this exact caching principle. If a programmer organizes data contiguously (like in an Array), the CPU continuously finds exactly what it needs right there in the cache, resulting in <strong className="text-white">blazing fast O(1) access performance</strong>. This is why arrays are the single most important data structure in all of computer science.</ImportantNote>
  </Collapsible></div>

  <div className="mt-4"><Collapsible title="🔌 RAM vs. Storage: Volatility Deep Dive">
    <DataTable headers={['Property', 'RAM', 'Storage (SSD/HDD)']}
      rows={[
        ['Technology', 'Microscopic capacitors holding electrical charges', 'Magnetic polarity (HDD) or non-volatile flash gates (SSD)'],
        ['Persistence', 'Volatile — loses ALL data instantly when power off', 'Non-volatile — retains data permanently, even without power'],
        ['Speed', 'Ultra-fast (nanoseconds access time)', 'Much slower (microseconds for SSD, milliseconds for HDD)'],
        ['Purpose', 'Active workspace — code runs FROM here', 'Long-term vault — code stored here, must be loaded into RAM first'],
        ['Cost', 'Expensive per GB (~$3-5/GB)', 'Cheap per GB (~$0.05-0.10/GB)'],
        ['Typical Size', '8-64 GB in modern machines', '256 GB - 4 TB in modern machines'],
      ]} />
  </Collapsible></div>
</section></RevealOnScroll>

{/* ════════════════════ PART 7 ════════════════════ */}
<RevealOnScroll><section id="part-7">
  <SectionBadge number={7} title="Abstraction of Memory" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Variables — Conceptual Mechanics</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">Attempting to program by memorizing hex addresses like 0x7FFFC00 is impossible for the human brain. Variables solve this.</p>

  <p className="text-[#b0bec5] leading-[1.9] mb-6">
    A variable is simply another layer of <strong className="text-white">abstraction</strong>. It allows a programmer to attach a friendly, human-readable name to a specific, complex memory address. A variable is not just a name — it is a conceptual container of <strong className="text-white">four distinct, inseparable components</strong>:
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
    {[
      { title: 'Name (Identifier)', desc: 'Human-readable label created by the programmer (e.g., userScore, playerAge). Must adhere to strict naming conventions: no spaces, cannot start with a number, case-sensitive. C treats playerAge and playerage as completely different variables.', color: '#22c55e', example: 'playerAge' },
      { title: 'Address (Identity)', desc: 'The actual numeric, physical location on the RAM street where the data lives (e.g., byte number 1024). This is the physical, immovable locker itself — it never changes during the variable\'s lifetime.', color: '#3b82f6', example: '0x7FFF1024' },
      { title: 'Value', desc: 'The actual binary data currently stored inside that physical location. Entirely transient — can be wiped, overwritten, and replaced billions of times per second during execution.', color: '#f59e0b', example: '99' },
      { title: 'Type', desc: 'Specifies the locker size (how many bytes to reserve on the street) and how to decode the binary inside: int = 4 bytes, char = 1 byte, double = 8 bytes. The type is set at declaration and cannot change.', color: '#a855f7', example: 'int (4 bytes)' },
    ].map(v => (
      <Card3D key={v.title} glowColor={v.color}>
        <div className="h-1 rounded-t-xl -mt-5 -mx-5 sm:-mx-6 mb-4" style={{ background: v.color }} />
        <h4 className="text-white font-bold text-sm mb-2">{v.title}</h4>
        <p className="text-xs text-[#94a3b8] leading-relaxed mb-2">{v.desc}</p>
        <code className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background: `${v.color}15`, color: v.color }}>{v.example}</code>
      </Card3D>
    ))}
  </div>

  <Collapsible title="🔍 Identity vs Value — The Physical Locker vs Its Contents" defaultOpen>
    <p className="mb-3">A critical distinction that <strong className="text-white">FAANG-level engineers</strong> maintain is the difference between the <strong className="text-white">Identity</strong> of a variable and its <strong className="text-white">Value</strong>.</p>
    <div className="grid md:grid-cols-2 gap-3 mb-3">
      <div className="p-4 rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.04]">
        <h5 className="text-[#3b82f6] font-bold text-sm mb-1">🏠 Identity (Address)</h5>
        <p className="text-xs text-[#94a3b8] leading-relaxed">The physical, <strong className="text-white">immovable location</strong> in RAM. Think of it as the locker number on the post office street. The locker number <strong className="text-white">never changes</strong> — box #1024 is always box #1024, regardless of what&apos;s stored inside.</p>
      </div>
      <div className="p-4 rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.04]">
        <h5 className="text-[#f59e0b] font-bold text-sm mb-1">📦 Value (Contents)</h5>
        <p className="text-xs text-[#94a3b8] leading-relaxed">The <strong className="text-white">transient data</strong> currently occupying that space. It can be wiped, overwritten, and replaced <strong className="text-white">billions of times</strong> during a single second of execution. The value is temporary; the address is permanent.</p>
      </div>
    </div>
    <KeyPoint>When you write <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">int age = 25;</code>, C reserves 4 consecutive bytes at a fixed address (say 0x1024-0x1027), and stores the binary representation of 25 inside those bytes. The address 0x1024 is the <strong className="text-white">identity</strong>. The number 25 is the <strong className="text-white">value</strong>. They are fundamentally different things.</KeyPoint>
  </Collapsible>

  <div className="mt-4">
  <Collapsible title="🎯 L-value vs R-value — FAANG Interview Critical Concept" defaultOpen>
    <p className="mb-3"><strong className="text-white">L-value (Locator Value)</strong> = an object occupying an identifiable, specific location in memory. It is the <strong className="text-white">physical locker itself</strong> — capable of holding data.</p>
    <p className="mb-3"><strong className="text-white">R-value (Read Value)</strong> = the raw data value or a temporary mathematical result. It does <strong className="text-white">not possess a permanent address</strong>.</p>
    <CodeBlock title="Understanding Assignment Direction" code={`// In this statement:
playerAge = 25;

// playerAge → L-value (the destination locker on the LEFT)
//        25 → R-value (the raw data on the RIGHT)
// The CPU copies the R-value INTO the L-value's address

// This is INVALID and causes Compilation Error:
25 = playerAge;  // ❌ ERROR!
// WHY? Because 25 is an abstract mathematical concept
// It does NOT have a physical memory location to store data

// CRITICAL INSIGHT:
// The = sign in C is NOT mathematical equality
// It is a DIRECTIONAL COMMAND:
// "Copy the R-value INTO the L-value's memory address"`} />
    <ImportantNote>Grasping this distinction early ensures the beginner understands that <code className="text-[#22c55e]">=</code> in programming represents an explicit <strong className="text-white">directional command</strong>, not mathematical equality. It instructs the CPU: &quot;Copy the R-value INTO the L-value&apos;s memory address.&quot;</ImportantNote>
  </Collapsible>
  </div>

  <div className="mt-6"><VariableAnatomyVisualizer /></div>

  <div className="mt-4"><Collapsible title="📝 Variable Naming Conventions — Professional Standards">
    <p className="mb-3">In C, variable names must adhere to strict rules. Understanding these conventions is essential for writing professional, maintainable code:</p>
    <DataTable headers={['Rule', 'Valid Examples', 'Invalid Examples', 'Why']}
      rows={[
        ['Must start with letter or underscore', 'age, _count, playerScore', '1stPlace, 2name', 'Compiler needs to distinguish variables from numeric literals'],
        ['Case-sensitive', 'age ≠ Age ≠ AGE', 'N/A', 'C treats uppercase and lowercase as completely different characters'],
        ['No spaces allowed', 'player_score, playerScore', 'player score', 'Spaces are token separators — compiler thinks it is two separate entities'],
        ['No reserved keywords', 'myReturn, intValue', 'int, return, if, while', 'These words have special hardcoded meaning in the C compiler'],
        ['Use descriptive names', 'totalStudents, maxRetries', 'x, a, temp123', 'Code readability is paramount — future you must understand this code'],
      ]} />
    <KeyPoint>Professional C code uses either <strong className="text-white">snake_case</strong> (player_score) or <strong className="text-white">camelCase</strong> (playerScore). Pick one convention and maintain it consistently throughout your entire codebase. Inconsistency signals amateur code to FAANG interviewers.</KeyPoint>
  </Collapsible></div>
</section></RevealOnScroll>

{/* ════════════════════ PART 8 ════════════════════ */}
<RevealOnScroll><section id="part-8">
  <SectionBadge number={8} title="Architectural Elements" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">The Strict Structure of a C Program</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">Source code is the raw, human-readable text saved in a .c file — a signal that it follows C&apos;s grammatical rules.</p>

  <CodeBlock title="Complete Anatomy — Every Element Explained" code={`#include <stdio.h>       // Preprocessor directive

int main(void) {         // Entry point function
    printf("Hello!\\n");  // Function call + escape sequence
    return 0;            // Exit status code
}                        // Scope terminator`} />

  <div className="mt-6 space-y-3">
    {[
      { title: '#include <stdio.h>', desc: 'C is extraordinarily minimal. Out of the box, it cannot even print text or read keyboard input. The #include directive tells the compiler to borrow pre-written code from the system\'s standard libraries. "stdio.h" = Standard Input Output Header. By including it, the programmer gains access to vital tools like printf() and scanf() — saving them from manually interfacing with monitor hardware drivers.', color: '#3b82f6' },
      { title: 'int main(void)', desc: 'Every single C program in existence — from a 10-line academic script to a million-line database engine — must have exactly ONE main() function. It is the absolute starting point, the "front door" of the application. When the OS loads the program into RAM, it scans for "main" and commands the CPU\'s instruction pointer to begin executing here. The "int" means it returns an integer exit status. "void" means it takes no arguments.', color: '#22c55e' },
      { title: 'Curly Braces { }', desc: 'In C, braces physically define "scope" or boundaries. They act as the walls of a room. Everything between { and } belongs exclusively to that function. This allows the computer to know exactly where instructions begin and terminate. Forgetting to close a brace = immediate compilation error.', color: '#f59e0b' },
      { title: 'Semicolons ;', desc: 'The C compiler is entirely blind to aesthetics — it completely ignores whitespace, blank lines, and formatting. It reads the entire document as one giant continuous stream of text. The semicolon is the absolute, unyielding signal that a specific logical instruction has concluded. Forgetting a semicolon is like running two massive sentences together — it deeply confuses the deterministic machine and guarantees immediate compilation failure.', color: '#a855f7' },
      { title: 'return 0;', desc: 'When a program finishes, it must report its final status to the parent OS. By deep-rooted C and UNIX convention: exit code 0 = "Success. Everything executed without errors." If the program experienced catastrophic failure, ran out of memory, or encountered invalid data, it returns 1 or -1, alerting the OS that something went terribly wrong so it can handle the failure appropriately.', color: '#ef4444' },
    ].map(item => (
      <motion.div key={item.title} whileHover={{ x: 4 }}
        className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
        <div className="w-2 h-full min-h-[20px] rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
        <div>
          <h4 className="text-white font-semibold text-sm font-mono mb-1">{item.title}</h4>
          <p className="text-xs text-[#94a3b8] leading-[1.8]">{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>

  <div className="mt-6">
    <Collapsible title="📂 Header Files (.h) vs Source Files (.c) — The Blueprint System" defaultOpen>
      <p className="mb-3">C uses a two-file system to organize code. Understanding this distinction is critical:</p>
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <div className="p-4 rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.04]">
          <h5 className="text-[#3b82f6] font-bold text-sm mb-2">📋 Header Files (.h)</h5>
          <p className="text-xs text-[#94a3b8] leading-relaxed">Contain <strong className="text-white">declarations and prototypes</strong> — the structural blueprints. They tell the compiler &quot;these functions exist and here is what they look like&quot; without providing the actual code. Think of them as a <strong className="text-white">restaurant menu</strong>: it tells you what dishes exist, but doesn&apos;t contain the recipe.</p>
          <p className="text-xs text-[#64748b] italic mt-2">Example: stdio.h declares that printf() exists and takes specific parameters.</p>
        </div>
        <div className="p-4 rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/[0.04]">
          <h5 className="text-[#22c55e] font-bold text-sm mb-2">📝 Source Files (.c)</h5>
          <p className="text-xs text-[#94a3b8] leading-relaxed">Contain the <strong className="text-white">actual implementation code</strong> — the real logic, algorithms, and instructions. This is where the compiler finds the runnable code. Think of them as the <strong className="text-white">kitchen where the actual cooking happens</strong>.</p>
          <p className="text-xs text-[#64748b] italic mt-2">Example: The actual C code that makes printf() work lives in pre-compiled library files.</p>
        </div>
      </div>
      <KeyPoint>The <code className="text-[#22c55e] bg-white/[0.05] px-1 rounded">#include &lt;stdio.h&gt;</code> directive tells the preprocessor to locate stdio.h and literally copy-paste its entire textual contents directly into the top of your source code. Without importing these blueprints, the compiler would not recognize commands meant to interact with the screen or keyboard.</KeyPoint>
    </Collapsible>
  </div>
</section></RevealOnScroll>

{/* ════════════════════ PART 9 ════════════════════ */}
<RevealOnScroll><section id="part-9">
  <SectionBadge number={9} title="From Source Code to Machine Code" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">The Compilation Process</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">The CPU cannot read English or ASCII — it only reads binary machine code. The compiler (GCC) orchestrates this massive translation.</p>

  <CompilationPipeline />

  <h3 className="text-lg font-bold text-white mb-3 mt-6">Detailed Compilation Stages</h3>
  <DataTable headers={['Stage', 'Input', 'Process Performed', 'Output']}
    rows={[
      ['1. Preprocessing', '.c source code', 'Scans file, strips ALL human comments (CPU doesn\'t need them), finds #include directives and physically copy-pastes entire header file contents into source code, expands macros', '.i preprocessed file (massively expanded)'],
      ['2. Compilation', '.i preprocessed file', 'Heavily analyzes grammar, syntax, and logic of C code. Once validated, translates high-level C into Assembly language — a lower-level symbolic representation specific to CPU architecture (x86/ARM)', '.s assembly file'],
      ['3. Assembly', '.s assembly file', 'The Assembler maps symbolic assembly instructions (MOV, ADD, SUB) directly to raw binary machine code (0s and 1s) that the physical CPU silicon can natively execute', '.o object file (binary)'],
      ['4. Linking', '.o object file(s)', 'The Linker merges the newly minted object file with pre-compiled binary code of external libraries (e.g., the actual binary that runs printf). Resolves all memory addresses into a cohesive unit', '.exe/.out executable'],
    ]} />

  <div className="mt-6"><Collapsible title="🚀 The Loader — Breathing Life into Static Binary" defaultOpen>
    <p className="mb-3">Once the Linker finishes, the executable file sits passively on the slow Storage drive — a lifeless collection of binary instructions. When the user runs it, a <strong className="text-white">highly complex orchestration</strong> occurs within milliseconds:</p>
    <div className="space-y-3">
      {[
        { step: 'Shell Interaction', desc: 'The GUI shell (e.g., explorer.exe on Windows) registers the user\'s double-click and calls a system function to open the file.' },
        { step: 'Loader Takes Control', desc: 'The Operating System\'s Loader program takes control. The Loader is responsible for placing the executable program from the slow storage drive into the system\'s main RAM.' },
        { step: 'Mode Switching', desc: 'The OS switches from User Mode to Kernel Mode via a system call (like CreateProcess). The kernel allocates an isolated, private address space in the physical RAM for the program.' },
        { step: 'Environment Construction', desc: 'The loader builds necessary runtime data structures, such as the Process Environment Block (PEB), and organizes the newly allocated RAM into specific functional segments: a Text segment for code instructions, a Stack segment for function calls and local variables, and a Heap segment for dynamic memory allocation.' },
        { step: 'Execution Begins', desc: 'Finally, the CPU\'s instruction pointer is directed to the exact memory address of the main() function, and the hardware begins executing the binary logic sequentially.' },
      ].map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="flex items-start gap-3">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: `${PHASE_COLOR}15`, color: PHASE_COLOR }}>{i + 1}</span>
          <div>
            <span className="text-white font-semibold text-sm">{s.step}</span>
            <p className="text-xs text-[#94a3b8] mt-0.5">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="mt-4">
      <KeyPoint>The final output of the linking stage is an executable binary file. On Windows, it is formatted as a <strong className="text-white">PE (Portable Executable)</strong> file with an .exe extension; on Linux, it is an <strong className="text-white">ELF (Executable and Linkable Format)</strong> file. These files contain not just raw machine instructions, but also complex structural headers that tell the operating system how to handle the program, what its memory requirements are, and where the entry point (main) resides.</KeyPoint>
    </div>
  </Collapsible></div>

  <div className="mt-6"><CompilationLiveDemo /></div>

  <div className="mt-6"><ExecutionFlowAnimator /></div>
</section></RevealOnScroll>

{/* ════════════════════ PART 10 ════════════════════ */}
<RevealOnScroll><section id="part-10">
  <SectionBadge number={10} title="Hello World & Error Types" />
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Writing Your First Safe Code</h2>
  <p className="text-[#64748b] text-sm mb-6 italic">This tiny 5-line program leverages every single concept discussed in this entire lesson.</p>

  <CodeBlock title="Hello, World! — The Complete Foundation" code={`#include <stdio.h>    // Borrow standard I/O library (printf lives here)

int main(void) {      // THE entry point - OS starts execution here
    printf("Hello, World!\\n");  // Print text + newline escape sequence
    return 0;         // Tell OS: "Success, no errors occurred"
}
// This program: includes library → enters main → calls printf
// → printf maps each character to ASCII → ASCII to binary
// → binary drives electrical voltages to illuminate screen pixels
// → returns success code to operating system`} />

  <div className="mt-6">
    <h3 className="text-lg font-bold text-white mb-3">📜 Escape Sequences — Hidden Control Codes</h3>
    <p className="text-[#b0bec5] text-sm mb-3 leading-[1.8]">
      The backslash <code className="text-[#22c55e]">\</code> warns the compiler: <em>&quot;Do not print the next letter literally. The next letter is a secret code.&quot;</em> This dates back to when output was physically printed on paper via mechanical teletype machines — pressing Enter required two actions: Carriage Return (head back to left edge) and Line Feed (roll paper up one line).
    </p>
    <DataTable headers={['Sequence', 'Name', 'ASCII Dec', 'Effect', 'Historical Origin']}
      rows={[
        ['\\n', 'Line Feed (New Line)', '10', 'Moves cursor to the beginning of next line', 'Rolling paper up one line on teletype'],
        ['\\t', 'Horizontal Tab', '9', 'Inserts a tab-width space (usually 4-8 chars)', 'Tabulator stops on typewriters'],
        ['\\r', 'Carriage Return', '13', 'Moves cursor back to start of same line', 'Moving print head to left edge'],
        ['\\\\', 'Literal Backslash', '92', 'Prints a single backslash character', 'Needed because \\ is the escape character itself'],
        ['\\\"', 'Literal Double Quote', '34', 'Prints a double quote inside a string', 'Needed because " normally terminates strings'],
        ['\\0', 'Null Terminator', '0', 'Marks the end of a string in memory (invisible)', 'C strings need an explicit end marker'],
        ['\\a', 'Alert (Bell)', '7', 'Produces an audible beep from the system speaker', 'Physical bell on teletype machines'],
      ]} />
  </div>

  <div className="mt-6">
    <h3 className="text-lg font-bold text-white mb-4">⚠️ Error Types — Critical Distinction</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <InfoCard icon={Code2} title="Compilation Error (Syntax Error)" color="#f59e0b">
        <p>Occurs entirely during <strong className="text-white">Stage 2 of the Compilation Process</strong>. The programmer has violated C&apos;s strict grammatical and structural rules.</p>
        <p><strong className="text-white">Examples:</strong> Forgotten semicolon, unclosed curly brace, misspelled keyword, missing parenthesis.</p>
        <p>Because computers are entirely deterministic and cannot rely on context to guess what the human &quot;meant&quot; to do, the compiler <strong className="text-white">immediately halts</strong> and <strong className="text-white">refuses to generate an executable</strong> until the grammar is mathematically perfect.</p>
        <p className="text-xs text-[#64748b] italic mt-2">Caught BEFORE code runs. Fix by correcting syntax.</p>
      </InfoCard>
      <InfoCard icon={AlertTriangle} title="Runtime Error" color="#ef4444">
        <p>Code is <strong className="text-white">grammatically perfect</strong> — compiler generates the executable successfully. But once the Loader places the file into RAM and the CPU begins executing it, it encounters a <strong className="text-white">physically impossible instruction</strong>.</p>
        <p><strong className="text-white">Examples:</strong> Dividing by zero, accessing forbidden memory, buffer overflow, null pointer dereference, stack overflow from infinite recursion.</p>
        <p>The compiler <strong className="text-white">cannot catch these</strong> because it only checks grammar. The <strong className="text-white">CPU catches them when it attempts the physically impossible task</strong>, causing an immediate crash.</p>
        <p className="text-xs text-[#64748b] italic mt-2">Caught DURING execution. Fix by adding logic guards.</p>
      </InfoCard>
    </div>
  </div>

  <div className="mt-6"><ErrorTypeComparison /></div>

  <div className="mt-6"><PrintfUnderTheHood /></div>

  <div className="mt-6"><EscapeSequencePlayground /></div>

  <div className="mt-6 grid md:grid-cols-2 gap-4">
    <div>
      <h4 className="text-sm font-bold text-[#f59e0b] mb-2">❌ Compilation Error Example</h4>
      <CodeBlock title="Missing Semicolon — Syntax Error" code={`#include <stdio.h>\n\nint main(void) {\n    printf("Hello")  // ❌ MISSING SEMICOLON!\n    return 0;        // Compiler halts HERE\n}\n// Error: expected ';' before 'return'\n// Compiler refuses to create executable`} />
    </div>
    <div>
      <h4 className="text-sm font-bold text-[#ef4444] mb-2">❌ Runtime Error Example</h4>
      <CodeBlock title="Division by Zero — Runtime Crash" code={`#include <stdio.h>\n\nint main(void) {\n    int x = 10;\n    int y = 0;\n    int result = x / y;  // 💥 CPU CRASH!\n    // Syntax is perfect - compiler says OK\n    // But CPU cannot divide by zero\n    // Program crashes at runtime\n    printf("%d", result);\n    return 0;\n}`} />
    </div>
  </div>

  {/* Conclusion */}
  <motion.div className="mt-10 p-6 sm:p-8 rounded-2xl relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/[0.08] via-[#3b82f6]/[0.05] to-[#a855f7]/[0.05] rounded-2xl" />
    <div className="absolute inset-0 border border-[#22c55e]/[0.15] rounded-2xl" />
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white mb-3">🎯 The Paradigm Shift — Day 1 Complete</h3>
      <p className="text-[#c8d0db] text-sm leading-[1.9] mb-4">
        By fully absorbing that the computer is merely a vast, linear street of electrical switches executing deterministic, sequential instructions <strong className="text-white">without an ounce of context</strong>, you have fundamentally shifted your perspective. You are no longer attempting to &quot;speak&quot; to a machine — you are <strong className="text-white">architecting a flawless sequence of logical abstractions</strong>.
      </p>
      <p className="text-[#c8d0db] text-sm leading-[1.9] mb-4">
        This mental model — bridging the massive gap between a high-level <code className="text-[#22c55e]">printf</code> statement and the microscopic electrical voltages firing inside the CPU&apos;s contiguous memory caches — is the <strong className="text-white">exact foundational mindset required to excel at the highest echelons of software engineering</strong>.
      </p>

      <h4 className="text-white font-bold text-sm mb-3">✅ Concepts Mastered Today:</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          'Fixed vs Programmable Machines', 'Deterministic Behavior', 'IPOS Model',
          'CPU / RAM / Storage', 'Binary Number System', 'Bits & Bytes',
          'ASCII Translation', 'Abstraction Layers', 'Algorithms',
          'C Language Position', 'Memory Architecture', 'Contiguous Memory & Cache',
          'Variables (4 Components)', 'Identity vs Value', 'L-value vs R-value',
          'C Program Structure', 'Compilation Pipeline', 'The Loader',
          'printf & Escape Sequences', 'Syntax vs Runtime Errors',
        ].map((concept, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[#22c55e] text-xs">✓</span>
            <span className="text-[11px] text-[#c8d0db]">{concept}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-5">
        <KeyPoint>
          This is your foundation. Tomorrow in Day 2, we build on this entire mental model by diving into data types, variable declarations, printf formatting, and your first real interactive programs. Every single concept from today will be referenced and expanded upon.
        </KeyPoint>
      </div>
    </div>
  </motion.div>
</section></RevealOnScroll>

          {/* ═══ Navigation ═══ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center justify-between pt-8 border-t border-white/[0.06]">
            <Link href="/coding/c-language"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/[0.05] transition-all">
              <ChevronLeft className="w-4 h-4" /> Blueprint
            </Link>
            <Link href="/coding/c-language/day/2"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg"
              style={{ backgroundColor: PHASE_COLOR }}>
              Day 2: Data &amp; Memory Control <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
