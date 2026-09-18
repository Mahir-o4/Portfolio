"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroDraft from "@/components/arch/HeroDraft";
import { useIsDesktop } from "@/hooks/useIsDesktop";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_DISTANCE = "600svh";

function useMagnetic(strength = 0.2) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 30 });
  const sy = useSpring(y, { stiffness: 240, damping: 30 });
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, strength]);

  return { ref, sx, sy };
}

export default function HeroSection() {
  const reduced = useReducedMotion();
  const isMobile = useIsDesktop() === false;
  const { ref: ctaRef, sx, sy } = useMagnetic();

  const sectionRef = useRef<HTMLElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const canHover = useRef(false);
  useEffect(() => {
    canHover.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgTextX = useSpring(useTransform(mouseX, [-0.5, 0.5], [14, -14]), {
    stiffness: 150,
    damping: 27,
  });
  const bgTextY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 27,
  });

  const subjectX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 170,
    damping: 26,
  });
  const subjectY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 170,
    damping: 26,
  });

  const tiltRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 200,
    damping: 27,
  });
  const tiltRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 200,
    damping: 27,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !canHover.current) return;
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  useGSAP(
    () => {
      if (reduced) {
        gsap.set(line1Ref.current, { y: () => -window.innerHeight * 1.2 });
        gsap.set(line2Ref.current, { y: () => -window.innerHeight * 1.2 });
        gsap.set(roleRef.current, { y: 0, opacity: 1 });
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? 0.6 : 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        personRef.current,
        { scale: 1, y: 0 },
        { scale: 1.045, y: -20, duration: 0.35 },
        0
      );

      tl.fromTo(cueRef.current, { opacity: 1 }, { opacity: 0, duration: 0.06 }, 0);

      const below = () => window.innerHeight;
      const above = () => -window.innerHeight * 1.2;
      tl.fromTo(line1Ref.current, { y: below }, { y: 0, duration: 0.2 }, 0.03);
      tl.fromTo(line2Ref.current, { y: below }, { y: 0, duration: 0.13 }, 0.14);

      tl.to(line1Ref.current, { y: above, duration: 0.2 }, 0.42);
      tl.to(line2Ref.current, { y: above, duration: 0.2 }, 0.42);

      tl.fromTo(
        roleRef.current,
        { y: () => window.innerHeight * 0.75, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.18 },
        0.52
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced, isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-x-clip"
      style={{
        height: isMobile ? "300svh" : SCROLL_DISTANCE,
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden flex items-center justify-center">

        <HeroDraft />

        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            initial={reduced ? { opacity: 0.7 } : { opacity: 0, transform: "scale(0.96)" }}
            animate={{ opacity: 0.7, transform: "scale(1)" }}
            transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-180 rounded-full chiaroscuro-halo"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
            style={{ background: "linear-gradient(to top, var(--bg) 20%, transparent 100%)" }}
          />
        </div>

        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
          <motion.div
            className="w-full text-center px-4 pt-10 will-change-transform"
            style={{
              x: reduced ? 0 : bgTextX,
              y: reduced ? 0 : bgTextY,
            }}
          >
            <div ref={line1Ref} className="will-change-transform" style={{ transform: "translateY(100vh)" }}>
              <div
                className="text-giant-bg"
                style={{ fontSize: "clamp(4.8rem, 13vw, 16rem)" }}
              >
                SK MAHIR
              </div>
            </div>
            <div ref={line2Ref} className="mt-[-1.5vw] md:mt-[-2.0vw] will-change-transform" style={{ transform: "translateY(100vh)" }}>
              <div
                className="text-giant-bg"
                style={{ fontSize: "clamp(4.8rem, 13vw, 16rem)" }}
              >
                ASHEF
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-5 pointer-events-none select-none overflow-hidden">
          <div ref={roleRef} className="relative size-full will-change-transform" style={{ transform: "translateY(75vh)", opacity: 0 }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-md:justify-start max-md:pt-[11svh]">
              <h2
                className="text-giant-bg"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 11rem)",
                }}
              >
                <span className="block">AI ENGINEER</span>
                <span className="block mt-[-1vw]">FULL-STACK</span>
                <span className="block mt-[-1.5vw]">DEVELOPER</span>
              </h2>
            </div>
            <div className="absolute inset-x-0 bottom-[calc(7rem+env(safe-area-inset-bottom,0px))] flex items-center justify-center gap-3 pointer-events-none md:contents">
            <div className="md:absolute md:left-12 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
              <motion.a
                ref={ctaRef}
                href="#contacts"
                style={{ x: sx, y: sy }}
                className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-[#000000] text-[#F3F0E9] font-semibold text-sm transition-[box-shadow,background-color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_24px_60px_-18px_rgba(22,19,14,0.45)] active:scale-[0.98]"
                aria-label="Get in touch"
                id="hero-cta"
              >
                <span>Let&apos;s talk</span>
                <span className="btn-circle">
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </span>
              </motion.a>
            </div>
            <div className="md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full border border-[rgba(22,19,14,0.16)] bg-transparent text-sm font-medium text-[#4A463D] hover:text-[#000000] hover:border-[#000000] hover:bg-[rgba(22,19,14,0.05)] transition-[border-color,background-color,color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                <span>View Work</span>
                <span className="btn-circle btn-circle-ghost">
                  <ArrowDown size={14} strokeWidth={1.5} />
                </span>
              </a>
            </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[32%] z-9 pointer-events-none hero-floor-shadow" aria-hidden="true" />

        <div ref={personRef} className="relative z-10 will-change-transform">
          <motion.div
            className="relative flex items-end justify-center pointer-events-none select-none h-svh pb-0 will-change-transform"
            style={{
              x: reduced ? 0 : subjectX,
              y: reduced ? 0 : subjectY,
              perspective: 1200,
              rotateX: reduced ? 0 : tiltRotateX,
              rotateY: reduced ? 0 : tiltRotateY,
            }}
          >
            <div className="relative h-[84svh] max-h-180 aspect-9/16 sm:aspect-10/16 md:h-[86vh] md:max-h-205 md:aspect-3/4 mb-0 mask-feather-bottom">
              <Image
                src="/myimage.png"
                alt="Sk Mahir Ashef"
                fill
                priority
                unoptimized
                onLoad={() => ScrollTrigger.refresh()}
                className="object-contain object-bottom filter contrast-[1.03] brightness-[1.02]"
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute left-6 md:left-12 bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] z-20 pointer-events-none">
          <span className="code-text text-[10px] tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
            Available for Q1–Q4
          </span>
        </div>

        <div
          ref={cueRef}
          className="absolute bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5"
        >
          <span className="code-text text-[10px] tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
            Scroll
          </span>
          <motion.span
            animate={reduced ? {} : { transform: ["translateY(0px)", "translateY(6px)", "translateY(0px)"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            <ArrowDown size={14} strokeWidth={1.5} className="text-[#000000]" />
          </motion.span>
        </div>
      </div>
    </section>
  );
}
