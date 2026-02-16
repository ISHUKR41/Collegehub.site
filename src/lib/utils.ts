/**
 * utils.ts - Shared utility helpers for UI component composition.
 *
 * `cn` follows the standard shadcn/ui pattern for className merging.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

