"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { Terminal, Cpu, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import SectionDraft from "@/components/arch/SectionDraft";

const FLUID_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const STATEMENTS = [
  {
    icon: <Cpu size={16} strokeWidth={1.5} className="text-[#FFFFFF]" />,
    label: "Focus",
    text: "Making AI practical — creating models and agentic workflows that deliver real-world utility in production.",
  },
  {
    icon: <Layers size={16} strokeWidth={1.5} className="text-[#FFFFFF]" />,
    label: "Craft",
    text: "Frontend people actually want to interact with, paired with robust backend architectures that stay resilient.",
  },
  {
    icon: <Terminal size={16} strokeWidth={1.5} className="text-[#FFFFFF]" />,
    label: "Pace",
    text: "Years of shipping software, debugging relentlessly, and turning complex abstractions into elegant tools.",
  },
];

export default function AboutSection() {
  const reduced = useReducedMotion();
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    fetch("/api/quote")
      .then((r) => r.json())
      .then((d) => { if (d.quote && d.author) setQuote(d); })
      .catch(() => { });
  }, []);

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 64, filter: "blur(12px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, delay, ease: FLUID_EASE } satisfies Transition,
  });

  return (
    <section id="about-me" className="py-28 md:py-40 relative cv-auto">
      {/* Architect art first (About cut-bays, ink, scroll glow) */}
      <SectionDraft section="about" variant="cut" tone="ink" />

      {/* Faint neutral wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Faint colonnade elevation — the single statement texture, static */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-auto pointer-events-none hidden lg:block"
        viewBox="0 0 400 600"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.08"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M40 120 L200 40 L360 120" />
        <path d="M55 120 L55 480 M120 120 L120 480 M200 120 L200 480 M280 120 L280 480 M345 120 L345 480" />
        <path d="M40 140 L360 140 M30 480 L370 480 M20 505 L380 505 M10 530 L390 530" />
        <path d="M55 160 L55 180 M120 160 L120 180 M200 160 L200 180 M280 160 L280 180 M345 160 L345 180" />
      </svg>

      <div className="container-page relative">
        {/* Sheet header: mono label + rule + path code (no pill chrome) */}
        <motion.div {...reveal(0)} className="flex items-center gap-4 mb-12">
          <span className="code-text text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--text)" }}>
            ~about
          </span>
          <span className="h-px w-12 bg-[rgba(255,255,255,0.25)]" aria-hidden="true" />
          <span className="code-text text-xs text-(--text-muted) uppercase tracking-wider">
            Philosophy & Engineering
          </span>
          <span className="ml-auto code-text text-xs" style={{ color: "var(--text-dim)" }}>
            ~/about
          </span>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-start">
          {/* Left — pull quote + principle card + stats */}
          <div className="flex flex-col gap-8">
            <motion.div {...reveal(0.1)}>
              {quote ? (
                <>
                  <blockquote className="type-heading text-2xl sm:text-3xl lg:text-4xl leading-tight" style={{ color: "var(--text)" }}>
                    &ldquo;{quote.quote}&rdquo;
                  </blockquote>
                  <p className="code-text text-sm mt-4 font-semibold" style={{ color: "var(--text)" }}>
                    — {quote.author}
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-4 animate-pulse" aria-hidden="true">
                  <div className="h-8 rounded-lg bg-[rgba(255,255,255,0.1)] w-full" />
                  <div className="h-8 rounded-lg bg-[rgba(255,255,255,0.1)] w-4/5" />
                  <div className="h-8 rounded-lg bg-[rgba(255,255,255,0.1)] w-3/5" />
                  <div className="h-4 rounded-lg bg-[rgba(255,255,255,0.1)] w-1/3 mt-2" />
                </div>
              )}
            </motion.div>



            {/* Quick stats — ruled index strip, no bezel hardware */}
            <motion.div
              {...reveal(0.3)}
              className="grid grid-cols-3 border-y border-[rgba(255,255,255,0.14)] divide-x divide-[rgba(255,255,255,0.14)] mt-2"
            >
              {[
                { value: "5+", label: "Years Coding" },
                { value: "10+", label: "Projects Built" },
                { value: "100%", label: "Focus & Craft" },
              ].map((stat) => (
                <div key={stat.label} className="py-5 px-2 sm:px-4 text-left flex flex-col gap-1">
                  <span className="type-display text-xl sm:text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {stat.value}
                  </span>
                  <span className="code-text text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — bio + statements */}
          <div className="flex flex-col gap-10">
            <motion.div {...reveal(0.15)} className="flex flex-col gap-5">
              <p
                className="text-base md:text-lg leading-relaxed font-normal font-sans max-w-[65ch]"
                style={{ color: "var(--text-secondary)" }}
              >
                I like building things that sit between intelligence and interaction.
                I&apos;ve explored AI/ML, full-stack development, and modern web
                technologies, mostly by turning ideas that should probably have
                stayed ideas into working software.
              </p>

              <p
                className="text-base leading-relaxed font-normal font-sans max-w-[65ch]"
                style={{ color: "var(--text-muted)" }}
              >
                From deep learning models and LLM systems to real-time applications
                and polished interfaces, I enjoy moving between the layers of a
                product. I care about understanding what happens underneath,
                while making sure what happens on the surface feels effortless.
              </p>
            </motion.div>

            {/* Statements list */}
            <div className="border-t border-[rgba(255,255,255,0.14)]">
              {STATEMENTS.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...reveal(0.25 + i * 0.08)}
                  className="py-6 grid grid-cols-[100px_1fr] gap-4 items-start border-b border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.04)] transition-[background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] px-2 rounded-lg"
                >
                  <div className="flex items-center gap-2 pt-0.5">
                    {s.icon}
                    <span
                      className="code-text text-xs font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      {s.label}
                    </span>
                  </div>

                  <p
                    className="text-sm sm:text-base leading-relaxed font-sans max-w-[60ch]"
                    style={{ color: "var(--text-secondary)" }}
                  >
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
