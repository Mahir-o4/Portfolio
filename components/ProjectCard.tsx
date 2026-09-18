"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ArrowUpRight, Clapperboard, MessageCircle, Terminal, Video } from "lucide-react";

export type ProjectIcon = "video" | "terminal" | "chat" | "film";

const ICONS: Record<ProjectIcon, typeof Video> = {
  video: Video,
  terminal: Terminal,
  chat: MessageCircle,
  film: Clapperboard,
};

interface ProjectRowProps {
  index: number;
  title: string;
  description: string;
  domain: string;
  icon: ProjectIcon;
  technologies: string[];
  link: string;
}

export default function ProjectCard({
  index,
  title,
  description,
  domain,
  icon,
  technologies,
  link,
}: ProjectRowProps) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const played = useRef(false);
  const numeralRef = useRef<HTMLSpanElement>(null);

  const numeralInView = useInView(numeralRef, { once: true, amount: 0.6 });

  // Measured numeral: counts 00 → index+1 once, on first view.
  // Motionvalue-driven (no scroll listener, no per-frame React state).
  const numeral = useMotionValue(0);
  const numeralText = useTransform(numeral, (v) =>
    String(Math.round(v)).padStart(2, "0")
  );

  useEffect(() => {
    if (!numeralInView || played.current) return;
    played.current = true;
    if (reduced) {
      // Reduced motion: final value, no slide/count — never blank.
      numeral.set(index + 1);
      return;
    }
    const controls = animate(numeral, index + 1, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [numeralInView, reduced, numeral, index]);
  const Glyph = ICONS[icon];

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title}`}
      className="project-row block py-10 md:py-14 px-2 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-4 md:gap-10 items-start md:items-center">

        {/* Outline index numeral — fills on hover */}
        <motion.span
          ref={numeralRef}
          className="type-display font-bold select-none"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          <span
            className="transition-[color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={
              hovered
                ? { color: "#FFFFFF", WebkitTextStroke: "0px transparent" }
                : { color: "transparent", WebkitTextStroke: "1.5px #A8A29A" }
            }
          >
            <motion.span>{numeralText}</motion.span>
          </span>
        </motion.span>

        {/* Title + description + stack line */}
        <div className="min-w-0">
          {/* Domain eyebrow — glyph chip + arena tag, ink tokens only */}
          <div className="flex items-center gap-2 mb-3">
            <span className="btn-circle btn-circle-ink size-6!">
              <Glyph size={13} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="code-text text-[11px] uppercase" style={{ color: "var(--text-dim)", letterSpacing: "0.18em" }}>
              {domain}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <h3
              className="type-heading tracking-tight transition-[color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-3"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
                color: "var(--text)",
              }}
            >
              {title}
            </h3>
            <span className="btn-circle btn-circle-ink shrink-0 opacity-0 text-[#FFFFFF] transition-opacity duration-200 group-hover:opacity-100">
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </div>

          <p className="text-sm sm:text-base font-sans font-normal leading-relaxed mb-4 max-w-[60ch]" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>

          <p className="code-text text-xs tracking-wide" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "var(--text-dim)" }}>~/</span>
            {technologies.join("  ·  ")}
          </p>
        </div>
      </div>
    </a>
  );
}
