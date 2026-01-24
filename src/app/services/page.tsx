'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SmoothScrollProvider } from '@/context/SmoothScrollContext';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';

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

const services = [
  {
    id: 'weddings',
    title: 'Weddings',
    subtitle: 'Your love story, beautifully told',
    description:
      "Your wedding day is one of the most meaningful moments of your life. I capture the stolen glances, happy tears, and spontaneous laughter that make your day uniquely yours.",
    features: [
      'Full wedding day coverage',
      'Engagement sessions',
      'Documentary-style candid moments',
      'Guided couple & family portraits',
      'Ceremony & reception coverage',
      'Detail & atmosphere shots',
      'Online gallery for viewing & downloads',
    ],
    image: '/israel1.jpg',
    accent: '#6B9080',
  },
  {
    id: 'festivals-sports',
    title: 'Festivals & Sports',
    subtitle: 'Energy captured in motion',
    description:
      "From the roar of the crowd to the split-second victory, I specialize in capturing the raw energy and emotion of live events through my lens.",
    features: [
      'Full event-day coverage',
      'Action & candid photography',
      'Crowd & atmosphere shots',
      'Key moments & highlights',
      'Performer / athlete coverage',
      'Team & group photos',
      'Social-media-ready images',
    ],
    image: '/israel2.jpg',
    accent: '#7C9CB5',
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Professional imagery that elevates your brand',
    description:
      "First impressions matter. I help businesses present their best selves through polished headshots and event coverage that reflects your company's culture.",
    features: [
      'Corporate event coverage',
      'Conferences & networking events',
      'Professional headshots (individual & teams)',
      'Executive & leadership portraits',
      'Brand & workplace lifestyle imagery',
      'Speaker, panel & awards coverage',
      'Office & workspace photography',
      'Images for websites, marketing & social media',
    ],
    image: '/isreal3.jpg',
    accent: '#6B9080',
  },
];

function ServiceCard({
  service,
  index,
  isInView,
  isMobile,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
  isMobile: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={service.id}
      className={`grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16 ${
        index > 0 ? 'mt-16 md:mt-32' : ''
      }`}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: isMobile ? 0 : index * 0.15 }}
    >
      {/* Image - always on top for mobile, alternates on desktop */}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="group relative">
          {/* Decorative frame - desktop only */}
          <div
            className={`absolute hidden h-full w-full rounded-lg lg:block ${
              isEven ? '-right-4 -top-4 lg:-right-6 lg:-top-6' : '-left-4 -top-4 lg:-left-6 lg:-top-6'
            }`}
            style={{
              border: `1px solid ${service.accent}`,
              opacity: 0.3,
            }}
          />

          {/* Main image */}
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-lg md:aspect-[4/3]"
            style={{
              boxShadow: '0 15px 30px -10px rgba(26, 43, 60, 0.12)',
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 60%, rgba(26, 43, 60, 0.15) 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Service number */}
        <p
          className="mb-2 md:mb-4"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: service.accent,
          }}
        >
          0{index + 1}
        </p>

        {/* Title */}
        <h2
          className="mb-1 md:mb-2"
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            color: '#1A2B3C',
            fontWeight: 400,
          }}
        >
          {service.title}
        </h2>

        {/* Subtitle */}
        <p
          className="mb-4 md:mb-6"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
            fontStyle: 'italic',
            color: '#8899A6',
          }}
        >
          {service.subtitle}
        </p>

        {/* Description */}
        <p
          className="mb-5 md:mb-8"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: '#4A5568',
          }}
        >
          {service.description}
        </p>

        {/* Features list - 2 columns on mobile for compactness */}
        <ul className="mb-6 grid grid-cols-1 gap-2 md:mb-8 md:gap-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 md:gap-3">
              <div
                className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full md:h-5 md:w-5"
                style={{ backgroundColor: `${service.accent}20` }}
              >
                <svg
                  className="h-2.5 w-2.5 md:h-3 md:w-3"
                  style={{ color: service.accent }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                  color: '#4A5568',
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA - larger touch target on mobile */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 rounded-full border px-5 py-3 transition-all duration-300 active:scale-[0.98] md:rounded-none md:border-0 md:px-0 md:py-0"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
            fontWeight: 500,
            color: '#1A2B3C',
            borderColor: '#E2E8F0',
          }}
        >
          <span className="relative">
            Inquire about {service.title.toLowerCase()}
            <span
              className="absolute bottom-0 left-0 hidden h-[1px] w-0 transition-all duration-300 group-hover:w-full md:block"
              style={{ backgroundColor: service.accent }}
            />
          </span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(containerRef, { once: true, margin: '-50px' });
  const isMobile = useIsMobile();

  return (
    <SmoothScrollProvider>
      {/* Film grain overlay */}
      <div className="grain" />

      {/* Navigation */}
      <Navigation />

      <main>
        {/* Hero Section - shorter on mobile */}
        <section
          className="relative flex min-h-[50vh] items-center justify-center overflow-hidden md:min-h-[60vh]"
          style={{ backgroundColor: 'rgb(10, 10, 10)' }}
        >
          {/* Background gradient orbs - smaller on mobile */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/4 top-1/3 h-[200px] w-[200px] rounded-full blur-[80px] md:h-[400px] md:w-[400px] md:blur-[120px]"
              style={{ background: 'radial-gradient(circle, rgba(107, 144, 128, 0.25) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 h-[150px] w-[150px] rounded-full blur-[60px] md:h-[300px] md:w-[300px] md:blur-[100px]"
              style={{ background: 'radial-gradient(circle, rgba(124, 156, 181, 0.2) 0%, transparent 70%)' }}
            />
          </div>

          {/* Noise texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div ref={heroRef} className="relative z-10 px-4 py-24 text-center md:px-12 md:py-32">
            {/* Back link */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors duration-300 active:scale-95 md:mb-8 md:border-0 md:px-0 md:py-0"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to home
              </Link>
            </motion.div>

            {/* Label */}
            <motion.p
              className="mb-2 md:mb-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B9080',
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Services
            </motion.p>

            {/* Main heading */}
            <motion.h1
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(2rem, 10vw, 5rem)',
                lineHeight: 1.1,
                color: '#FFFFFF',
                fontWeight: 400,
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              What I{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.7)' }}>offer</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mx-auto mt-4 max-w-xs px-4 md:mt-6 md:max-w-xl md:px-0"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.6)',
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              From intimate weddings to high-energy festivals, I bring passion to every shoot.
            </motion.p>
          </div>

          {/* Wave transition */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '60px' }}>
            <svg
              viewBox="0 0 1440 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 w-full md:hidden"
              preserveAspectRatio="none"
              style={{ height: '60px' }}
            >
              <path d="M0 60V20C360 40 720 5 1080 20C1260 28 1440 35 1440 35V60H0Z" fill="#FAFBFC" />
            </svg>
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 hidden w-full md:block"
              preserveAspectRatio="none"
              style={{ height: '80px' }}
            >
              <path d="M0 80V30C360 60 720 10 1080 30C1260 40 1440 50 1440 50V80H0Z" fill="#FAFBFC" />
            </svg>
          </div>
        </section>

        {/* Services List */}
        <section className="relative w-full" style={{ backgroundColor: '#FAFBFC' }}>
          {/* Subtle texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-12 md:py-32">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} isInView={isContentInView} isMobile={isMobile} />
            ))}
          </div>
        </section>

        {/* Contact CTA Section */}
        <section
          id="contact"
          className="relative overflow-hidden py-16 md:py-32"
          style={{ backgroundColor: 'rgb(10, 10, 10)' }}
        >
          {/* Background effects - smaller on mobile */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/4 top-1/4 h-[250px] w-[250px] rounded-full blur-[100px] md:h-[500px] md:w-[500px] md:blur-[150px]"
              style={{ background: 'radial-gradient(circle, rgba(107, 144, 128, 0.2) 0%, transparent 70%)' }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-12">
            <motion.p
              className="mb-2 md:mb-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B9080',
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to start?
            </motion.p>

            <motion.h2
              className="mb-4 md:mb-6"
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
                lineHeight: 1.15,
                color: '#FFFFFF',
                fontWeight: 400,
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Let&apos;s create something{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.7)' }}>memorable</span>
            </motion.h2>

            <motion.p
              className="mx-auto mb-8 max-w-xs md:mb-10 md:max-w-lg"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.6)',
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a project in mind? Let&apos;s chat and see how we can work together.
            </motion.p>

            <motion.a
              href="mailto:israel.njagih@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 transition-all duration-300 active:scale-[0.98] md:gap-3 md:px-8 md:py-4"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Get in touch
              </span>
              <svg
                className="h-4 w-4"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
