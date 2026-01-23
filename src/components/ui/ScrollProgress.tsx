'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function ScrollProgress() {
  const scrollProgress = useMotionValue(0);
  const scaleY = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollProgress.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress]);

  return (
    <div className="fixed bottom-8 right-6 z-50 hidden md:block lg:bottom-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2">
      {/* Progress track */}
      <div className="relative h-24 w-[2px] rounded-full bg-[#262626]">
        <motion.div
          className="absolute left-0 top-0 w-full origin-top rounded-full bg-[#D4A853]"
          style={{ scaleY, height: '100%' }}
        />
      </div>

      {/* Film sprocket holes decoration */}
      <div className="absolute -left-2 top-0 flex h-full flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-[#262626]"
          />
        ))}
      </div>
      <div className="absolute -right-2 top-0 flex h-full flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-[#262626]"
          />
        ))}
      </div>
    </div>
  );
}
