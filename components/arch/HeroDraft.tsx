"use client";

import { useEffect, useRef } from "react";

// Hero-minimal: one wide shallow elliptical vault ring floating high in the
// stage, clear of the portrait. Static, no motion, no grid.
export default function HeroDraft() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const paint = () => {
      const coarse =
        window.matchMedia?.("(pointer: coarse)").matches ?? false;
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5);
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const w = Math.max(Math.round(rect.width * dpr), 2);
      const h = Math.max(Math.round(rect.height * dpr), 2);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      drawVault(ctx, w, h, dpr);
    };

    paint();
    let t: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (t) clearTimeout(t);
      t = setTimeout(paint, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (t) clearTimeout(t);
    };
  }, []);

  return (
    <div className="arch-layer arch-mask-hero" aria-hidden="true">
      <div className="arch-base">
        <canvas ref={ref} />
      </div>
    </div>
  );
}

function drawVault(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
) {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(22, 19, 14, 0.07)";
    ctx.lineWidth = dpr;

    // Shallow elliptical vault — crown guaranteed in-frame:
    // crown = springY - ry stays positive by construction.
    const cx = w * 0.5;
    const rx = w * 0.38;
    const ry = h * 0.16;
    const springY = h * 0.52;
    const baseY = h * 0.78;

    // Double vault ring (upper ellipses only).
    ctx.beginPath();
    ctx.ellipse(cx, springY, rx, ry, 0, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(
      cx,
      springY,
      Math.max(rx - 9 * dpr, 2),
      Math.max(ry - 9 * dpr, 2),
      0,
      Math.PI,
      0,
    );
    ctx.stroke();

    // Jambs — meet the ring where the ellipse passes overhead.
    const jx = w * 0.2;
    const jy = springY - ry * Math.sqrt(Math.max(1 - (jx / rx) ** 2, 0));
    for (const sx of [-1, 1]) {
      const x = cx + sx * jx;
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x, jy);
      ctx.stroke();
    }

    // Threshold — twin ground rules.
    ctx.beginPath();
    ctx.moveTo(w * 0.14, baseY);
    ctx.lineTo(w * 0.86, baseY);
    ctx.moveTo(w * 0.2, baseY + 10 * dpr);
    ctx.lineTo(w * 0.8, baseY + 10 * dpr);
    ctx.stroke();
}
