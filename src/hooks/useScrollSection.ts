"use client";
import { useState, useEffect, useCallback } from "react";
import { SECTION_IDS, type SectionId } from "@/lib/constants";

export function useScrollSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return { activeSection, scrollTo, sectionIds: SECTION_IDS };
}
