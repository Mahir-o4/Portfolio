import LogoIcon from "@/components/LogoIcon";
import SectionDraft from "@/components/arch/SectionDraft";
import ContactForm from "./ContactForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "var(--panel)", color: "var(--panel-text)" }}
    >
      {/* Architect art first (colonnade, ink, static) */}
      <SectionDraft section="footer" variant="colonnade" tone="ink" />

      {/* Faint paper wash on the dark anchor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 70%, rgba(243, 240, 233, 0.05) 0%, transparent 65%)
          `,
        }}
        aria-hidden="true"
      />

      {/* ASCII colonnade elevation — decorative line art only */}
      <div className="absolute inset-x-0 top-[24%] flex justify-center pointer-events-none" aria-hidden="true">
        <pre className="ascii-elevation">{`            ________________________________________________
           /                                                \\
          |    ||        ||        ||        ||        ||    |
          |    ||        ||        ||        ||        ||    |
          |    ||        ||        ||        ||        ||    |
          |    ||        ||        ||        ||        ||    |
          |____||________||________||________||________||____|
          |==================================================|
         _|__________________________________________________|_
        |______________________________________________________|`}</pre>
      </div>
      <span className="sr-only">Classical colonnade line illustration</span>

      <div className="container-page relative">
        {/* Sheet header: eyebrow badge + rule + path code */}
        <div className="flex items-center gap-3 mb-12">
          <span className="eyebrow" style={{ borderColor: "rgba(243,240,233,0.25)", color: "var(--panel-muted)" }}>
            #contact
          </span>
          <span className="h-px flex-1 max-w-12 bg-[rgba(243,240,233,0.25)]" />
          <span className="code-text text-xs uppercase tracking-wider" style={{ color: "var(--panel-muted)" }}>
            Let&apos;s Connect
          </span>
          <span className="ml-auto code-text text-xs" style={{ color: "var(--panel-muted)" }}>
            ~/contact
          </span>
        </div>

        {/* Brandmark Emblem Token */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="group-hover:scale-105 transition-transform duration-300">
            <LogoIcon size={64} />
          </div>
          <p className="code-text text-xs mt-3 tracking-wider uppercase" style={{ color: "var(--panel-muted)" }}>
            Sk Mahir Ashef • AI Systems Engineering
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
            <span style={{ color: "var(--panel-text)" }}>Let&apos;s build</span>
            <br />
            <span style={{ color: "var(--panel-text)" }}>
              something.
            </span>
          </h2>
        </div>

        {/* Email — large, centered */}
        <div className="text-center mb-16">
          <a
            href="mailto:skmahirashef04@gmail.com"
            className="type-heading inline-flex items-center gap-3 group text-base sm:text-xl md:text-2xl transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ color: "var(--panel-text)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
          >
            skmahirashef04@gmail.com
            <span className="btn-circle btn-circle-ink code-text text-sm text-white">
              ↗
            </span>
          </a>
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto mb-20">
          <ContactForm />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-[rgba(243,240,233,0.15)]">
          <p className="code-text text-xs" style={{ color: "var(--panel-muted)" }}>
            © {year} Sk Mahir Ashef • Engineered with <br />
            hope, coffee & code
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
                className="code-text text-xs transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white"
                style={{ color: "var(--panel-muted)" }}
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
