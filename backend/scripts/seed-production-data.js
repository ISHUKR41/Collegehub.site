/**
 * seed-production-data.js - Production bootstrap content seeding script.
 *
 * Purpose:
 * - Creates/updates a platform admin user.
 * - Seeds published school and coding courses with real nested structure.
 * - Seeds starter tests used by analytics and dashboard pipelines.
 *
 * Why this script exists:
 * - Fresh deployments should not look empty.
 * - Product teams need repeatable, idempotent baseline content.
 * - Local and staging environments should mirror production structure.
 *
 * Usage:
 *   node ./scripts/seed-production-data.js
 *
 * Optional env vars:
 * - SEED_ADMIN_EMAIL=admin@collegehub.site
 * - SEED_ADMIN_PASSWORD=StrongPassword123
 * - SEED_FORCE_ADMIN_PASSWORD_RESET=true|false
 */

require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const logger = require('../src/config/logger');
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Test = require('../src/models/Test');
const { CATEGORIES, ROLES, SUB_CATEGORIES } = require('../src/constants');

const toBool = (value) => String(value || '').toLowerCase() === 'true';

const createLesson = (order, title, description, contentType = 'video') => ({
    title,
    description,
    contentType,
    contentUrl: '',
    duration: 12,
    order,
});

const createSchoolSubjects = (classLevel) => {
    const common = {
        class9: {
            mathsChapters: ['Number Systems', 'Polynomials'],
            scienceChapters: ['Matter in Our Surroundings', 'Atoms and Molecules'],
            englishChapters: ['Beehive Poetry', 'Story Writing'],
            sstChapters: ['The French Revolution', 'Constitutional Design'],
        },
        class10: {
            mathsChapters: ['Real Numbers', 'Quadratic Equations'],
            scienceChapters: ['Chemical Reactions', 'Life Processes'],
            englishChapters: ['First Flight Prose', 'Analytical Writing'],
            sstChapters: ['Nationalism in Europe', 'Power Sharing'],
        },
    };

    const source = common[classLevel];

    return [
        {
            name: 'Mathematics',
            icon: 'Calculator',
            color: '#6366f1',
            order: 0,
            chapters: source.mathsChapters.map((chapterTitle, chapterIndex) => ({
                title: chapterTitle,
                description: `Core ${classLevel.toUpperCase()} mathematics chapter for conceptual strength.`,
                order: chapterIndex,
                lessons: [
                    createLesson(0, `${chapterTitle} Concepts`, 'Understand core concepts and definitions.', 'text'),
                    createLesson(1, `${chapterTitle} Examples`, 'Solve guided examples with method breakdown.', 'video'),
                    createLesson(2, `${chapterTitle} Practice`, 'Attempt practice set before chapter test.', 'practice'),
                ],
            })),
        },
        {
            name: 'Science',
            icon: 'Atom',
            color: '#22c55e',
            order: 1,
            chapters: source.scienceChapters.map((chapterTitle, chapterIndex) => ({
                title: chapterTitle,
                description: `Science chapter with theory, experiments, and assessments.`,
                order: chapterIndex,
                lessons: [
                    createLesson(0, `${chapterTitle} Theory`, 'Build chapter fundamentals with examples.', 'text'),
                    createLesson(1, `${chapterTitle} Diagrams`, 'Learn key diagrams and process flow.', 'video'),
                    createLesson(2, `${chapterTitle} Question Bank`, 'Solve chapter test style questions.', 'quiz'),
                ],
            })),
        },
        {
            name: 'English',
            icon: 'BookText',
            color: '#f59e0b',
            order: 2,
            chapters: source.englishChapters.map((chapterTitle, chapterIndex) => ({
                title: chapterTitle,
                description: 'Reading comprehension and writing mastery track.',
                order: chapterIndex,
                lessons: [
                    createLesson(0, `${chapterTitle} Reading`, 'Read and understand text structure.', 'text'),
                    createLesson(1, `${chapterTitle} Vocabulary`, 'Improve vocabulary and expression.', 'practice'),
                    createLesson(2, `${chapterTitle} Assessment`, 'Answer long and short response prompts.', 'quiz'),
                ],
            })),
        },
        {
            name: 'Social Science',
            icon: 'Globe',
            color: '#ef4444',
            order: 3,
            chapters: source.sstChapters.map((chapterTitle, chapterIndex) => ({
                title: chapterTitle,
                description: 'History, civics, economics, and geography coverage.',
                order: chapterIndex,
                lessons: [
                    createLesson(0, `${chapterTitle} Foundation`, 'Understand timeline, context, and key terms.', 'text'),
                    createLesson(1, `${chapterTitle} Notes`, 'Structured revision notes and mind maps.', 'video'),
                    createLesson(2, `${chapterTitle} Exam Drill`, 'Board-style chapter practice set.', 'quiz'),
                ],
            })),
        },
    ];
};

const createCodingModules = (track) => {
    if (track === SUB_CATEGORIES.CPP) {
        return [
            {
                title: 'C++ Fundamentals',
                description: 'Syntax, control flow, and functions.',
                order: 0,
                topics: [
                    {
                        title: 'Syntax and Data Types',
                        difficulty: 'beginner',
                        order: 0,
                        lessons: [
                            createLesson(0, 'Input Output and Variables', 'Learn cin/cout and type basics.', 'text'),
                            createLesson(1, 'Conditionals and Loops', 'Control flow for core problem solving.', 'video'),
                        ],
                    },
                    {
                        title: 'Functions and Arrays',
                        difficulty: 'beginner',
                        order: 1,
                        lessons: [
                            createLesson(0, 'Function Design', 'Write reusable functions.', 'practice'),
                            createLesson(1, 'Array Operations', 'Traverse and transform arrays.', 'practice'),
                        ],
                    },
                ],
            },
            {
                title: 'Object Oriented C++',
                description: 'Classes, inheritance, and polymorphism.',
                order: 1,
                topics: [
                    {
                        title: 'Classes and Objects',
                        difficulty: 'intermediate',
                        order: 0,
                        lessons: [
                            createLesson(0, 'Encapsulation', 'Data hiding and class design.', 'text'),
                            createLesson(1, 'Constructors', 'Lifecycle and initialization patterns.', 'video'),
                        ],
                    },
                ],
            },
            {
                title: 'STL and Problem Solving',
                description: 'Competitive coding patterns.',
                order: 2,
                topics: [
                    {
                        title: 'Vectors and Maps',
                        difficulty: 'intermediate',
                        order: 0,
                        lessons: [
                            createLesson(0, 'Vector Utilities', 'Efficient dynamic array usage.', 'practice'),
                            createLesson(1, 'Map and Set', 'Frequency and lookup patterns.', 'practice'),
                        ],
                    },
                ],
            },
        ];
    }

    if (track === SUB_CATEGORIES.JAVA) {
        return [
            {
                title: 'Java Core',
                description: 'Language syntax and control flow.',
                order: 0,
                topics: [
                    {
                        title: 'Java Basics',
                        difficulty: 'beginner',
                        order: 0,
                        lessons: [
                            createLesson(0, 'JDK Setup and First Program', 'Compile and run Java code.', 'video'),
                            createLesson(1, 'Operators and Branching', 'Control logic in Java.', 'text'),
                        ],
                    },
                ],
            },
            {
                title: 'OOP and Collections',
                description: 'Object design and data collections.',
                order: 1,
                topics: [
                    {
                        title: 'Class Design',
                        difficulty: 'intermediate',
                        order: 0,
                        lessons: [
                            createLesson(0, 'Inheritance and Interfaces', 'Reusable class hierarchies.', 'video'),
                            createLesson(1, 'Polymorphism in Practice', 'Design flexible APIs.', 'practice'),
                        ],
                    },
                ],
            },
            {
                title: 'Backend Foundations',
                description: 'Multithreading and API basics.',
                order: 2,
                topics: [
                    {
                        title: 'Concurrency Essentials',
                        difficulty: 'advanced',
                        order: 0,
                        lessons: [
                            createLesson(0, 'Threads and Executors', 'Parallel execution patterns.', 'video'),
                            createLesson(1, 'Thread Safety', 'Avoid race conditions.', 'practice'),
                        ],
                    },
                ],
            },
        ];
    }

    if (track === SUB_CATEGORIES.PYTHON) {
        return [
            {
                title: 'Python Essentials',
                description: 'Python syntax and core data structures.',
                order: 0,
                topics: [
                    {
                        title: 'Language Basics',
                        difficulty: 'beginner',
                        order: 0,
                        lessons: [
                            createLesson(0, 'Variables and Data Types', 'Primitive and collection types.', 'text'),
                            createLesson(1, 'Loops and Functions', 'Reusable logic and iteration.', 'practice'),
                        ],
                    },
                ],
            },
            {
                title: 'Data Handling',
                description: 'File operations and libraries.',
                order: 1,
                topics: [
                    {
                        title: 'File and Exception Handling',
                        difficulty: 'intermediate',
                        order: 0,
                        lessons: [
                            createLesson(0, 'File I/O', 'Read and write structured files.', 'practice'),
                            createLesson(1, 'Exception Strategy', 'Robust error handling patterns.', 'text'),
                        ],
                    },
                ],
            },
            {
                title: 'Web and Automation',
                description: 'Practical automation scripts.',
                order: 2,
                topics: [
                    {
                        title: 'API and Automation',
                        difficulty: 'advanced',
                        order: 0,
                        lessons: [
                            createLesson(0, 'HTTP Requests', 'Consume REST APIs with Python.', 'video'),
                            createLesson(1, 'Automation Workflows', 'Automate repetitive tasks.', 'practice'),
                        ],
                    },
                ],
            },
        ];
    }

    return [
        {
            title: 'Web Fundamentals',
            description: 'HTML, CSS, and JavaScript foundations.',
            order: 0,
            topics: [
                {
                    title: 'HTML and Semantic Layout',
                    difficulty: 'beginner',
                    order: 0,
                    lessons: [
                        createLesson(0, 'HTML Structure', 'Semantic markup and accessibility.', 'text'),
                        createLesson(1, 'Forms and Inputs', 'Collect and validate user input.', 'practice'),
                    ],
                },
                {
                    title: 'CSS and Responsive Design',
                    difficulty: 'beginner',
                    order: 1,
                    lessons: [
                        createLesson(0, 'Layouts and Flex/Grid', 'Build responsive UI sections.', 'video'),
                        createLesson(1, 'Design Tokens', 'Scalable styling strategy.', 'practice'),
                    ],
                },
            ],
        },
        {
            title: 'JavaScript and React',
            description: 'Modern frontend application development.',
            order: 1,
            topics: [
                {
                    title: 'JavaScript Essentials',
                    difficulty: 'intermediate',
                    order: 0,
                    lessons: [
                        createLesson(0, 'ES6+ Features', 'Modules, destructuring, and async logic.', 'text'),
                        createLesson(1, 'DOM and Events', 'Interactive browser behavior.', 'practice'),
                    ],
                },
                {
                    title: 'React Components',
                    difficulty: 'intermediate',
                    order: 1,
                    lessons: [
                        createLesson(0, 'Props and State', 'Component data flow and rendering.', 'video'),
                        createLesson(1, 'Hooks and Effects', 'Side-effects and state logic.', 'practice'),
                    ],
                },
            ],
        },
        {
            title: 'Node and APIs',
            description: 'Backend services and deployment.',
            order: 2,
            topics: [
                {
                    title: 'Express API Layer',
                    difficulty: 'advanced',
                    order: 0,
                    lessons: [
                        createLesson(0, 'REST Patterns', 'Controllers, services, and middleware.', 'video'),
                        createLesson(1, 'Auth and Security', 'JWT, hashing, and secure cookies.', 'practice'),
                    ],
                },
            ],
        },
    ];
};

const buildCoursePayloads = () => [
    {
        title: 'Class 9 CBSE Master Track',
        description:
            'Subject-wise Class 9 CBSE path with chapter-level lessons, tests, and analytics.',
        category: CATEGORIES.SCHOOL,
        subCategory: SUB_CATEGORIES.CLASS9,
        subjects: createSchoolSubjects('class9'),
        modules: [],
        isPublished: true,
    },
    {
        title: 'Class 10 CBSE Board Track',
        description:
            'Board-focused Class 10 study plan with complete chapter progression and test strategy.',
        category: CATEGORIES.SCHOOL,
        subCategory: SUB_CATEGORIES.CLASS10,
        subjects: createSchoolSubjects('class10'),
        modules: [],
        isPublished: true,
    },
    {
        title: 'C++ Complete Learning Path',
        description:
            'From C++ basics to STL and competitive coding workflows.',
        category: CATEGORIES.CODING,
        subCategory: SUB_CATEGORIES.CPP,
        subjects: [],
        modules: createCodingModules(SUB_CATEGORIES.CPP),
        isPublished: true,
    },
    {
        title: 'Java Developer Foundation Path',
        description:
            'Core Java to backend-ready OOP and concurrency concepts.',
        category: CATEGORIES.CODING,
        subCategory: SUB_CATEGORIES.JAVA,
        subjects: [],
        modules: createCodingModules(SUB_CATEGORIES.JAVA),
        isPublished: true,
    },
    {
        title: 'Python Developer Growth Path',
        description:
            'Beginner to advanced Python track covering automation and API workflows.',
        category: CATEGORIES.CODING,
        subCategory: SUB_CATEGORIES.PYTHON,
        subjects: [],
        modules: createCodingModules(SUB_CATEGORIES.PYTHON),
        isPublished: true,
    },
    {
        title: 'Full Stack Web Development Path',
        description:
            'Frontend to backend web development with modern tools and deployment.',
        category: CATEGORIES.CODING,
        subCategory: SUB_CATEGORIES.WEBDEV,
        subjects: [],
        modules: createCodingModules(SUB_CATEGORIES.WEBDEV),
        isPublished: true,
    },
];

const baseQuestions = (courseTitle) => [
    {
        questionText: `In ${courseTitle}, what is the best first step before jumping to advanced topics?`,
        options: [
            'Skip basics and start projects immediately',
            'Build strong fundamentals and follow sequence',
            'Memorize all definitions without practice',
            'Attempt only final tests',
        ],
        correctAnswer: 1,
        topicTag: 'fundamentals',
        difficulty: 'easy',
        explanation: 'Strong fundamentals create durable learning and reduce confusion later.',
    },
    {
        questionText: 'Why is periodic assessment important for learning improvement?',
        options: [
            'It replaces all lesson practice',
            'It identifies weak topics for focused revision',
            'It is useful only for high scorers',
            'It is needed only before final exams',
        ],
        correctAnswer: 1,
        topicTag: 'assessment',
        difficulty: 'medium',
        explanation: 'Topic-level assessments expose knowledge gaps and guide revision priority.',
    },
    {
        questionText: 'Which behavior supports long-term retention best?',
        options: [
            'One-time reading',
            'Spaced revision and repeated practice',
            'Avoiding feedback',
            'Skipping previous lessons',
        ],
        correctAnswer: 1,
        topicTag: 'revision',
        difficulty: 'easy',
        explanation: 'Spaced repetition strengthens memory and retrieval accuracy.',
    },
    {
        questionText: 'What should a learner do after a low test score on a topic?',
        options: [
            'Ignore the result and move on',
            'Revisit explanations and solve targeted practice',
            'Stop studying that subject',
            'Only watch summary videos',
        ],
        correctAnswer: 1,
        topicTag: 'weakness-improvement',
        difficulty: 'medium',
        explanation: 'Focused revision on weak topics is the fastest recovery strategy.',
    },
];

const upsertAdmin = async () => {
    const adminEmail = (process.env.SEED_ADMIN_EMAIL || 'admin@collegehub.site').toLowerCase();
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe@1234';
    const forceReset = toBool(process.env.SEED_FORCE_ADMIN_PASSWORD_RESET);

    let admin = await User.findOne({ email: adminEmail });
    let created = false;
    let updated = false;

    if (!admin) {
        admin = await User.create({
            name: 'CollegeHub Admin',
            email: adminEmail,
            password: adminPassword,
            role: ROLES.ADMIN,
        });
        created = true;
    } else {
        if (admin.role !== ROLES.ADMIN) {
            admin.role = ROLES.ADMIN;
            updated = true;
        }

        if (forceReset) {
            admin.password = adminPassword;
            updated = true;
        }

        if (updated) {
            await admin.save();
        }
    }

    return {
        admin,
        created,
        updated,
        usedDefaultPassword: !process.env.SEED_ADMIN_PASSWORD,
    };
};

const upsertCourse = async (adminId, payload) => {
    const existing = await Course.findOne({
        title: payload.title,
        category: payload.category,
        subCategory: payload.subCategory,
    });

    if (!existing) {
        const created = await Course.create({
            ...payload,
            createdBy: adminId,
        });
        return { course: created, operation: 'created' };
    }

    existing.title = payload.title;
    existing.description = payload.description;
    existing.category = payload.category;
    existing.subCategory = payload.subCategory;
    existing.subjects = payload.subjects;
    existing.modules = payload.modules;
    existing.isPublished = payload.isPublished;
    existing.createdBy = adminId;

    await existing.save();
    return { course: existing, operation: 'updated' };
};

const pickIdsForTest = (course) => {
    const schoolSubject = course.subjects?.[0];
    const schoolChapter = schoolSubject?.chapters?.[0];
    const codingModule = course.modules?.[0];
    const codingTopic = codingModule?.topics?.[0];

    if (course.category === CATEGORIES.SCHOOL) {
        return {
            subjectId: schoolSubject?._id || null,
            chapterId: schoolChapter?._id || null,
        };
    }

    return {
        subjectId: codingModule?._id || null,
        chapterId: codingTopic?._id || null,
    };
};

const upsertDiagnosticTest = async (course) => {
    const ids = pickIdsForTest(course);
    const title = `${course.title} - Diagnostic Test`;
    const payload = {
        title,
        courseId: course._id,
        subjectId: ids.subjectId,
        chapterId: ids.chapterId,
        timeLimit: 20,
        isActive: true,
        questions: baseQuestions(course.title),
    };

    const existing = await Test.findOne({ courseId: course._id, title });
    if (!existing) {
        await Test.create(payload);
        return 'created';
    }

    existing.subjectId = payload.subjectId;
    existing.chapterId = payload.chapterId;
    existing.timeLimit = payload.timeLimit;
    existing.isActive = payload.isActive;
    existing.questions = payload.questions;
    await existing.save();
    return 'updated';
};

const seed = async () => {
    await connectDB();

    const adminState = await upsertAdmin();
    const coursePayloads = buildCoursePayloads();

    const summary = {
        coursesCreated: 0,
        coursesUpdated: 0,
        testsCreated: 0,
        testsUpdated: 0,
    };

    for (const payload of coursePayloads) {
        const { course, operation } = await upsertCourse(adminState.admin._id, payload);
        if (operation === 'created') {
            summary.coursesCreated += 1;
        } else {
            summary.coursesUpdated += 1;
        }

        const testOperation = await upsertDiagnosticTest(course);
        if (testOperation === 'created') {
            summary.testsCreated += 1;
        } else {
            summary.testsUpdated += 1;
        }
    }

    logger.info('Seed completed successfully.');
    logger.info(
        `Admin created=${adminState.created}, updated=${adminState.updated}, email=${adminState.admin.email}`
    );
    logger.info(
        `Courses created=${summary.coursesCreated}, updated=${summary.coursesUpdated}`
    );
    logger.info(`Tests created=${summary.testsCreated}, updated=${summary.testsUpdated}`);

    if (adminState.usedDefaultPassword) {
        logger.warn(
            'SEED_ADMIN_PASSWORD not provided. Default admin password was used. Change it immediately in non-local environments.'
        );
    }
};

seed()
    .catch((error) => {
        logger.error(`Seed failed: ${error.message}`);
        logger.error(error.stack || '');
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.connection.close(false);
    });
