import BrandLogo from "@/components/BrandLogo";
import ContactForm from "./ContactForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 70%, rgba(99, 102, 241, 0.12) 0%, transparent 65%),
            radial-gradient(ellipse 45% 45% at 50% 85%, rgba(61, 252, 202, 0.08) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="code-text text-xs text-[var(--accent)] font-mono">
            #contact
          </span>
          <span className="w-12 h-px bg-white/15" />
          <span className="code-text text-xs text-[#94a3b8] uppercase tracking-wider">
            Let&apos;s Connect
          </span>
        </div>

        {/* Brandmark Emblem Token */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-3 rounded-2xl bg-[var(--accent)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" aria-hidden="true" />
            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-[#0d0f18] border border-white/15 shadow-2xl group-hover:scale-105 transition-transform duration-300">
              <BrandLogo size={36} />
            </div>
          </div>
          <p className="code-text text-xs text-[#94a3b8] mt-3 tracking-wider uppercase">
            Sk Mahir Ashef • AI Systems Architecture
          </p>
        </div>

        {/* Giant headline — centered */}
        <div className="text-center mb-8">
          <h2
            className="type-display"
            style={{
              fontSize: "clamp(3.5rem, 8.5vw, 8.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="text-[#f8fafc]">Let&apos;s build</span>
            <br />
            <span style={{ color: "var(--accent)" }}>
              something.
            </span>
          </h2>
        </div>

        {/* Email — large, centered */}
        <div className="text-center mb-16">
          <a
            href="mailto:skmahirashef04@gmail.com"
            className="type-heading inline-flex items-center gap-2 group text-base sm:text-xl md:text-2xl text-[#cbd5e1] hover:text-[var(--accent)] transition-colors duration-200"
          >
            skmahirashef04@gmail.com
            <span className="code-text text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--accent)]">
              ↗
            </span>
          </a>
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto mb-20">
          <ContactForm />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-white/10">
          <p className="code-text text-xs text-[#94a3b8]">
            © {year} Sk Mahir Ashef • Engineered with Next.js & React
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: "https://github.com/Mahir-o4", label: "github ↗" },
              { href: "https://www.linkedin.com/in/mahir-ashef-011776290/", label: "linkedin ↗" },
              { href: "https://x.com/skmahirashef04", label: "twitter ↗" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="code-text text-xs text-[#94a3b8] hover:text-[var(--accent)] transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
