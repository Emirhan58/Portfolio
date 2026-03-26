"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StatCounterProps {
  /** Target numeric value to count to */
  value: number;
  /** Text suffix like "+" appended after number */
  suffix?: string;
}

export function StatCounter({ value, suffix = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { shouldAnimate } = useReducedMotion();

  useGSAP(() => {
    if (!shouldAnimate || !ref.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      snap: { val: 1 },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val) + suffix;
        }
      },
    });
  }, { dependencies: [shouldAnimate, value, suffix] });

  return (
    <span ref={ref}>
      {shouldAnimate ? `0${suffix}` : `${value}${suffix}`}
    </span>
  );
}
