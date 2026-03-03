"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";
import dynamic from "next/dynamic";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const NewsArticles = dynamic(() => import("@/components/NewsArticles"), {
  ssr: false,
});

export default function Home() {
  const isDesktop = useIsDesktop();
  return (
    <main className="relative min-h-screen">
      {isDesktop && (
        <div className="fixed inset-0 z-0 hidden md:block">
          <PixelBlast
            variant="diamond"
            pixelSize={4}
            color="#B19EEF"
            patternScale={2}
            patternDensity={2}
            pixelSizeJitter={1}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
          />
        </div>
      )}
      <div
        className="hidden md:block fixed inset-0 z-10 pointer-events-none bg-slate-950/60 backdrop-blur-[1px]"
        aria-hidden="true"
      ></div>
      <div
        className="fixed inset-0 z-10 pointer-events-none md:hidden bg-linear-to-b from-slate-950 via-slate-950/80 to-transparent"
        aria-hidden="true"
      ></div>
      <div className="relative z-20">
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
