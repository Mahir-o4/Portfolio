'use client';

import { useEffect, useState } from 'react';
import SkillCard from './SkillCard';

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skillCategories = [
    {
      category: 'Frontend',
      icon: '🎨',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools & DevOps',
      icon: '🛠️',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Webpack'],
    },
    {
      category: 'Design',
      icon: '🎭',
      skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Prototyping'],
    },
  ];

  return (
    <section id="skills" className="py-20 ml-20 relative">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className={`mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="accent-line-left"></div>
            <h2 className="text-4xl font-bold code-text">
              <span className="text-accent-purple">#</span>
              <span className="text-slate-300">skills</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm code-text ml-8 mt-2">
            Technologies I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.category}
              className={`${isVisible ? 'scroll-element' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SkillCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
