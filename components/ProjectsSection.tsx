'use client';

import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      title: 'Node.js Server',
      description: 'High-performance backend server built with Node.js and Express. Real-time WebSocket integration.',
      accent: '#b66bff',
      icon: '⚙️',
      technologies: ['Node.js', 'Express', 'WebSocket'],
    },
    {
      title: 'React CMS',
      description: 'Content management system with drag-and-drop interface and real-time collaboration.',
      accent: '#00d9ff',
      icon: '🎨',
      technologies: ['React', 'TypeScript', 'Firebase'],
    },
    {
      title: 'Kshoot Platform',
      description: 'Interactive learning platform with gamification and personalized recommendations.',
      accent: '#00ff88',
      icon: '🚀',
      technologies: ['Next.js', 'Python', 'PostgreSQL'],
    },
  ];

  return (
    <section id="work" className="py-20 ml-20 relative">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className={`mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="accent-line-left"></div>
            <h2 className="text-4xl font-bold code-text">
              <span className="text-accent-purple">#</span>
              <span className="text-slate-300">projects</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm code-text ml-8 mt-2">
            A curated collection of innovative work
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`${isVisible ? 'scroll-element' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard
                {...project}
                delay={index * 100}
              />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className={`mt-12 text-right ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <a
            href="#"
            className="text-accent-cyan hover:text-accent-purple transition-colors text-sm code-text font-semibold inline-flex items-center gap-2"
          >
            view all →
          </a>
        </div>
      </div>
    </section>
  );
}
