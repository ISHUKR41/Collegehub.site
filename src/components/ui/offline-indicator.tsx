'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(() => 
    typeof window !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full bg-red-500/90 backdrop-blur-lg border border-red-400/50 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">
              No internet connection
            </span>
          </div>
        </motion.div>
      )}

      {showReconnected && isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full bg-emerald-500/90 backdrop-blur-lg border border-emerald-400/50 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">
              Back online
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
