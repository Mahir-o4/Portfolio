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

          {/* Brainstorming things about me */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4 code-text leading-relaxed text-shadow-md font-semibold">
              <p>
                I am an unapologetic fanatic about AI and Machine Learning, and I spend most of my waking hours tumbling down the rabbit hole of Deep Learning. My absolute favorite thing to do is struggle with GenAI and develop practical AI solutions that actually work as they are intended to, rather than just pretending to know what they are doing.
              </p>

              <p>
                When I am not training models or deploying updates to my Hugging Face repositories, I build full-stack websites. In developer speak, this means that I build pixel-perfect, beautiful front-ends that users adore, all while desperately trying to figure out how to connect the back-end without everything falling apart.
              </p>

              <p>
               My typical day is a crazy and exhilarating combination of soaking up whatever new tech just landed on the web, coming up with more and more creative ways to get my AI models to go faster and cheaper, and trying to get my neural nets to play nice. I am on a never-ending quest to create the most intelligent web apps possible, completely dedicated to pushing the frontiers of applied machine learning—assuming, of course, that my server doesn’t suddenly crash.
              </p>
            </div>

            {/* Quote */}
            <div className="card-minimal rounded-none p-6 border-l-4 border-accent-cyan mt-8">
              <p className="text-slate-300 italic code-text text-sm mb-3">
                "Keep trying untill oneday you give up on your own."
              </p>
              <p className="text-accent code-text text-xs">— Mahir</p>
            </div>
          </div>

          {/* My top motivations */}
          <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-1 gap-6">
              <div className="card-minimal rounded-none p-6 border-l-4 border-accent">
                <div className="text-3xl font-bold text-accent code-text mb-2">Gotta Learn AI before it's bubble burst.</div>
                <p className="text-slate-400 text-sm code-text">Still working on AI projects, it surely takes time.</p>
              </div>

              <div className="card-minimal rounded-none p-6 border-l-4 border-accent-cyan">
                <div className="text-3xl font-bold text-accent-cyan code-text mb-2">Designing and Polishing for Eyes</div>
                <p className="text-slate-400 text-sm code-text">Wrote much more Frontend than I can bear, with "0" design language.</p>
              </div>

              <div className="card-minimal rounded-none p-6 border-l-4 border-accent-pink">
                <div className="text-3xl font-bold text-accent-pink code-text mb-2">5+ years of pain</div>
                <p className="text-slate-400 text-sm code-text">Technology is now changing faster than people. (naah people still wins!!)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
