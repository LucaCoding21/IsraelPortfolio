'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Softer, more fluid spring config for warmth
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Even softer for the outer ring - creates a gentle trailing effect
  const outerSpringConfig = { damping: 25, stiffness: 200, mass: 0.8 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        setIsHoveringImage(false);
        setCursorText('');
      } else if (target.closest('[data-cursor="image"]')) {
        setIsHoveringImage(true);
        setIsHovering(false);
        const text = target.closest('[data-cursor="image"]')?.getAttribute('data-cursor-text');
        setCursorText(text || 'View');
      } else {
        setIsHovering(false);
        setIsHoveringImage(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Inner dot - warm terracotta */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative rounded-full"
          style={{
            marginLeft: -5,
            marginTop: -5,
          }}
          animate={{
            width: isHovering || isHoveringImage ? 0 : 10,
            height: isHovering || isHoveringImage ? 0 : 10,
            backgroundColor: '#6B9080',
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Outer ring - warm and inviting */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center"
        style={{
          x: outerXSpring,
          y: outerYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full"
          animate={{
            width: isHoveringImage ? 100 : isHovering ? 60 : 36,
            height: isHoveringImage ? 100 : isHovering ? 60 : 36,
            marginLeft: isHoveringImage ? -50 : isHovering ? -30 : -18,
            marginTop: isHoveringImage ? -50 : isHovering ? -30 : -18,
            backgroundColor: isHoveringImage
              ? 'rgba(107, 144, 128, 0.12)'
              : isHovering
                ? 'rgba(107, 144, 128, 0.08)'
                : 'transparent',
            borderWidth: 1.5,
            borderColor: isHovering || isHoveringImage
              ? 'rgba(107, 144, 128, 0.8)'
              : 'rgba(107, 144, 128, 0.4)',
          }}
          style={{
            borderStyle: 'solid',
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Cursor text for image hover */}
          {isHoveringImage && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-medium tracking-wide"
              style={{
                color: '#6B9080',
                fontFamily: "'Libre Baskerville', serif",
                fontStyle: 'italic',
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
