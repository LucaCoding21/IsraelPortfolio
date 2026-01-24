'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { socialLinks } from '@/lib/constants';

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const time = useTime();
  const isMobile = useIsMobile();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const greeting = getGreeting(time.getHours());
  const vancouverTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Vancouver',
  });

  // Split email for animated display
  const emailParts = socialLinks.email.address.split('@');

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full blur-[120px] md:h-[600px] md:w-[600px] md:blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(107, 144, 128, 0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full blur-[100px] md:h-[500px] md:w-[500px] md:blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(124, 156, 181, 0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-12 md:py-32"
      >
        {/* Top status bar */}
        <motion.div
          className="mb-12 flex flex-col items-center justify-center gap-3 md:mb-16 md:flex-row md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <motion.div
              className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
              style={{ backgroundColor: '#6B9080' }}
              animate={isMobile ? undefined : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={isMobile ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              className="text-[0.625rem] md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Available for projects
            </span>
          </div>

          <div
            className="hidden h-4 w-px md:block"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          />

          <div className="flex items-center gap-4 md:gap-6">
            <span
              className="text-[0.625rem] md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Vancouver, BC
            </span>
            <span
              className="text-xs md:text-sm"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontVariantNumeric: 'tabular-nums',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {vancouverTime}
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Greeting */}
          <motion.p
            className="mb-3 text-[0.625rem] md:mb-4 md:text-xs"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#6B9080',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {greeting}
          </motion.p>

          {/* Main headline */}
          <motion.h2
            className="mb-8 md:mb-10"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Let&apos;s create
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)' }}>
              something real
            </span>
          </motion.h2>

          {/* Email - the main CTA */}
          <motion.div
            className="group relative mb-6 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <MagneticButton strength={isMobile ? 0 : 0.15}>
              <a
                href={socialLinks.email.url}
                className="relative block overflow-hidden"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: 'clamp(1rem, 4vw, 2rem)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
              >
                <motion.span
                  className="relative inline-block"
                  animate={{
                    color: emailHovered ? '#6B9080' : '#FFFFFF',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {emailParts[0]}
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>@</span>
                  {emailParts[1]}
                </motion.span>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] md:h-[2px]"
                  style={{ backgroundColor: '#6B9080' }}
                  initial={{ width: '0%' }}
                  animate={{ width: emailHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </a>
            </MagneticButton>

            {/* Copy button - desktop only */}
            <motion.button
              onClick={handleCopyEmail}
              className="absolute -right-20 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: emailHovered ? 1 : 0, x: emailHovered ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ color: '#6B9080' }}
                  >
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="max-w-sm text-sm leading-relaxed md:max-w-md md:text-base"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'rgba(255, 255, 255, 0.5)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Got a project, event, or idea? Drop me a line and let&apos;s make something great.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
