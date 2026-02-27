"use client";

import { useEffect, useState } from "react";
import TextType from "./TextType";
import SplitText from "./SplitText";
import QuoteCard from "./QuoteCard";
import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen md:ml-20 pt-20 md:pt-24 flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <div className={`${isVisible ? "slide-in-left" : "opacity-0"}`}>
            {/* Main Heading */}
            <div className="py-8 min-w-screen text-center md:text-left">
              <SplitText
                text="Sk Mahir Ashef"
                className="text-[40px] md:text-5xl font-extrabold text-center text-[#9D00FF]"
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
                className="text-2xl md:text-4xl font-semibold text-slate-100"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
              />
            </div>

            {/* Description */}
            <div className="text-slate-100 p-4 md:p-8 code-text mt-5 md:mt-8 mb-8 md:mb-10 leading-relaxed max-w-lg rounded-md">
              <QuoteCard />
            </div>

            {/* Contact Button */}
            <a
              href="#contacts"
              className="inline-block px-5 md:px-6 py-2.5 md:py-3 border border-accent-purple text-slate-100 bg-slate-950/70 hover:text-[#00d9ff] active:scale-95 active:text-[#00d9ff] transition-all duration-200 code-text text-xs md:text-sm font-semibold transform hover:scale-105"
            >
              &gt; Contact me !!
            </a>
          </div>

          {/* Right Content - Decorative */}
          <div
          title="Hello There!! ~Pikachu"
            className={`relative ${isVisible ? "slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative w-94 h-72 md:w-120 md:h-106 mx-auto">
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute -inset-24 md:-inset-20 md:left-8 top-8 left-16">
                  <Spline
                    scene="https://prod.spline.design/BDKt1U0VJWvVasvk/scene.splinecode"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-5 right-0 w-10 h-10 md:w-16 md:h-16 border border-[#B026FF]/70"></div>
              <div className="absolute bottom-10 w-12 h-12 md:w-20 md:h-20 border border-[#B026FF]/70"></div>
              <div className="absolute top-56 md:top-80 right-4 w-20 h-20 md:w-32 md:h-32 border border-[#B026FF]/80"></div>
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-0 md:bottom-1 left-40 md:left-52 transform -translate-x-1/2 bg-slate-950/85 border border-accent/60 px-3 md:px-6 py-2 md:py-3 code-text text-xs md:text-sm z-20 ">
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
