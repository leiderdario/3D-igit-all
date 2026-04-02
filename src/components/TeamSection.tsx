'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Daniel Meza',
    role: 'CEO & Founder',
    roleEs: 'CEO y Fundador',
    bio: 'Visionary leader driving digital transformation and strategic growth.',
    color: '#00F0FF',
  },
  {
    name: 'L. Dario',
    role: 'IA Expert & Founder',
    roleEs: 'Experto en IA y Fundador',
    bio: 'AI specialist architecting intelligent solutions and machine learning systems.',
    color: '#FF00AA',
  },
  {
    name: 'Eliud David',
    role: 'Contador & Founder',
    roleEs: 'Contador y Fundador',
    bio: 'Finance expert managing operations and ensuring sustainable business growth.',
    color: '#FFFFFF',
  },
];

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Three.js', category: '3D Graphics' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'Unity', category: '3D Engine' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'GraphQL', category: 'API' },
  { name: 'WebGL', category: 'Graphics' },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-card',
        { y: 80, opacity: 0, rotateY: -10 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.tech-item',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="section-container py-32 relative"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-neon-cyan/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-neon-magenta/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-neon-magenta tracking-[0.3em] uppercase mb-4 block">
            Our People
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Team & <span className="neon-text">Technology</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            World-class talent driving innovation and excellence
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>

        {/* Technology Stack */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Technology Stack
          </h3>
          <div className="tech-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-item glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-sm font-semibold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-500 font-mono">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Neutrino Section */}
        <div id="neutrino" className="mt-32 text-center">
          <div className="inline-block mb-8">
            <span className="text-xs font-mono text-neon-cyan tracking-[0.3em] uppercase mb-4 block">
              Proprietary Technology
            </span>
            <h3 className="text-5xl md:text-7xl font-bold neon-text mb-4">
              Neutrino™
            </h3>
            <p className="text-sm text-gray-500 font-mono tracking-widest">
              AI-POWERED DEVELOPMENT PLATFORM
            </p>
          </div>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Our flagship AI platform that accelerates software development by 10x, 
            combining machine learning with human expertise for unprecedented results.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="glass rounded-xl px-6 py-3">
              <span className="text-2xl font-bold text-white">10x</span>
              <p className="text-xs text-gray-500 font-mono">Faster Development</p>
            </div>
            <div className="glass rounded-xl px-6 py-3">
              <span className="text-2xl font-bold text-neon-cyan">99.9%</span>
              <p className="text-xs text-gray-500 font-mono">Uptime Guarantee</p>
            </div>
            <div className="glass rounded-xl px-6 py-3">
              <span className="text-2xl font-bold text-neon-magenta">24/7</span>
              <p className="text-xs text-gray-500 font-mono">AI Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="team-card group">
      {/* Avatar placeholder */}
      <div className="relative mb-6">
        <div
          className="w-32 h-32 mx-auto rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: member.color,
            background: `linear-gradient(135deg, ${member.color}20, transparent)`,
          }}
        >
          <span
            className="text-4xl font-bold"
            style={{ color: member.color }}
          >
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl"
          style={{ background: member.color }}
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
        <p className="text-sm font-mono mb-3" style={{ color: member.color }}>
          {member.role}
        </p>
        <p className="text-xs text-gray-500 mb-2">{member.roleEs}</p>
        <p className="text-sm text-gray-400">{member.bio}</p>
      </div>

      {/* Social links placeholder */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="w-8 h-8 rounded-full border border-gray-700 hover:border-neon-cyan transition-colors cursor-pointer" />
        <div className="w-8 h-8 rounded-full border border-gray-700 hover:border-neon-magenta transition-colors cursor-pointer" />
      </div>
    </div>
  );
}
