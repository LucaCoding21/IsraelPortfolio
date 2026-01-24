'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AnimatedWave, { WAVE_CATEGORY_TO_INTRO } from '@/components/ui/AnimatedWave';

const categories = [
  {
    title: 'View Portfolio',
    image: '/israel2.jpg',
    href: '/portfolio',
    isPage: true,
    arrow: '→',
  },
  {
    title: 'Instagram',
    image: '/israel1.jpg',
    href: 'https://instagram.com/njagih_studios',
    external: true,
    arrow: '↗',
  },
  {
    title: 'Services',
    image: '/isreal3.jpg',
    href: '/services',
    isPage: true,
    arrow: '→',
  },
  {
    title: 'Get in Touch',
    image: '/isreal4.jpg',
    href: '#contact',
    arrow: '→',
  },
];

// Custom overlay content for each card - unique typography treatments
function CardOverlay({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Bold stacked name with accent
      return (
        <div className="text-center">
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '0.5rem',
            }}
          >
            The Work of
          </p>
          <p
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
            }}
          >
            Israel
          </p>
          <p
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
            }}
          >
            Njagih
          </p>
        </div>
      );
    case 1:
      // Instagram handle with icon aesthetic
      return (
        <div className="text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <svg className="h-6 w-6" fill="#FFFFFF" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 'clamp(0.75rem, 2vw, 1.125rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
            }}
          >
            @njagih_studios
          </p>
        </div>
      );
    case 2:
      // Vertical stacked services
      return (
        <div className="flex flex-col items-center gap-1">
          {['WEDDINGS', 'FESTIVALS', 'CORPORATE'].map((text, i) => (
            <p
              key={text}
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 'clamp(0.5rem, 1.8vw, 0.875rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: i === 1 ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                transition: 'color 0.3s ease',
              }}
            >
              {text}
            </p>
          ))}
        </div>
      );
    case 3:
      // Friendly CTA
      return (
        <div className="text-center">
          <p
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Let&apos;s create
          </p>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginTop: '0.5rem',
            }}
          >
            Something Real
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function CategoryCards() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const router = useRouter();

  const handleClick = (href: string, external?: boolean, isPage?: boolean) => {
    if (external) {
      window.open(href, '_blank');
    } else if (isPage) {
      router.push(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Staggered pattern - creates visual rhythm
  // Mobile: right column (cards 2,4) offset down for Andy Hardy style
  // Desktop: original alternating down/up/down/up pattern preserved
  const cardOffsets = [
    'md:mt-24',            // Card 1 - no mobile offset, DOWN on desktop
    'mt-12 md:mt-0',       // Card 2 - down on mobile, UP on desktop
    'md:mt-24',            // Card 3 - no mobile offset, DOWN on desktop
    'mt-12 md:mt-0',       // Card 4 - down on mobile, UP on desktop
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 pb-28 md:py-20 md:pb-40"
      style={{ backgroundColor: 'rgb(15, 15, 15)' }}
    >
      {/* Curved wave transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '80px' }}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-px w-full md:hidden"
          preserveAspectRatio="none"
          style={{ height: '82px' }}
        >
          <path
            d="M0 120V80C360 100 720 60 1080 80C1260 90 1440 100 1440 100V120H0Z"
            fill="#FAFBFC"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 hidden w-full md:block"
          preserveAspectRatio="none"
          style={{ height: '120px' }}
        >
          <path
            d="M0 120V60C240 90 480 100 720 80C960 60 1200 30 1440 60V120H0Z"
            fill="#FAFBFC"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 md:px-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className={`group ${cardOffsets[index]}`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <button
                onClick={() => handleClick(category.href, category.external, category.isPage)}
                className="relative w-full overflow-hidden rounded-lg aspect-[3/4] md:aspect-[3/4]"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Bottom gradient overlay - Andy Hardy style */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        transparent 0%,
                        transparent 40%,
                        rgba(0, 0, 0, 0.3) 60%,
                        rgba(0, 0, 0, 0.7) 80%,
                        rgba(0, 0, 0, 0.9) 100%
                      )`,
                    }}
                  />
                  {/* Dark hover overlay */}
                  <div
                    className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-50"
                  />
                </div>

                {/* Center overlay - unique per card */}
                <div className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-110">
                  <CardOverlay index={index} />
                </div>
              </button>

              {/* Label below card */}
              <div
                className="mt-4 flex w-full items-center justify-center gap-2 transition-all duration-500 group-hover:-translate-y-1"
              >
                <span
                  className="transition-colors duration-500 group-hover:text-white"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {category.title}
                </span>
                <span
                  className="transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {category.arrow === '↗' ? (
                    <>
                      <span className="md:hidden">→</span>
                      <span className="hidden md:inline">↗</span>
                    </>
                  ) : (
                    category.arrow
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
