'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '500+', label: 'Projects Delivered', labelEs: 'Proyectos Completados' },
  { value: '98%', label: 'Client Satisfaction', labelEs: 'Satisfacción del Cliente' },
  { value: '15+', label: 'Years Experience', labelEs: 'Años de Experiencia' },
  { value: '50+', label: 'Team Members', labelEs: 'Miembros del Equipo' },
];

const features = [
  {
    title: 'Innovation First',
    titleEs: 'Innovación Primero',
    description: 'We push the boundaries of what\'s possible with cutting-edge technology and creative solutions.',
  },
  {
    title: 'Global Reach',
    titleEs: 'Alcance Global',
    description: 'Serving clients worldwide from our headquarters in Medellín, Colombia.',
  },
  {
    title: 'Agile Methodology',
    titleEs: 'Metodología Ágil',
    description: 'Fast, iterative development that adapts to your evolving needs.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats counter
      gsap.fromTo(
        '.stat-value',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      // Animate text content
      gsap.fromTo(
        textRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Parallax effect
      gsap.to('.about-bg-shape', {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container py-32 relative overflow-hidden"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="about-bg-shape absolute top-20 right-0 w-96 h-96 border border-neon-magenta/20 rotate-45" />
        <div className="about-bg-shape absolute bottom-40 left-0 w-64 h-64 border border-neon-cyan/20 -rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-neon-magenta tracking-[0.3em] uppercase mb-4 block">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The <span className="neon-text">Factory</span> Story
          </h2>
        </div>

        {/* Main Content */}
        <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <span className="text-white font-semibold">3Digit-All Factory</span> is a premium Colombian 
                enterprise software company headquartered in the beautiful city of{' '}
                <span className="text-neon-cyan">Medellín</span>. We specialize in creating 
                superintelligent digital transformations that accelerate businesses into the future.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Our team of expert engineers, designers, and strategists work together to deliver 
                cutting-edge solutions in <span className="text-neon-magenta">3D visualization</span>,{' '}
                <span className="text-white">digital twins</span>,{' '}
                <span className="text-neon-cyan">AI-accelerated software</span>, and comprehensive 
                digital transformation services.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We believe in pushing the boundaries of what's possible, combining creativity 
                with technical excellence to deliver solutions that don't just meet expectations—they 
                <span className="text-neon-magenta"> exceed them</span>.
              </p>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass rounded-xl p-6 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                      {feature.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-500 mb-2 block">
                      {feature.titleEs}
                    </span>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300"
            >
              <div className="stat-value text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
              <div className="text-xs text-gray-600 font-mono">{stat.labelEs}</div>
            </div>
          ))}
        </div>

        {/* Location Badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 glass rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-gray-400">
              Based in <span className="text-white">Medellín, Colombia</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-sm font-mono text-gray-400">
              UTC-5
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
