/**
 * day1-quiz-data.ts — Complete Q&A Data for Day 1
 * Extracted from provided Google Docs for FAANG preparation
 */

export interface MCQ {
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

export interface ShortQA {
  question: string;
  answer: string;
}

export interface LongQA {
  question: string;
  answer: string;
}

export interface PartQuizData {
  partNumber: number;
  partTitle: string;
  mcqs: MCQ[];
  shortQAs: ShortQA[];
  longQAs: LongQA[];
}

export const DAY1_QUIZ_DATA: PartQuizData[] = [
  // ═══════════════════════════════════════════
  // PART 1: What Is a Machine?
  // ═══════════════════════════════════════════
  {
    partNumber: 1,
    partTitle: 'What Is a Machine?',
    mcqs: [
      {
        question: 'What is the primary characteristic of a fixed-function machine?',
        options: ['It can run multiple programs', 'Its logic is frozen in its physical arrangement', 'It uses software to change behavior', 'It requires an operating system'],
        correct: 1,
        explanation: 'A fixed-function machine is physically wired to do one thing. Its internal circuitry and interconnections are permanent — the logic is literally frozen in the physical arrangement of its parts.',
      },
      {
        question: 'What mathematical concept describes a computer\'s ability to simulate any other machine?',
        options: ['Binary Theorem', 'Moore\'s Law', 'Universal Turing Machine', 'Von Neumann Architecture'],
        correct: 2,
        explanation: 'The Universal Turing Machine concept dictates that given enough time and memory, a computer can simulate the logic of ANY other machine in existence.',
      },
      {
        question: 'If a computer adds 2 + 3 ten billion times, how many times will it output something other than 5?',
        options: ['Approximately 0.001% of the time', 'Zero times — this is deterministic behavior', 'Depends on CPU temperature', 'Once every million iterations'],
        correct: 1,
        explanation: 'Deterministic behavior means given the exact same input, the machine produces the exact same output every single time — zero deviation, zero hesitation, zero error.',
      },
      {
        question: 'Why do beginners often struggle when learning to program?',
        options: ['Programming languages are too complex', 'They project human cognitive traits onto the computer', 'Computers are unreliable', 'They type too slowly'],
        correct: 1,
        explanation: 'Beginners often assume the computer can "understand" context like a human. But machines have zero contextual awareness — they execute exactly what is written, nothing more.',
      },
      {
        question: 'Which of the following is an example of a programmable machine?',
        options: ['A mechanical toaster', 'A basic pocket calculator', 'A modern smartphone', 'A mechanical clock'],
        correct: 2,
        explanation: 'A smartphone is a programmable machine — its physical hardware remains static, but different software makes it function as a camera, calculator, GPS, game console, etc.',
      },
      {
        question: 'If a programmer writes valid instructions in an illogical order, what principle dictates that the computer will still follow them exactly as written?',
        options: ['Hardware Abstraction', 'Deterministic behavior', 'Volatile Memory Allocation', 'The Compilation Process'],
        correct: 1,
        explanation: 'Deterministic behavior ensures the machine executes exactly the instructions provided, in the exact sequence provided, producing a predictable result — even if logically flawed.',
      },
    ],
    shortQAs: [
      {
        question: 'What is deterministic behavior in computing?',
        answer: 'Deterministic behavior means that given the exact same initial state and the exact same input, the machine will consistently produce the exact same output, without exception. If 2+3=5 is computed, it will output 5 every single time without deviation.',
      },
      {
        question: 'How does a programmable machine differ from a fixed-function machine?',
        answer: 'A fixed-function machine is physically wired to do one unchangeable task (e.g., toaster, mechanical clock). A programmable machine decouples hardware from the task — the same physical hardware can perform different tasks by changing the software instructions.',
      },
      {
        question: 'What is a Universal Turing Machine?',
        answer: 'A mathematical concept that dictates a machine, given enough time and infinite memory, can simulate the logic of any other machine in existence. Modern computers are considered Universal Turing Machines.',
      },
      {
        question: 'Why does a computer have zero common sense?',
        answer: 'A computer processes data purely through electrical signals following deterministic rules. It has no contextual awareness, intuition, or background knowledge. It relies entirely on the explicit precision of instructions provided by the programmer.',
      },
    ],
    longQAs: [
      {
        question: 'Explain the fundamental difference between fixed-function and programmable machines. Use the music box vs computer analogy.',
        answer: 'A fixed-function machine like a mechanical music box has its logic frozen in its physical arrangement. The brass cylinder contains tiny metal pins in an unalterable pattern — it plays ONE predefined melody. To hear a different song, you must physically dismantle the machine and forge a new cylinder. Hardware = Function.\n\nIn contrast, a programmable machine (computer) keeps its physical hardware entirely static while allowing infinite behavioral changes through software. A modern smartphone uses the exact same glass screen, battery, and silicon chip to function as a TV, GPS, trading terminal, communication device, and game console. The hardware is a universal canvas — only the software instructions change. Hardware = Universal Canvas, Software = Infinite Configurations.\n\nThis distinction is the cornerstone of computer science. The computer\'s power comes from decoupling the hardware from the task, allowing a single machine to become any other machine through instruction changes.',
      },
      {
        question: 'How does the concept of "deterministic behavior" separate human cognition from machine execution? Provide the domino analogy.',
        answer: 'Deterministic behavior means a system given the exact same initial conditions and inputs will unconditionally produce the exact same output, passing through identical internal states every time.\n\nThink of it like a row of dominoes — once the first domino is pushed, every subsequent domino falls in a perfectly predictable, predetermined sequence. No domino spontaneously falls in a different direction. No domino skips its neighbor. The entire cascade is governed by the physical arrangement established by the human who placed them.\n\nA computer program behaves identically: the programmer establishes the arrangement (the code), and the CPU executes the cascade with absolute, unwavering fidelity. This is the computer\'s greatest strength (absolute reliability) and its greatest limitation (zero contextual awareness).\n\nHumans, by contrast, are highly contextual and intuitive — they fill in gaps using common sense. A human can read a misspelled word and understand intent. A computer fails completely at the slightest deviation. Humans process ~50 bits/sec but with massive contextual depth; CPUs process billions of operations/sec but with absolutely zero understanding of what those operations mean.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 2: What Is a Computer? (IPOS)
  // ═══════════════════════════════════════════
  {
    partNumber: 2,
    partTitle: 'What Is a Computer?',
    mcqs: [
      {
        question: 'What does RAM represent in the restaurant kitchen analogy?',
        options: ['The pantry', 'The kitchen counter', 'The head chef', 'The dining table'],
        correct: 1,
        explanation: 'RAM is the kitchen counter — the active workspace where the chef (CPU) places ingredients currently being processed. It\'s fast but limited in space, and wiped clean when power is off.',
      },
      {
        question: 'In the IPOS cycle, which component is responsible for the "Process" phase?',
        options: ['RAM', 'Storage (SSD/HDD)', 'CPU', 'Monitor'],
        correct: 2,
        explanation: 'The CPU (Central Processing Unit) is the brain that performs all mathematical, logical, and organizational operations on incoming data.',
      },
      {
        question: 'What happens to data stored in RAM when the computer is turned off?',
        options: ['It is automatically saved to the hard drive', 'It is compressed and archived', 'It is completely erased', 'It remains intact for 24 hours'],
        correct: 2,
        explanation: 'RAM is volatile memory — it requires constant electrical flow to maintain data. When power is cut, ALL data in RAM evaporates instantly and completely.',
      },
      {
        question: 'Which of the following correctly represents the IPOS cycle for an ATM withdrawal?',
        options: [
          'Output → Process → Input → Storage',
          'Input (card+PIN) → Process (verify+calculate) → Output (dispense cash) → Storage (update database)',
          'Storage → Input → Output → Process',
          'Process → Storage → Input → Output',
        ],
        correct: 1,
        explanation: 'The ATM follows standard IPOS: card insertion and PIN entry (Input), verification and calculation (Process), cash dispensing (Output), and database update (Storage).',
      },
      {
        question: 'Why must data be loaded from Storage into RAM before the CPU can process it?',
        options: ['Storage is encrypted', 'Storage is too slow for the CPU to read directly', 'The CPU can only access RAM addresses', 'Storage devices are read-only'],
        correct: 1,
        explanation: 'Storage (HDD/SSD) is orders of magnitude slower than RAM. The CPU operates at nanosecond speeds and cannot afford to wait for slow storage access. Data must be loaded into ultra-fast RAM first.',
      },
    ],
    shortQAs: [
      {
        question: 'What does IPOS stand for and why is it universally inescapable?',
        answer: 'IPOS stands for Input-Process-Output-Storage. It is universally inescapable because every computing device — from a smartwatch to a massive Google server farm — operates on this exact four-step framework. There is no computing device on Earth that does not follow this sequence.',
      },
      {
        question: 'Explain the restaurant kitchen analogy for CPU, RAM, and Storage.',
        answer: 'CPU = Head Chef (processes/cooks ingredients extremely fast). RAM = Kitchen Counter (fast, active workspace where current ingredients sit — limited space, wiped clean at closing). Storage = Pantry (massive storage for all ingredients, but slow to retrieve from — food stays even when kitchen closes).',
      },
      {
        question: 'What is the difference between volatile and non-volatile memory?',
        answer: 'Volatile memory (RAM) loses ALL data when power is cut — it requires constant electricity to maintain electrical charge states. Non-volatile memory (SSD/HDD) retains data permanently even without power, using physical mechanisms like magnetic polarity or flash gates.',
      },
    ],
    longQAs: [
      {
        question: 'Detail the anatomy of a computer through the IPOS model. How do the CPU, RAM, and Storage collaborate to form a functional system?',
        answer: 'Every computing device operates on the IPOS framework:\n\n1. Input: Raw data enters via keyboards, mouse clicks, microphone audio, camera sensors, or network signals.\n\n2. Process: The CPU manipulates data according to software rules. It\'s the silicon brain — a chip capable of executing billions of operations per second. However, the CPU operates so fast that it cannot afford to wait for data from slow storage.\n\n3. Output: Processed information is returned as pixels on a monitor, audio from speakers, printed documents, or network packets.\n\n4. Storage: Data is retained either temporarily in RAM (volatile, fast, limited) or permanently on SSD/HDD (non-volatile, slow, massive).\n\nThe collaboration works as follows: When you click an app, the OS copies the program\'s code from Storage (pantry) into RAM (counter). The CPU (chef) then reads instructions from RAM at nanosecond speeds to process them. Results are sent to output devices and may be saved back to Storage for permanence.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 3: How Computer Understands?
  // ═══════════════════════════════════════════
  {
    partNumber: 3,
    partTitle: 'How Computer Understands?',
    mcqs: [
      {
        question: 'Why was the binary system chosen over base-10 for computer hardware?',
        options: [
          'Binary is faster to compute mathematically',
          'Base-10 requires distinguishing 10 voltage levels, which is unreliable due to signal degradation',
          'Binary was invented first',
          'Humans prefer counting in base-2',
        ],
        correct: 1,
        explanation: 'With base-10, a slight voltage fluctuation could cause hardware to mistake a 7 for an 8, causing catastrophic data corruption. Binary only has two states (ON/OFF), making it incredibly noise-resistant.',
      },
      {
        question: 'How many unique combinations can a single byte (8 bits) represent?',
        options: ['8', '64', '128', '256'],
        correct: 3,
        explanation: 'Each bit has 2 possible states. With 8 bits: 2⁸ = 256 unique combinations, from 00000000 to 11111111.',
      },
      {
        question: 'What is the ASCII decimal value for the capital letter "A"?',
        options: ['41', '55', '65', '97'],
        correct: 2,
        explanation: 'In ASCII, capital "A" = decimal 65 = binary 01000001. When you press "A" on the keyboard, it sends electrical signal representing 65 to the CPU.',
      },
      {
        question: 'What is abstraction in computer science?',
        options: [
          'Making code shorter',
          'Hiding complex underlying details behind a simple interface',
          'Converting code to binary',
          'Writing documentation',
        ],
        correct: 1,
        explanation: 'Abstraction is the process of hiding incredibly complex physical/mathematical details behind a simple, easy-to-use interface. Like a steering wheel abstracts the engine\'s complexity.',
      },
      {
        question: 'A transistor inside a CPU can be in which states?',
        options: ['ON and OFF only', 'ON, OFF, and Standby', 'High, Medium, and Low', 'Any voltage between 0V and 5V'],
        correct: 0,
        explanation: 'Transistors are engineered to recognize only two extreme states: ON (electricity flowing = 1) and OFF (electricity blocked = 0). This binary nature ensures maximum reliability.',
      },
      {
        question: 'Which of the following is the correct abstraction hierarchy from lowest to highest?',
        options: [
          'High-Level Lang → Assembly → Machine Code → Logic Gates → Transistors',
          'Transistors → Logic Gates → CPU → Machine Code → Assembly → High-Level Languages',
          'Assembly → C → Python → Machine Code',
          'CPU → RAM → Storage → Monitor',
        ],
        correct: 1,
        explanation: 'The hierarchy from lowest to highest: Physics/Electrons → Transistors → Logic Gates → CPU Microarchitecture → Machine Code → Assembly → High-Level Languages.',
      },
    ],
    shortQAs: [
      {
        question: 'What is a Bit and what is a Byte?',
        answer: 'A Bit (Binary Digit) is the absolute smallest unit of data — a single 0 or 1 representing an electrical ON or OFF state. A Byte is a contiguous grouping of exactly 8 bits. One byte can represent 256 different unique combinations (2⁸ = 256).',
      },
      {
        question: 'How does ASCII work as a translation bridge?',
        answer: 'ASCII is a standardized lookup table mapping numeric values to human characters. When you type "A", the keyboard sends decimal 65 to the CPU. The CPU converts 65 to binary 01000001 and stores it in memory. When displaying it, the system reads 65, checks the font file, and draws the corresponding pixels.',
      },
      {
        question: 'Why is binary more reliable than a base-10 system for hardware?',
        answer: 'In circuits, signals degrade due to resistance, temperature, and noise. With base-10, a 4.5V signal causes catastrophic confusion — is it 4 or 5? With binary, anything above ~2.5V = 1 (ON), below = 0 (OFF). Even if 5V degrades to 3V, it\'s still clearly "1". Zero ambiguity.',
      },
    ],
    longQAs: [
      {
        question: 'Explain the concept of Abstraction with the car analogy and the full computing hierarchy.',
        answer: 'Abstraction is the single most critical conceptual pillar in computer science — the process of hiding complex details behind a simple interface.\n\nCar Analogy: A driver interacts with a steering wheel, gas pedal, and brake. They do NOT need to understand thermodynamic combustion, fluid dynamics of the transmission, or spark plug electrical routing. The steering wheel completely shields the user from the underlying mechanical complexity.\n\nIn computing, the abstraction hierarchy is massive:\n• Physics (Electrons) — electrical voltage flow\n• Transistors — billions of tiny ON/OFF switches\n• Logic Gates — AND, OR, NOT, XOR, NAND\n• CPU Microarchitecture — pipelines, registers, ALU\n• Machine Code — raw binary 01001000 11001010\n• Assembly Language — MOV, ADD, SUB, JMP\n• High-Level Languages — C, Python, Java\n\nThis allows a programmer to type printf("Hello") without manually mapping ASCII codes, managing RAM addresses, or flipping billions of microscopic electrical switches. Without abstraction, every programmer would need expertise in quantum physics, electrical engineering, circuit design, and device drivers just to display one character.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 4: What Is Programming?
  // ═══════════════════════════════════════════
  {
    partNumber: 4,
    partTitle: 'What Is Programming?',
    mcqs: [
      {
        question: 'What is an algorithm?',
        options: [
          'A type of programming language',
          'A finite, step-by-step sequence of instructions to solve a problem',
          'A hardware component',
          'A debugging technique',
        ],
        correct: 1,
        explanation: 'An algorithm is a precise, unambiguous, finite sequence of instructions designed to solve a specific problem or perform a calculation. Algorithms exist everywhere — recipes, assembly manuals, etc.',
      },
      {
        question: 'In the PB&J experiment, what happens when you tell a robot "put the peanut butter on the bread"?',
        options: [
          'The robot makes a perfect sandwich',
          'The robot places the unopened jar on top of the bread bag',
          'The robot asks for clarification',
          'The robot opens the jar automatically',
        ],
        correct: 1,
        explanation: 'A deterministic machine takes instructions literally. Without explicit steps to open the jar and extract contents, the robot simply places the closed jar on the bread — demonstrating the need for exhaustive precision.',
      },
      {
        question: 'What is the Instruction Pointer (Program Counter)?',
        options: [
          'A mouse cursor on screen',
          'A variable that counts instructions',
          'A CPU hardware mechanism that reads instructions sequentially, line by line',
          'A debugging tool in IDEs',
        ],
        correct: 2,
        explanation: 'The Instruction Pointer is an internal CPU hardware mechanism that reads instructions sequentially from top to bottom. It never arbitrarily skips a step unless explicitly commanded via control flows.',
      },
      {
        question: 'Which of the following is the most accurate real-world example of an algorithm?',
        options: [
          'An abstract painting on a wall',
          'A step-by-step IKEA furniture assembly manual',
          'A thermometer measuring temperature',
          'An SSD storing a movie',
        ],
        correct: 1,
        explanation: 'An IKEA manual provides a step-by-step, ordered sequence to transition from raw materials to a finished product — this is exactly what an algorithm does.',
      },
      {
        question: 'What happens if a programmer writes code to divide by zero?',
        options: [
          'The compiler automatically fixes it',
          'The CPU produces infinity',
          'The program crashes at runtime — the CPU cannot execute the impossible operation',
          'Nothing happens',
        ],
        correct: 2,
        explanation: 'The machine will not skip it. The instruction pointer hits the divide-by-zero command, the ALU fails, and the entire application crashes. The machine assumes that if the programmer wrote it, they wanted it to happen.',
      },
    ],
    shortQAs: [
      {
        question: 'What is step-by-step logical thinking in software engineering?',
        answer: 'It is the cognitive ability to break down a massive, complex problem into the absolute smallest, unambiguous micro-tasks (algorithms) that a machine can execute sequentially without ever needing to make assumptions.',
      },
      {
        question: 'What is the primary conflict between human assumptions and machine precision?',
        answer: 'Humans unconsciously skip steps by making assumptions based on context, whereas machines strictly require every single micro-step to be explicitly defined. A missing step in machine logic results in failure or incorrect output, not a guess.',
      },
      {
        question: 'Why should beginners practice "unplugged" logic drills before coding?',
        answer: 'Practicing algorithms for mundane tasks (crossing a street, making lemon juice) trains the brain to recognize strict patterns, dependencies, and conditional constraints. The best programmers think most precisely before writing any code.',
      },
    ],
    longQAs: [
      {
        question: 'Explain the PB&J Robot Experiment and why it demonstrates the core challenge of programming.',
        answer: 'The PB&J experiment is a classic computer science exercise where a human instructor acts as a deterministic robot, and students must give precise instructions to make a peanut butter & jelly sandwich.\n\nWhen a student says "put the peanut butter on the bread," the instructor literally places the unopened glass jar on top of the sealed bread bag. The students quickly realize precision is everything.\n\nA proper algorithm must be agonizingly specific:\n1. Locate bread bag on counter\n2. Grip bag opening with left hand\n3. Locate twist-tie with right hand\n4. Rotate counter-clockwise to loosen\n5. Remove tie completely, place on counter\n6. Open bag opening\n7. Insert right hand through opening\n8. Grip first slice between thumb and forefinger\n9. Lift bread out of bag\n10. Place flat on counter surface\n\nThis demonstrates that computers have ZERO contextual awareness. Every micro-action a human brain performs automatically must be explicitly, painstakingly spelled out. This is why FAANG interviews test the ability to think at this level of precision.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 5: Why C Language?
  // ═══════════════════════════════════════════
  {
    partNumber: 5,
    partTitle: 'Why C Language?',
    mcqs: [
      {
        question: 'When and by whom was the C language created?',
        options: [
          '1995 by James Gosling at Sun Microsystems',
          '1972 by Dennis Ritchie at Bell Labs',
          '1989 by Guido van Rossum',
          '1983 by Bjarne Stroustrup',
        ],
        correct: 1,
        explanation: 'C was created in 1972 by Dennis Ritchie at Bell Labs specifically to rewrite the UNIX operating system. It bridged the gap between high-level readability and low-level hardware access.',
      },
      {
        question: 'Why is C considered a "mid-level" language?',
        options: [
          'It runs at medium speed',
          'It combines high-level readability with low-level hardware access',
          'It was developed in the middle of the computing era',
          'It is moderately difficult to learn',
        ],
        correct: 1,
        explanation: 'C uniquely bridges the gap — it offers structured, readable syntax of a high-level language while providing direct, low-level access to memory addresses and hardware registers.',
      },
      {
        question: 'What happens in C if a programmer forgets to call free() after malloc()?',
        options: [
          'The compiler automatically frees it',
          'Nothing — C has garbage collection',
          'A memory leak occurs — the memory is never released back to the system',
          'The program won\'t compile',
        ],
        correct: 2,
        explanation: 'C has NO automatic garbage collection. Forgotten free() calls cause memory leaks — the allocated memory remains occupied forever until the program exits, potentially causing crashes.',
      },
      {
        question: 'Why do FAANG companies value C knowledge even for Python/Java roles?',
        options: [
          'C is faster to write',
          'C programmers type faster',
          'C strips away training wheels, teaching deep memory and performance awareness',
          'C is required for all backend systems',
        ],
        correct: 2,
        explanation: 'C forces manual memory management, pointer manipulation, and deep hardware understanding. This algorithmic rigor guarantees that developers write optimized, resource-efficient code in ANY language.',
      },
      {
        question: 'Which of the following is NOT an advantage of C?',
        options: [
          'Direct hardware access',
          'Ultra-fast execution speed',
          'Built-in exception handling (try-catch)',
          'High portability across OS platforms',
        ],
        correct: 2,
        explanation: 'C lacks built-in exception handling (no try-catch blocks). Error handling must be done manually by checking return values. This is one of C\'s notable limitations.',
      },
    ],
    shortQAs: [
      {
        question: 'What is the difference between high-level and low-level languages?',
        answer: 'Low-level languages (Assembly, Machine Code) sit close to hardware — extremely fast but hard to read/write. High-level languages (Python, Java) are far from hardware — easy to read with automatic resource management, but carry hidden computational overhead that makes them slower.',
      },
      {
        question: 'What are the main limitations of C?',
        answer: 'No Object-Oriented Programming (no classes/inheritance), no built-in exception handling (no try-catch), no built-in string handling, steep learning curve, and requires strict manual memory management (malloc/free). Forgotten memory releases cause memory leaks or buffer overflows.',
      },
      {
        question: 'Why is C called the "mother of all languages"?',
        answer: 'C directly influenced the design of C++, Java, C#, JavaScript, Rust, Go, and many others. The Linux kernel, Windows kernel, macOS kernel, databases (MySQL, PostgreSQL), and most operating systems are written primarily in C.',
      },
    ],
    longQAs: [
      {
        question: 'Why do top-tier technology companies revere C knowledge? Explain the "black box" problem of high-level languages.',
        answer: 'FAANG companies operate at unfathomable scale. When backend systems handle billions of requests per second, micro-inefficiencies in memory or speed result in massive financial costs.\n\nThe "Black Box" Problem: In Python, creating a list for 10,000 records is one line of code. Python silently requests memory, tracks usage, and automatically deletes it (garbage collection). The developer learns nothing about the hardware cost.\n\nIn C, there is NO safety net:\n• Manually calculate exact bytes required\n• Manually request space from OS using malloc()\n• Track physical memory addresses using pointers\n• Manually release memory back using free()\n\nThis forces the programmer to deeply understand:\n- How data structures occupy physical RAM\n- The real cost of each algorithm in time and space\n- How CPU caches interact with contiguous memory\n- The difference between stack and heap allocation\n\nEven if hired to write Java or Python, the mechanical awareness forged by mastering C guarantees highly optimized, resource-efficient code in any language. C strips away the training wheels.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 6: Memory Architecture
  // ═══════════════════════════════════════════
  {
    partNumber: 6,
    partTitle: 'Memory Architecture',
    mcqs: [
      {
        question: 'How should a programmer visualize RAM?',
        options: [
          'As an abstract infinite cloud',
          'As a massive linear street of numbered post office boxes',
          'As a circular buffer',
          'As a tree structure',
        ],
        correct: 1,
        explanation: 'RAM is best visualized as a linear address space — a massive, perfectly linear street of post office boxes where each box = 1 byte with a unique sequential address.',
      },
      {
        question: 'If an int starts at address 2000, which addresses does it occupy (assuming 4-byte int)?',
        options: ['2000 only', '2000-2003', '2000-2007', '2000-2001'],
        correct: 1,
        explanation: 'A standard int requires 4 bytes. Starting at address 2000, it occupies contiguous addresses 2000, 2001, 2002, and 2003.',
      },
      {
        question: 'What is "contiguous memory" and why does it matter for performance?',
        options: [
          'Memory that is encrypted',
          'Memory stored in adjacent addresses — enables CPU cache hits for blazing fast access',
          'Memory that cannot be modified',
          'Memory allocated on the heap only',
        ],
        correct: 1,
        explanation: 'Contiguous memory means data is stored in adjacent addresses. The CPU cache grabs entire chunks of contiguous data at once, resulting in cache HITs and blazing fast O(1) access.',
      },
      {
        question: 'What is "spatial locality" in CPU caching?',
        options: [
          'The CPU only processes nearby data',
          'When accessing address 100, the CPU pre-loads addresses 101-164 into cache assuming they\'ll be needed soon',
          'The CPU stores data geographically',
          'Memory is organized by location',
        ],
        correct: 1,
        explanation: 'Spatial locality is the CPU\'s assumption that if address 100 is being read, addresses 101, 102, etc. will likely be needed soon — so it loads a whole chunk into ultra-fast cache.',
      },
      {
        question: 'How is the address of array[i] calculated in a contiguous array?',
        options: [
          'Base + i',
          'Base × i',
          'BaseAddress + (i × sizeof(type))',
          'Random address assignment',
        ],
        correct: 2,
        explanation: 'Address = BaseAddress + (i × sizeof(type)). This simple math gives instant O(1) access to ANY element, making arrays the most important data structure in CS.',
      },
    ],
    shortQAs: [
      {
        question: 'What is byte-level addressing?',
        answer: 'Every individual address in RAM points to exactly one byte (8 bits) of memory. Each byte has a unique, sequential, permanent number (the Memory Address). This system allows the CPU to precisely locate any piece of data in the entire RAM.',
      },
      {
        question: 'Explain the Post Office Box analogy for memory.',
        answer: 'The Memory Address = the number engraved on the outside of the P.O. Box (permanent, never changes). The Data = the letter placed inside the box (can be removed, changed, replaced at any time). Programs constantly send instructions to "read from Box #1004" or "store result in Box #1004".',
      },
      {
        question: 'What is the difference between RAM and Storage in terms of speed and persistence?',
        answer: 'RAM: Ultra-fast (nanoseconds), volatile (loses data when power off), expensive (~$3-5/GB), 8-64GB typical.\nStorage (SSD/HDD): Much slower (microseconds/milliseconds), non-volatile (retains data permanently), cheap (~$0.05-0.10/GB), 256GB-4TB typical.',
      },
    ],
    longQAs: [
      {
        question: 'Explain contiguous memory architecture and why arrays are the most important data structure. Include the CPU cache analogy.',
        answer: 'Contiguous memory means related data is stored in adjacent addresses without gaps. Arrays rely entirely on this — if array starts at address 1000, elements are at 1000, 1004, 1008, etc. (for 4-byte ints), placed perfectly side-by-side.\n\nWhy This Matters for Performance:\n\nModern CPUs operate so fast that waiting for data from RAM is a massive bottleneck. CPU manufacturers built tiny, ultra-fast internal Cache memories directly on the CPU chip.\n\nWhen the CPU requests address 100, it doesn\'t just grab that one byte — it loads a large chunk (addresses 100-164) into cache, assuming nearby data will be needed soon (spatial locality).\n\nWith arrays (contiguous): CPU grabs the entire chunk → every subsequent access is a Cache HIT → blazing fast, 95%+ cache hit rate.\n\nWith linked lists (scattered): Data is scattered across RAM → CPU loads wrong chunks → Cache MISS repeatedly → must fetch from slow RAM, 25% hit rate.\n\nThe address formula: array[i] = BaseAddress + (i × sizeof(type)) gives instant O(1) access to ANY element. This is why arrays are the single most important data structure in all of computer science, and why system design interviews consistently test understanding of this caching principle.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 7: Variables
  // ═══════════════════════════════════════════
  {
    partNumber: 7,
    partTitle: 'Variables',
    mcqs: [
      {
        question: 'What are the four distinct components of a variable?',
        options: [
          'Name, Size, Color, Shape',
          'Name (Identifier), Address (Identity), Value (Content), Type',
          'Input, Process, Output, Storage',
          'Declaration, Initialization, Usage, Deletion',
        ],
        correct: 1,
        explanation: 'Every variable has: Name (human-readable label), Address (physical RAM location), Value (the data stored), and Type (how many bytes and how to interpret the binary).',
      },
      {
        question: 'In `int age = 25;`, which is the L-value and which is the R-value?',
        options: [
          'age = L-value, 25 = R-value',
          '25 = L-value, age = R-value',
          'Both are L-values',
          'Both are R-values',
        ],
        correct: 0,
        explanation: 'age is the L-value (locator value — the physical memory location that can receive data). 25 is the R-value (read value — transient data without a permanent address).',
      },
      {
        question: 'Why does `25 = age;` cause a compilation error?',
        options: [
          'The syntax is wrong',
          '25 is an R-value with no memory location — it cannot serve as a storage container',
          'Variables must be on the right side',
          'Numbers cannot be assigned',
        ],
        correct: 1,
        explanation: '25 is an R-value — it\'s an abstract mathematical concept with NO physical memory location. You can\'t store something inside a temporary number. Only L-values (addressable memory locations) can appear on the left side of =.',
      },
      {
        question: 'The = sign in C represents:',
        options: [
          'Mathematical equality',
          'Comparison',
          'A directional command: "Copy R-value INTO L-value\'s address"',
          'Declaration',
        ],
        correct: 2,
        explanation: 'In C, = is NOT mathematical equality. It is a directional command that instructs the CPU: "Copy the R-value INTO the L-value\'s memory address." For equality comparison, C uses ==.',
      },
      {
        question: 'Which variable naming is INVALID in C?',
        options: ['player_score', '_count', '1stPlace', 'playerAge'],
        correct: 2,
        explanation: 'Variable names cannot start with a number. The compiler needs to distinguish variables from numeric literals. "1stPlace" starts with digit 1, making it invalid.',
      },
    ],
    shortQAs: [
      {
        question: 'What is the difference between a variable\'s Identity and its Value?',
        answer: 'Identity (Address) = the fixed, permanent physical location in RAM (like locker number #1024 — never changes). Value (Content) = the transient data currently stored at that location (can be wiped, overwritten, and replaced billions of times per second).',
      },
      {
        question: 'What is an L-value vs an R-value?',
        answer: 'L-value (Locator Value) = an object with an identifiable memory location — the physical locker itself, capable of holding data. R-value (Read Value) = raw data or a temporary result — it has NO permanent address. L-values go on the LEFT of =, R-values on the RIGHT.',
      },
      {
        question: 'Why are naming conventions important in C?',
        answer: 'Must start with letter or underscore (not a number). Case-sensitive (age ≠ Age ≠ AGE). No spaces allowed. No reserved keywords (int, return, if). Professional code uses snake_case or camelCase consistently. Inconsistency signals amateur code to FAANG interviewers.',
      },
    ],
    longQAs: [
      {
        question: 'Explain the four components of a variable in C with the post office box analogy.',
        answer: 'A variable is an abstraction layer — a human-readable name attached to a specific RAM address.\n\n1. Name (Identifier): The label the programmer creates (e.g., playerAge). Must follow strict rules: no spaces, can\'t start with numbers, case-sensitive.\n\n2. Address (Identity): The physical, immovable location in RAM (e.g., 0x7FFF1024). Like the permanent number engraved on a P.O. Box — it never changes during the variable\'s lifetime.\n\n3. Value (Content): The binary data currently stored at that location (e.g., 99). Entirely transient — can be overwritten billions of times per second during execution. Like the letter inside the P.O. Box.\n\n4. Type: Specifies the locker size (how many bytes to reserve) and how to decode the binary inside. int = 4 bytes, char = 1 byte, double = 8 bytes. Set at declaration and cannot change.\n\nWhen you write `int age = 25;`, C reserves 4 consecutive bytes at a fixed address (e.g., 0x1024-0x1027) and stores binary representation of 25 inside those bytes. Address 0x1024 is the IDENTITY. Number 25 is the VALUE. They are fundamentally different things.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 8: Structure of C Program
  // ═══════════════════════════════════════════
  {
    partNumber: 8,
    partTitle: 'Structure of C Program',
    mcqs: [
      {
        question: 'What does #include <stdio.h> actually do?',
        options: [
          'Downloads a library from the internet',
          'Tells the preprocessor to copy-paste the entire contents of stdio.h into your source code',
          'Compiles the standard library',
          'Creates a new file called stdio',
        ],
        correct: 1,
        explanation: 'The #include directive tells the preprocessor to locate stdio.h and literally copy-paste its entire textual contents directly into the top of your source code before compilation begins.',
      },
      {
        question: 'What does "stdio.h" stand for?',
        options: ['Standard Input Only', 'Standard Input Output', 'System Data I/O', 'String Input Output'],
        correct: 1,
        explanation: 'stdio.h = Standard Input Output Header. It provides function blueprints for printf() (printing), scanf() (reading input), and other I/O operations.',
      },
      {
        question: 'Why must every C program have a main() function?',
        options: [
          'It\'s just a convention, not required',
          'The OS looks for main() as the absolute starting point of execution',
          'The compiler creates it automatically if missing',
          'It\'s needed for memory allocation',
        ],
        correct: 1,
        explanation: 'When the OS launches a C program, it is programmed to look for main(). The CPU\'s instruction pointer begins executing from the exact memory address of main(). It\'s the mandatory entry point.',
      },
      {
        question: 'What does `return 0;` communicate to the operating system?',
        options: [
          'The program will restart',
          'The program has 0 variables',
          'The program executed successfully without errors',
          'The program needs 0 bytes of memory',
        ],
        correct: 2,
        explanation: 'By returning 0, the program signals to the OS: "Success. Everything executed without errors." Non-zero values (1 or -1) indicate failure, out-of-memory, or anomalies.',
      },
      {
        question: 'What role does the semicolon (;) play in C?',
        options: [
          'It separates functions',
          'It is the strict statement terminator — tells the compiler an instruction has concluded',
          'It creates comments',
          'It is optional formatting',
        ],
        correct: 1,
        explanation: 'The C compiler ignores whitespace and reads code as one continuous stream. The semicolon is the absolute signal that a logical instruction has concluded. Missing it causes compilation failure.',
      },
    ],
    shortQAs: [
      {
        question: 'What is the difference between header files (.h) and source files (.c)?',
        answer: 'Header files (.h) contain declarations and prototypes — structural blueprints. Like a restaurant menu that lists dishes but doesn\'t contain recipes. Source files (.c) contain actual implementation code — the real logic and algorithms. Like the kitchen where cooking happens.',
      },
      {
        question: 'What do curly braces { } mean in C?',
        answer: 'Curly braces define "scope" or boundaries. They act as walls of a room. Everything between { and } belongs exclusively to that function or block. The compiler uses them to know where instructions begin and terminate. Forgetting to close a brace = immediate compilation error.',
      },
      {
        question: 'Why does omitting a semicolon cause a compilation error?',
        answer: 'The C compiler is entirely blind to whitespace and formatting — it reads the entire file as one giant continuous stream of text. The semicolon is the unyielding signal that an instruction has concluded. Without it, the compiler cannot determine where one instruction ends and the next begins.',
      },
    ],
    longQAs: [
      {
        question: 'Break down every element of a basic C program: #include, main(), braces, semicolons, and return 0.',
        answer: '#include <stdio.h>: C is extremely minimal — it cannot print or read input by default. #include tells the preprocessor to copy-paste the contents of stdio.h (Standard Input Output Header) into the source code. This gives access to printf() and scanf().\n\nint main(void): The mandatory entry point. Every C program must have exactly ONE main() function. When the OS loads the program, it scans for "main" and directs the CPU instruction pointer here. "int" means it returns an integer exit status. "void" means no arguments.\n\nCurly Braces { }: Define scope/boundaries. Act as walls — everything between them belongs to that function. Forgetting to close = immediate compilation error.\n\nSemicolons ;: The strict statement terminator. The compiler reads code as one continuous stream (ignores whitespace). Semicolons signal where each instruction concludes. Like periods in English sentences.\n\nreturn 0;: Communication back to the OS. Exit code 0 = "Success, no errors." Non-zero values = failure/anomaly. The OS uses this to decide if the program completed successfully or if error handling is needed.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 9: Compilation Process
  // ═══════════════════════════════════════════
  {
    partNumber: 9,
    partTitle: 'Compilation Process',
    mcqs: [
      {
        question: 'What are the four stages of C compilation in order?',
        options: [
          'Linking → Assembly → Compilation → Preprocessing',
          'Preprocessing → Compilation → Assembly → Linking',
          'Compilation → Preprocessing → Linking → Assembly',
          'Assembly → Compilation → Preprocessing → Linking',
        ],
        correct: 1,
        explanation: 'The four stages in order: 1) Preprocessing (.c → .i), 2) Compilation (.i → .s), 3) Assembly (.s → .o), 4) Linking (.o → .exe/.out).',
      },
      {
        question: 'What does the Preprocessor do?',
        options: [
          'Converts C code to machine code',
          'Strips comments, expands #include directives, handles macros',
          'Links external libraries',
          'Optimizes runtime performance',
        ],
        correct: 1,
        explanation: 'The Preprocessor scans for # directives, strips ALL human comments (CPU doesn\'t need them), copy-pastes header file contents, and expands macros before the actual compilation begins.',
      },
      {
        question: 'What file format is produced by the Assembler stage?',
        options: ['.s assembly file', '.i preprocessed file', '.o object file (binary)', '.exe executable'],
        correct: 2,
        explanation: 'The Assembler converts symbolic assembly instructions (MOV, ADD) into raw binary machine code (.o object file) that the CPU can natively execute.',
      },
      {
        question: 'What does the Linker do?',
        options: [
          'Checks syntax errors',
          'Merges object files with external library binaries into one cohesive executable',
          'Converts assembly to binary',
          'Loads the program into RAM',
        ],
        correct: 1,
        explanation: 'The Linker merges the new .o file with pre-compiled binary code of external libraries (e.g., the code that makes printf work), resolving all references into one executable.',
      },
      {
        question: 'What is the Loader and when does it act?',
        options: [
          'A compiler stage that runs before preprocessing',
          'An OS component that copies the executable from Storage into RAM when the user runs the program',
          'A debugging tool',
          'A hardware component in the CPU',
        ],
        correct: 1,
        explanation: 'The Loader is an OS component. When the user runs the program, the Loader copies the executable from slow Storage to fast RAM, sets up memory segments (Text, Stack, Heap), and points the CPU instruction pointer to main().',
      },
      {
        question: 'On Linux, what format is the executable file?',
        options: ['PE (Portable Executable)', 'ELF (Executable and Linkable Format)', 'APP Bundle', 'JAR file'],
        correct: 1,
        explanation: 'On Linux, executables are in ELF (Executable and Linkable Format). On Windows, they use PE (Portable Executable) format with .exe extension. Both contain machine instructions plus structural headers.',
      },
    ],
    shortQAs: [
      {
        question: 'What are the four outputs of the compilation pipeline?',
        answer: '1) Preprocessing → .i file (expanded source code). 2) Compilation → .s file (assembly code). 3) Assembly → .o file (binary object code). 4) Linking → .exe/.out file (final executable).',
      },
      {
        question: 'What happens when the OS Loader runs a program?',
        answer: 'The Loader: 1) Copies executable from Storage to RAM, 2) Switches to Kernel Mode, 3) Allocates isolated address space, 4) Organizes RAM into segments (Text for code, Stack for function calls, Heap for dynamic memory), 5) Points CPU instruction pointer to main().',
      },
      {
        question: 'What is a Linker Error and how does it differ from a Syntax Error?',
        answer: 'A Syntax Error occurs in the Compilation phase — grammar is wrong (missing semicolon). A Linker Error occurs after successful compilation when the Linker cannot find referenced functions. E.g., typing "print" instead of "printf" — code compiles fine but linker can\'t find "print" in any library.',
      },
    ],
    longQAs: [
      {
        question: 'Trace the complete journey of a C program from source code to execution on screen.',
        answer: '1. Source Code: Programmer writes C code in a .c file using human-readable syntax.\n\n2. Preprocessing (.c → .i): Preprocessor strips comments, expands #include (copy-pastes stdio.h contents), expands macros. Output: massively expanded source file.\n\n3. Compilation (.i → .s): Compiler validates syntax/grammar rules. If valid, translates C into Assembly language specific to CPU architecture (x86/ARM). Output: assembly file.\n\n4. Assembly (.s → .o): Assembler maps symbolic assembly (MOV, ADD) to raw binary machine code (0s and 1s). Output: binary object file.\n\n5. Linking (.o → .exe): Linker merges object file with pre-compiled library binaries (e.g., printf implementation), resolving all memory addresses into one cohesive executable.\n\n6. Loading: User runs the executable. OS Loader copies it from Storage to RAM, creates memory segments (Text, Stack, Heap, BSS, Data), points CPU instruction pointer to main().\n\n7. Execution: CPU\'s ALU processes binary instructions sequentially. For printf("Hello"): resolves each character to ASCII → ASCII to binary → binary drives voltage → voltage illuminates pixels on screen.\n\n8. Termination: return 0 signals success to OS. All RAM is freed.',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PART 10: First Safe Code & Errors
  // ═══════════════════════════════════════════
  {
    partNumber: 10,
    partTitle: 'First Safe Code',
    mcqs: [
      {
        question: 'What does the escape sequence \\n represent?',
        options: [
          'A tab character',
          'A null terminator',
          'A new line (Line Feed) — moves cursor to beginning of next line',
          'A backspace',
        ],
        correct: 2,
        explanation: '\\n represents Line Feed (New Line) with ASCII decimal value 10. It moves the cursor to the beginning of the next line. This dates back to mechanical teletype machines.',
      },
      {
        question: 'Which type of error is caught BEFORE the program runs?',
        options: ['Runtime Error', 'Logical Error', 'Syntax/Compilation Error', 'Buffer Overflow'],
        correct: 2,
        explanation: 'Syntax/Compilation Errors are caught during the Compilation phase — the compiler detects grammar violations and refuses to generate an executable. Runtime errors only appear when code is actually executing.',
      },
      {
        question: 'What is a Runtime Error?',
        options: [
          'A syntax mistake in the code',
          'A grammatically perfect program that crashes during execution due to impossible operations',
          'A missing library',
          'A formatting issue',
        ],
        correct: 1,
        explanation: 'Runtime Errors occur when syntactically correct code encounters physically impossible operations during execution — like dividing by zero or accessing forbidden memory. The compiler cannot catch these.',
      },
      {
        question: 'What does \\0 (null terminator) do in C strings?',
        options: [
          'Prints a zero character',
          'Deletes the string',
          'Marks the end of a string in memory (invisible character)',
          'Creates a new line',
        ],
        correct: 2,
        explanation: '\\0 (ASCII value 0) is the null terminator — it marks the end of a string in memory. C strings don\'t store their length; functions like printf() keep reading bytes until they hit \\0.',
      },
      {
        question: 'What happens underneath when printf("Hello\\n") executes?',
        options: [
          'Text appears magically on screen',
          'printf resolves string → issues system call to kernel → kernel communicates with GPU driver → GPU illuminates specific pixels on screen',
          'The string is saved to a file',
          'The compiler displays the text',
        ],
        correct: 1,
        explanation: 'printf processes the string, issues a system call (write()) to cross from user space to OS kernel, the kernel communicates with the graphics driver, which manipulates electrical signals to illuminate specific pixels forming letter shapes.',
      },
      {
        question: 'What is the difference between \\t and \\n?',
        options: [
          '\\t = new line, \\n = tab',
          '\\t = horizontal tab space, \\n = new line (moves to next line)',
          '\\t = delete, \\n = insert',
          'They are the same',
        ],
        correct: 1,
        explanation: '\\t inserts a horizontal tab-width space (usually 4-8 characters) — from typewriter tabulator stops. \\n moves the cursor to the beginning of the next line — from rolling paper up on teletype machines.',
      },
    ],
    shortQAs: [
      {
        question: 'What is the journey of printf("Hello") from code to screen pixels?',
        answer: '1) printf processes the text string. 2) Resolves characters to a memory buffer. 3) Issues a system call (write()) to cross from user space to OS kernel. 4) Kernel communicates with GPU/display driver. 5) Driver sends electrical signals to monitor. 6) Monitor illuminates specific pixels to form letter shapes.',
      },
      {
        question: 'What is the difference between a Syntax Error and a Runtime Error?',
        answer: 'Syntax Error: Grammar violation caught BEFORE running (missing semicolon, unclosed brace). Compiler halts and refuses to generate executable. Fix by correcting syntax.\nRuntime Error: Grammatically perfect code crashes DURING execution (divide by zero, null pointer). Compiler cannot catch these. Fix by adding logic guards.',
      },
      {
        question: 'What is a Linker Error? Give an example.',
        answer: 'A Linker Error occurs when code compiles successfully into .o file, but the Linker can\'t find referenced symbols. Example: typing "print" instead of "printf" — syntax is fine, compilation succeeds, but the linker searches all libraries and cannot find a function named "print".',
      },
    ],
    longQAs: [
      {
        question: 'Explain all four types of programming errors with examples and at which phase each is detected.',
        answer: '1. Syntax Error (Compilation Phase):\nGrammar violation. Missing semicolon, unclosed brace, misspelled keyword.\nExample: printf("Hello")  ← missing semicolon\nThe compiler cannot parse the text and immediately halts. Fix: correct the syntax.\n\n2. Semantic Error (Compilation Phase):\nGrammar is correct but violates language rules. Type mismatches.\nExample: int x = "hello";  ← string assigned to integer\nCompiler understands what was written but refuses. Fix: use compatible types.\n\n3. Linker Error (Linking Phase):\nCode compiles perfectly but Linker can\'t find references.\nExample: print("Hello"); ← "print" not found in any library\nUsed wrong function name. Fix: use printf() instead of print().\n\n4. Runtime Error (Execution Phase):\nProgram compiles and links successfully. Crashes during CPU execution.\nExample: int result = 10 / 0;  ← division by zero\nCPU encounters physically impossible operation. OS kills the program.\nFix: add guard: if (y != 0) { result = x / y; }\n\nKey insight: Errors detected earlier (compilation) are easier to fix than errors detected later (runtime). The compiler is your first line of defense.',
      },
    ],
  },
];
