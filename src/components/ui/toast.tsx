'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastColors = {
  success: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
  error: 'from-red-500/20 to-red-600/10 border-red-500/30',
  warning: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  info: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
};

const toastIconColors = {
  success: 'text-emerald-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
  info: 'text-blue-400',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toastIcons[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`min-w-[320px] max-w-md pointer-events-auto backdrop-blur-xl bg-gradient-to-br ${toastColors[toast.type]} border rounded-xl shadow-2xl overflow-hidden`}
              >
                <div className="p-4 flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${toastIconColors[toast.type]} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-0.5">
                      {toast.title}
                    </h4>
                    {toast.message && (
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {toast.message}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <motion.div
                  className={`h-1 bg-gradient-to-r ${toastColors[toast.type]}`}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: (toast.duration || 5000) / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
