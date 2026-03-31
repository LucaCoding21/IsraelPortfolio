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

  const contentY = isMobile ? '0%' : `${scrollProgress * 20}%`;
  const imageScale = isMobile ? 1 : 1 + scrollProgress * 0.08;
  const fadeOut = isMobile ? 1 : Math.max(0, 1 - scrollProgress * 1.25);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden md:min-h-[700px]"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      {/* === DESKTOP: Split layout === */}
      <div className="hidden h-full md:flex">
        {/* Left side — dark with text */}
        <motion.div
          className="relative z-10 flex w-[55%] flex-col justify-center px-[clamp(3rem,6vw,7rem)]"
          style={{ y: contentY, willChange: 'transform' }}
        >
          <motion.p
            className="mb-5"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 'clamp(0.8125rem, 1vw, 1rem)',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#6B9080',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Vancouver Photographer
          </motion.p>

          <motion.h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(4rem, 7.5vw, 9rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Njagih
            <br />
            Studios
          </motion.h1>

          <motion.div
            className="mt-8"
            style={{
              width: '48px',
              height: '1.5px',
              backgroundColor: '#6B9080',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            className="mt-6"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.55)',
              maxWidth: '380px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Sports, Events & Community
          </motion.p>
        </motion.div>

        {/* Right side — portrait image */}
        <motion.div
          className="relative w-[45%]"
          style={{
            scale: imageScale,
            opacity: fadeOut,
            willChange: 'transform, opacity',
          }}
        >
          {/* Soft blend from dark left into the image */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[40%]"
            style={{
              background: 'linear-gradient(to right, #0f0f0f 0%, rgba(15,15,15,0.6) 40%, rgba(15,15,15,0) 100%)',
            }}
          />
          <Image
            src="/potentialhero.jpg"
            alt="Portrait photography by Njagih Studios Vancouver"
            fill
            className="object-cover object-[center_25%]"
            priority
            quality={90}
            sizes="45vw"
          />
        </motion.div>
      </div>

      {/* === MOBILE: Image background with overlay === */}
      <div className="relative flex h-full flex-col md:hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/potentialhero.jpg"
            alt="Portrait photography by Njagih Studios Vancouver"
            fill
            className="object-cover object-[center_20%]"
            priority
            quality={85}
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(15, 15, 15, 0.05) 0%,
                rgba(15, 15, 15, 0.15) 25%,
                rgba(15, 15, 15, 0.5) 45%,
                rgba(15, 15, 15, 0.85) 60%,
                rgb(15, 15, 15) 75%
              )`,
            }}
          />
        </div>

        {/* Mobile text content — anchored to bottom */}
        <div className="relative z-10 mt-auto px-6 pb-32">
          <motion.p
            className="mb-3"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#6B9080',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Vancouver Photographer
          </motion.p>

          <motion.h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(3.25rem, 14vw, 5rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Njagih
            <br />
            Studios
          </motion.h1>

          <motion.p
            className="mt-4"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '1.0625rem',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.04em',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Sports, Events & Community
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient — smooth transition to next section (both layouts) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20"
        style={{
          height: '25%',
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(15, 15, 15, 0.5) 40%,
            rgba(15, 15, 15, 0.9) 75%,
            rgb(15, 15, 15) 100%
          )`,
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 md:bottom-8"
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
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Scroll
          </span>
          <div
            className="h-6 w-[1px] md:h-8"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Location badge — bottom left (desktop) */}
      <motion.div
        className="absolute bottom-8 left-10 z-30 hidden md:block"
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
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          49.2827° N, 123.1207° W
        </p>
      </motion.div>

      {/* Availability badge — bottom right (desktop) */}
      <motion.div
        className="absolute bottom-8 right-10 z-30 hidden md:block"
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
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Available for bookings
          </p>
        </div>
      </motion.div>
    </section>
  );
}
