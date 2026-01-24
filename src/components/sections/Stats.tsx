'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedNumber({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <>{count}{suffix}</>;
}

const stats = [
  { value: 200, suffix: '+', label: 'Events Covered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: 'K+', label: 'Photos Delivered' },
  { value: 5, suffix: '+', label: 'Years Experience' },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: '#FFFFFF',
                  marginBottom: '0.5rem',
                }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </p>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
