"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { LenisContext } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { shouldSnap } = useReducedMotion();

  useEffect(() => {
    const lenisInstance = new Lenis({ autoRaf: false });
    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Sync with GSAP ticker
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Add snap points if animations enabled
    if (shouldSnap) {
      const snap = new Snap(lenisInstance, {
        type: "proximity",
        debounce: 300,
      });
      const sections = document.querySelectorAll("[data-section]");
      snap.addElements(sections, { align: ["start"] });
    }

    return () => {
      lenisInstance.destroy();
    };
  }, [shouldSnap]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
