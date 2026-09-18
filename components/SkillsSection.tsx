"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { FaPython, FaJava, FaCss3Alt } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiC,
  SiPytorch,
  SiHuggingface,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaHtml5 } from "react-icons/fa6";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const SKILL_CATEGORIES = [
  {
    title: "AI & Machine Learning",
    description:
      "I work with models, data, and the machinery that makes AI actually do something.",
    highlight: "Core",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "Hugging Face", icon: <SiHuggingface /> },
      { name: "NumPy", icon: null },
      { name: "Pandas", icon: null },
      { name: "Scikit-learn", icon: null },
      { name: "LLM Agents", icon: null },
      { name: "FastAPI", icon: null },
    ],
  },
  {
    title: "Full-Stack Web Engineering",
    description:
      "I build the interface, wire up the logic, and make the whole thing work together.",
    highlight: "Build",
    skills: [
      { name: "Next.js 15", icon: <SiNextdotjs /> },
      { name: "React 19", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "JavaScript", icon: <SiJavascript /> },
    ],
  },
  {
    title: "Systems & Core Languages",
    description:
      "The fundamentals that make me care about what happens under the hood.",
    highlight: "Foundation",
    skills: [
      { name: "C Programming", icon: <SiC /> },
      { name: "Java", icon: <FaJava /> },
      { name: "Data Structures", icon: null },
      { name: "Algorithms", icon: null },
    ],
  },
  {
    title: "DevOps & Developer Tools",
    description:
      "The tools I use to turn an idea into code, keep it moving, and ship it.",
    highlight: "Tooling",
    skills: [
      { name: "Git & GitHub", icon: <SiGit /> },
      { name: "REST APIs", icon: null },
    ],
  },
];

const marqueeLogos = [
  { node: <FaPython size={34} />, title: "Python" },
  { node: <SiPytorch size={34} />, title: "PyTorch" },
  { node: <SiNextdotjs size={34} />, title: "Next.js" },
  { node: <SiReact size={34} />, title: "React" },
  { node: <SiTypescript size={34} />, title: "TypeScript" },
  { node: <SiTailwindcss size={34} />, title: "Tailwind" },
  { node: <SiHuggingface size={34} />, title: "Hugging Face" },
  { node: <FaJava size={34} />, title: "Java" },
  { node: <SiC size={34} />, title: "C" },
  { node: <SiDocker size={34} />, title: "Docker" },
  { node: <SiGit size={34} />, title: "Git" },
  { node: <SiJavascript size={34} />, title: "JavaScript" },
  { node: <FaHtml5 size={34} />, title: "HTML5" },
  { node: <FaCss3Alt size={34} />, title: "CSS3" },
];

const doubledLogos = [...marqueeLogos, ...marqueeLogos];

export default function SkillsSection() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 64, filter: "blur(12px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.9,
      delay,
      ease: EASE,
    } satisfies Transition,
  });

  return (
    <section
      id="skills"
      className="py-28 md:py-36 relative overflow-hidden cv-auto"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(22, 19, 14, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Drafting grid — paper theme */}
      <div
        className="absolute inset-0 pointer-events-none texture-grid-paper"
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Sheet header: eyebrow badge + rule + path code */}
        <motion.div
          {...reveal(0)}
          className="flex items-center gap-3 mb-6"
        >
          <span className="eyebrow">
            #skills
          </span>

          <span className="h-px flex-1 max-w-12 bg-[rgba(22,19,14,0.2)]" />

          <span className="code-text text-xs text-(--text-muted) uppercase tracking-wider">
            Stack
          </span>

          <span
            className="ml-auto code-text text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            ~/skills
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          {...reveal(0.1)}
          className="type-heading text-3xl sm:text-5xl lg:text-6xl mb-6 tracking-tight"
          style={{ color: "var(--text)" }}
        >
          What I work with.
        </motion.h2>

        <motion.p
          {...reveal(0.15)}
          className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-sans"
          style={{ color: "var(--text-secondary)" }}
        >
          A mix of things I&apos;ve learned by building, breaking, fixing,
          and building again.
        </motion.p>

        {/* Drawn rule — the section's drafting gesture */}
        <motion.div
          initial={reduced ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rule-accent mb-12"
          aria-hidden="true"
        />

        {/* ── Ruled index: one full-width row after another, no cards ── */}
        <div className="border-t border-[rgba(22,19,14,0.1)] mb-16">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              {...reveal(0.2 + idx * 0.08)}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-10 items-start border-b border-[rgba(22,19,14,0.1)]"
            >
              {/* Category voice */}
              <div className="flex flex-col gap-3 items-start">
                <span className="eyebrow">
                  {category.highlight}
                </span>

                <h3
                  className="type-heading text-xl sm:text-2xl"
                  style={{ color: "var(--text)" }}
                >
                  {category.title}
                </h3>

                <p
                  className="text-sm leading-relaxed font-sans max-w-[38ch]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {category.description}
                </p>
              </div>

              {/* The stack itself, set large — primary keywords ink, secondary muted */}
              <p
                className="type-heading font-medium leading-snug tracking-tight"
                style={{
                  fontSize: "clamp(1.35rem, 2.6vw, 2rem)",
                  color: "var(--text)",
                }}
              >
                {category.skills.map((skill, i) => (
                  <span key={skill.name}>
                    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                      {skill.icon && (
                        <span
                          className="text-[0.7em] opacity-60 translate-y-[0.08em]"
                          style={{ color: "var(--text)" }}
                        >
                          {skill.icon}
                        </span>
                      )}

                      <span
                        style={{
                          color: skill.icon
                            ? "var(--text)"
                            : "var(--text-muted)",
                        }}
                      >
                        {skill.name}
                      </span>
                    </span>

                    {i < category.skills.length - 1 && (
                      <span
                        className="mx-3 select-none"
                        style={{ color: "var(--text-dim)" }}
                        aria-hidden="true"
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Ambient Technology Strip (Marquee Ticker) ── */}
      <div className="relative overflow-hidden py-5 border-y border-[rgba(22,19,14,0.1)] bg-[rgba(22,19,14,0.03)]">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--bg), transparent)",
          }}
        />

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--bg), transparent)",
          }}
        />

        <div
          className="marquee-track"
          style={{ "--marquee-speed": "40s" } as React.CSSProperties}
          aria-label="Technologies Marquee"
        >
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 mx-6 sm:mx-10 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-default"
            >
              <span className="text-2xl text-[#000000]">
                {logo.node}
              </span>

              <span
                className="code-text text-xs font-medium tracking-wide"
                style={{ color: "var(--text-secondary)" }}
              >
                {logo.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}