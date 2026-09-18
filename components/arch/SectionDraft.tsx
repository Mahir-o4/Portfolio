"use client";

import { useEffect, useRef } from "react";
import { motifFor, mulberry32, seedFor, type ArchVariant } from "@/lib/archSeed";

interface SectionDraftProps {
  section: string;
  variant: Exclude<ArchVariant, "hero-faint">;
  tone?: "paper" | "ink";
}

const STROKE: Record<string, string> = {
  paper: "rgba(22, 19, 14, 0.11)",
  ink: "rgba(255, 255, 255, 0.13)",
};

function vline(
  ctx: CanvasRenderingContext2D,
  x: number,
  y1: number,
  y2: number,
) {
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2);
  ctx.stroke();
}

function hline(
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  y: number,
) {
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
}

/** Diagonal hatch clipped to a rect — the classic cut-material poche. */
function hatch(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  step: number,
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.beginPath();
  for (let dx = x - h; dx < x + w; dx += step) {
    ctx.moveTo(dx, y + h);
    ctx.lineTo(dx + h, y);
  }
  ctx.stroke();
  ctx.restore();
}

/** Arcade elevation: columns + semicircular arches + keystones + entablature
 *  + stepped base with hatched core. */
function paintCut(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  bays: number,
  dpr: number,
) {
  const margin = w * 0.07;
  const springY = h * 0.3; // arch springing line
  const footY = h * 0.82; // column feet
  const xs: number[] = [];
  for (let i = 0; i < bays; i++) {
    xs.push(
      margin +
        ((w - margin * 2) * i) / Math.max(bays - 1, 1) +
        (rand() - 0.5) * w * 0.012,
    );
  }
  // Entablature — twin beams above the arcade.
  hline(ctx, margin * 0.6, w - margin * 0.6, h * 0.1);
  hline(ctx, margin * 0.6, w - margin * 0.6, h * 0.14);
  // Columns with base moldings.
  for (const x of xs) {
    vline(ctx, x, springY, footY);
    hline(ctx, x - 6 * dpr, x + 6 * dpr, footY);
  }
  // Arches + keystone ticks at each crown.
  for (let i = 0; i < xs.length - 1; i++) {
    const cx = (xs[i] + xs[i + 1]) / 2;
    const r = (xs[i + 1] - xs[i]) / 2;
    ctx.beginPath();
    ctx.arc(cx, springY, Math.max(r, 2), 0, Math.PI);
    ctx.stroke();
    vline(ctx, cx, springY - r - 9 * dpr, springY - r);
  }
  // Stepped base — three spreading rules, hatched core step.
  hline(ctx, margin * 0.8, w - margin * 0.8, footY + h * 0.03);
  hline(ctx, margin * 0.55, w - margin * 0.55, footY + h * 0.07);
  hline(ctx, margin * 0.3, w - margin * 0.3, footY + h * 0.11);
  hatch(
    ctx,
    margin * 0.55,
    footY + h * 0.03,
    w - margin * 1.1,
    h * 0.04,
    7 * dpr,
  );
}

/** Topographic contours (indexed every fourth) + density stipple + spot
 *  markers + hatched poche swatch. */
function paintField(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  contours: number,
  stipple: number,
  dpr: number,
) {
  interface Contour {
    baseY: number;
    f1: number;
    f2: number;
    p1: number;
    p2: number;
    amp: number;
  }
  const lines: Contour[] = [];
  for (let c = 0; c < contours; c++) {
    lines.push({
      baseY: h * (0.12 + (0.76 * c) / Math.max(contours - 1, 1)),
      f1: ((1.5 + rand() * 2) / w) * Math.PI * 2,
      f2: ((4 + rand() * 5) / w) * Math.PI * 2,
      p1: rand() * Math.PI * 2,
      p2: rand() * Math.PI * 2,
      amp: h * (0.012 + rand() * 0.014),
    });
  }
  lines.forEach((ln, i) => {
    ctx.save();
    // Index contours read heavier, like a surveyed sheet.
    ctx.lineWidth = i % 4 === 3 ? dpr * 1.75 : dpr;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 8 * dpr) {
      const y =
        ln.baseY +
        Math.sin(x * ln.f1 + ln.p1) * ln.amp +
        Math.sin(x * ln.f2 + ln.p2) * ln.amp * 0.4;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  });
  // Spot markers — small survey crosses.
  for (let i = 0; i < 3; i++) {
    const x = w * (0.15 + rand() * 0.7);
    const y = h * (0.15 + rand() * 0.7);
    const a = 6 * dpr;
    hline(ctx, x - a, x + a, y);
    vline(ctx, x, y - a, y + a);
  }
  // Stipple — density grows toward the right edge like a shade gradient.
  for (let i = 0; i < stipple * 3; i++) {
    const x = rand() * w;
    if (rand() > (x / w) * 0.85 + 0.15) continue;
    ctx.fillRect(x, rand() * h, 2, 2);
  }
  // Poche swatch — 45° section hatch clipped to a small plaque.
  const px = w * 0.08;
  const py = h * 0.66;
  const pw = w * 0.15;
  const ph = h * 0.16;
  hatch(ctx, px, py, pw, ph, 7 * dpr);
  ctx.strokeRect(px, py, pw, ph);
}

/** Floor-plan fragment: poche'd double walls, window, door swing,
 *  grid bubbles, centerline. */
function paintBeam(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  bubbles: number,
  dpr: number,
) {
  void rand;
  const t = 9 * dpr; // wall thickness
  const x0 = w * 0.12;
  const x1 = w * 0.88;
  const y0 = h * 0.24;
  const y1 = h * 0.8;
  // Poche the top + left wall cores (cut-wall fill).
  hatch(ctx, x0, y0, x1 - x0, t, 6 * dpr);
  hatch(ctx, x0, y0, t, y1 - y0, 6 * dpr);
  // Double-line outer walls.
  ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
  ctx.strokeRect(x0 + t, y0 + t, x1 - x0 - t * 2, y1 - y0 - t * 2);
  // Window in the right wall — bridged lines + sill ticks.
  const wa = y0 + (y1 - y0) * 0.32;
  const wb = y0 + (y1 - y0) * 0.52;
  hline(ctx, x1 - t, x1 + t, wa);
  hline(ctx, x1 - t, x1 + t, wb);
  vline(ctx, x1 - t, wa - 4 * dpr, wa + 4 * dpr);
  vline(ctx, x1 + t, wb - 4 * dpr, wb + 4 * dpr);
  // Door opening in the bottom wall — threshold, open leaf, swing arc.
  const hingeX = w * 0.52;
  const doorW = w * 0.11;
  hline(ctx, hingeX, hingeX + doorW, y1); // threshold
  vline(ctx, hingeX, y1, y1 - doorW); // open leaf (90°)
  ctx.beginPath();
  ctx.arc(hingeX, y1, doorW, -Math.PI / 2, 0); // swing quarter-arc
  ctx.stroke();
  // Grid bubbles — empty column markers with drop lines to the plan.
  const r = 11 * dpr;
  for (let i = 0; i < bubbles; i++) {
    const x = x0 + ((x1 - x0) * (i + 0.5)) / bubbles;
    ctx.beginPath();
    ctx.arc(x, h * 0.1, r, 0, Math.PI * 2);
    ctx.stroke();
    vline(ctx, x, h * 0.1 + r, y0);
  }
  // Centerline — long-short dash vertical through the room.
  ctx.save();
  ctx.setLineDash([16 * dpr, 5 * dpr, 3 * dpr, 5 * dpr]);
  vline(ctx, w * 0.3, y0 + t, y1 - t);
  ctx.restore();
}

/** Masonry + fenestration: brick coursing, lintel/sill window bay,
 *  cross-hatched footing swatch, centerlines. */
function paintSheet(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  dpr: number,
) {
  void rand;
  // Brick coursing — running bond in a lower band.
  const bx = w * 0.08;
  const by = h * 0.58;
  const bw = w * 0.42;
  const bh = h * 0.28;
  const course = 8 * dpr;
  const brick = 26 * dpr;
  ctx.save();
  ctx.beginPath();
  ctx.rect(bx, by, bw, bh);
  ctx.clip();
  let row = 0;
  for (let y = by; y <= by + bh; y += course, row++) {
    hline(ctx, bx, bx + bw, y);
    const off = row % 2 === 0 ? 0 : brick / 2;
    for (let x = bx + off; x <= bx + bw; x += brick) {
      vline(ctx, x, y, Math.min(y + course, by + bh));
    }
  }
  ctx.restore();
  ctx.strokeRect(bx, by, bw, bh);
  // Mullioned window — frame, center mullion, two transoms.
  const wx = w * 0.6;
  const wy = h * 0.22;
  const ww = w * 0.3;
  const wh = h * 0.4;
  ctx.strokeRect(wx, wy, ww, wh);
  vline(ctx, wx + ww / 2, wy, wy + wh);
  hline(ctx, wx, wx + ww, wy + wh / 3);
  hline(ctx, wx, wx + ww, wy + (wh * 2) / 3);
  // Lintel + sill — heavier bearing lines.
  ctx.save();
  ctx.lineWidth = dpr * 2;
  hline(ctx, wx - 6 * dpr, wx + ww + 6 * dpr, wy - 5 * dpr);
  hline(ctx, wx - 6 * dpr, wx + ww + 6 * dpr, wy + wh + 5 * dpr);
  ctx.restore();
  // Footing swatch — cross-hatch (both diagonals) clipped to a plaque.
  const fx = w * 0.62;
  const fy = h * 0.7;
  const fw = w * 0.12;
  const fh = h * 0.13;
  hatch(ctx, fx, fy, fw, fh, 6 * dpr);
  ctx.save();
  ctx.beginPath();
  ctx.rect(fx, fy, fw, fh);
  ctx.clip();
  ctx.beginPath();
  for (let dx = fx; dx < fx + fw + fh; dx += 6 * dpr) {
    ctx.moveTo(dx, fy);
    ctx.lineTo(dx - fh, fy + fh);
  }
  ctx.stroke();
  ctx.restore();
  ctx.strokeRect(fx, fy, fw, fh);
  // Centerlines — long-short dash cross through the window, overshooting.
  ctx.save();
  ctx.setLineDash([16 * dpr, 5 * dpr, 3 * dpr, 5 * dpr]);
  hline(ctx, wx - w * 0.06, wx + ww + w * 0.06, wy + wh / 2);
  vline(ctx, wx + ww / 2, wy - h * 0.06, wy + wh + h * 0.06);
  ctx.restore();
}

/** Colonnade — tall sparse verticals + threshold + base rule + light
 *  stipple. Quieter than the arcade; built for the footer anchor. */
function paintColonnade(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  dpr: number,
) {
  const n = 7;
  const margin = w * 0.06;
  for (let i = 0; i < n; i++) {
    const x =
      margin +
      ((w - margin * 2) * i) / (n - 1) +
      (rand() - 0.5) * w * 0.01;
    vline(ctx, x, h * 0.08, h * 0.86);
    // Capital tick.
    hline(ctx, x - 5 * dpr, x + 5 * dpr, h * 0.08);
  }
  // Threshold + base rule.
  hline(ctx, margin * 0.7, w - margin * 0.7, h * 0.9);
  hline(ctx, margin * 0.4, w - margin * 0.4, h * 0.94);
  // Light stipple drift.
  for (let i = 0; i < 60; i++) {
    ctx.fillRect(rand() * w, rand() * h, 2, 2);
  }
}

function drawTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  variant: SectionDraftProps["variant"],
  stroke: string,
  seed: number,
  dpr: number,
) {
  const rand = mulberry32(seed);
  const motif = motifFor(variant);
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = stroke;
  ctx.fillStyle = stroke;
  ctx.lineWidth = dpr;
  ctx.lineCap = "square";

  switch (variant) {
    case "cut":
      paintCut(ctx, w, h, rand, motif.bays, dpr);
      break;
    case "field":
      paintField(ctx, w, h, rand, motif.contours, motif.stipple, dpr);
      break;
    case "beam":
      paintBeam(ctx, w, h, rand, motif.bubbles, dpr);
      break;
    case "sheet":
      paintSheet(ctx, w, h, rand, dpr);
      break;
    case "colonnade":
      paintColonnade(ctx, w, h, rand, dpr);
      break;
  }
}

export default function SectionDraft({
  section,
  variant,
  tone = "paper",
}: SectionDraftProps) {
  const baseRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const base = baseRef.current;
    if (!base) return;

    const paint = () => {
      // Cap DPR lower on coarse pointers — cheap static draw everywhere.
      const coarse =
        window.matchMedia?.("(pointer: coarse)").matches ?? false;
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5);
      const rect = base.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const w = Math.max(Math.round(rect.width * dpr), 2);
      const h = Math.max(Math.round(rect.height * dpr), 2);
      base.width = w;
      base.height = h;

      const bctx = base.getContext("2d");
      if (!bctx) return;

      drawTexture(bctx, w, h, variant, STROKE[tone], seedFor(section), dpr);
    };

    paint();
    // Redraw on viewport changes (rotation, URL-bar collapse) — debounced,
    // still zero cost while scrolling.
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
  }, [section, variant, tone]);

  return (
    <div className="arch-layer arch-mask-fade" aria-hidden="true">
      <div className="arch-base">
        <canvas ref={baseRef} />
      </div>
    </div>
  );
}
