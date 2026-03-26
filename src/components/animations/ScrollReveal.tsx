"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { shouldAnimate, tier } = useReducedMotion();

  useGSAP(() => {
    if (!container.current) return;

    const sections = container.current.querySelectorAll("[data-section]");

    sections.forEach((section) => {
      // Skip hero section — it has its own mount animation
      if (section.id === "hero") return;

      if (shouldAnimate && tier === "full") {
        // Full tier: ink splash clip-path reveal
        gsap.fromTo(section,
          { clipPath: "circle(0% at 50% 100%)" },
          {
            clipPath: "circle(150% at 50% 100%)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%", // 20% of section visible
              once: true,
            },
          }
        );
      } else if (shouldAnimate && tier === "reduced") {
        // Reduced tier: simple fade in (no clip-path, lighter)
        gsap.from(section, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      }
      // "none" tier: no animation at all

      // Staggered children with [data-animate] attribute (all tiers except none)
      if (shouldAnimate) {
        const children = section.querySelectorAll("[data-animate]");
        if (children.length > 0) {
          gsap.from(children, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          });
        }
      }
    });

    // Decorative kanji watermarks — fade in + float up when section reveals
    if (shouldAnimate) {
      const kanjis = container.current.querySelectorAll("[aria-hidden='true'].font-kanji");
      kanjis.forEach((kanji) => {
        gsap.from(kanji, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: kanji.closest("[data-section]") || kanji,
            start: "top 80%",
            once: true,
          },
        });
      });
    }

    // Refresh ScrollTrigger after all sections are set up
    ScrollTrigger.refresh();
  }, { scope: container, dependencies: [shouldAnimate, tier] });

  return <div ref={container}>{children}</div>;
}
