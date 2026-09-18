export type ArchVariant =
  | "cut"
  | "field"
  | "beam"
  | "sheet"
  | "colonnade"
  | "hero-faint";

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seedFor(section: string): number {
  return (hashString(section) + 418) >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ArchMotifParams {
  bays: number;
  contours: number;
  stipple: number;
  bubbles: number;
}

const MOTIF_TABLE: Record<ArchVariant, ArchMotifParams> = {
  cut: { bays: 5, contours: 0, stipple: 50, bubbles: 0 },
  field: { bays: 0, contours: 8, stipple: 240, bubbles: 0 },
  beam: { bays: 0, contours: 0, stipple: 40, bubbles: 4 },
  sheet: { bays: 0, contours: 0, stipple: 70, bubbles: 0 },
  colonnade: { bays: 0, contours: 0, stipple: 60, bubbles: 0 },
  "hero-faint": { bays: 0, contours: 0, stipple: 0, bubbles: 0 },
};

export function motifFor(variant: ArchVariant): ArchMotifParams {
  return MOTIF_TABLE[variant];
}
