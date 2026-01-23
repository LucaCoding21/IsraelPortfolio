'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 10000, suffix: '+', label: 'Photos Taken' },
  { value: 150, suffix: '+', label: 'Events Covered' },
  { value: 100, suffix: '%', label: 'Good Vibes' },
];

function AnimatedNumber({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * endValue);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref}>
      {formatNumber(displayValue)}{suffix}
    </span>
  );
}

export default function Stats() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: '#F5F7F5' }}
    >
      {/* Subtle top border */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: '#E2E8F0' }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p
                className="mb-2"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 400,
                  color: '#1A2B3C',
                  lineHeight: 1,
                }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2 + index * 0.3}
                />
              </p>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: '0.875rem',
                  color: '#8899A6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle bottom border */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ backgroundColor: '#E2E8F0' }}
      />
    </section>
  );
}
