"use client";

import { useEffect, useRef, useState, useMemo } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const pendingRef = useRef<number | null>(null);
  const activeSectionRef = useRef(activeSection);

  const idsKey = useMemo(() => sectionIds.join("|"), [sectionIds]); // avoid uncessary lags with same useless array

  const ratiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    ratiosRef.current = Object.fromEntries(sectionIds.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        // compute from maximum visible section
        let nextId = activeSectionRef.current;
        let best = 0;

        for (const id of sectionIds) {
          const ratio = ratiosRef.current[id] ?? 0;
          if (ratio > best) {
            best = ratio;
            nextId = id;
          }
        }

        if (!nextId || nextId === activeSectionRef.current) return;

        if (pendingRef.current) window.clearTimeout(pendingRef.current);
        pendingRef.current = window.setTimeout(() => {
          setActiveSection(nextId);
          pendingRef.current = null;
        }, 160);
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-20% 0px -35% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (pendingRef.current) window.clearTimeout(pendingRef.current);
    };
  }, [idsKey]);

  return activeSection;
}
