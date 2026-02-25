"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-20 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-700/50 flex flex-col items-center py-8 gap-8 z-40">
        {/* Logo */}
        <div className="text-2xl font-bold text-accent-purple">◆</div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <a
            href="#"
            className="text-slate-400 hover:text-accent-cyan transition-colors text-lg"
            title="GitHub"
          >
            ◯
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-accent-cyan transition-colors text-lg"
            title="Twitter"
          >
            @
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-accent-cyan transition-colors text-lg"
            title="LinkedIn"
          >
            ⌘
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
            <div className="hidden md:flex items-center gap-8 code-text text-sm">
              <a
                href="#home"
                className="text-slate-300 hover:text-accent-cyan transition-colors border-b-2 border-transparent hover:border-accent-cyan"
              >
                #home
              </a>
              <a
                href="#work"
                className="text-slate-300 hover:text-accent-cyan transition-colors border-b-2 border-transparent hover:border-accent-cyan"
              >
                @work
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-accent-cyan transition-colors border-b-2 border-transparent hover:border-accent-cyan"
              >
                ~about-me
              </a>
              <a
                href="#contacts"
                className="text-slate-300 hover:text-accent-cyan transition-colors border-b-2 border-transparent hover:border-accent-cyan"
              >
                #contacts
              </a>
            </div>

            {/* CTA Button */}
            <a
              href="#contacts"
              className="hidden md:block px-4 py-2 border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-slate-900 transition-all code-text text-xs font-semibold"
            >
              &lt;/&gt;
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
