export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();

  static mark(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
      this.marks.set(name, Date.now());
    }
  }

  static measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof window === 'undefined' || !window.performance) {
      return null;
    }

    try {
      if (endMark) {
        window.performance.measure(name, startMark, endMark);
      } else {
        window.performance.measure(name, startMark);
      }

      const measure = window.performance.getEntriesByName(name, 'measure')[0];
      return measure ? measure.duration : null;
    } catch (error) {
      console.warn('Performance measurement failed:', error);
      return null;
    }
  }

  static getDuration(startMark: string): number | null {
    const startTime = this.marks.get(startMark);
    if (!startTime) return null;

    return Date.now() - startTime;
  }

  static clearMarks(): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks();
      this.marks.clear();
    }
  }

  static getNavigationTiming(): PerformanceNavigationTiming | null {
    if (typeof window === 'undefined' || !window.performance) {
      return null;
    }

    const navEntry = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navEntry || null;
  }

  static reportMetrics(): void {
    if (typeof window === 'undefined' || !window.performance) {
      return;
    }

    const timing = this.getNavigationTiming();
    if (!timing) return;

    console.table({
      'DNS Lookup': `${(timing.domainLookupEnd - timing.domainLookupStart).toFixed(2)}ms`,
      'TCP Connection': `${(timing.connectEnd - timing.connectStart).toFixed(2)}ms`,
      'TLS Negotiation': timing.secureConnectionStart 
        ? `${(timing.connectEnd - timing.secureConnectionStart).toFixed(2)}ms` 
        : 'N/A',
      'Request Time': `${(timing.responseStart - timing.requestStart).toFixed(2)}ms`,
      'Response Time': `${(timing.responseEnd - timing.responseStart).toFixed(2)}ms`,
      'DOM Processing': `${(timing.domComplete - timing.responseEnd).toFixed(2)}ms`,
      'DOM Content Loaded': `${(timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart).toFixed(2)}ms`,
      'Total Load Time': `${(timing.loadEventEnd - timing.fetchStart).toFixed(2)}ms`,
    });
  }
}

export function measureAsync<T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> {
  const start = Date.now();
  
  return fn().then(
    (result) => {
      const duration = Date.now() - start;
      console.log(`[${label}] completed in ${duration}ms`);
      return result;
    },
    (error) => {
      const duration = Date.now() - start;
      console.error(`[${label}] failed after ${duration}ms`, error);
      throw error;
    }
  );
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
