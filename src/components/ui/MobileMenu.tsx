'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, socialLinks } from '@/lib/constants';

interface MobileMenuProps {
  isScrolled?: boolean;
}

export default function MobileMenu({ isScrolled = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  // When menu is open, always use dark color. Otherwise, use white on hero, dark when scrolled
  const barColor = isOpen ? '#1A2B3C' : (isScrolled ? '#1A2B3C' : '#FFFFFF');

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[1001] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <motion.span
          className="block h-[2px] w-6 origin-center transition-colors duration-300"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
            backgroundColor: barColor,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="block h-[2px] w-6 transition-colors duration-300"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
            backgroundColor: barColor,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[2px] w-6 origin-center transition-colors duration-300"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
            backgroundColor: barColor,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[999] backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(26, 43, 60, 0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed inset-x-0 top-0 z-[1000] flex min-h-screen flex-col px-6 pt-24"
              style={{ backgroundColor: '#FAFBFC' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="group flex items-center justify-between py-6"
                    style={{ borderBottom: '1px solid #E2E8F0' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <span
                      className="text-3xl transition-colors"
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        color: '#1A2B3C',
                      }}
                    >
                      {item.label}
                    </span>
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-2"
                      style={{ color: '#6B9080' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* Contact info */}
              <motion.div
                className="mt-auto pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p
                  className="mb-4 text-sm tracking-wide"
                  style={{
                    color: '#8899A6',
                    fontFamily: "'Source Sans 3', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Get in touch
                </p>
                <a
                  href={socialLinks.email.url}
                  className="mb-2 block transition-colors"
                  style={{
                    color: '#1A2B3C',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {socialLinks.email.address}
                </a>
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{
                    color: '#6B9080',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {socialLinks.instagram.handle}
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
