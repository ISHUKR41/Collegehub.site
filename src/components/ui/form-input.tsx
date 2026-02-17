'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      success,
      hint,
      icon,
      showPasswordToggle,
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-[#f1f5f9] mb-2"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full px-4 py-3 rounded-xl',
              'bg-white/5 border border-white/10',
              'text-white placeholder:text-[#64748b]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-12',
              (showPasswordToggle || error || success) && 'pr-12',
              error && 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500',
              success && 'border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500',
              isFocused && 'bg-white/8 border-white/20',
              className
            )}
            {...props}
          />

          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}

          {error && !showPasswordToggle && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
          )}

          {success && !showPasswordToggle && !error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
          )}
        </div>

        {hint && !error && !success && (
          <p className="text-xs text-[#64748b] mt-1.5">{hint}</p>
        )}

        {error && (
          <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </p>
        )}

        {success && !error && (
          <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {success}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
