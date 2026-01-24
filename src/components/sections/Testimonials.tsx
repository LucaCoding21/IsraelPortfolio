'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, PanInfo } from 'framer-motion';

const testimonials = [
  {
    quote: "Israel captured our wedding day better than we could have ever imagined. Every photo tells a story, every moment preserved perfectly.",
    name: "Sarah & Michael",
    role: "Wedding",
    location: "Vancouver, BC",
  },
  {
    quote: "Working with Israel at our corporate event was seamless. He blended into the crowd and captured genuine interactions we didn't even know were happening.",
    name: "Jennifer Chen",
    role: "Marketing Director",
    location: "Tech Summit 2024",
  },
  {
    quote: "The energy Israel brings to a shoot is unmatched. He made everyone feel comfortable, and the photos reflect that authenticity.",
    name: "Marcus Williams",
    role: "Festival Organizer",
    location: "Vancouver Folk Festival",
  },
  {
    quote: "Israel's sports photography is on another level. He captures the intensity, the emotion, the split-second moments that define the game.",
    name: "Coach David Park",
    role: "Athletics Director",
    location: "UBC Thunderbirds",
  },
];

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

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle swipe gestures on mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Swiped right - go to previous
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAutoPlaying(false);
    } else if (info.offset.x < -threshold) {
      // Swiped left - go to next
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsAutoPlaying(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#FAFBFC' }}
    >
      {/* Wave transition from dark section above */}
      <div className="absolute left-0 right-0 top-0 overflow-hidden" style={{ height: '60px' }}>
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 w-full md:hidden"
          preserveAspectRatio="none"
          style={{ height: '60px' }}
        >
          <path d="M0 0V40C360 15 720 50 1080 30C1260 20 1440 25 1440 25V0H0Z" fill="rgb(10, 10, 10)" />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 hidden w-full md:block"
          preserveAspectRatio="none"
          style={{ height: '80px' }}
        >
          <path d="M0 0V50C360 20 720 70 1080 50C1260 40 1440 30 1440 30V0H0Z" fill="rgb(10, 10, 10)" />
        </svg>
      </div>

      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-20 md:px-12 md:pb-32 md:pt-40">
        {/* Section header */}
        <motion.div
          className="mb-8 md:mb-20"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="mb-2 md:mb-4"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6B9080',
            }}
          >
            Testimonials
          </p>
          <h2
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              lineHeight: 1.1,
              color: '#1A2B3C',
              fontWeight: 400,
            }}
          >
            What clients{' '}
            <span style={{ fontStyle: 'italic', color: '#6B9080' }}>say</span>
          </h2>
        </motion.div>

        {/* Main testimonial display */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Quote display - swipeable on mobile */}
          <motion.div
            className="lg:col-span-8"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative min-h-[220px] touch-pan-y md:min-h-[320px]"
              drag={isMobile ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* Large quote mark - smaller on mobile */}
              <div
                className="absolute -left-1 -top-2 md:-left-6 md:-top-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 'clamp(3rem, 12vw, 8rem)',
                  color: '#6B9080',
                  opacity: 0.12,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                &ldquo;
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: isMobile ? 20 : 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: isMobile ? -20 : 0, y: isMobile ? 0 : -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="select-none"
                >
                  {/* Quote text */}
                  <blockquote
                    className="relative z-10 mb-6 pr-2 md:mb-8 md:pr-0"
                    style={{
                      fontFamily: "'Libre Baskerville', Georgia, serif",
                      fontSize: 'clamp(1.0625rem, 4vw, 2rem)',
                      lineHeight: 1.6,
                      color: '#1A2B3C',
                      fontWeight: 400,
                    }}
                  >
                    {testimonials[activeIndex].quote}
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Decorative line */}
                    <div
                      className="h-[1px] w-8 md:w-12"
                      style={{ backgroundColor: '#6B9080' }}
                    />
                    <div>
                      <p
                        style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                          fontWeight: 600,
                          color: '#1A2B3C',
                        }}
                      >
                        {testimonials[activeIndex].name}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                          color: '#8899A6',
                        }}
                      >
                        {testimonials[activeIndex].role} &mdash;{' '}
                        {testimonials[activeIndex].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Swipe hint - mobile only */}
              <p
                className="mt-6 text-center text-[0.625rem] uppercase tracking-widest md:hidden"
                style={{ color: '#8899A6' }}
              >
                Swipe to see more
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation - different layout for mobile vs desktop */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-4"
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Mobile: Dots + arrows in a row */}
            <div className="flex items-center justify-center gap-6 md:hidden">
              {/* Previous arrow */}
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border active:scale-95"
                style={{ borderColor: '#E2E8F0', backgroundColor: 'white' }}
                aria-label="Previous testimonial"
              >
                <svg
                  className="h-4 w-4"
                  style={{ color: '#1A2B3C' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className="relative h-2.5 w-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: index === activeIndex ? '#6B9080' : '#E2E8F0',
                      transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev + 1) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border active:scale-95"
                style={{ borderColor: '#E2E8F0', backgroundColor: 'white' }}
                aria-label="Next testimonial"
              >
                <svg
                  className="h-4 w-4"
                  style={{ color: '#1A2B3C' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Desktop: Name list with progress bars */}
            <div className="hidden space-y-4 md:block">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`group flex w-full items-center gap-4 text-left transition-all duration-300 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  {/* Progress indicator */}
                  <div className="relative h-[2px] w-8 overflow-hidden rounded-full bg-gray-200">
                    {index === activeIndex && isAutoPlaying && (
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: '#6B9080' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 6, ease: 'linear' }}
                      />
                    )}
                    {index === activeIndex && !isAutoPlaying && (
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: '#6B9080' }}
                      />
                    )}
                  </div>

                  {/* Name */}
                  <span
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: index === activeIndex ? 600 : 400,
                      color: index === activeIndex ? '#1A2B3C' : '#8899A6',
                    }}
                  >
                    {testimonial.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Desktop: Navigation arrows */}
            <div className="mt-8 hidden gap-3 md:flex">
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#6B9080] hover:bg-[rgba(107,144,128,0.1)]"
                style={{ borderColor: '#E2E8F0' }}
                aria-label="Previous testimonial"
              >
                <svg
                  className="h-4 w-4 transition-colors duration-300 group-hover:text-[#6B9080]"
                  style={{ color: '#8899A6' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev + 1) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#6B9080] hover:bg-[rgba(107,144,128,0.1)]"
                style={{ borderColor: '#E2E8F0' }}
                aria-label="Next testimonial"
              >
                <svg
                  className="h-4 w-4 transition-colors duration-300 group-hover:text-[#6B9080]"
                  style={{ color: '#8899A6' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave transition to dark section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '80px' }}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full md:hidden"
          preserveAspectRatio="none"
          style={{ height: '80px' }}
        >
          <path
            d="M0 80V30C360 50 720 15 1080 35C1260 45 1440 40 1440 40V80H0Z"
            fill="#0A0A0A"
          />
        </svg>
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 hidden w-full md:block"
          preserveAspectRatio="none"
          style={{ height: '100px' }}
        >
          <path
            d="M0 100V40C240 70 480 20 720 40C960 60 1200 80 1440 50V100H0Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>
    </section>
  );
}
