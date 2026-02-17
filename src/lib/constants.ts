/**
 * constants.ts — Application-wide constants
 * 
 * All static data, navigation links, and configuration values live here.
 * This keeps components clean and makes it easy to update content
 * without digging through JSX files.
 * 
 * To extend: Add new constant objects/arrays below the relevant section.
 */

/* ===================================================================
   SITE METADATA — Used in layout.tsx and SEO tags
   =================================================================== */
export const SITE_CONFIG = {
  name: 'CollegeHub',
  domain: 'collegehub.site',
  url: 'https://collegehub.site',
  tagline: "India's Smart Learning Platform",
  description:
    'Master school subjects and coding skills with structured learning paths, progress tracking, and personalized analytics in one platform.',
  keywords: [
    'collegehub.site',
    'online learning platform',
    'class 9 study material',
    'class 10 CBSE notes',
    'learn C++ online',
    'learn Java online',
    'learn Python programming',
    'web development course',
    'coding for beginners India',
    'CBSE study portal',
    'school study platform',
    'programming courses India',
    'college coding platform',
    'cbse chapter wise tests',
    'coding roadmap for beginners',
    'student progress analytics',
    'resume learning platform',
    'class 9 class 10 online courses',
    'best coding website for students',
    'free online classes India',
    'board exam preparation online',
    'learn programming online free',
    'CBSE Class 9 Class 10 notes free',
    'C++ Java Python Web Development courses',
    'online education platform for students India',
    'coding classes for college students',
    'best study material for CBSE students',
    'structured learning with progress tracking',
    'edtech startup India',
  ],
  author: 'CollegeHub Team',
  social: {
    twitterHandle: '@collegehub',
    twitter: 'https://x.com/collegehub',
    github: 'https://github.com/collegehub',
    linkedin: 'https://linkedin.com/company/collegehub',
    instagram: 'https://instagram.com/collegehub',
    youtube: 'https://youtube.com/@collegehub',
  },
} as const;


/* ===================================================================
   NAVIGATION — Links shown in navbar and footer
   =================================================================== */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'School', href: '/school' },
  { label: 'Coding', href: '/coding' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;


/* ===================================================================
   STATS — Numbers displayed on the landing page
   =================================================================== */
export const STATS = [
  { value: 10000, suffix: '+', label: 'Active Students' },
  { value: 50, suffix: '+', label: 'Expert Courses' },
  { value: 6, suffix: '', label: 'Programming Languages' },
  { value: 95, suffix: '%', label: 'Student Satisfaction' },
] as const;


/* ===================================================================
   FEATURES — "Why Choose Us" grid items
   =================================================================== */
export const FEATURES = [
  {
    icon: 'BookOpen',
    title: 'Structured Learning',
    description: 'Follow a carefully designed curriculum that takes you from basics to advanced concepts step by step.',
  },
  {
    icon: 'Brain',
    title: 'Smart Analytics',
    description: 'Track your progress with AI-powered analytics that identify weak topics and suggest what to study next.',
  },
  {
    icon: 'Lock',
    title: 'Progressive Unlock',
    description: 'Each lesson unlocks only after completing the previous one, ensuring you build a strong foundation.',
  },
  {
    icon: 'BarChart3',
    title: 'Performance Dashboard',
    description: 'Visualize your growth with detailed charts showing subject-wise and topic-wise performance.',
  },
  {
    icon: 'RotateCcw',
    title: 'Resume Anywhere',
    description: 'Pick up exactly where you left off. Your progress is saved automatically across all devices.',
  },
  {
    icon: 'Shield',
    title: 'Secure Platform',
    description: 'Enterprise-grade security protects your data with encryption, secure authentication, and privacy controls.',
  },
] as const;


/* ===================================================================
   SCHOOL SUBJECTS — Class 9 & 10 CBSE subjects
   =================================================================== */
export const SCHOOL_SUBJECTS = {
  class9: [
    { name: 'Mathematics', icon: 'Calculator', chapters: 15, color: '#6366f1' },
    { name: 'Science', icon: 'Atom', chapters: 15, color: '#22c55e' },
    { name: 'English', icon: 'BookText', chapters: 12, color: '#f59e0b' },
    { name: 'Social Science', icon: 'Globe', chapters: 20, color: '#ef4444' },
    { name: 'Hindi', icon: 'Languages', chapters: 14, color: '#ec4899' },
    { name: 'Computer Science', icon: 'Monitor', chapters: 8, color: '#06b6d4' },
  ],
  class10: [
    { name: 'Mathematics', icon: 'Calculator', chapters: 15, color: '#6366f1' },
    { name: 'Science', icon: 'Atom', chapters: 16, color: '#22c55e' },
    { name: 'English', icon: 'BookText', chapters: 12, color: '#f59e0b' },
    { name: 'Social Science', icon: 'Globe', chapters: 22, color: '#ef4444' },
    { name: 'Hindi', icon: 'Languages', chapters: 14, color: '#ec4899' },
    { name: 'Computer Science', icon: 'Monitor', chapters: 10, color: '#06b6d4' },
  ],
} as const;


/* ===================================================================
   CODING LANGUAGES — Languages offered in the coding section
   =================================================================== */
export const CODING_LANGUAGES = [
  {
    slug: 'c',
    name: 'C Language',
    icon: 'Code2',
    color: '#A8B9CC',
    level: 'Zero to Advanced',
    modules: 40,
    description: 'Master C in 40 days — from zero to system-level programmer. Pointers, memory, data structures, file handling, and interview-level problem solving.',
    topics: ['Variables & Data Types', 'Loops & Patterns', 'Functions & Recursion', 'Arrays & Strings', 'Pointers & DMA', 'File Handling'],
  },
  {
    slug: 'cpp',
    name: 'C++',
    icon: 'Code2',
    color: '#00599C',
    level: 'Beginner to Advanced',
    modules: 12,
    description: 'Master the foundation of systems programming with C++. Learn OOP, STL, and competitive programming concepts.',
    topics: ['Variables & Data Types', 'OOP Concepts', 'STL Library', 'Pointers & Memory', 'File Handling', 'Competitive Programming'],
  },
  {
    slug: 'java',
    name: 'Java',
    icon: 'Coffee',
    color: '#ED8B00',
    level: 'Beginner to Advanced',
    modules: 14,
    description: 'Build enterprise applications with Java. Cover core Java, collections, multithreading, and frameworks.',
    topics: ['Syntax & Basics', 'OOP in Java', 'Collections Framework', 'Exception Handling', 'Multithreading', 'Spring Basics'],
  },
  {
    slug: 'python',
    name: 'Python',
    icon: 'Terminal',
    color: '#3776AB',
    level: 'Beginner to Advanced',
    modules: 10,
    description: 'Learn the most versatile language. From scripting to AI/ML, Python opens doors everywhere.',
    topics: ['Core Syntax', 'Data Structures', 'File I/O', 'OOP', 'Libraries (NumPy, Pandas)', 'Web Scraping'],
  },
  {
    slug: 'webdev',
    name: 'Web Development',
    icon: 'Globe',
    color: '#E44D26',
    level: 'Beginner to Advanced',
    modules: 16,
    description: 'Become a full-stack developer. Master HTML, CSS, JavaScript, React, Node.js, and more.',
    topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Node.js & Express', 'MongoDB', 'Deployment'],
  },
] as const;


/* ===================================================================
   TESTIMONIALS — Student reviews shown on landing page
   =================================================================== */
export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Class 10 Student',
    avatar: 'PS',
    rating: 5,
    content: 'CollegeHub helped me score 95% in my board exams. The chapter-wise tests and weakness analysis were game-changers!',
  },
  {
    name: 'Rahul Verma',
    role: 'B.Tech Student',
    avatar: 'RV',
    rating: 5,
    content: 'I learned C++ from scratch and now I solve competitive programming problems daily. The progressive unlock kept me disciplined.',
  },
  {
    name: 'Ananya Gupta',
    role: 'Class 9 Student',
    avatar: 'AG',
    rating: 4,
    content: 'The resume feature is amazing! I never lose my progress. Plus the analytics show me exactly where I need to improve.',
  },
  {
    name: 'Vikram Singh',
    role: 'Web Developer',
    avatar: 'VS',
    rating: 5,
    content: 'The web development course is incredibly well-structured. From HTML basics to deploying full-stack apps — everything covered.',
  },
  {
    name: 'Sneha Patel',
    role: 'Class 10 Student', 
    avatar: 'SP',
    rating: 5,
    content: 'Best platform for CBSE students. The subject-wise performance charts helped me focus on my weak areas before exams.',
  },
  {
    name: 'Arjun Reddy',
    role: 'Python Learner',
    avatar: 'AR',
    rating: 4,
    content: 'Started with zero coding knowledge, now building ML projects. The step-by-step approach made complex topics easy to understand.',
  },
] as const;


/* ===================================================================
   FAQ — Frequently asked questions
   =================================================================== */
export const FAQ_ITEMS = [
  {
    question: 'Is CollegeHub free to use?',
    answer: 'We offer a generous free tier with access to basic courses and limited features. Premium plans unlock full access to all courses, analytics dashboard, and priority support.',
  },
  {
    question: 'What classes are covered in the School section?',
    answer: 'Currently, we cover Class 9 and Class 10 CBSE syllabus with subjects including Mathematics, Science, English, Social Science, Hindi, and Computer Science. Each subject has chapter-wise lessons and tests.',
  },
  {
    question: 'Which programming languages can I learn?',
    answer: 'We offer structured courses in C++, Java, Python, and Web Development (HTML, CSS, JavaScript, React, Node.js). Each course starts from beginner level and progresses to advanced topics.',
  },
  {
    question: 'How does the progress tracking work?',
    answer: 'Your progress is tracked automatically. You can resume exactly where you left off. The system tracks completed lessons, test scores, and generates analytics showing your strengths and areas for improvement.',
  },
  {
    question: 'What is the lock system?',
    answer: 'The progressive unlock system ensures you complete each lesson before moving to the next one. This builds a strong foundation. You can always go back to review previous lessons, but cannot skip ahead.',
  },
  {
    question: 'Can I access CollegeHub on mobile?',
    answer: 'Yes! CollegeHub is fully responsive and works seamlessly on mobile phones, tablets, and desktops. Your progress syncs automatically across all devices.',
  },
] as const;


/* ===================================================================
   FOOTER LINKS — Organized by section
   =================================================================== */
export const FOOTER_LINKS = {
  platform: [
    { label: 'School Courses', href: '/school' },
    { label: 'Coding Courses', href: '/coding' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Progress Tracking', href: '/dashboard' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'School Section', href: '/school' },
    { label: 'Coding Section', href: '/coding' },
  ],
  legal: [
    { label: 'Usage Terms', href: '/contact' },
    { label: 'Privacy Requests', href: '/contact' },
    { label: 'Support Policy', href: '/contact' },
  ],
  resources: [
    { label: 'Study Tips', href: '/school#tips' },
    { label: 'Coding Roadmap', href: '/coding#roadmap' },
    { label: 'CBSE Exam Pattern', href: '/school#exam-pattern' },
    { label: 'FAQ', href: '/#faq' },
  ],
} as const;


/* ===================================================================
   TEAM MEMBERS — Shown on the About page
   =================================================================== */
export const TEAM_MEMBERS = [
  {
    name: 'Ishu Kumar',
    role: 'Founder & Developer',
    avatar: 'IK',
    bio: 'Full-stack developer passionate about making education accessible to every student in India.',
  },
  {
    name: 'Deepak Kumar',
    role: 'Technical Advisor',
    avatar: 'DK',
    bio: 'Experienced tech mentor guiding the architecture and scalability of the CollegeHub platform.',
  },
  {
    name: 'Riya Singh',
    role: 'Content Lead',
    avatar: 'RS',
    bio: 'Education specialist who designs structured curriculum for school and coding courses.',
  },
  {
    name: 'Amit Patel',
    role: 'UI/UX Designer',
    avatar: 'AP',
    bio: 'Creative designer focused on building beautiful, intuitive learning experiences.',
  },
] as const;
