"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const FLUID_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const navItems = [
  { id: "home", label: "#home" },
  { id: "about-me", label: "~about" },
  { id: "skills", label: "#skills" },
  { id: "work", label: "@work" },
  { id: "contacts", label: "#contact" },
];

const socials = [
  { href: "https://github.com/Mahir-o4/", icon: <Github size={16} strokeWidth={1.5} />, label: "GitHub" },
  { href: "https://x.com/skmahirashef04", icon: <Twitter size={16} strokeWidth={1.5} />, label: "Twitter" },
  { href: "https://www.linkedin.com/in/mahir-ashef-011776290/", icon: <Linkedin size={16} strokeWidth={1.5} />, label: "LinkedIn" },
];

export default function Header() {
  const activeSection = useActiveSection(navItems.map((i) => i.id));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  return (
    <>
      {/* ─── Fluid Island — one detached floating pill ─────────── */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <div
          className={`nav-pill pointer-events-auto flex items-center gap-1 rounded-full pl-2 pr-2 py-2 transition-[background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled ? "shadow-[0_24px_70px_-20px_rgba(22,19,14,0.35)]" : ""
          }`}
        >
          {/* Brand mark */}
          <a
            href="#home"
            aria-label="Mahir — home"
            className="group flex items-center gap-2.5 pl-2 pr-3 shrink-0"
          >
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-active:scale-[0.98]">
              <LogoIcon size={30} />
            </span>
            <span
              className="type-heading text-sm tracking-tight hidden sm:block"
              style={{ color: "var(--text)" }}
            >
              SK MAHIR ASHEF
            </span>
          </a>

          <span className="hidden md:block w-px h-6 bg-[rgba(22,19,14,0.12)]" aria-hidden="true" />

          {/* Centre links — desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Site sections">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className="relative text-sm px-5 py-2 rounded-full transition-colors duration-300 font-medium tracking-tight"
                  style={{
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#000000" }}
                      transition={{ type: "spring", stiffness: 350, damping: 37 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <span className="hidden md:block w-px h-6 bg-[rgba(22,19,14,0.12)]" aria-hidden="true" />

          {/* Socials — desktop */}
          <div className="hidden md:flex items-center gap-1 shrink-0 pr-1">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                className="group size-9 rounded-full flex items-center justify-center text-[#4A463D] transition-colors duration-300 hover:text-[#000000] hover:bg-[rgba(22,19,14,0.06)] active:scale-[0.98]"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Mobile hamburger — morphs to X */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((p) => !p)}
            className="md:hidden relative flex items-center justify-center size-10 rounded-full shrink-0 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[rgba(22,19,14,0.06)] active:scale-[0.98]"
          >
            <motion.span
              className="absolute block w-5 h-[1.5px] rounded-full"
              style={{ backgroundColor: "var(--text)" }}
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
              transition={{ duration: 0.45, ease: FLUID_EASE }}
            />
            <motion.span
              className="absolute block w-5 h-[1.5px] rounded-full"
              style={{ backgroundColor: "var(--text)" }}
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
              transition={{ duration: 0.45, ease: FLUID_EASE }}
            />
          </button>
        </div>
      </header>

      {/* ─── Mobile overlay — heavy glass + staggered mask reveal ─ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.03, backdropFilter: "blur(0px) saturate(100%)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, backdropFilter: "blur(32px) saturate(160%)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.015, backdropFilter: "blur(0px) saturate(100%)" }}
            transition={{ duration: 0.5, ease: FLUID_EASE }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8 min-h-dvh will-change-transform"
            style={{
              backgroundColor: "rgba(243, 240, 233, 0.82)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {navItems.map((item, i) => (
              <span key={item.id} className="block overflow-hidden border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <motion.a
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: FLUID_EASE }}
                  className="type-heading py-4 flex items-center justify-between"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 3rem)",
                    color: "var(--text)",
                  }}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#000000] text-[#FFFFFF] font-mono">
                      active
                    </span>
                  )}
                </motion.a>
              </span>
            ))}
            <motion.div
              className="flex gap-5 mt-10"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: FLUID_EASE }}
            >
              {socials.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#4A463D] transition-colors duration-300 hover:text-[#000000]"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
