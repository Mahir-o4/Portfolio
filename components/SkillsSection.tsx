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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SKILL_CATEGORIES = [
  {
    title: "AI & Machine Learning",
    description: "Deep learning models, agent workflows, and intelligent pipeline architectures.",
    highlight: "Primary Focus",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "Hugging Face", icon: <SiHuggingface /> },
      { name: "LLM Agents", icon: null },
      { name: "Computer Vision", icon: null },
    ],
  },
  {
    title: "Full-Stack Web Engineering",
    description: "Production-grade, highly responsive web apps with fluid motion & direct manipulation.",
    highlight: "Daily Stack",
    skills: [
      { name: "Next.js 15", icon: <SiNextdotjs /> },
      { name: "React 19", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "JavaScript (ES6+)", icon: <SiJavascript /> },
    ],
  },
  {
    title: "Systems & Core Languages",
    description: "Algorithmic thinking, memory efficiency, and low-level software fundamentals.",
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
    description: "Continuous deployment, version control workflows, and rapid development environments.",
    highlight: "Tooling",
    skills: [
      { name: "Git & GitHub", icon: <SiGit /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Vercel", icon: null },
      { name: "Linux / Bash", icon: null },
      { name: "REST APIs", icon: null },
    ],
  },
];

const marqueeLogos = [
  { node: <FaPython size={26} />, title: "Python" },
  { node: <SiPytorch size={26} />, title: "PyTorch" },
  { node: <SiNextdotjs size={26} />, title: "Next.js" },
  { node: <SiReact size={26} />, title: "React" },
  { node: <SiTypescript size={26} />, title: "TypeScript" },
  { node: <SiTailwindcss size={26} />, title: "Tailwind" },
  { node: <SiHuggingface size={26} />, title: "Hugging Face" },
  { node: <FaJava size={26} />, title: "Java" },
  { node: <SiC size={26} />, title: "C" },
  { node: <SiDocker size={26} />, title: "Docker" },
  { node: <SiGit size={26} />, title: "Git" },
  { node: <SiJavascript size={26} />, title: "JavaScript" },
  { node: <FaHtml5 size={26} />, title: "HTML5" },
  { node: <FaCss3Alt size={26} />, title: "CSS3" },
];

const doubledLogos = [...marqueeLogos, ...marqueeLogos];

export default function SkillsSection() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.65, delay, ease: EASE } satisfies Transition,
  });

  return (
    <section id="skills" className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Section Label */}
        <motion.div {...reveal(0)} className="flex items-center gap-3 mb-6">
          <span className="code-text text-xs text-[var(--accent)] font-mono font-medium">
            #skills
          </span>
          <span className="w-12 h-px bg-white/15" />
          <span className="code-text text-xs text-[#94a3b8] uppercase tracking-wider">
            Technical Arsenal
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          {...reveal(0.1)}
          className="type-heading text-3xl sm:text-5xl lg:text-6xl text-[#f8fafc] mb-6 tracking-tight"
        >
          Technologies I{" "}
          <span className="text-[var(--accent)]">think & build in.</span>
        </motion.h2>

        <motion.p
          {...reveal(0.15)}
          className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mb-14 leading-relaxed font-sans"
        >
          A modular synthesis of deep learning capabilities and high-performance modern web technologies,
          structured for maximum execution speed and production durability.
        </motion.p>

        {/* ── Tech-stack index: editorial rows, no cards ── */}
        <div className="border-t border-white/10 mb-16">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              {...reveal(0.2 + idx * 0.08)}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-10 items-start border-b border-white/10 group"
            >
              {/* Category voice */}
              <div className="flex flex-col gap-2">
                <span className="code-text text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                  {category.highlight}
                </span>
                <h3 className="type-heading text-xl sm:text-2xl text-[#f8fafc]">
                  {category.title}
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed font-sans max-w-[38ch]">
                  {category.description}
                </p>
              </div>

              {/* The stack itself, set large */}
              <p className="type-heading font-medium text-[#f8fafc] leading-snug tracking-tight"
                 style={{ fontSize: "clamp(1.35rem, 2.6vw, 2rem)" }}>
                {category.skills.map((skill, i) => (
                  <span key={skill.name}>
                    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                      {skill.icon && (
                        <span className="text-[0.85em] text-[var(--accent)] opacity-80 translate-y-[0.08em]">
                          {skill.icon}
                        </span>
                      )}
                      <span className="text-[#cbd5e1] hover:text-[#f8fafc] transition-colors duration-150">{skill.name}</span>
                    </span>
                    {i < category.skills.length - 1 && (
                      <span className="text-[#475569] mx-3 select-none" aria-hidden="true">/</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Ambient Technology Strip (Marquee Ticker) ── */}
      <div className="relative overflow-hidden py-4 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
        />

        <div
          className="marquee-track"
          style={{ "--marquee-speed": "40s" } as React.CSSProperties}
          aria-label="Technologies Marquee"
        >
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 mx-6 sm:mx-10 shrink-0 opacity-80 hover:opacity-100 transition-opacity cursor-default"
            >
              <span className="text-xl text-[var(--accent)]">{logo.node}</span>
              <span className="code-text text-xs text-[#cbd5e1] font-medium tracking-wide">
                {logo.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
