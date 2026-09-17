"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { id: "home",     label: "#home" },
  { id: "about-me", label: "~about" },
  { id: "skills",   label: "#skills" },
  { id: "work",     label: "@work" },
  { id: "contacts", label: "#contact" },
];

export default function Header() {
  const activeSection = useActiveSection(navItems.map((i) => i.id));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

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
      {/* ─── Top bar ─────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${scrolled ? "py-3 bg-black/40 backdrop-blur-md" : "py-5 md:py-6"}`}>

        {/* Logo Lockup */}
        <a
          href="#home"
          aria-label="Mahir — home"
          className="flex items-center gap-3.5 shrink-0 group"
        >
          <div className="flex flex-col">
            <span className="type-heading text-base md:text-xl tracking-tight text-[#f8fafc] group-hover:text-(--accent) transition-colors">
              MAHIR ASHEF
            </span>
          </div>
        </a>

        {/* Centre pill nav — desktop */}
        <nav
          className="hidden md:flex items-center gap-1.5 rounded-full px-2.5 py-2 nav-pill"
          aria-label="Site sections"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className="relative code-text text-sm px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                style={{
                  color: isActive ? "#08090d" : "var(--text-secondary)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right — socials */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {[
            { href: "https://github.com/Mahir-o4/", icon: <Github size={17} />, label: "GitHub" },
            { href: "https://x.com/skmahirashef04", icon: <Twitter size={17} />, label: "Twitter" },
            { href: "https://www.linkedin.com/in/mahir-ashef-011776290/", icon: <Linkedin size={17} />, label: "LinkedIn" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-[#cbd5e1] transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:scale-105 active:scale-95"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((p) => !p)}
          className="md:hidden flex flex-col gap-2 p-3 rounded-lg border border-white/10 bg-white/5"
        >
          <motion.span
            className="block w-6 h-0.5"
            style={{ backgroundColor: "var(--text)" }}
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          />
          <motion.span
            className="block w-6 h-0.5"
            style={{ backgroundColor: "var(--text)" }}
            animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-6 h-0.5"
            style={{ backgroundColor: "var(--text)" }}
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          />
        </button>
      </header>

      {/* ─── Mobile overlay ───────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8"
            style={{ backgroundColor: "var(--bg)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="type-heading py-4 border-b flex items-center justify-between"
                style={{
                  fontSize: "clamp(2rem, 8vw, 3rem)",
                  color: activeSection === item.id ? "var(--accent)" : "var(--text)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent)] text-black font-mono">
                    active
                  </span>
                )}
              </motion.a>
            ))}
            <motion.div
              className="flex gap-5 mt-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.28 }}
            >
              <a href="https://github.com/Mahir-o4/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#cbd5e1] hover:text-[var(--accent)]"><Github size={22} /></a>
              <a href="https://x.com/skmahirashef04" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[#cbd5e1] hover:text-[var(--accent)]"><Twitter size={22} /></a>
              <a href="https://www.linkedin.com/in/mahir-ashef-011776290/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#cbd5e1] hover:text-[var(--accent)]"><Linkedin size={22} /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
