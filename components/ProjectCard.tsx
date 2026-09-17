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
      className="project-row block py-8 md:py-11 px-2 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="grid grid-cols-[48px_1fr] md:grid-cols-[64px_1fr_220px] gap-6 md:gap-8 items-center">

        {/* Number */}
        <span
          className="type-display self-start pt-1 font-bold text-lg md:text-2xl transition-colors duration-200"
          style={{
            color: hovered ? "var(--accent)" : "#64748b",
            lineHeight: 1,
          }}
        >
          {num}
        </span>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className="type-heading text-xl sm:text-2xl md:text-3xl transition-colors duration-200"
              style={{
                color: hovered ? "var(--accent)" : "#f8fafc",
              }}
            >
              {title}
            </h3>
            <ArrowUpRight
              size={18}
              className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[var(--accent)] transition-all duration-200"
            />
          </div>

          <p className="text-sm sm:text-base text-[#cbd5e1] font-sans font-normal leading-relaxed mb-4 max-w-[58ch]">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span
                key={t}
                className="code-text text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[#cbd5e1] font-medium transition-colors group-hover:border-white/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Preview — clip-path reveal on hover, desktop only */}
        <div
          className="hidden md:block relative w-full h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 bg-[#111420]"
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
              width={220}
              height={128}
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
