'use client';

import { useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';

// Pre-generated particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 20.4, top: 32.2, delay: 1.16, duration: 2.12 },
  { left: 28.7, top: 21.2, delay: 0.14, duration: 3.60 },
  { left: 72.6, top: 75.3, delay: 0.67, duration: 2.30 },
  { left: 98.8, top: 4.6, delay: 0.43, duration: 2.90 },
  { left: 24.2, top: 23.5, delay: 1.52, duration: 3.95 },
  { left: 44.4, top: 80.4, delay: 1.62, duration: 3.87 },
  { left: 61.8, top: 64.8, delay: 0.74, duration: 3.27 },
  { left: 6.7, top: 42.9, delay: 1.67, duration: 2.78 },
  { left: 23.0, top: 67.7, delay: 1.78, duration: 3.13 },
  { left: 63.8, top: 24.0, delay: 0.47, duration: 3.02 },
  { left: 61.2, top: 68.4, delay: 0.65, duration: 2.00 },
  { left: 33.9, top: 25.7, delay: 1.73, duration: 2.29 },
  { left: 11.5, top: 14.6, delay: 0.67, duration: 3.33 },
  { left: 9.9, top: 45.3, delay: 1.68, duration: 3.26 },
  { left: 64.4, top: 0.9, delay: 1.15, duration: 3.24 },
  { left: 28.8, top: 90.5, delay: 1.10, duration: 2.61 },
  { left: 57.0, top: 36.8, delay: 1.00, duration: 3.25 },
  { left: 3.3, top: 75.4, delay: 1.56, duration: 2.31 },
  { left: 58.8, top: 95.0, delay: 1.93, duration: 3.18 },
  { left: 60.7, top: 51.0, delay: 0.62, duration: 2.75 },
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    // Animate logo
    gsap.fromTo(
      '.preloader-logo',
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
    );

    gsap.fromTo(
      '.preloader-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5 }
    );

    gsap.fromTo(
      '.preloader-bar',
      { scaleX: 0 },
      { scaleX: 1, duration: 2, delay: 0.3, ease: 'power2.inOut' }
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLE_POSITIONS.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full animate-ping"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="preloader-logo mb-8 relative">
        <div className="relative">
          <span className="text-5xl md:text-7xl font-bold tracking-tighter">
            <span className="text-white">3</span>
            <span className="text-neon-cyan">Digit</span>
            <span className="text-white">-</span>
            <span className="text-neon-magenta">All</span>
          </span>
          {/* Glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-neon-cyan via-white to-neon-magenta blur-2xl opacity-30 animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="preloader-text text-center mb-8">
        <p className="text-sm font-mono text-gray-400 tracking-widest">
          ACCELERATED DIGITAL FACTORY
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="preloader-bar h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full origin-left"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-4 text-xs font-mono text-gray-500">
        {Math.round(progress)}%
      </div>

      {/* Loading text */}
      <div className="absolute bottom-12 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-gray-500">
          Initializing Experience...
        </span>
      </div>
    </div>
  );
}
