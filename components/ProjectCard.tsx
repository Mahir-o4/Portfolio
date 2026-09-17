"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectRowProps {
  index: number;
  title: string;
  description: string;
  gifSrc: string;
  technologies: string[];
  link: string;
}

export default function ProjectCard({
  index,
  title,
  description,
  gifSrc,
  technologies,
  link,
}: ProjectRowProps) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const played = useRef(false);

  // Measured numeral: counts 00 → index+1 once, on first view.
  // Motionvalue-driven (no scroll listener, no per-frame React state).
  const numeral = useMotionValue(0);
  const numeralText = useTransform(numeral, (v) =>
    String(Math.round(v)).padStart(2, "0")
  );

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
      <div className="grid grid-cols-1 md:grid-cols-[88px_1fr_240px] gap-4 md:gap-10 items-start md:items-center">

        {/* Outline index numeral — fills on hover */}
        <motion.span
          className="type-display font-bold select-none"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1,
          }}
          onViewportEnter={() => {
            if (reduced || played.current) return;
            played.current = true;
            animate(numeral, index + 1, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
          }}
          viewport={{ once: true, amount: 0.6 }}
          aria-hidden="true"
        >
          <span
            className="transition-[color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
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
          <div className="flex items-center gap-3 mb-3">
            <h3
              className="type-heading tracking-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-3"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
                color: "var(--text)",
              }}
            >
              {title}
            </h3>
            <span className="btn-circle btn-circle-ink shrink-0 opacity-0 text-[#FFFFFF] transition-opacity duration-500 group-hover:opacity-100">
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

        {/* Preview — machined bezel shell, clip-path reveal on hover, desktop only */}
        <div className="bezel-ink hidden md:block w-full shrink-0">
          <div className="bezel-core-ink relative w-full h-36 overflow-hidden">
          {/* Registration ticks — the only place ticks appear */}
          <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[rgba(255,255,255,0.4)] z-10 pointer-events-none" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[rgba(255,255,255,0.4)] z-10 pointer-events-none" aria-hidden="true" />
          <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[rgba(255,255,255,0.4)] z-10 pointer-events-none" aria-hidden="true" />
          <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[rgba(255,255,255,0.4)] z-10 pointer-events-none" aria-hidden="true" />

          {/* Placeholder */}
          <div
            className="absolute inset-0 flex items-center justify-center code-text text-xs transition-opacity duration-300 font-medium"
            style={{ color: "var(--text-dim)", opacity: hovered ? 0 : 1 }}
          >
            hover to preview
          </div>

          {/* Clip-path reveal */}
          <motion.div
            className="absolute inset-0"
            initial={reduced ? {} : {
              clipPath: "inset(0 100% 0 0 round 16px)",
            }}
            animate={reduced ? {} : {
              clipPath: hovered ? "inset(0 0% 0 0 round 16px)" : "inset(0 100% 0 0 round 16px)",
            }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <Image
              src={gifSrc}
              alt={`${title} preview`}
              width={240}
              height={144}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
              unoptimized
            />
          </motion.div>
          </div>
        </div>
      </div>
    </a>
  );
}
