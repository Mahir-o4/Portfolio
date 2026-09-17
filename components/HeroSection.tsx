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

gsap.registerPlugin(ScrollTrigger);

// One master choreography: a pinned editorial sequence. Person holds the
// foreground, the name climbs behind them and yields upward, then the role
// statement rises in accent type with a CTA on either side. Scrub-driven,
// no autoplay, no decorative loops.
const SCROLL_DISTANCE = "600svh";

function useMagnetic(strength = 0.2) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 24 });
  const sy = useSpring(y, { stiffness: 240, damping: 24 });
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
  const { ref: ctaRef, sx, sy } = useMagnetic();

  const sectionRef = useRef<HTMLElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  // Pointer parallax runs only where a fine pointer exists.
  const canHover = useRef(false);
  useEffect(() => {
    canHover.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  // ── Critically Damped Mouse Parallax (Apple Physical Dynamics) ──
  // Lives on nested wrappers so it never fights the scrub transforms.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Background Text Parallax (moves opposite to pointer)
  const bgTextX = useSpring(useTransform(mouseX, [-0.5, 0.5], [14, -14]), {
    stiffness: 110,
    damping: 26,
  });
  const bgTextY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 110,
    damping: 26,
  });

  // Subject Cutout Parallax (moves subtly with pointer)
  const subjectX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 130,
    damping: 25,
  });
  const subjectY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 130,
    damping: 25,
  });

  // 3D Subject Tilt
  const tiltRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 160,
    damping: 26,
  });
  const tiltRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 160,
    damping: 26,
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

  // ── Master scroll choreography ──
  // progress 0.00 → person alone on an empty stage
  // progress 0.15 → "SK MAHIR" rises from below, behind the person
  // progress 0.40 → "ASHEF" rises to complete the name
  // progress 0.55 → the name exits upward and out as one block
  // progress 0.62 → role statement + flanking CTAs rise into place
  // progress 1.00 → final composition, sticky releases
  useGSAP(
    () => {
      if (reduced) {
        // Static final composition: name out, role and CTAs in place.
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
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // Person holds foreground: barely-there scale and lift.
      tl.fromTo(
        personRef.current,
        { scale: 1, y: 0 },
        { scale: 1.045, y: -20, duration: 1 },
        0
      );

      // Scroll cue bows out immediately.
      tl.fromTo(cueRef.current, { opacity: 1 }, { opacity: 0, duration: 0.06 }, 0);

      // The name climbs up from below, behind the silhouette.
      // Viewport-relative travel so layers fully clear the frame on
      // every breakpoint (percent-of-self can't guarantee that).
      const below = () => window.innerHeight;
      const above = () => -window.innerHeight * 1.2;
      tl.fromTo(line1Ref.current, { y: below }, { y: 0, duration: 0.25 }, 0.15);
      tl.fromTo(line2Ref.current, { y: below }, { y: 0, duration: 0.15 }, 0.4);

      // The completed name exits upward and out as a single rigid block.
      tl.to(line1Ref.current, { y: above, duration: 0.3 }, 0.55);
      tl.to(line2Ref.current, { y: above, duration: 0.3 }, 0.55);

      // The role statement rises with a CTA riding on either side.
      // Vertical travel carries the block; opacity only assists late.
      tl.fromTo(
        roleRef.current,
        { y: () => window.innerHeight * 0.75, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.26 },
        0.62
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-x-clip bg-[#08080a]"
      style={{ height: SCROLL_DISTANCE }}
    >
      {/* ── Pinned Full-Screen Stage ─────────────────────────── */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">

        {/* ── Atmospheric Ambient Lighting ─────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full chiaroscuro-halo"
            aria-hidden="true"
          />
          {/* Subtle bottom fade into page background */}
          <div
            className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
            style={{ background: "linear-gradient(to top, #08080a 20%, transparent 100%)" }}
          />
        </div>

        {/* ── BACK LAYER: Giant Name (climbs, then yields upward) ── */}
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
                style={{ fontSize: "clamp(4.8rem, 15.5vw, 18.5rem)" }}
              >
                SK MAHIR
              </div>
            </div>
            <div ref={line2Ref} className="-mt-[2.5vw] md:-mt-[4vw] will-change-transform" style={{ transform: "translateY(100vh)" }}>
              <div
                className="text-giant-bg"
                style={{ fontSize: "clamp(4.8rem, 15.5vw, 18.5rem)" }}
              >
                ASHEF
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── ROLE LAYER: Accent Statement + Flanking CTAs ── */}
        <div className="absolute inset-0 z-[5] pointer-events-none select-none overflow-hidden">
          <div ref={roleRef} className="relative w-full h-full will-change-transform" style={{ transform: "translateY(75vh)", opacity: 0 }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2
                className="text-giant-bg"
                style={{
                  fontSize: "clamp(2.5rem, 9vw, 11rem)",
                  color: "var(--accent)",
                  textShadow: "0 12px 50px rgba(0, 0, 0, 0.85)",
                }}
              >
                <span className="block">AI ENGINEER</span>
                <span className="block -mt-[1vw]">FULL-STACK</span>
                <span className="block -mt-[1vw]">ARCHITECT</span>
              </h2>
            </div>
            {/* CTAs ride with the role block: flanks on desktop, one docked row on mobile */}
            <div className="absolute inset-x-0 bottom-28 flex items-center justify-center gap-3 pointer-events-none md:contents">
            <div className="md:absolute md:left-12 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
              <motion.a
                ref={ctaRef}
                href="#contacts"
                style={{ x: sx, y: sy }}
                className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[var(--accent)] text-[#06080b] font-semibold text-xs transition-all duration-300 hover:shadow-[0_0_24px_rgba(61,252,202,0.4)] active:scale-[0.97]"
                aria-label="Get in touch"
                id="hero-cta"
              >
                <span>Let&apos;s talk</span>
                <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </span>
              </motion.a>
            </div>
            <div className="md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
              <a
                href="#work"
                className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-[#cbd5e1] hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 active:scale-[0.97]"
              >
                View Work
              </a>
            </div>
            </div>
          </div>
        </div>

        {/* ── FRONT LAYER: Uncarded Transparent PNG Cutout ── */}
        <div ref={personRef} className="relative z-10 will-change-transform">
          <motion.div
            className="relative flex items-end justify-center pointer-events-none select-none h-[100svh] pb-0 will-change-transform"
            style={{
              x: reduced ? 0 : subjectX,
              y: reduced ? 0 : subjectY,
              perspective: 1200,
              rotateX: reduced ? 0 : tiltRotateX,
              rotateY: reduced ? 0 : tiltRotateY,
            }}
          >
            {/* Transparent cutout, no frame/box, ample headroom below navbar, gentle floor feather */}
            <div className="relative h-[78vh] max-h-[720px] aspect-[9/16] sm:aspect-[10/16] md:h-[86vh] md:max-h-[820px] md:aspect-[3/4] mb-0 mask-feather-bottom">
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

        {/* ── Availability micro-label (static, no pulse) ── */}
        <div className="absolute left-6 md:left-12 bottom-7 z-20 pointer-events-none">
          <span className="code-text text-[10px] tracking-widest uppercase text-[#64748b]">
            Available for Q3/Q4
          </span>
        </div>

        {/* ── Scroll Cue (invites the sequence, then bows out) ──── */}
        <div
          ref={cueRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5"
        >
          <span className="code-text text-[10px] tracking-widest uppercase text-[#64748b]">
            Scroll
          </span>
          <motion.span
            animate={reduced ? {} : { transform: ["translateY(0px)", "translateY(6px)", "translateY(0px)"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex"
          >
            <ArrowDown size={14} className="text-[var(--accent)]" />
          </motion.span>
        </div>
      </div>
    </section>
  );
}
