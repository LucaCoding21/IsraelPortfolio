'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    src: '/filteredphotos/recents/urban-streetwear-party-portrait-photography-vancouver.webp',
    alt: 'Two friends posing at outdoor streetwear party event in Vancouver - Njagih Studios portrait photography',
  },
  {
    src: '/israel2.jpg',
    alt: 'Event and festival photography - Njagih Studios Vancouver',
  },
  {
    src: '/isreal3.jpg',
    alt: 'Corporate and portrait photography - Njagih Studios Vancouver',
  },
  {
    src: '/isreal4.jpg',
    alt: 'Sports action photography - Njagih Studios Vancouver photographer',
  },
  {
    src: '/filteredphotos/motorcycle-night-ride-meetup-honda-cbr-vancouver.webp',
    alt: 'Motorcycle riders at Vancouver night meetup with Honda CBR sport bikes - Njagih Studios event photography',
  },
  {
    src: '/filteredphotos/hypr-soccer-players-dribbling-turf-field-vancouver.webp',
    alt: 'HYPR Soccer players competing for the ball on Vancouver turf field - Njagih Studios sports photography',
  },
  {
    src: '/filteredphotos/young-girl-crochet-craftwork-lifestyle-portrait.webp',
    alt: 'Young girl focused on crochet craftwork in warm light - Njagih Studios lifestyle portrait photography',
  },
  {
    src: '/filteredphotos/recents/indoor-basketball-league-game-dribble-action-vancouver.webp',
    alt: 'Indoor basketball league game with player dribbling through defenders in Vancouver - Njagih Studios sports photography',
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
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePortfolioClick = () => {
    window.location.href = '/portfolio';
  };

  // Close lightbox on escape, navigate with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') setSelectedImage((prev) => (prev! + 1) % photos.length);
        if (e.key === 'ArrowLeft') setSelectedImage((prev) => (prev! - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage]);

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

        {/* Bento Grid - staggered on mobile, asymmetric on desktop */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {/* Mobile layout - staggered 2-column */}
          <div className="space-y-3">
            <div className="h-[280px]">
              <PhotoCard src={photos[0].src} alt={photos[0].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(0)} isMobile={isMobile} />
            </div>
            <div className="h-[200px]">
              <PhotoCard src={photos[2].src} alt={photos[2].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(2)} isMobile={isMobile} />
            </div>
            <div className="h-[260px]">
              <PhotoCard src={photos[4].src} alt={photos[4].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(4)} isMobile={isMobile} />
            </div>
            <div className="h-[220px]">
              <PhotoCard src={photos[6].src} alt={photos[6].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(6)} isMobile={isMobile} />
            </div>
          </div>
          <div className="mt-12 space-y-3">
            <div className="h-[220px]">
              <PhotoCard src={photos[1].src} alt={photos[1].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(1)} isMobile={isMobile} />
            </div>
            <div className="h-[260px]">
              <PhotoCard src={photos[3].src} alt={photos[3].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(3)} isMobile={isMobile} />
            </div>
            <div className="h-[200px]">
              <PhotoCard src={photos[5].src} alt={photos[5].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(5)} isMobile={isMobile} />
            </div>
            <div className="h-[280px]">
              <PhotoCard src={photos[7].src} alt={photos[7].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(7)} isMobile={isMobile} />
            </div>
          </div>
        </div>

        {/* Desktop layout - expanded bento grid */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-4" style={{ gridTemplateRows: '320px 320px 300px 300px' }}>
          {/* Row 1-2: Left tall image spanning 2 rows */}
          <div className="md:col-span-5" style={{ gridRow: '1 / 3' }}>
            <PhotoCard src={photos[0].src} alt={photos[0].alt} className="h-full w-full" delay={0} onClick={() => setSelectedImage(0)} isMobile={isMobile} />
          </div>
          {/* Row 1: Top middle */}
          <div className="md:col-span-3">
            <PhotoCard src={photos[1].src} alt={photos[1].alt} className="h-full w-full" delay={0.1} onClick={() => setSelectedImage(1)} isMobile={isMobile} />
          </div>
          {/* Row 1: Top right */}
          <div className="md:col-span-4">
            <PhotoCard src={photos[2].src} alt={photos[2].alt} className="h-full w-full" delay={0.15} onClick={() => setSelectedImage(2)} isMobile={isMobile} />
          </div>
          {/* Row 2: Wide right */}
          <div className="md:col-span-7">
            <PhotoCard src={photos[3].src} alt={photos[3].alt} className="h-full w-full" delay={0.2} onClick={() => setSelectedImage(3)} isMobile={isMobile} />
          </div>

          {/* Row 3: Wide left */}
          <div className="md:col-span-7">
            <PhotoCard src={photos[4].src} alt={photos[4].alt} className="h-full w-full" delay={0.25} onClick={() => setSelectedImage(4)} isMobile={isMobile} />
          </div>
          {/* Row 3-4: Tall right spanning 2 rows */}
          <div className="md:col-span-5" style={{ gridRow: '3 / 5' }}>
            <PhotoCard src={photos[5].src} alt={photos[5].alt} className="h-full w-full" delay={0.3} onClick={() => setSelectedImage(5)} isMobile={isMobile} />
          </div>
          {/* Row 4: Bottom left */}
          <div className="md:col-span-3">
            <PhotoCard src={photos[6].src} alt={photos[6].alt} className="h-full w-full" delay={0.35} onClick={() => setSelectedImage(6)} isMobile={isMobile} />
          </div>
          {/* Row 4: Bottom middle */}
          <div className="md:col-span-4">
            <PhotoCard src={photos[7].src} alt={photos[7].alt} className="h-full w-full" delay={0.4} onClick={() => setSelectedImage(7)} isMobile={isMobile} />
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
            onClick={handlePortfolioClick}
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(26, 43, 60, 0.95)' }}
              onClick={() => setSelectedImage(null)}
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:right-6 md:top-6 md:h-12 md:w-12 md:bg-transparent md:hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous arrow */}
            <button
              onClick={() => setSelectedImage((prev) => (prev! - 1 + photos.length) % photos.length)}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:left-8 md:h-12 md:w-12 md:bg-transparent md:hover:bg-white/10"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              onClick={() => setSelectedImage((prev) => (prev! + 1) % photos.length)}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:right-8 md:h-12 md:w-12 md:bg-transparent md:hover:bg-white/10"
              aria-label="Next image"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              className="relative z-10 max-h-[80vh] max-w-[92vw] md:max-h-[85vh] md:max-w-[90vw]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={photos[selectedImage].src}
                alt={photos[selectedImage].alt}
                width={1200}
                height={1200}
                className="max-h-[80vh] w-auto rounded-md object-contain md:max-h-[85vh] md:rounded-lg"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <span className="md:text-sm">{selectedImage + 1} / {photos.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
