"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TimelineLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useReducedMotion();

  useGSAP(() => {
    if (!shouldAnimate || !lineRef.current) return;

    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, { dependencies: [shouldAnimate] });

  return (
    <div
      ref={lineRef}
      className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l-2 border-dashed border-accent-red/20 hidden lg:block"
      aria-hidden="true"
    />
  );
}
