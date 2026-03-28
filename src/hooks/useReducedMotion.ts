"use client";
import { useState, useEffect } from "react";

export type MotionTier = "full" | "reduced" | "none";

export function useReducedMotion() {
  const [tier, setTier] = useState<MotionTier>("full");

  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");

    const update = () => {
      if (mqReduced.matches) setTier("none");
      else if (mqMobile.matches) setTier("reduced");
      else setTier("full");
    };

    update();
    mqReduced.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqReduced.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  return {
    tier,
    isMobile: tier === "reduced",
    shouldAnimate: tier === "full",
    shouldParticle: tier === "full",
    shouldParallax: tier === "full",
    shouldSnap: tier !== "none",
  };
}
