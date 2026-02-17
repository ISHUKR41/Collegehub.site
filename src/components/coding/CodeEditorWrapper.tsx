/**
 * CodeEditorWrapper.tsx — Dynamic import wrapper for Monaco Editor
 * Monaco needs ssr: false since it uses browser APIs.
 */

'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const CodeEditor = dynamic(() => import('./CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] rounded-2xl border border-white/10 bg-[#0d1117]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin" />
        <span className="text-sm text-[#64748b]">Loading Code Editor...</span>
      </div>
    </div>
  ),
});

export default CodeEditor;
