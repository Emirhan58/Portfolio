"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ParallaxLayers() {
  const container = useRef<HTMLDivElement>(null);
  const { shouldParallax } = useReducedMotion();

  useGSAP(() => {
    if (!shouldParallax || !container.current) return;

    // Mountains move slowest (closest to viewer conceptually, but furthest parallax layer)
    gsap.to(".parallax-mountains", {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Clouds move medium speed
    gsap.to(".parallax-clouds", {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Mist moves fastest
    gsap.to(".parallax-mist", {
      y: -180,
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, { scope: container, dependencies: [shouldParallax] });

  if (!shouldParallax) return null;

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Mist layer — semi-transparent horizontal bands */}
      <svg className="parallax-mist absolute bottom-0 left-0 w-full h-[30vh] opacity-[0.04]" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <ellipse cx="400" cy="250" rx="600" ry="80" fill="var(--color-paper)" />
        <ellipse cx="1100" cy="220" rx="500" ry="60" fill="var(--color-paper)" />
        <ellipse cx="200" cy="280" rx="400" ry="50" fill="var(--color-paper)" />
      </svg>

      {/* Cloud layer — wispy shapes */}
      <svg className="parallax-clouds absolute top-[10%] left-0 w-full h-[20vh] opacity-[0.035]" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M200,120 Q300,80 400,100 Q500,70 600,95 Q700,60 750,90" stroke="var(--color-paper)" strokeWidth="2" fill="none" />
        <path d="M800,80 Q900,50 1000,70 Q1100,40 1200,65 Q1300,45 1400,60" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" />
        <ellipse cx="350" cy="100" rx="120" ry="25" fill="var(--color-paper)" opacity="0.5" />
        <ellipse cx="1000" cy="70" rx="100" ry="20" fill="var(--color-paper)" opacity="0.4" />
      </svg>

      {/* Mountain layer — dark silhouettes at bottom */}
      <svg className="parallax-mountains absolute bottom-0 left-0 w-full h-[25vh] opacity-[0.06]" viewBox="0 0 1440 250" preserveAspectRatio="none">
        <path d="M0,250 L0,180 L100,120 L200,160 L350,80 L500,130 L600,60 L750,110 L900,40 L1050,90 L1150,50 L1300,100 L1440,70 L1440,250 Z" fill="var(--color-paper)" />
      </svg>
    </div>
  );
}
