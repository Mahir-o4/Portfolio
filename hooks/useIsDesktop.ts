"use client";

import { useState, useEffect } from "react";

export const useIsDesktop = (breakpoint: number = 768) => {
  // not determined as null
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    
    // Set the initial value
    setIsDesktop(mediaQuery.matches);

    // Create a listener for window resizing
    const handler = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    
    // Clean up listener on unmount
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
};