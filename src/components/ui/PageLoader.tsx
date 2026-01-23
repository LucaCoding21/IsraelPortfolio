'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#FAFBFC' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center">
            {/* Warm greeting */}
            <motion.p
              className="mb-2 text-sm tracking-wide"
              style={{
                color: '#8899A6',
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Welcome
            </motion.p>

            {/* Name - friendly, not dramatic */}
            <motion.h1
              className="text-center"
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#1A2B3C',
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Israel Njagih
            </motion.h1>

            {/* Accent line - terracotta */}
            <motion.div
              className="mt-4 h-[2px] w-10 origin-center"
              style={{ backgroundColor: '#6B9080' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            />

            {/* Subtext */}
            <motion.p
              className="mt-4"
              style={{
                color: '#8899A6',
                fontFamily: "'Libre Baskerville', serif",
                fontSize: '0.875rem',
                fontStyle: 'italic',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Photographer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
