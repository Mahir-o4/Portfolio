"use client";

import { useEffect, useState, useMemo } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");
  const idsKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  useEffect(() => {
    let ticking = false;

    const determineActive = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY < 120) {
        setActiveSection(sectionIds[0] ?? "");
        ticking = false;
        return;
      }

      if (windowHeight + scrollY >= docHeight - 80) {
        setActiveSection(sectionIds[sectionIds.length - 1] ?? "");
        ticking = false;
        return;
      }

      const focalLine = windowHeight * 0.35;

      const elements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (elements.length === 0) {
        ticking = false;
        return;
      }

      let matchedId = "";
      for (const { id, el } of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedId = id;
          break;
        }
      }

      if (!matchedId) {
        let minDistance = Infinity;
        for (const { id, el } of elements) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - focalLine);
          if (dist < minDistance) {
            minDistance = dist;
            matchedId = id;
          }
        }
      }

      if (matchedId) {
        setActiveSection((prev) => (prev !== matchedId ? matchedId : prev));
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(determineActive);
        ticking = true;
      }
    };

    determineActive();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [idsKey, sectionIds]);

  return activeSection;
}
