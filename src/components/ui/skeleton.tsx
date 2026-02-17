import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'rounded' | 'circular';
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-white/5';
  
  const variantClasses = {
    default: 'rounded-lg',
    rounded: 'rounded-xl',
    circular: 'rounded-full',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass p-6 space-y-4">
      <Skeleton className="h-12 w-12" variant="rounded" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="glass overflow-hidden">
      <Skeleton className="h-48 w-full" variant="default" />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" variant="rounded" />
          <Skeleton className="h-6 w-20" variant="rounded" />
        </div>
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-28" variant="rounded" />
        </div>
      </div>
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="glass p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10" variant="circular" />
        <Skeleton className="h-6 w-16" variant="rounded" />
      </div>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      ))}
    </div>
  );
}
