'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    name: 'Vancouver United FC',
    type: 'Soccer Club',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=300&auto=format&fit=crop',
    sessions: '47 games',
    alt: 'Vancouver United FC soccer team in action',
  },
  {
    name: 'Cavo Bar',
    type: 'Entertainment Venue',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=300&auto=format&fit=crop',
    sessions: '23 events',
    alt: 'Cavo Bar nightlife venue atmosphere',
  },
  {
    name: 'Martinez Family',
    type: 'Private Client',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=300&auto=format&fit=crop',
    sessions: '3 seasons',
    alt: 'Family portrait session',
  },
  {
    name: 'Richmond Youth League',
    type: 'Sports Organization',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=300&auto=format&fit=crop',
    sessions: '12 tournaments',
    alt: 'Youth soccer league tournament',
  },
  {
    name: 'Streetwear Van',
    type: 'Brand',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=300&auto=format&fit=crop',
    sessions: '8 shoots',
    alt: 'Streetwear fashion photography',
  },
  {
    name: 'Community Center',
    type: 'Local Organization',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format&fit=crop',
    sessions: '15 events',
    alt: 'Community center event gathering',
  },
];

const stats = [
  { number: 47, suffix: '+', label: 'Soccer Games' },
  { number: 23, suffix: '', label: 'Community Events' },
  { number: 15, suffix: '', label: 'Returning Clients' },
  { number: 4, suffix: '', label: 'Years Active' },
];

const testimonials = [
  {
    quote: "Israel doesn't just show up with a camera. He becomes part of the team. He knows the players, the energy, the moments that matter.",
    author: 'Coach Rodriguez',
    role: 'Vancouver United FC',
  },
  {
    quote: "Every event, he captures the real vibe. Not posed photos, but the actual energy of the night. That's rare.",
    author: 'Marcus Chen',
    role: 'Cavo Bar Manager',
  },
  {
    quote: "He's photographed my son's soccer journey for three seasons. Those photos are our family treasures.",
    author: 'Maria Martinez',
    role: 'Parent & Client',
  },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
}

export default function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.community-title-char',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="community-title-char inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-32"
    >
      {/* Section header */}
      <div ref={titleRef} className="mb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.span
          className="label mb-4 block text-[#D4A853]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Trusted By
        </motion.span>
        <h2 className="heading-xl overflow-hidden text-[#F5F2ED]">
          {splitTitle('THE COMMUNITY')}
        </h2>
        <motion.p
          className="body-lg mt-6 max-w-xl text-[#6B6B6B]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Building lasting relationships with teams, venues, and families across
          Vancouver. When they need someone to capture their moments, they call
          me back.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="mb-20 grid grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-16 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="heading-lg text-[#D4A853]">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm text-[#6B6B6B]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Horizontal scrolling clients */}
      <div ref={scrollContainerRef} className="relative py-12">
        <motion.div className="flex gap-6 px-6" style={{ x }}>
          {[...clients, ...clients].map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="group relative flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % clients.length) * 0.1, duration: 0.6 }}
            >
              <div className="relative h-64 w-48 overflow-hidden rounded-2xl bg-[#141414]">
                <Image
                  src={client.image}
                  alt={client.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-medium text-[#F5F2ED]">{client.name}</p>
                  <p className="text-xs text-[#6B6B6B]">{client.type}</p>
                  <p className="mt-2 text-xs text-[#D4A853]">{client.sessions}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="mt-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Quote mark */}
              <div className="mb-4 text-6xl font-serif text-[#262626]">&ldquo;</div>
              <p className="body-md mb-6 text-[#F5F2ED]/90">{testimonial.quote}</p>
              <footer>
                <p className="font-medium text-[#F5F2ED]">{testimonial.author}</p>
                <p className="text-sm text-[#6B6B6B]">{testimonial.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
