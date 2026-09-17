"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import ProjectCard from "./ProjectCard";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projects = [
  {
    title: "OuraCode",
    description: "Real-time collaborative coding platform with integrated cloud terminal and context-aware AI assistance.",
    gifSrc: "/CodingGIF.mp4",
    technologies: ["React.js", "Express", "WebSocket", "Redis", "Docker"],
    link: "https://github.com/Mahir-o4/OuraCode",
  },
  {
    title: "Cross Platform Student Management System",
    description: "Cross-platform app for managing student credentials and organisational data on Android and iOS.",
    gifSrc: "/StudentDebtDegreeGIF.mp4",
    technologies: ["React.js", "Express", "MongoDB", "Flutter"],
    link: "https://github.com/Mahir-o4/Cross-Platform-Student-Management-App",
  },
  {
    title: "RAG Web",
    description: "AI cinephile that scouts the web for movie insights, answering film queries with real-time precision.",
    gifSrc: "/AiGeneratedAiGIF.mp4",
    technologies: ["Python", "Ollama", "Streamlit", "GenAI"],
    link: "https://github.com/Mahir-o4/RAG_Web",
  },
];

export default function ProjectsSection() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay, ease: EASE } satisfies Transition,
  });

  return (
    <section id="work" className="py-24 md:py-36 relative">
      {/* Subtle glow behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(61,252,202,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <motion.p {...reveal(0)} className="code-text text-xs mb-8" style={{ color: "var(--text-dim)" }}>
          @work
        </motion.p>

        <motion.div {...reveal(0.05)} className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <h2
            className="type-heading"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "var(--text)" }}
          >
            Selected work.
          </h2>
          <a
            href="https://github.com/Mahir-o4?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="code-text text-xs transition-colors duration-150"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            view all →
          </a>
        </motion.div>

        {/* Top rule */}
        <motion.div {...reveal(0.1)} className="rule-accent mb-0" />

        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard index={i} {...project} />
            </motion.div>
          ))}
          {/* Bottom rule */}
          <div style={{ borderBottom: "1px solid var(--border-subtle)" }} />
        </div>
      </div>
    </section>
  );
}
