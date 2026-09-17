"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const NewsArticles = dynamic(() => import("@/components/NewsArticles"), {
  ssr: false,
});

export default function Home() {
  const isDesktop = useIsDesktop();

  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg)", overflowX: "clip" }}
    >
      {/* === Ambient atmosphere layers (CSS only, no WebGL) === */}

      {/* Purple/indigo glow — hero right */}
      <div
        className="fixed pointer-events-none"
        style={{
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse 65% 55% at 78% 35%, rgba(88, 28, 202, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 65% 50%, rgba(55, 48, 163, 0.20) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 15% 80%, rgba(61, 252, 202, 0.05) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle noise grain */}
      <div
        className="fixed pointer-events-none"
        style={{
          inset: 0,
          zIndex: 1,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
        aria-hidden="true"
      />

      {/* === Page content === */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        {isDesktop && <NewsArticles />}
        <Footer />
      </div>
    </main>
  );
}
