"use client";

import { useEffect, useState } from "react";
import TextType from "./TextType";
import SplitText from "./SplitText";
import QuoteCard from "./QouteCard";


export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen ml-20 pt-24 flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`${isVisible ? "slide-in-left" : "opacity-0"}`}
          >
            {/* Main Heading */}
            <div className="py-8">
            <SplitText
              text="Sk Mahir Ashef"
              className="text-6xl md:text-5xl font-extrabold text-center text-[#9D00FF]"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            </div>
            <div className="mb-6">
            <TextType
              text={["Hello There", "Let's Build Something"]}
              className="text-4xl md:text-4xl font-semibold text-slate-100"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
            </div>

            {/* Description */}
            <div className="text-slate-100 p-8 code-text mt-8 mb-10 leading-relaxed max-w-lg rounded-md">
                  <QuoteCard />
            </div>

            {/* CTA Button */}
            <a
              href="#contacts"
              className="inline-block px-6 py-3 border border-accent-purple text-slate-100 bg-slate-950/70 hover:bg-accent-purple hover:text-slate-600 active:scale-95 transition-all duration-200 code-text text-sm font-semibold transform hover:scale-105"
            >
              &gt; Contact me !!
            </a>
          </div>

          {/* Right Content - Decorative */}
          <div
            className={`relative ${isVisible ? "slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative h-96 w-96 mx-auto flex items-center justify-center">
              {/* Avatar Placeholder */}
              <div className="relative z-10">
                <div className="w-48 h-64 bg-linear-to-b from-slate-700 to-slate-900 rounded-lg flex items-center justify-center border border-accent-cyan/30 shadow-2xl">
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 right-0 w-16 h-16 border border-[#B026FF]/70"></div>
              <div className="absolute bottom-20 left-0 w-20 h-20 border border-[#B026FF]/70"></div>
              <div className="absolute top-70 right-4 w-32 h-32 border border-[#B026FF]/80"></div>
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-slate-950/85 border border-accent-purple/60 px-6 py-3 code-text text-sm">
              <span className="text-accent-purple">■</span>
              <span className="text-slate-100 ml-2">Currently working on</span>
              <span className="text-accent-cyan ml-2">Portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
