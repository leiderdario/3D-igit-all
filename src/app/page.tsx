'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';

// Dynamic import for Three.js components to avoid SSR issues
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Preloader timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  // Handle scroll to loop back to top
  useEffect(() => {
    if (!lenisRef.current || isLoading) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      
      if (scrollY >= scrollHeight - 50) {
        // Smooth loop back to top
        lenisRef.current.scrollTo(0, { duration: 1.5, easing: (t: number) => t });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader />}
      
      {/* Persistent 3D Background */}
      <div className="canvas-container">
        <ThreeBackground />
      </div>
      
      {/* Particle Overlay */}
      <div className="particle-overlay" />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Main Content */}
      <main 
        ref={scrollContainerRef}
        className="content-overlay"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
      >
        {/* Navigation */}
        <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Portfolio Section */}
        <PortfolioSection />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* Scroll Indicator */}
        <div className="fixed bottom-8 right-12 z-50 scroll-indicator hidden md:block">
          <p className="text-xs text-gray-400 tracking-widest uppercase font-mono">
            Scroll Down To Continue
          </p>
          <div className="mt-2 w-px h-12 bg-gradient-to-b from-neon-cyan to-transparent mx-auto" />
        </div>
      </main>
    </>
  );
}
