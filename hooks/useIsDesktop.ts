"use client";

import { useState, useEffect } from "react";

export const useIsDesktop = (breakpoint: number = 768) => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    
    setIsDesktop(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
};