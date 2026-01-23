'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip parallax effect on mobile for performance
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Calculate transforms based on scroll progress (skip on mobile)
  const imageScale = isMobile ? 1 : 1 + scrollProgress * 0.15;
  const imageOpacity = isMobile ? 1 : Math.max(0, 1 - scrollProgress * 1.25);
  const contentY = isMobile ? '0%' : `${scrollProgress * 20}%`;

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden md:min-h-[700px]"
    >
      {/* Full-bleed background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale, opacity: imageOpacity, willChange: 'transform, opacity' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=85&auto=format&fit=crop"
          alt="Dynamic sports photography"
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(26, 43, 60, 0.2) 0%,
              rgba(26, 43, 60, 0.1) 50%,
              rgba(26, 43, 60, 0.5) 100%
            )`,
          }}
        />
      </motion.div>

      {/* Bottom gradient fade - creates smooth transition to next section (Andy Hardy style) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5]"
        style={{
          height: '50%',
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(15, 15, 15, 0.3) 25%,
            rgba(15, 15, 15, 0.7) 55%,
            rgba(15, 15, 15, 0.95) 80%,
            rgb(15, 15, 15) 100%
          )`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, willChange: 'transform' }}
      >
        {/* Main title */}
        <motion.h1
          className="mb-4"
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: 'clamp(3.5rem, 12vw, 8rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            color: '#FFFFFF',
            textShadow: '0 4px 40px rgba(0,0,0,0.2)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Israel Njagih
        </motion.h1>

        {/* Tagline */}
        <motion.p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '0.05em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Vancouver Photographer | Sports, Events & Community
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1.5 md:gap-2"
          animate={isMobile ? undefined : { y: [0, 6, 0] }}
          transition={isMobile ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-[0.625rem] md:text-xs"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            Scroll
          </span>
          <div
            className="h-6 w-[1px] md:h-8"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Location badge - bottom left */}
      <motion.div
        className="absolute bottom-8 left-6 z-10 hidden md:left-10 md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          49.2827° N, 123.1207° W
        </p>
      </motion.div>

      {/* Availability badge - bottom right */}
      <motion.div
        className="absolute bottom-8 right-6 z-10 hidden md:right-10 md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: '#6B9080' }}
          />
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.6875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            Available for bookings
          </p>
        </div>
      </motion.div>
    </section>
  );
}
