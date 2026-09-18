"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import ProjectCard, { type ProjectIcon } from "./ProjectCard";
import SectionDraft from "@/components/arch/SectionDraft";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const projects: Array<{
  title: string;
  description: string;
  domain: string;
  icon: ProjectIcon;
  technologies: string[];
  link: string;
}> = [
  {
    title: "UniVibe",
    description:
      "Campus communication hub — WebRTC video calls and instant messaging for university communities.",
    domain: "campus · video + messaging",
    icon: "video",
    technologies: ["Next.js", "Hono.js", "PostgreSQL", "WebRTC", "Socket.IO"],
    link: "https://github.com/Mahir-o4/UniVibe",
  },
  {
    title: "OuraCode",
    description:
      "Shared editor in the browser — multi-cursor coding with an integrated cloud terminal and context-aware AI assist.",
    domain: "devtools · live collab",
    icon: "terminal",
    technologies: ["React.js", "Express", "WebSocket", "Redis", "Docker"],
    link: "https://github.com/Mahir-o4/OuraCode",
  },
  {
    title: "Carbon Chat",
    description:
      "Everyday messenger — secure auth, media sharing, and live online presence.",
    domain: "consumer · chat + presence",
    icon: "chat",
    technologies: ["React.js", "Express", "MongoDB", "Socket.IO", "Cloudinary"],
    link: "https://github.com/Mahir-o4/carbon",
  },
  {
    title: "RAG Web",
    description:
      "Film-question engine — scouts the live web and answers movie queries with cited, real-time detail.",
    domain: "ai · web-grounded qa",
    icon: "film",
    technologies: ["Python", "Ollama", "Streamlit", "GenAI"],
    link: "https://github.com/Mahir-o4/RAG_Web",
  },
];

export default function ProjectsSection() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 64, filter: "blur(12px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, delay, ease: EASE } satisfies Transition,
  });

  return (
    <section id="work" className="py-24 md:py-36 relative cv-auto">
      {/* Architect art first (Work beams, ink, scroll glow) */}
      <SectionDraft section="work" variant="beam" tone="ink" />

      {/* Faint neutral wash behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:             "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Drafting grid — ink theme */}
      <div className="absolute inset-0 pointer-events-none texture-grid-ink" aria-hidden="true" />

      <div className="container-page relative">
        {/* Sheet header: eyebrow badge + rule + path code */}
        <motion.div {...reveal(0)} className="flex items-center gap-3 mb-8">
          <span className="eyebrow eyebrow-ink">
            @work
          </span>
          <span className="h-px flex-1 max-w-12 bg-[rgba(255,255,255,0.25)]" />
          <span className="ml-auto code-text text-xs" style={{ color: "var(--text-dim)" }}>
            ~/work
          </span>
        </motion.div>

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
            className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full border border-[rgba(255,255,255,0.22)] code-text text-xs transition-[border-color,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#FFFFFF] active:scale-[0.98]"
            style={{ color: "var(--text-muted)" }}
          >
            <span>view all</span>
            <span className="btn-circle btn-circle-ink size-6!">
              <ArrowUpRight size={13} strokeWidth={1.5} />
            </span>
          </a>
        </motion.div>

        {/* Top rule — draws itself */}
        <motion.div
          initial={reduced ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rule-accent mb-0"
          aria-hidden="true"
        />

        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.32, 0.72, 0, 1] }}
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
