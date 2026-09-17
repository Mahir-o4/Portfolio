"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
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
  const num = String(index + 1).padStart(2, "0");

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

        {/* Giant index numeral */}
        <span
          className="type-display font-bold transition-colors duration-200 select-none"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: hovered ? "var(--accent)" : "#3a4358",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Title + description + stack line */}
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <h3
              className="type-heading transition-colors duration-200 tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
                color: hovered ? "var(--accent)" : "#f8fafc",
              }}
            >
              {title}
            </h3>
            <ArrowUpRight
              size={26}
              strokeWidth={2}
              className="shrink-0 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[var(--accent)] transition-all duration-200"
            />
          </div>

          <p className="text-sm sm:text-base text-[#cbd5e1] font-sans font-normal leading-relaxed mb-4 max-w-[60ch]">
            {description}
          </p>

          <p className="code-text text-xs text-[#64748b] tracking-wide">
            {technologies.join("  ·  ")}
          </p>
        </div>

        {/* Preview — clip-path reveal on hover, desktop only */}
        <div
          className="hidden md:block relative w-full h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#111420]"
        >
          {/* Placeholder */}
          <div
            className="absolute inset-0 flex items-center justify-center code-text text-xs text-[#94a3b8] transition-opacity duration-300 font-medium"
            style={{ opacity: hovered ? 0 : 1 }}
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
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={gifSrc}
              alt={`${title} preview`}
              width={240}
              height={144}
              className="w-full h-full object-cover"
              unoptimized
            />
            {/* Ambient overlay on hover image */}
            <div
              className="absolute inset-0 rounded-2xl bg-[var(--accent)]/10"
            />
          </motion.div>
        </div>
      </div>
    </a>
  );
}
