'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { socialLinks } from '@/lib/constants';

const menuItems: { label: string; href: string; isPage?: boolean; image: string }[] = [
  { label: 'Home', href: '#', image: '/israel1.jpg' },
  { label: 'Portfolio', href: '/portfolio', isPage: true, image: '/israel2.jpg' },
  { label: 'About', href: '#about', image: '/isreal3.jpg' },
  { label: 'Contact', href: '#contact', image: '/isreal4.jpg' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [isOnDarkSection, setIsOnDarkSection] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isPortfolioPage = pathname === '/portfolio';

  const checkSection = useCallback(() => {
    if (isPortfolioPage) {
      setIsOnDarkSection(false);
      setIsPastHero(true); // Always show name on portfolio page
      return;
    }

    const scrollY = window.scrollY;
    const navHeight = 80;

    const hero = document.querySelector('section:first-of-type');
    const categoryCards = document.querySelector('section:nth-of-type(2)');
    const about = document.getElementById('about');
    const work = document.getElementById('work');
    const contact = document.getElementById('contact');

    const heroBottom = hero ? hero.getBoundingClientRect().bottom + scrollY : window.innerHeight;
    const categoryCardsBottom = categoryCards ? categoryCards.getBoundingClientRect().bottom + scrollY : 0;
    const aboutTop = about ? about.getBoundingClientRect().top + scrollY : Infinity;
    const aboutBottom = about ? about.getBoundingClientRect().bottom + scrollY : 0;
    const workTop = work ? work.getBoundingClientRect().top + scrollY : Infinity;
    const workBottom = work ? work.getBoundingClientRect().bottom + scrollY : 0;
    const contactTop = contact ? contact.getBoundingClientRect().top + scrollY : Infinity;

    const currentPos = scrollY + navHeight;

    // Check if we're past the hero section
    setIsPastHero(scrollY > 100);

    if (currentPos < heroBottom) {
      setIsOnDarkSection(true);
    } else if (currentPos < categoryCardsBottom) {
      setIsOnDarkSection(true);
    } else if (currentPos >= aboutTop && currentPos < aboutBottom) {
      setIsOnDarkSection(false);
    } else if (currentPos >= workTop && currentPos < workBottom) {
      setIsOnDarkSection(true);
    } else if (currentPos >= contactTop) {
      setIsOnDarkSection(true);
    } else {
      setIsOnDarkSection(false);
    }
  }, [isPortfolioPage]);

  useEffect(() => {
    checkSection();
    window.addEventListener('scroll', checkSection);
    window.addEventListener('resize', checkSection);
    return () => {
      window.removeEventListener('scroll', checkSection);
      window.removeEventListener('resize', checkSection);
    };
  }, [checkSection]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string, isPage?: boolean) => {
    setIsOpen(false);
    if (isPage) {
      router.push(href);
    } else if (href === '#') {
      if (pathname !== '/') {
        router.push('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (pathname !== '/') {
        router.push('/' + href);
      } else {
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  };

  const textColor = isOpen ? '#FFFFFF' : isOnDarkSection ? '#FFFFFF' : '#1A2B3C';
  const circleBg = isOpen ? 'rgba(255, 255, 255, 0.1)' : isOnDarkSection ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const circleBorder = isOpen ? 'rgba(255, 255, 255, 0.3)' : isOnDarkSection ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.15)';

  return (
    <>
      {/* Fixed header bar */}
      <motion.header
        className="fixed left-0 right-0 top-0 z-[1000] flex items-center justify-between px-4 py-4 md:px-10 md:py-5"
        initial={{ y: isPortfolioPage ? 0 : -100, opacity: isPortfolioPage ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: isPortfolioPage ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: isOpen ? 'transparent' : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)',
        }}
      >
        {/* Hamburger button - Left */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="relative z-[1001] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full overflow-hidden cursor-pointer select-none md:h-12 md:w-12 md:gap-[6px]"
          animate={{
            backgroundColor: isOpen ? '#FFFFFF' : isOnDarkSection ? '#FFFFFF' : '#1A2B3C',
            scale: isButtonHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isButtonHovered ? 1 : 0,
              opacity: isButtonHovered ? 1 : 0,
              backgroundColor: isOpen || isOnDarkSection ? '#1A2B3C' : '#FFFFFF',
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hamburger lines */}
          <motion.span
            className="relative block h-[2px] w-5 origin-center"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 4 : 0,
              backgroundColor: isButtonHovered
                ? (isOpen || isOnDarkSection ? '#FFFFFF' : '#1A2B3C')
                : (isOpen || isOnDarkSection ? '#1A2B3C' : '#FFFFFF'),
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="relative block h-[2px] w-5 origin-center"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -4 : 0,
              backgroundColor: isButtonHovered
                ? (isOpen || isOnDarkSection ? '#FFFFFF' : '#1A2B3C')
                : (isOpen || isOnDarkSection ? '#1A2B3C' : '#FFFFFF'),
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.button>

        {/* Logo - Center (hidden on hero, shows when scrolled) */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#');
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] overflow-hidden select-none"
          style={{ cursor: 'pointer' }}
          animate={{
            color: textColor,
            pointerEvents: isPastHero || isOpen ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-sm font-bold tracking-wide uppercase md:text-2xl md:tracking-normal"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              display: 'inline-block',
              cursor: 'pointer',
            }}
            initial={{ y: '100%', opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{
              y: isPastHero || isOpen ? '0%' : '100%',
              opacity: isPastHero || isOpen ? 1 : 0,
              scale: isPastHero || isOpen ? 1 : 0.8,
              rotateX: isPastHero || isOpen ? 0 : -90,
            }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1], // Spring-like bounce
            }}
          >
            Israel Njagih
          </motion.span>
        </motion.a>

        {/* Get in touch CTA - Right */}
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#contact');
          }}
          className="relative z-[1001] rounded-full px-4 py-2 cursor-pointer select-none text-sm md:px-6 md:py-2.5 md:text-base"
          animate={{
            backgroundColor: isOpen ? '#FFFFFF' : isOnDarkSection ? '#FFFFFF' : '#1A2B3C',
            color: isOpen ? '#1A2B3C' : isOnDarkSection ? '#1A2B3C' : '#FFFFFF',
          }}
          whileHover={{
            backgroundColor: isOpen || isOnDarkSection ? '#1A2B3C' : '#FFFFFF',
            color: isOpen || isOnDarkSection ? '#FFFFFF' : '#1A2B3C',
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 600,
          }}
        >
          <span className="hidden md:inline">Get in touch</span>
          <span className="md:hidden">Contact</span>
        </motion.a>
      </motion.header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* MOBILE MENU - Full screen with background photo */}
            <motion.div
              className="relative flex h-full w-full flex-col md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background photo */}
              <div className="absolute inset-0">
                <Image
                  src="/israel2.jpg"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Dark overlay for readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 100%)',
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col px-6 pb-8 pt-24">
                {/* Main navigation - centered */}
                <nav className="flex flex-1 flex-col items-center justify-center gap-2">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.isPage);
                      }}
                      className="group relative py-2 text-center cursor-pointer select-none"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <span
                        className="text-4xl transition-all duration-300"
                        style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontWeight: 400,
                          color: index === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {item.label}
                      </span>
                    </motion.a>
                  ))}
                </nav>

                {/* Secondary links */}
                <motion.div
                  className="flex flex-col items-center gap-3 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <a
                    href={socialLinks.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Instagram
                    </span>
                    <svg className="h-3 w-3" fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                  <a
                    href={socialLinks.email.url}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Email
                    </span>
                    <svg className="h-3 w-3" fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </motion.div>

                {/* Bottom location */}
                <motion.div
                  className="flex items-center justify-center gap-2 pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: '#6B9080' }}
                  />
                  <span
                    className="text-[0.625rem] tracking-widest uppercase"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    Vancouver, BC
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* DESKTOP MENU - Split screen layout */}
            <div className="hidden h-full md:flex">
              {/* Left side - Navigation */}
              <motion.div
                className="relative flex w-1/2 flex-col justify-between bg-[#0f0f0f] px-12 pb-8 pt-28 lg:px-16"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subtle gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(107, 144, 128, 0.05) 0%, transparent 50%)',
                  }}
                />

                {/* Navigation links */}
                <nav className="relative flex flex-1 flex-col justify-center">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="group relative overflow-hidden"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                    >
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href, item.isPage);
                        }}
                        className="relative flex items-center py-5 cursor-pointer select-none"
                      >
                        {/* Hover background */}
                        <motion.div
                          className="absolute inset-0 -mx-4 rounded-lg"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            scale: hoveredIndex === index ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ backgroundColor: 'rgba(107, 144, 128, 0.1)' }}
                        />

                        {/* Number */}
                        <motion.span
                          className="relative mr-6 w-6 text-xs"
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            letterSpacing: '0.05em',
                          }}
                          animate={{
                            color: hoveredIndex === index ? '#6B9080' : 'rgba(255, 255, 255, 0.3)',
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          0{index + 1}
                        </motion.span>

                        {/* Label */}
                        <motion.span
                          className="relative text-4xl lg:text-5xl"
                          style={{
                            fontFamily: "'Libre Baskerville', serif",
                            fontWeight: 400,
                            lineHeight: 1.1,
                          }}
                          animate={{
                            color: hoveredIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                            x: hoveredIndex === index ? 8 : 0,
                          }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {item.label}
                        </motion.span>

                        {/* Arrow */}
                        <motion.div
                          className="relative ml-auto"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            x: hoveredIndex === index ? 0 : -20,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            className="h-6 w-6"
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
                        </motion.div>
                      </motion.a>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom section */}
                <motion.div
                  className="relative flex items-center justify-between gap-6 border-t pt-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {/* Email */}
                  <a
                    href={socialLinks.email.url}
                    className="group inline-flex items-center gap-2 cursor-pointer select-none"
                  >
                    <span
                      className="text-base transition-colors duration-300 group-hover:text-[#6B9080]"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {socialLinks.email.address}
                    </span>
                  </a>

                  {/* Social + Location */}
                  <div className="flex items-center gap-6">
                    <a
                      href={socialLinks.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#6B9080] hover:bg-[rgba(107,144,128,0.1)] cursor-pointer select-none"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                      <svg
                        className="h-4 w-4 transition-colors duration-300"
                        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: '#6B9080' }}
                      />
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(255, 255, 255, 0.4)',
                        }}
                      >
                        Vancouver
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right side - Dynamic Photo */}
              <motion.div
                className="relative w-1/2 overflow-hidden"
                style={{ backgroundColor: '#0f0f0f' }}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* All photos stacked - opacity controlled by hover state */}
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.label} preview`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      priority
                    />
                  </motion.div>
                ))}

                {/* Overlay gradient for depth */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, rgba(15, 15, 15, 0.4) 0%, transparent 40%, transparent 60%, rgba(15, 15, 15, 0.2) 100%)',
                  }}
                />

                {/* Photo label */}
                <motion.div
                  className="absolute bottom-8 right-8 z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.p
                    key={hoveredIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: '0.875rem',
                      fontStyle: 'italic',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {menuItems[hoveredIndex].label}
                  </motion.p>
                </motion.div>

                {/* Decorative frame corners */}
                <div className="pointer-events-none absolute inset-8">
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-white/20" />
                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-white/20" />
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/20" />
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-white/20" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
