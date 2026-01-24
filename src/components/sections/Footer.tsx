'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
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

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
  ],
  services: [
    { label: 'Weddings', href: '/services#weddings' },
    { label: 'Festivals & Sports', href: '/services#festivals-sports' },
    { label: 'Corporate', href: '/services#corporate' },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Decorative top border */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(107, 144, 128, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 md:px-12 md:pb-12 md:pt-24">
        {/* Top section - Large brand and CTA */}
        <motion.div
          className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand */}
          <div>
            <p
              className="mb-2 text-[0.625rem] uppercase tracking-[0.2em] md:mb-3 md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: '#6B9080',
              }}
            >
              Photography Studio
            </p>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              Njagih{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.5)' }}>
                Studios
              </span>
            </h2>
          </div>

          {/* CTA Button */}
          <motion.a
            href={socialLinks.email.url}
            className="group flex items-center gap-3 rounded-full border px-6 py-3 transition-all duration-300 md:px-8 md:py-4"
            style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
            whileHover={{
              borderColor: '#6B9080',
              backgroundColor: 'rgba(107, 144, 128, 0.1)',
            }}
          >
            <span
              className="text-sm transition-colors duration-300 group-hover:text-white md:text-base"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Start a project
            </span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Middle section - Links grid */}
        <motion.div
          className="mb-12 grid grid-cols-2 gap-8 md:mb-16 md:grid-cols-4 md:gap-12"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Navigation */}
          <div>
            <h3
              className="mb-4 text-[0.625rem] uppercase tracking-[0.15em] md:mb-6 md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Navigation
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-white md:text-base"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    <span>{link.label}</span>
                    <svg
                      className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="mb-4 text-[0.625rem] uppercase tracking-[0.15em] md:mb-6 md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Services
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-white md:text-base"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="mb-4 text-[0.625rem] uppercase tracking-[0.15em] md:mb-6 md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Contact
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a
                  href={socialLinks.email.url}
                  className="text-sm transition-colors duration-300 hover:text-[#6B9080] md:text-base"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {socialLinks.email.address}
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:text-[#6B9080] md:text-base"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {socialLinks.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Availability */}
          <div>
            <h3
              className="mb-4 text-[0.625rem] uppercase tracking-[0.15em] md:mb-6 md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Location
            </h3>
            <div className="space-y-2 md:space-y-3">
              <p
                className="text-sm md:text-base"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Vancouver, BC
              </p>
              <p
                className="text-sm md:text-base"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Canada
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#6B9080' }}
                />
                <span
                  className="text-xs md:text-sm"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: '#6B9080',
                  }}
                >
                  Available for projects
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social links row */}
        <motion.div
          className="mb-12 flex flex-wrap items-center gap-4 md:mb-16"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="mr-2 text-[0.625rem] uppercase tracking-[0.15em] md:mr-4 md:text-xs"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            Follow
          </span>

          {/* Instagram */}
          <a
            href={socialLinks.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#6B9080] hover:bg-[rgba(107,144,128,0.15)] md:h-12 md:w-12"
            style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
            aria-label="Instagram"
          >
            <svg
              className="h-4 w-4 transition-colors duration-300 group-hover:text-[#6B9080] md:h-5 md:w-5"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href={socialLinks.email.url}
            className="group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#6B9080] hover:bg-[rgba(107,144,128,0.15)] md:h-12 md:w-12"
            style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
            aria-label="Email"
          >
            <svg
              className="h-4 w-4 transition-colors duration-300 group-hover:text-[#6B9080] md:h-5 md:w-5"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Copyright */}
          <p
            className="text-center text-[0.625rem] md:text-left md:text-xs"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            &copy; {currentYear} Njagih Studios. All rights reserved.
          </p>

          {/* Tagline */}
          <p
            className="text-center text-[0.625rem] md:text-xs"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.25)',
            }}
          >
            Capturing moments that matter
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 transition-colors duration-300"
          >
            <span
              className="text-[0.625rem] uppercase tracking-[0.1em] transition-colors duration-300 group-hover:text-white md:text-xs"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              Back to top
            </span>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-[#6B9080] group-hover:bg-[rgba(107,144,128,0.15)] md:h-9 md:w-9"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <svg
                className="h-3 w-3 transition-colors duration-300 group-hover:text-[#6B9080] md:h-3.5 md:w-3.5"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
