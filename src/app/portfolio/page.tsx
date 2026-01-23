'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';

// Categories for filtering
const categories = ['ALL', 'SPORTS', 'EVENTS', 'PORTRAITS', 'LIFESTYLE'] as const;
type Category = typeof categories[number];

// Portfolio images with category tags
const portfolioImages: {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: Category[];
}[] = [
  { src: '/israel1.jpg', alt: 'Photography by Israel Njagih', width: 800, height: 1200, category: ['ALL'] },
  { src: '/israel2.jpg', alt: 'Photography by Israel Njagih', width: 800, height: 600, category: ['ALL'] },
  { src: '/isreal3.jpg', alt: 'Photography by Israel Njagih', width: 800, height: 1000, category: ['ALL'] },
  { src: '/isreal4.jpg', alt: 'Photography by Israel Njagih', width: 800, height: 800, category: ['ALL'] },
];

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  // Filter images based on selected category
  const filteredImages = activeCategory === 'ALL'
    ? portfolioImages
    : portfolioImages.filter((img) => img.category.includes(activeCategory));

  // Close lightbox when category changes
  useEffect(() => {
    setSelectedImage(null);
  }, [activeCategory]);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') {
          setSelectedImage((prev) => (prev! + 1) % filteredImages.length);
        }
        if (e.key === 'ArrowLeft') {
          setSelectedImage((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <>
      {/* Film grain overlay */}
      <div className="grain" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="min-h-screen pb-16 pt-24 md:pb-20 md:pt-32" style={{ backgroundColor: '#FAFBFC' }}>
        <div className="mx-auto max-w-[1400px] px-4 md:px-12">
          {/* Category filter buttons */}
          <motion.div
            className="mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-12 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="group relative px-2 py-1.5 transition-colors duration-300 md:px-0 md:py-2"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: '0.625rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: activeCategory === category ? '#1A2B3C' : '#8899A6',
                }}
              >
                <span className="md:text-sm">{category}</span>
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300"
                  style={{
                    width: activeCategory === category ? '100%' : '0%',
                    backgroundColor: '#6B9080',
                  }}
                />
                {/* Hover underline */}
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 group-hover:w-full"
                  style={{
                    width: activeCategory === category ? '100%' : '0%',
                    backgroundColor: activeCategory === category ? '#6B9080' : '#E2E8F0',
                  }}
                />
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="columns-2 gap-2 sm:gap-4 lg:columns-3 xl:columns-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredImages.length === 0 ? (
                <motion.div
                  className="col-span-full py-20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: '1.25rem',
                      fontStyle: 'italic',
                      color: '#8899A6',
                    }}
                  >
                    Coming soon...
                  </p>
                  <p
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: '0.9375rem',
                      color: '#8899A6',
                      marginTop: '0.5rem',
                    }}
                  >
                    Photos for this category will be added shortly
                  </p>
                </motion.div>
              ) : (
                filteredImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    className="mb-2 break-inside-avoid sm:mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                <button
                  onClick={() => setSelectedImage(index)}
                  className="group relative block w-full overflow-hidden rounded-md md:rounded-lg"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="relative aspect-auto">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Hover overlay - dark */}
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                    />
                    {/* Zoom icon */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                      >
                        <svg
                          className="h-4 w-4 md:h-6 md:w-6"
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
                  </div>
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

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
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={() =>
                setSelectedImage((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length)
              }
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:left-8 md:h-12 md:w-12 md:bg-transparent md:hover:bg-white/10"
              aria-label="Previous image"
            >
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setSelectedImage((prev) => (prev! + 1) % filteredImages.length)}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:right-8 md:h-12 md:w-12 md:bg-transparent md:hover:bg-white/10"
              aria-label="Next image"
            >
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
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
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
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
              <span className="md:text-sm">{selectedImage + 1} / {filteredImages.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
