'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      console.error('Production error:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="glass !p-8 md:!p-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Something went wrong
                </h1>
                <p className="text-[#94a3b8] max-w-md mx-auto">
                  An unexpected error occurred. We&apos;ve been notified and will fix it as soon as possible.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20 text-left overflow-auto max-h-64">
                  <p className="text-xs font-mono text-red-400 break-all">
                    {this.state.error.toString()}
                  </p>
                  {this.state.error.stack && (
                    <pre className="text-xs text-gray-400 mt-2 overflow-x-auto">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
