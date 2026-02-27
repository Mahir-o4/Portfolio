"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="md:ml-20 bg-linear-to-b from-slate-900 to-slate-950 border-t border-slate-700/30 py-10 md:py-16 mt-8"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10 md:mb-12">
          {/* Left Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-accent-purple code-text mb-4">
              ◇ MAHIR
            </h3>
            <p className="text-slate-400 text-xs md:text-sm code-text mb-5 md:mb-6 leading-relaxed">
              An AI fanatic building gorgeous frontends, wrestling with GenAI,
              and quietly praying my backend architecture doesn't spontaneously
              catch fire.
            </p>
          </div>

          {/* Right Section - Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 md:gap-8">
            <div>
              <h4 className="text-slate-100 font-semibold mb-3 md:mb-4 code-text text-sm md:text-base">
                quick_links
              </h4>
              <ul className="space-y-1.5 md:space-y-2 code-text text-xs md:text-sm">
                <li>
                  <a
                    href="#home"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; home
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; work
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; skills
                  </a>
                </li>
                <li>
                  <a
                    href="#about-me"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; about_me
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-3 md:mb-4 code-text text-sm md:text-base">
                social_links
              </h4>
              <ul className="space-y-1.5 md:space-y-2 code-text text-xs md:text-sm">
                <li>
                  <a
                    href="https://github.com/Mahir-o4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mahir-ashef-011776290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:skmahirashef04@gmail.com"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >
                    &gt; email
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/skmahirashef04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#00ff88] transition-colors"
                  >&gt; twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="card-minimal rounded-none p-5 md:p-8 border-l-4 border-accent-purple mb-10 md:mb-12">
          <h3 className="text-lg md:text-xl font-bold text-slate-100 code-text mb-3">
            ready to <span className="text-accent-cyan">collaborate</span>?
          </h3>
          <p className="text-slate-400 text-xs md:text-sm code-text mb-5 md:mb-6">
            Let's create something amazing together. Feel free to reach out!
          </p>
          <a
            href="mailto:skmahirashef04@gmail.com"
            className="inline-block px-4 md:px-6 py-2 border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-[#00ff88] code-text text-[11px] md:text-xs font-semibold transition-all active:text-[#00ff88]"
          >
            &lt;send message /&gt;
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/30 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center code-text text-[11px] md:text-xs text-slate-500">
            <p>© {currentYear} Mahir. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="https://github.com/Mahir-o4/Portfolio?tab=MIT-1-ov-file"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-cyan transition-colors"
              >
                github
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
