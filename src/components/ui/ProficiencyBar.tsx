"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProficiencyBarProps {
  label: string;
  percentage: number;
  /** Stagger delay for sequential fill within category */
  delay?: number;
}

export function ProficiencyBar({ label, percentage, delay = 0 }: ProficiencyBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useReducedMotion();

  useGSAP(() => {
    if (!shouldAnimate || !fillRef.current || !barRef.current) return;

    // Start with width 0
    gsap.set(fillRef.current, { width: "0%" });

    // Fill animation
    gsap.to(fillRef.current, {
      width: `${percentage}%`,
      duration: 0.8,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 85%",
        once: true,
      },
      onComplete: () => {
        // Spark flash at tip
        if (sparkRef.current) {
          gsap.fromTo(sparkRef.current,
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 2, duration: 0.4, ease: "power2.out" }
          );
        }
      },
    });
  }, { dependencies: [shouldAnimate, percentage, delay] });

  return (
    <div ref={barRef} className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-body text-text-secondary">{label}</span>
        <span className="text-body text-text-secondary text-sm">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-bg rounded-sm overflow-hidden relative">
        <div
          ref={fillRef}
          className="h-full bg-accent-red rounded-sm"
          style={{ width: shouldAnimate ? "0%" : `${percentage}%` }}
        />
        {shouldAnimate && (
          <div
            ref={sparkRef}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-red opacity-0"
            style={{ left: `${percentage}%`, filter: "blur(2px)", boxShadow: "0 0 6px var(--color-accent-red)" }}
          />
        )}
      </div>
    </div>
  );
}
