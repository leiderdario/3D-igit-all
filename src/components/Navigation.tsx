'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface NavigationProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Team', href: '#team' },
  { name: 'Neutrino™', href: '#neutrino' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation({ menuOpen, setMenuOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate menu items when menu opens
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        '.menu-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="relative z-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-white">3</span>
                  <span className="text-neon-cyan">Digit</span>
                  <span className="text-white">-</span>
                  <span className="text-neon-magenta">All</span>
                </span>
                <div className="absolute -inset-2 bg-neon-cyan/20 blur-xl rounded-full animate-pulse" />
              </div>
              <div className="h-6 w-px bg-gradient-to-b from-neon-cyan to-neon-magenta" />
              <span className="text-sm tracking-widest text-gray-400 font-mono">
                FACTORY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 font-mono tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-2 text-sm font-semibold text-white border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 font-mono tracking-wide"
            >
              Get Started
            </a>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 lg:hidden transition-opacity duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="menu-item text-3xl font-bold tracking-wide text-white hover:text-neon-cyan transition-colors duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <div className="mt-8 flex flex-col gap-4 w-64">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="menu-item btn-primary text-center"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Side Panel Menu */}
      <div
        className={`menu-panel ${menuOpen ? 'open' : ''}`}
        style={{ maxWidth: menuOpen ? '400px' : '0' }}
      >
        <div className="h-full flex flex-col justify-center px-12">
          <div className="mb-12">
            <h3 className="text-xs font-mono text-neon-cyan tracking-widest mb-2">MENU</h3>
            <div className="h-px w-full bg-gradient-to-r from-neon-cyan to-transparent" />
          </div>
          
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="menu-item group flex items-center justify-between py-4 border-b border-white/10"
            >
              <span className="text-xl text-white group-hover:text-neon-cyan transition-colors duration-300">
                {link.name}
              </span>
              <span className="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                →
              </span>
            </a>
          ))}

          <div className="mt-12 space-y-4">
            <p className="text-sm text-gray-400 font-mono">
              Medellín, Colombia
            </p>
            <p className="text-sm text-gray-400 font-mono">
              info@3digitfactory.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
