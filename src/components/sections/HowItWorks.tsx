/**
 * HowItWorks.tsx — Step-by-step "How It Works" section for landing page.
 *
 * Why this component exists:
 * - Explains the platform workflow in a clear numbered-step format.
 * - Uses connected timeline dots for visual progression.
 * - Each step has an icon, title, and description with scroll-reveal.
 *
 * To extend:
 * - Add more steps for advanced features (live classes, certificates).
 * - Link each step to its corresponding page.
 */

'use client';

import {
  UserPlus,
  BookOpen,
  PenTool,
  BarChart3,
  Trophy,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

/* Steps data — each step represents a phase of the learning journey */
const STEPS = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Create Your Account',
    description:
      'Sign up in 30 seconds. Choose your learning path — School (Class 9/10) or Coding (C++, Java, Python, Web Dev).',
    color: '#6366f1',
  },
  {
    step: 2,
    icon: BookOpen,
    title: 'Start Learning',
    description:
      'Follow structured lessons from basics to advanced. Each lesson builds on the previous one with our progressive unlock system.',
    color: '#8b5cf6',
  },
  {
    step: 3,
    icon: PenTool,
    title: 'Take Tests',
    description:
      'Test your understanding with chapter-wise and topic-wise assessments. Get instant results with detailed explanations.',
    color: '#a78bfa',
  },
  {
    step: 4,
    icon: BarChart3,
    title: 'Track Performance',
    description:
      'View your analytics dashboard with subject-wise scores, weak topic detection, and personalized improvement suggestions.',
    color: '#22c55e',
  },
  {
    step: 5,
    icon: Trophy,
    title: 'Achieve Mastery',
    description:
      'Complete courses, improve weak areas, and build a strong foundation. Resume anytime from exactly where you left off.',
    color: '#f59e0b',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding relative" aria-label="How it works">
      <div className="container-custom">
        <RevealOnScroll>
          <SectionHeading
            title="How CollegeHub Works"
            subtitle="Five simple steps from sign-up to mastery — structured, tracked, and personalized."
            label="How It Works"
          />
        </RevealOnScroll>

        {/* Steps timeline */}
        <div className="max-w-3xl mx-auto">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <RevealOnScroll key={item.step} delay={index * 0.1}>
                <div className="flex gap-6 mb-0">
                  {/* Timeline column — dot + connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    {!isLast && (
                      <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        Step {item.step}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
