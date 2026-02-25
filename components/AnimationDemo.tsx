'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Demo component showing all available scroll animations
 * Add this to your page temporarily to see animations in action
 * 
 * Usage: Import and render anywhere in your layout
 */
export default function AnimationDemo() {
  const { ref, isVisible } = useScrollAnimation();

  const demos = [
    { name: 'fade-in', class: 'fade-in', description: 'Simple fade' },
    { name: 'fade-in-up', class: 'fade-in-up', description: 'Fade + slide up' },
    { name: 'slide-in-left', class: 'slide-in-left', description: 'From left' },
    { name: 'slide-in-right', class: 'slide-in-right', description: 'From right' },
    { name: 'slide-in-up', class: 'slide-in-up', description: 'From bottom' },
    { name: 'pop-in', class: 'pop-in', description: 'Bouncy scale' },
    { name: 'scale-in', class: 'scale-in', description: 'Smooth scale' },
  ];

  return (
    <section ref={ref} className="py-20 ml-20">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-12 text-accent-purple">
          Scroll Animation Preview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <div
              key={demo.name}
              className={`card-minimal p-6 rounded-lg ${
                isVisible ? demo.class : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-accent-cyan font-bold code-text mb-2">
                .{demo.name}
              </div>
              <div className="text-slate-400 text-sm code-text">
                {demo.description}
              </div>
              <div className="mt-4 h-20 bg-slate-800 rounded flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          ))}
        </div>

        {/* Staggered List Example */}
        <div className="mt-16">
          <h3
            className={`text-2xl font-bold mb-6 text-accent-cyan ${
              isVisible ? 'fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.8s' }}
          >
            Staggered List Example
          </h3>

          <div className="space-y-4">
            {['First Item', 'Second Item', 'Third Item', 'Fourth Item'].map(
              (item, i) => (
                <div
                  key={i}
                  className={`card-minimal p-4 rounded ${
                    isVisible ? 'slide-in-left' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.9 + i * 0.1}s` }}
                >
                  <span className="text-slate-300 code-text">{item}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Usage Note */}
        <div
          className={`mt-16 border border-accent-purple/30 p-6 rounded ${
            isVisible ? 'pop-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.5s' }}
        >
          <p className="text-slate-400 code-text text-sm">
            💡 <strong className="text-accent-purple">Tip:</strong> Scroll down
            and back up to see animations trigger. See SCROLL_ANIMATIONS_GUIDE.md
            for implementation details.
          </p>
        </div>
      </div>
    </section>
  );
}
