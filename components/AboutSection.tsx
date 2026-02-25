'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="about-me" className="py-20 ml-20 relative">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className={`mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="accent-line-left"></div>
            <h2 className="text-4xl font-bold text-accent-cyan">
              ~about-me
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text Content */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4 text-slate-400 code-text text-sm leading-relaxed">
              <p>
                I'm a passionate web designer and front-end developer with a keen eye for creating beautiful, functional digital experiences.
              </p>

              <p>
                My journey in web development began with a curiosity about how things work on the internet. This curiosity evolved into a career where I combine design thinking with technical expertise.
              </p>

              <p>
                When I'm not coding or designing, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the community.
              </p>
            </div>

            {/* Quote */}
            <div className="card-minimal rounded-none p-6 border-l-4 border-accent-cyan mt-8">
              <p className="text-slate-300 italic code-text text-sm mb-3">
                "The great power of a string of lights is that it creates conviviality — the feeling of community."
              </p>
              <p className="text-accent-purple code-text text-xs">— Elias</p>
            </div>
          </div>

          {/* Stats / Info */}
          <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-1 gap-6">
              <div className="card-minimal rounded-none p-6 border-l-4 border-accent-purple">
                <div className="text-3xl font-bold text-accent-purple code-text mb-2">50+</div>
                <p className="text-slate-400 text-sm code-text">Projects Completed</p>
              </div>

              <div className="card-minimal rounded-none p-6 border-l-4 border-accent-cyan">
                <div className="text-3xl font-bold text-accent-cyan code-text mb-2">30+</div>
                <p className="text-slate-400 text-sm code-text">Happy Clients</p>
              </div>

              <div className="card-minimal rounded-none p-6 border-l-4 border-accent-pink">
                <div className="text-3xl font-bold text-accent-pink code-text mb-2">5+</div>
                <p className="text-slate-400 text-sm code-text">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
