'use client';

import { SmoothScrollProvider } from '@/context/SmoothScrollContext';
import PageLoader from '@/components/ui/PageLoader';
import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/sections/Hero';
import CategoryCards from '@/components/sections/CategoryCards';
import Intro from '@/components/sections/Intro';
import Stats from '@/components/sections/Stats';
import InteractiveShowcase from '@/components/sections/InteractiveShowcase';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Page loader */}
      <PageLoader />

      {/* Film grain overlay */}
      <div className="grain" />

      {/* Navigation - hamburger on all screens */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero - full bleed photo */}
        <Hero />

        {/* 4 Category cards - like Andy Hardy */}
        <CategoryCards />

        {/* About section */}
        <Intro />

        {/* Stats section */}
        <Stats />

        {/* Fun interactive element */}
        <InteractiveShowcase />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
