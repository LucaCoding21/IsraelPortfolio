'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Skip heavy animations on mobile for performance
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simple fade-in only on mobile
        gsap.set(['.intro-quote', '.bio-line', '.intro-image-wrapper'], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Animate the large quote
      gsap.fromTo(
        '.intro-quote',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.intro-quote',
            start: 'top 80%',
          },
        }
      );

      // Stagger the bio lines
      gsap.fromTo(
        '.bio-line',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bio-content',
            start: 'top 80%',
          },
        }
      );

      // Animate the image frame
      gsap.fromTo(
        '.intro-image-wrapper',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.intro-image-wrapper',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#FAFBFC' }}
    >
      {/* Subtle texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-20 md:px-12 md:pb-40 md:pt-32">
        {/* Top section - Large quote */}
        <div className="mb-16 md:mb-24">
          <p
            className="intro-quote max-w-4xl"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)',
              lineHeight: 1.3,
              color: '#1A2B3C',
              fontWeight: 400,
            }}
          >
            &ldquo;I don&apos;t just take photos.
            <span style={{ fontStyle: 'italic', color: '#6B9080' }}>
              {' '}I show up, bring good energy
            </span>
            , and somehow great shots just happen.&rdquo;
          </p>
        </div>

        {/* Main grid - Image and bio */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image column */}
          <div className="lg:col-span-5">
            <div className="intro-image-wrapper relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              {/* Decorative frame offset - hidden on mobile, original positioning on desktop */}
              <div
                className="absolute -right-4 -top-4 hidden h-full w-full rounded-lg md:block md:-right-6 md:-top-6"
                style={{
                  border: '1px solid #6B9080',
                  opacity: 0.3,
                }}
              />

              {/* Main image */}
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-lg"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(26, 43, 60, 0.15)',
                }}
              >
                <div
                  className={`absolute inset-0 transition-all duration-1000 ${
                    imageLoaded ? 'saturate-100' : 'saturate-[0.7]'
                  }`}
                >
                  <Image
                    src="/israel.jpg"
                    alt="Njagih Studios - Vancouver photographer"
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>

                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 60%, rgba(26, 43, 60, 0.2) 100%)',
                  }}
                />
              </div>

              {/* Caption under image */}
              <p
                className="mt-4 text-center"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '0.8125rem',
                  fontStyle: 'italic',
                  color: '#8899A6',
                }}
              >
                Vancouver, BC
              </p>
            </div>
          </div>

          {/* Bio column */}
          <div className="bio-content flex flex-col justify-center lg:col-span-7">
            {/* Label */}
            <p
              className="bio-line mb-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B9080',
              }}
            >
              About Me
            </p>

            {/* Name */}
            <h2
              className="bio-line mb-6"
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                lineHeight: 1.1,
                color: '#1A2B3C',
                fontWeight: 400,
              }}
            >
              Hey, I&apos;m Israel Njagih.
            </h2>

            {/* Bio paragraphs */}
            <div className="mb-8 space-y-4">
              <p
                className="bio-line"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                  lineHeight: 1.8,
                  color: '#4A5568',
                }}
              >
                I&apos;m a Vancouver-based photographer specializing in sports, events,
                and community moments. My approach is simple: be present, stay curious,
                and let authentic moments unfold naturally.
              </p>
              <p
                className="bio-line"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                  lineHeight: 1.8,
                  color: '#4A5568',
                }}
              >
                Whether it&apos;s the intensity of a game-winning play or the quiet joy
                of a community gathering, I&apos;m here to capture the real story. No
                forced poses, just genuine connection.
              </p>
            </div>

            {/* CTA */}
            <div className="bio-line flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 transition-all duration-300"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: '#1A2B3C',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative">
                  Let&apos;s work together
                  <span
                    className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: '#6B9080' }}
                  />
                </span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Wave transition to dark gallery section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '100px' }}>
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '100px' }}
        >
          <path
            d="M0 100V40C240 70 480 20 720 40C960 60 1200 80 1440 50V100H0Z"
            fill="rgb(10, 10, 10)"
          />
        </svg>
      </div>
    </section>
  );
}
