'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={cn(
          'rounded-full border-white/20 border-t-[#6366f1]',
          sizeClasses[size],
          className
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        aria-label={label || 'Loading'}
        role="status"
      />
      {label && (
        <p className="text-sm text-[#94a3b8] animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-semibold text-white">Loading CollegeHub</h2>
          <p className="text-sm text-[#94a3b8]">Please wait...</p>
        </motion.div>
      </div>
    </div>
  );
}

export function InlineLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <LoadingSpinner size="sm" />
      <span className="text-sm text-[#94a3b8]">{text}</span>
    </div>
  );
}

export function ButtonLoader() {
  return (
    <motion.div
      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}
