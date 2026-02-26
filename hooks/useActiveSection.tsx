'use client';

import { useEffect, useRef, useState } from 'react';

 export function useActiveSection(sectionIds: string[]) {
   const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');
  const pendingRef = useRef<number | null>(null);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

   useEffect(() => {
     const elements = sectionIds
       .map((id) => document.getElementById(id))
       .filter((el): el is HTMLElement => Boolean(el));

     if (!elements.length) return;

     const observer = new IntersectionObserver(
       (entries) => {
         const visible = entries
           .filter((e) => e.isIntersecting)
           .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

         const nextId = visible[0]?.target?.id;
        if (!nextId || nextId === activeSectionRef.current) return;

         if (pendingRef.current) window.clearTimeout(pendingRef.current);

         pendingRef.current = window.setTimeout(() => {
           setActiveSection(nextId);
           pendingRef.current = null;
         }, 260);
       },
       {
         threshold: 0.35,
         rootMargin: '-20% 0px -35% 0px',
       }
     );

     elements.forEach((el) => observer.observe(el));

     return () => {
       observer.disconnect();
       if (pendingRef.current) window.clearTimeout(pendingRef.current);
     };
  }, [sectionIds]);

   return activeSection;
 }