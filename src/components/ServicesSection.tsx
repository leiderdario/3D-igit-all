'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: '3D Solutions',
    titleEs: 'Soluciones 3D',
    description: 'Immersive 3D experiences, virtual showrooms, and interactive product visualization that transform how your customers engage with your brand.',
    icon: 'cube',
    color: '#00F0FF',
  },
  {
    title: 'Digital Twins',
    titleEs: 'Gemelos Digitales',
    description: 'Real-time digital replicas of physical assets, processes, and systems for predictive maintenance, optimization, and simulation.',
    icon: 'copy',
    color: '#FF00AA',
  },
  {
    title: 'AI-Accelerated Software',
    titleEs: 'Software Acelerado por IA',
    description: 'Intelligent automation and machine learning solutions that accelerate your workflows and unlock new possibilities.',
    icon: 'brain',
    color: '#FFFFFF',
  },
  {
    title: 'Digital Transformation',
    titleEs: 'Transformación Digital',
    description: 'End-to-end digital transformation strategies that modernize your infrastructure and accelerate your competitive advantage.',
    icon: 'sync',
    color: '#00F0FF',
  },
  {
    title: 'Cloud Architecture',
    titleEs: 'Arquitectura en la Nube',
    description: 'Scalable, secure, and performant cloud solutions built on cutting-edge infrastructure and DevOps best practices.',
    icon: 'cloud',
    color: '#FF00AA',
  },
  {
    title: 'Cybersecurity',
    titleEs: 'Ciberseguridad',
    description: 'Comprehensive security solutions protecting your digital assets with proactive threat detection and response systems.',
    icon: 'shield',
    color: '#FFFFFF',
  },
];

// CSS-based hexagonal icon component
function HexIcon({ icon, color, isHovered }: { icon: string; color: string; isHovered: boolean }) {
  return (
    <div className="relative w-20 h-20">
      {/* Hexagon background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          className={`transition-all duration-300 ${isHovered ? 'stroke-[3]' : ''}`}
          style={{
            filter: isHovered ? `drop-shadow(0 0 10px ${color})` : 'none',
          }}
        />
        <polygon
          points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
          fill={`${color}15`}
          className="transition-all duration-300"
        />
      </svg>
      
      {/* Icon SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
        >
          {icon === 'cube' && (
            <>
              <path d="m21 16-9 5-9-5" />
              <path d="m3 8 9-5 9 5" />
              <path d="m3 8 9 5 9-5" />
              <path d="m12 3v10" />
              <path d="m12 13v9" />
            </>
          )}
          {icon === 'copy' && (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
          {icon === 'brain' && (
            <>
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z" />
            </>
          )}
          {icon === 'sync' && (
            <>
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </>
          )}
          {icon === 'cloud' && (
            <>
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </>
          )}
          {icon === 'shield' && (
            <>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.services-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Staggered card animations
      gsap.fromTo(
        '.service-card',
        { y: 100, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-container py-32 relative"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="services-title text-xs font-mono text-neon-cyan tracking-[0.3em] uppercase mb-4 block">
            Our Expertise
          </span>
          <h2 className="services-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Services & <span className="neon-text">Solutions</span>
          </h2>
          <p className="services-title text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to accelerate your transformation journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="service-card card-3d group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-1 rounded-2xl blur-xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: `radial-gradient(circle at center, ${service.color}20, transparent 70%)` }}
      />
      
      <div className="card-3d-inner relative glass rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/5">
        {/* Hex Icon */}
        <div className="mb-6">
          <HexIcon icon={service.icon} color={service.color} isHovered={isHovered} />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
            {service.title}
          </h3>
          <span className="text-xs font-mono text-gray-500 tracking-wide block">
            {service.titleEs}
          </span>
          <p className="text-gray-400 leading-relaxed text-sm">
            {service.description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className={`mt-6 flex items-center gap-2 transition-all duration-300 ${isHovered ? 'text-neon-cyan' : 'text-gray-500'}`}>
          <span className="text-sm font-mono">Learn more</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transform transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Corner accent */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${service.color}30 50%)`,
          }}
        />
      </div>
    </div>
  );
}
