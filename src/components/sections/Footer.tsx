'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/constants';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  // Easter egg - click the camera emoji 5 times
  const handleEasterEgg = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5 && !easterEggFound) {
      setEasterEggFound(true);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden pb-8 pt-16"
      style={{
        backgroundColor: '#F5F7F5',
        borderTop: '1px solid #E2E8F0',
      }}
    >
      <div className="container">
        {/* Main footer content */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: '#6B9080' }}
              >
                <span
                  className="text-sm font-medium"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: "'Libre Baskerville', serif",
                  }}
                >
                  IN
                </span>
              </div>
              <div>
                <p
                  className="font-medium"
                  style={{
                    color: '#1A2B3C',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Israel Njagih
                </p>
                <p
                  className="text-sm"
                  style={{ color: '#8899A6' }}
                >
                  Photographer
                </p>
              </div>
            </div>
            <p
              className="max-w-xs text-sm"
              style={{
                color: '#4A5568',
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              Capturing authentic moments in Vancouver&apos;s sports and
              community scenes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="mb-4 text-xs font-medium uppercase tracking-wider"
              style={{ color: '#8899A6' }}
            >
              Quick Links
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {['Work', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                      className="text-sm transition-colors underline-warm"
                      style={{ color: '#4A5568' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-4 text-xs font-medium uppercase tracking-wider"
              style={{ color: '#8899A6' }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={socialLinks.email.url}
                  className="text-sm transition-colors underline-warm"
                  style={{ color: '#4A5568' }}
                >
                  {socialLinks.email.address}
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors underline-warm"
                  style={{ color: '#6B9080' }}
                >
                  {socialLinks.instagram.handle}
                </a>
              </li>
              <li>
                <span
                  className="text-sm"
                  style={{ color: '#8899A6' }}
                >
                  Vancouver, BC
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{ borderTop: '1px solid #E2E8F0' }}
        >
          <p
            className="text-xs"
            style={{ color: '#8899A6' }}
          >
            &copy; {new Date().getFullYear()} Israel Njagih. All rights reserved.
          </p>

          {/* Easter egg camera */}
          <motion.button
            onClick={handleEasterEgg}
            className={`easter-egg text-xs ${easterEggFound ? 'found' : ''}`}
            style={{ color: '#8899A6' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Easter egg"
          >
            {easterEggFound ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Thanks for exploring! You found a secret.
              </motion.span>
            ) : (
              <span
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontStyle: 'italic',
                }}
              >
                Good vibes, great shots.
              </span>
            )}
          </motion.button>

          <p
            className="text-xs"
            style={{ color: '#8899A6' }}
          >
            Made with care in Vancouver
          </p>
        </div>
      </div>
    </footer>
  );
}
