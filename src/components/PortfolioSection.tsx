'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Virtual Manufacturing Plant',
    client: 'Industrial Corp',
    category: 'Digital Twin',
    year: '2025',
    color: '#00F0FF',
    description: 'Complete digital twin implementation for a 50,000 sq ft manufacturing facility.',
  },
  {
    title: 'E-Commerce 3D Platform',
    client: 'RetailMax',
    category: '3D Solutions',
    year: '2025',
    color: '#FF00AA',
    description: 'Immersive 3D product visualization for an enterprise e-commerce platform.',
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    client: 'FinanceHub',
    category: 'AI Software',
    year: '2024',
    color: '#FFFFFF',
    description: 'Real-time analytics platform with predictive modeling and ML insights.',
  },
  {
    title: 'Smart City Infrastructure',
    client: 'City of Cartagena',
    category: 'Digital Transformation',
    year: '2024',
    color: '#00F0FF',
    description: 'IoT integration and digital twin for urban infrastructure management.',
  },
  {
    title: 'Healthcare Platform',
    client: 'MedTech Solutions',
    category: 'Cloud Architecture',
    year: '2024',
    color: '#FF00AA',
    description: 'HIPAA-compliant cloud platform serving 2M+ patients nationwide.',
  },
  {
    title: 'Autonomous Vehicle Simulator',
    client: 'AutoTech Labs',
    category: '3D Solutions',
    year: '2025',
    color: '#FFFFFF',
    description: 'High-fidelity driving simulator for autonomous vehicle training.',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-card',
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.portfolio-grid',
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
      id="portfolio"
      ref={sectionRef}
      className="section-container py-32 relative"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-neon-cyan tracking-[0.3em] uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Cutting-edge solutions delivered for industry leaders worldwide
          </p>
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-neon-cyan/50 rounded-lg text-white hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 font-mono"
          >
            <span>View All Projects</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M12 6l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="portfolio-card group relative"
      style={{ '--accent-color': project.color } as React.CSSProperties}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)`,
        }}
      />

      <div className="relative glass rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:bg-white/5">
        {/* Image placeholder / visual */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${project.color}40, transparent)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-xl border-2 flex items-center justify-center"
              style={{ borderColor: project.color }}
            >
              <span className="text-4xl font-bold" style={{ color: project.color }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm"
              style={{
                background: `${project.color}30`,
                color: project.color,
                border: `1px solid ${project.color}50`,
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-500">{project.client}</span>
            <span className="text-xs font-mono text-gray-600">{project.year}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bottom accent */}
        <div
          className="h-1 w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />
      </div>
    </div>
  );
}
