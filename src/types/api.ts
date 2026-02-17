/**
 * api.ts - Shared API contracts consumed by frontend service layer.
 *
 * Why this file exists:
 * - Keeps service/query hooks strongly typed.
 * - Prevents component-level type duplication.
 */

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CourseListItem {
  id: string;
  title: string;
  description: string;
  category: 'school' | 'coding';
  subCategory: 'class9' | 'class10' | 'cpp' | 'java' | 'python' | 'webdev';
  totalLessons: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlatCourseCreator {
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  category: 'school' | 'coding';
  subCategory: 'class9' | 'class10' | 'cpp' | 'java' | 'python' | 'webdev';
  subjects: Array<Record<string, unknown>>;
  modules: Array<Record<string, unknown>>;
  totalLessons: number;
  isPublished: boolean;
  createdBy?: FlatCourseCreator;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  courseTitle?: string;
  category?: 'school' | 'coding';
  subCategory?: 'class9' | 'class10' | 'cpp' | 'java' | 'python' | 'webdev';
  subjectId: string | null;
  chapterId: string | null;
  lastWatchedLesson: number;
  lockedUntilLesson: number;
  totalLessons: number;
  completedLessons: number[];
  overallProgress: number;
  subjectProgressMap: Record<string, number>;
  chapterProgressMap: Record<string, number>;
  weaknessAnalysis: Record<string, number>;
  updatedAt: string;
}

export interface EnrollmentListItem {
  id: string;
  courseId: string;
  courseTitle: string | null;
  category: string | null;
  subCategory: string | null;
  totalLessons: number;
  isPublished: boolean;
  lastWatchedLesson: number;
  lockedUntilLesson: number;
  overallProgress: number;
  completedCount: number;
  updatedAt: string;
}

export interface ResumeFeed {
  courseId: string;
  courseTitle: string;
  category: string;
  subCategory: string;
  lastWatchedLesson: number;
  lockedUntilLesson: number;
  updatedAt: string;
}

export interface LessonContent {
  lessonIndex: number;
  lessonId: string | null;
  title: string;
  description: string;
  contentType: 'video' | 'text' | 'quiz' | 'practice';
  contentUrl: string;
  duration: number;
  subject: {
    id: string | null;
    name: string;
  };
  chapter: {
    id: string | null;
    title: string;
  };
  lockedUntilLesson: number;
  lastWatchedLesson: number;
  completed: boolean;
}

export interface DashboardSummary {
  enrolledCourses: number;
  averageProgress: number;
  totalCompletedLessons: number;
}

export interface DashboardChartItem {
  label: string;
  value: number;
}

export interface WeaknessItem {
  topic: string;
  accuracy: number;
}

export interface DashboardSuggestion {
  topic: string;
  priority: 'high' | 'medium';
  reason: string;
}

export interface DashboardCourseProgress {
  courseId: string | null;
  title: string;
  category: string | null;
  subCategory: string | null;
  totalLessons: number;
  completedLessons: number;
  overallProgress: number;
  lockedUntilLesson: number;
  lastWatchedLesson: number;
  updatedAt: string;
}

export interface DashboardPayload {
  summary: DashboardSummary;
  resume: {
    courseId: string | null;
    courseTitle: string;
    lastWatchedLesson: number;
    lockedUntilLesson: number;
    updatedAt: string;
  } | null;
  charts: {
    progressByCourse: DashboardChartItem[];
    subjectPerformance: DashboardChartItem[];
  };
  weakTopicIndicators: {
    red: WeaknessItem[];
    yellow: WeaknessItem[];
    green: WeaknessItem[];
  };
  suggestions: DashboardSuggestion[];
  enrolledCourseProgress: DashboardCourseProgress[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: 'website' | 'dashboard' | 'mobile' | 'landing' | 'unknown';
}

export interface NewsletterSubscriptionPayload {
  email: string;
  source?: 'website' | 'dashboard' | 'mobile' | 'landing' | 'unknown';
}
