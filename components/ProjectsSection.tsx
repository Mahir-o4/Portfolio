'use client';

import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProjectsSection() {
const {ref, isVisible} = useScrollAnimation();


  const projects = [
    {
      title: 'OuraCode',
      description: 'OuraCode is a real-time collaborative coding platform with an integrated cloud terminal and context-aware AI assistance.',
      accent: '#b66bff',
      gifSrc: '/CodingGIF.mp4',
      technologies: ['React.js', 'Express', 'WebSocket', 'Redis', 'Docker'],
      link: "https://github.com/Mahir-o4/OuraCode"
    },
    {
      title: 'Cross Platform Student Management System',
      description: 'A cross-platform app for managing student credentials and organizational data on Android and iOS devices.',
      accent: '#00d9ff',
      gifSrc: '/StudentDebtDegreeGIF.mp4',
      technologies: ['React.js', 'Express', 'MongoDB', 'Flutter'],
      link:"https://github.com/Mahir-o4/Cross-Platform-Student-Management-App"
    },
    {
      title: 'RAG WEB',
      description: 'An AI-driven cinephile that scouts the web to fetch movie insights, answering your deepest film queries with real-time precision.',
      accent: '#00ff88',
      gifSrc: '/AiGeneratedAiGIF.mp4',
      technologies: ['Python', 'Ollama', 'Streamlit', 'GenAI'],
      link:"https://github.com/Mahir-o4/RAG_Web"
    },
  ];

  return (
    <section ref={ref} id="work" className="py-14 md:py-20 md:ml-20 relative mb-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className={`mb-10 md:mb-16 ${isVisible? 'pop-in': 'opacity-0'}`} style={{animationDelay:'0.2s'}}>
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-cyan">
              @work
            </h2>
          </div>
          <p className="text-accent font-bold text-xs md:text-sm code-text ml-2 md:ml-8 mt-2">
            A curated collection of innovative work
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center md:justify-items-stretch">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`${isVisible ? 'scroll-element' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 500}ms` }}
            >
              <ProjectCard
                {...project}
                delay={index * 500}
              />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className={`mt-12 text-right ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <a
            href="https://github.com/Mahir-o4?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ff88] active:text-[#00ff88] transition-colors text-xs md:text-sm code-text font-semibold inline-flex items-center gap-2"
          >
            view all →
          </a>
        </div>
      </div>
    </section>
  );
}
