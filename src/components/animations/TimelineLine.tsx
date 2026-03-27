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

    const container = lineRef.current.parentElement;
    if (!container) return;

    const dots = container.querySelectorAll<HTMLElement>(".timeline-dot");
    if (dots.length === 0) return;

    // Start line with 0 height
    gsap.set(lineRef.current, { height: 0 });

    // Hide dots initially
    dots.forEach((dot) => gsap.set(dot, { scale: 0, opacity: 0 }));

    dots.forEach((dot) => {
      // Calculate where this dot is relative to the container
      const dotTop = dot.closest(".relative")?.getBoundingClientRect().top ?? 0;
      const containerTop = container.getBoundingClientRect().top;
      const targetHeight = dotTop - containerTop + 6; // +6 for dot's top-6 offset center

      ScrollTrigger.create({
        trigger: dot,
        start: "top 70%",
        once: true,
        onEnter: () => {
          // Grow line to this dot
          gsap.to(lineRef.current, {
            height: targetHeight,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Dot pulse: appear + scale up then settle
              gsap.to(dot, {
                scale: 1.8,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(dot, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.5)",
                  });
                },
              });
            },
          });
        },
      });
    });

    ScrollTrigger.refresh();
  }, { dependencies: [shouldAnimate] });

  return (
    <div
      ref={lineRef}
      className="absolute left-1/2 top-0 w-px -translate-x-1/2 border-l-2 border-dashed border-accent-red/20 hidden lg:block"
      aria-hidden="true"
      style={{ height: 0 }}
    />
  );
}
