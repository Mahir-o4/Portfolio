"use client";

import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";
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
      <div className="fixed left-0 top-0 h-screen w-20 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-700/50 flex flex-col items-center py-8 gap-8 z-40">
        {/* Logo */}
        <div className="text-2xl font-bold text-accent-purple border rounded-3xl border-[#B026FF] bg-black p-2">
          <Image src="/logo.jpg" alt="logo" width={26} height={26} />
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-5">
          <a
            href="https://github.com/Mahir-o4/"
            rel="noopener norefferer"
            target="_blank"
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
            title="GitHub"
          >
            <Github />
          </a>
          <a
            href="https://x.com/skmahirashef04"
            target="_blank"
            rel="noopener norefferer"
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
            title="Twitter"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/mahir-ashef-011776290/"
            target="_blank"
            rel="noopener norefferer"
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
            title="LinkedIn"
          >
            <Linkedin />
          </a>
        </div>
      </div>

      {/* Top Header */}
      <header className="fixed top-0 left-20 right-0 z-50 bg-linear-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-sm border-b border-slate-700/30">
        <nav className="max-w-full px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Branding */}
            <div className="flex items-center gap-2">
              <span className="text-accent-purple font-bold text-lg">
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
        </nav>
      </header>
    </>
  );
}
