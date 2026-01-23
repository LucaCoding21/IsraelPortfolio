'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteMarquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const isInView = useInView(containerRef, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: direction === 'left' ? '-50%' : '0%',
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        },
      });
    }
  }, [isInView, controls, direction, speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && controls.stop()}
      onMouseLeave={() =>
        pauseOnHover &&
        controls.start({
          x: direction === 'left' ? '-50%' : '0%',
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          },
        })
      }
    >
      <motion.div
        className="flex w-fit"
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        animate={controls}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
