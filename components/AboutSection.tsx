"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { Terminal, Cpu, Layers } from "lucide-react";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STATEMENTS = [
  {
    icon: <Cpu size={16} className="text-[var(--accent)]" />,
    label: "Focus",
    text: "Making AI practical — creating models and agentic workflows that deliver real-world utility in production.",
  },
  {
    icon: <Layers size={16} className="text-[var(--accent)]" />,
    label: "Craft",
    text: "Frontend people actually want to interact with, paired with robust backend architectures that stay resilient.",
  },
  {
    icon: <Terminal size={16} className="text-[var(--accent)]" />,
    label: "Pace",
    text: "Years of shipping software, debugging relentlessly, and turning complex abstractions into elegant tools.",
  },
];

export default function AboutSection() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: SPRING_EASE } satisfies Transition,
  });

  return (
    <section id="about-me" className="py-28 md:py-40 relative">
      {/* Subtle section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Section label */}
        <motion.div {...reveal(0)} className="flex items-center gap-3 mb-12">
          <span className="code-text text-xs text-[var(--accent)] font-mono">
            ~about
          </span>
          <span className="w-12 h-px bg-white/15" />
          <span className="code-text text-xs text-[#94a3b8] uppercase tracking-wider">
            Philosophy & Engineering
          </span>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-start">
          {/* Left — pull quote + photographic companion showcase */}
          <div className="flex flex-col gap-8">
            <motion.div {...reveal(0.1)}>
              <blockquote className="type-heading text-2xl sm:text-3xl lg:text-4xl text-[#f8fafc] leading-tight">
                &ldquo;I build the layer between human intent and machine
                intelligence.&rdquo;
              </blockquote>
              <p className="code-text text-sm mt-4 text-[var(--accent)] font-semibold">
                — Sk Mahir Ashef
              </p>
            </motion.div>

            {/* Architectural Engineering Philosophy Card */}
            <motion.div
              {...reveal(0.2)}
              className="relative rounded-2xl overflow-hidden glass-card p-6 flex flex-col gap-3 group border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="code-text text-xs text-[#f8fafc] font-semibold">
                    Core Engineering Principle
                  </span>
                </div>
                <span className="code-text text-[11px] text-[#94a3b8]">01 // CRAFT</span>
              </div>
              <p className="text-sm text-[#cbd5e1] leading-relaxed font-sans">
                Complexity is not a feature. True engineering mastery lies in hiding distributed neural orchestrations behind responsive, intuitive tactile interfaces.
              </p>
            </motion.div>

            {/* Quick stats bento pills */}
            <motion.div
              {...reveal(0.3)}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              {[
                { value: "5+", label: "Years Coding" },
                { value: "10+", label: "Projects Built" },
                { value: "100%", label: "Focus & Craft" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-3 text-center flex flex-col items-center justify-center rounded-xl"
                >
                  <span className="type-display text-xl text-[var(--accent)] font-bold">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-[#94a3b8] font-sans mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — bio + statements */}
          <div className="flex flex-col gap-10">
            <motion.div {...reveal(0.15)} className="flex flex-col gap-5">
              <p className="text-base md:text-lg leading-relaxed text-[#cbd5e1] font-normal font-sans">
                I&apos;m an AI/ML engineer who immersed into modern full-stack development
                because I wanted world-class interfaces for my deep learning models. Now,
                I engineer both ends of the stack with equal precision.
              </p>
              <p className="text-base leading-relaxed text-[#94a3b8] font-normal font-sans">
                My daily work bridges neural networks, LLM agent orchestrations,
                and high-performance web applications with React 19 and Next.js. I care deeply
                about direct manipulation, fast feedback loops, and software that feels alive.
              </p>
            </motion.div>

            {/* Statements list */}
            <div className="border-t border-white/10">
              {STATEMENTS.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...reveal(0.25 + i * 0.08)}
                  className="py-6 grid grid-cols-[100px_1fr] gap-4 items-start border-b border-white/10 hover:bg-white/[0.02] transition-colors px-2 rounded-lg"
                >
                  <div className="flex items-center gap-2 pt-0.5">
                    {s.icon}
                    <span className="code-text text-xs text-[#f8fafc] font-semibold">
                      {s.label}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-[#cbd5e1] font-sans">
                    {s.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
