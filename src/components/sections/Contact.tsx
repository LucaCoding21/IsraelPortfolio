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
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(107, 144, 128, 0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
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
        className="relative z-10 flex min-h-screen flex-col justify-between px-4 py-16 md:px-12 md:py-20 lg:px-20"
      >
        {/* Top section - Greeting and time */}
        <motion.div
          className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-4"
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

        {/* Main content - Hero text and email */}
        <div className="my-auto flex flex-col items-center justify-center py-12 md:py-20">
          {/* Greeting */}
          <motion.p
            className="mb-4 text-center text-[0.625rem] md:mb-6 md:text-xs"
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
            className="mb-6 text-center text-3xl md:mb-8 md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FFFFFF',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Let&apos;s create
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.7)' }}>
              together
            </span>
          </motion.h2>

          {/* Email - the main CTA */}
          <motion.div
            className="group relative mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <MagneticButton strength={0.15}>
              <a
                href={socialLinks.email.url}
                className="relative block overflow-hidden text-base md:text-2xl lg:text-3xl"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
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

            {/* Copy button */}
            <motion.button
              onClick={handleCopyEmail}
              className="absolute -right-16 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex"
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
            className="max-w-xs px-4 text-center text-sm leading-relaxed md:max-w-md md:px-0 md:text-base md:leading-relaxed"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'rgba(255, 255, 255, 0.5)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Got a project, event, or idea? I&apos;d love to hear about it.
            <span className="hidden md:inline"><br /></span>
            <span className="md:hidden"> </span>
            Drop me a line and let&apos;s make something great.
          </motion.p>
        </div>

        {/* Bottom section - Social links and decorative elements */}
        <motion.div
          className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Social links */}
          <div className="flex items-center gap-6 md:gap-8">
            <MagneticButton strength={0.4}>
              <a
                href={socialLinks.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-colors duration-300 md:gap-3"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-[#6B9080] group-hover:bg-[rgba(107,144,128,0.1)] md:h-12 md:w-12"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <svg
                    className="h-4 w-4 transition-colors duration-300 group-hover:text-[#6B9080] md:h-5 md:w-5"
                    style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span
                  className="text-xs transition-colors duration-300 group-hover:text-white md:text-sm"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {socialLinks.instagram.handle}
                </span>
              </a>
            </MagneticButton>
          </div>

          {/* Decorative line */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <motion.div
              className="h-[1px] w-full max-w-[200px]"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            />
          </div>

          {/* Scroll indicator / Back to top */}
          <MagneticButton strength={0.4}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 md:gap-3"
            >
              <span
                className="text-[0.625rem] transition-colors duration-300 group-hover:text-white md:text-xs"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                Back to top
              </span>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-[#6B9080] group-hover:bg-[rgba(107,144,128,0.1)] md:h-12 md:w-12"
                style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <motion.svg
                  className="h-3.5 w-3.5 transition-colors duration-300 group-hover:text-[#6B9080] md:h-4 md:w-4"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={isMobile ? undefined : { y: [0, -3, 0] }}
                  transition={isMobile ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </motion.svg>
              </div>
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Footer credit */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 z-10 text-center md:bottom-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <p
          className="text-[0.625rem] md:text-xs"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          &copy; {new Date().getFullYear()} Israel Njagih. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}
