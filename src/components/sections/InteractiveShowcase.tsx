'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

const photos = [
  {
    src: '/israel1.jpg',
    alt: 'Photography by Njagih Studios',
  },
  {
    src: '/israel2.jpg',
    alt: 'Photography by Njagih Studios',
  },
  {
    src: '/isreal3.jpg',
    alt: 'Photography by Njagih Studios',
  },
  {
    src: '/isreal4.jpg',
    alt: 'Photography by Njagih Studios',
  },
];

function PhotoCard({
  src,
  alt,
  className,
  delay,
  onClick,
  isMobile,
}: {
  src: string;
  alt: string;
  className?: string;
  delay: number;
  onClick: () => void;
  isMobile: boolean;
}) {
  // On mobile, skip whileInView animations for performance
  return (
    <motion.button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg ${className}`}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      animate={isMobile ? { opacity: 1, y: 0 } : undefined}
      viewport={isMobile ? undefined : { once: true, margin: '-50px' }}
      transition={isMobile ? { duration: 0 } : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ cursor: 'pointer' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Hover overlay - dark */}
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"
      />
      {/* Zoom icon */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="#1A2B3C"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

export default function InteractiveShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const router = useRouter();
  const isMobile = useIsMobile();

  const handlePhotoClick = () => {
    router.push('/portfolio');
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative w-full py-20 md:py-28"
      style={{ backgroundColor: 'rgb(10, 10, 10)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6B9080',
              marginBottom: '0.75rem',
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Recent projects
          </h2>
        </motion.div>

        {/* Bento Grid - 2x2 staggered on mobile, asymmetric on desktop */}
        {/* Mobile: 2-column with fixed heights */}
        {/* Desktop: 12-column grid with proper row heights */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {/* Mobile layout - staggered 2x2 */}
          <div className="space-y-3">
            <div className="h-[280px]">
              <PhotoCard src={photos[0].src} alt={photos[0].alt} className="h-full w-full" delay={0} onClick={handlePhotoClick} isMobile={isMobile} />
            </div>
            <div className="h-[200px]">
              <PhotoCard src={photos[2].src} alt={photos[2].alt} className="h-full w-full" delay={0.2} onClick={handlePhotoClick} isMobile={isMobile} />
            </div>
          </div>
          <div className="mt-12 space-y-3">
            <div className="h-[220px]">
              <PhotoCard src={photos[1].src} alt={photos[1].alt} className="h-full w-full" delay={0.1} onClick={handlePhotoClick} isMobile={isMobile} />
            </div>
            <div className="h-[260px]">
              <PhotoCard src={photos[3].src} alt={photos[3].alt} className="h-full w-full" delay={0.3} onClick={handlePhotoClick} isMobile={isMobile} />
            </div>
          </div>
        </div>

        {/* Desktop layout - original bento grid */}
        <div className="hidden md:grid md:grid-cols-12 md:grid-rows-2 md:gap-4" style={{ height: 'auto', minHeight: '70vh' }}>
          {/* Left tall image - spans both rows */}
          <div className="md:col-span-4 md:row-span-2 h-auto">
            <PhotoCard
              src={photos[0].src}
              alt={photos[0].alt}
              className="h-full w-full"
              delay={0}
              onClick={handlePhotoClick}
              isMobile={isMobile}
            />
          </div>

          {/* Top middle image */}
          <div className="md:col-span-4 md:row-span-1 h-auto">
            <PhotoCard
              src={photos[1].src}
              alt={photos[1].alt}
              className="h-full w-full"
              delay={0.1}
              onClick={handlePhotoClick}
              isMobile={isMobile}
            />
          </div>

          {/* Top right image */}
          <div className="md:col-span-4 md:row-span-1 h-auto">
            <PhotoCard
              src={photos[2].src}
              alt={photos[2].alt}
              className="h-full w-full"
              delay={0.2}
              onClick={handlePhotoClick}
              isMobile={isMobile}
            />
          </div>

          {/* Bottom wide image - spans middle and right columns */}
          <div className="md:col-span-8 md:row-span-1 h-auto">
            <PhotoCard
              src={photos[3].src}
              alt={photos[3].alt}
              className="h-full w-full"
              delay={0.3}
              onClick={handlePhotoClick}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handlePhotoClick}
            className="group inline-flex items-center gap-2"
          >
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              View full portfolio
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="rgba(255, 255, 255, 0.7)"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>

    </section>
  );
}
