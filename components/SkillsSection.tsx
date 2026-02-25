"use client";

import { useEffect, useState } from "react";
import { FaPython, FaJava, FaCss3Alt } from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiC

} from "react-icons/si";
import { FaHtml5 } from "react-icons/fa6";
import LogoLoop from "./LogoLoop";

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();


  const skillCategories = [
    { node: <FaPython />, title: "Python", href: "https://www.python.org/" },
    {node: <FaJava />, title: "Java", href:"https://www.java.com/en/"},
    {node: <SiC />, title: "C", href:"https://www.c-language.org/"},
    {node: <FaHtml5 />, title: "HTML", href:"https://developer.mozilla.org/en-US/docs/Web/HTML"},
    {node: <FaCss3Alt />, title: "CSS", href:"https://developer.mozilla.org/en-US/docs/Web/CSS"},
    {node: <SiJavascript />, title: "JavaScript", href:"https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript"},
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  return (
    <section ref={ref} id="skills" className="py-20 ml-20 relative">
      <div className={`max-w-6xl mx-auto px-8 ${isVisible ? "scale-in" : "opacity-0"}`} style={{ animationDelay: '0.2s' }}>
        {/* Section Header */}
        <div className={`mb-16 `}>
          <div className="flex items-center gap-4 mb-4">
            <div className="accent-line-left"></div>
            <h2 className="text-4xl font-bold text-accent-cyan">
              #skills
            </h2>
          </div>
          <p className="text-slate-400 text-xl ml-8 mt-2 text-accent">
            Technologies I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className={`w-full ${isVisible ? "slide-in-up": "opacity-0"}`} style={{animationDelay: '0.2s'}}>
          <LogoLoop
            logos={skillCategories}
            speed={100}
            direction="left"
            logoHeight={100}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#01040f"
            ariaLabel="skills"
          />
        </div>
      </div>
    </section>
  );
}
