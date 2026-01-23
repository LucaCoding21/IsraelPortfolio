'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['SPORTS', 'EVENTS', 'PORTRAITS', 'LIFESTYLE'];

export default function CategoryIndicator() {
  const [currentCategory, setCurrentCategory] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const workSection = document.getElementById('work');
      if (!workSection) return;

      const rect = workSection.getBoundingClientRect();
      const inWorkSection = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

      setIsVisible(inWorkSection);

      if (inWorkSection) {
        // Find which work item is most visible
        const workItems = document.querySelectorAll('[data-category]');
        let mostVisible: Element | null = null;
        let maxVisibility = 0;

        workItems.forEach((item) => {
          const itemRect = item.getBoundingClientRect();
          const visibility = Math.min(itemRect.bottom, window.innerHeight) - Math.max(itemRect.top, 0);
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisible = item;
          }
        });

        if (mostVisible) {
          const category = (mostVisible as Element).getAttribute('data-category');
          if (category) setCurrentCategory(category);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentCategory && (
        <motion.div
          className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 md:right-12 lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Category text */}
            <motion.div
              className="writing-vertical text-xs font-medium uppercase tracking-[0.3em] text-[#D4A853]"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              key={currentCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentCategory}
            </motion.div>

            {/* Decorative line */}
            <div className="absolute -left-4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#262626] to-transparent" />

            {/* Category dots */}
            <div className="absolute -left-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              {categories.map((cat) => (
                <motion.div
                  key={cat}
                  className="h-1.5 w-1.5 rounded-full"
                  animate={{
                    backgroundColor: cat === currentCategory ? '#D4A853' : '#262626',
                    scale: cat === currentCategory ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
