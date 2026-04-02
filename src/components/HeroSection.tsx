'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 2.5 }); // After preloader

      // Animate headline words
      tl.fromTo(
        '.hero-word',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
        }
      );

      // Animate subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // Animate logo
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.6'
      );

      // Animate CTA
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Parallax effect on scroll
      gsap.to('.hero-content', {
        y: 200,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating animation for background elements
      gsap.to('.hero-bg-element', {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section-container flex items-center justify-center min-h-screen relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-bg-element absolute top-20 left-10 w-32 h-32 border border-neon-cyan/30 rotate-45 animate-pulse" />
        <div className="hero-bg-element absolute top-40 right-20 w-24 h-24 border border-neon-magenta/30 rotate-12" />
        <div className="hero-bg-element absolute bottom-40 left-1/4 w-16 h-16 border border-white/20 rounded-full" />
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="hero-content max-w-6xl mx-auto text-center relative z-10">
        {/* Logo / Brand */}
        <div ref={logoRef} className="mb-12 inline-block">
          <div className="relative group cursor-pointer">
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-neon-cyan via-white to-neon-magenta blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative flex flex-col items-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl md:text-7xl font-bold tracking-tighter">
                  <span className="text-white">3</span>
                  <span className="text-neon-cyan">Digit</span>
                  <span className="text-white">-</span>
                  <span className="text-neon-magenta">All</span>
                </span>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
              <span className="mt-2 text-lg md:text-xl tracking-[0.5em] text-gray-300 font-mono">
                FACTORY
              </span>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
        >
          <span className="hero-word inline-block text-white">Superintelligent</span>
          <br />
          <span className="hero-word inline-block">
            <span className="neon-text">Digital Factory</span>
          </span>
          <br />
          <span className="hero-word inline-block text-white">Transformations.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          <span className="text-neon-cyan">3Digit-All Factory</span> es una empresa colombiana 
          líder en soluciones de software empresarial premium, especializada en 
          <span className="text-neon-magenta"> soluciones avanzadas</span>, 
          <span className="text-white"> gemelos digitales</span>, 
          <span className="text-neon-cyan"> software acelerado por IA</span> y 
          <span className="text-white"> transformación digital</span>.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#services"
            className="btn-primary group relative overflow-hidden"
          >
            <span className="relative z-10">Explore Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/5 hover:border-white/50 transition-all duration-300 font-mono tracking-wide"
          >
            Contact Us
          </a>
        </div>

        {/* Bottom left text */}
        <div className="absolute bottom-12 left-8 md:left-12 hidden md:block">
          <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
            Accelerated Digital Factory
          </p>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-neon-cyan to-transparent" />
        </div>

        {/* Location badge */}
        <div className="absolute bottom-12 right-8 md:right-12 hidden md:flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
            Medellín, Colombia
          </p>
        </div>
      </div>

      {/* Scroll indicator arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-gray-500"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
