"use client";

import Image from "next/image";
import { Github, Twitter, Linkedin, Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "#home" },
  { id: "about-me", label: "~about-me" },
  { id: "skills", label: "#skills" },
  { id: "work", label: "@work" },
  { id: "contacts", label: "#contacts" },
];

export default function Header() {
  const activeSection = useActiveSection(navItems.map((item) => item.id));
  const [isArtVis, setIsArtVis] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById("articles");
    if (!el) return;

    const obs = new IntersectionObserver(
      ([ent]) => setIsArtVis(ent.isIntersecting),
      { threshold: 0.45 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 hidden md:flex h-screen w-20 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-700/50 flex-col items-center py-8 gap-8 z-40">
        {/* Logo */}
        <div className="text-2xl font-bold text-accent-purple border rounded-3xl border-[#B026FF] bg-black p-2">
          <Image src="/logo.JPG" alt="logo" width={26} height={26} />
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-5">
          <a
            href="https://github.com/Mahir-o4/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
            title="GitHub"
          >
            <Github />
          </a>
          <a
            href="https://x.com/skmahirashef04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
            title="Twitter"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/mahir-ashef-011776290/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
            title="LinkedIn"
          >
            <Linkedin />
          </a>
        </div>
      </div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 md:left-20 right-0 z-50 bg-linear-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-sm border-b border-slate-700/30">
        <nav className="max-w-full px-4 md:px-8 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Branding */}
            <div className="flex items-center gap-2">
              <Image
                src="/logo.JPG"
                alt="logo"
                width={20}
                height={20}
                className="md:hidden rounded-full"
              />
              <span className="text-accent-purple font-bold text-base md:text-lg">
                ◇ Mahir
              </span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 code-text text-sm">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`transition-colors border-b-2 ${
                      isActive
                        ? "text-accent-cyan border-accent-cyan"
                        : "text-slate-300 border-transparent hover:text-[#00d9ff]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-slate-300 hover:text-[#00d9ff] transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* CTA Button */}
            <a
              href="#articles"
              title="Majik Btn"
              className={`
                ${isArtVis ? "text-[#00d9ff]": "text-slate-500"}
                hidden md:block px-4 py-2 border hover:bg-accent-purple hover:text-[#00d9ff] transition-all code-text text-xs font-semibold`}
            >
              &lt;/&gt;
            </a>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-3 rounded-md border border-slate-700/40 bg-slate-950/95 p-4">
              <div className="flex flex-col gap-3 code-text text-xs">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`transition-colors ${
                        isActive
                          ? "text-accent-cyan"
                          : "text-slate-300 hover:text-[#00d9ff]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center gap-4">
                <a
                  href="https://github.com/Mahir-o4/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-slate-400 hover:text-[#00d9ff] transition-colors"
                  title="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://x.com/skmahirashef04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#00d9ff] transition-colors"
                  title="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mahir-ashef-011776290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#00d9ff] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
