"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin, CustomEase } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// KanjiVG-derived stroke paths for 侍 (samurai) — 8 strokes
// viewBox="0 0 109 109" per KanjiVG standard dimensions
const KANJI_STROKES = [
  // Stroke 1: left vertical radical イ top
  "M30.5,16.5 C30.5,16.5 31.25,20.25 28,27.5",
  // Stroke 2: left diagonal radical イ bottom
  "M29.25,24.75 C29.25,24.75 15.5,55.25 13.75,73",
  // Stroke 3: top horizontal 士
  "M43,22.5 C43,22.5 62,21.5 75.25,22",
  // Stroke 4: vertical center 士
  "M57.75,22 C57.75,22 57.75,38.25 57.75,43.5",
  // Stroke 5: bottom horizontal 士
  "M38.25,43 C38.25,43 57.5,42 78.75,43.5",
  // Stroke 6: horizontal under 寸
  "M43.5,56.25 C43.5,56.25 70.25,55 82.75,56.5",
  // Stroke 7: vertical 寸
  "M63,56.25 C63,56.25 64,72.25 64.75,88.5",
  // Stroke 8: dot 寸
  "M79.75,65 C79.75,65 81.5,68.25 80.75,72",
];

// Extract endpoint from SVG path string (last coordinate pair)
function getStrokeEndpoint(d: string): { x: number; y: number } {
  const nums = d.match(/-?\d+(\.\d+)?/g);
  if (!nums || nums.length < 2) return { x: 54.5, y: 54.5 };
  return {
    x: parseFloat(nums[nums.length - 2]),
    y: parseFloat(nums[nums.length - 1]),
  };
}

export function KanjiIntro() {
  const container = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const { shouldAnimate, shouldParticle } = useReducedMotion();

  const skip = useCallback(() => {
    sessionStorage.setItem("kanji-intro-seen", "true");
    setVisible(false);
  }, []);

  // SessionStorage check + reduced motion gate
  useEffect(() => {
    if (sessionStorage.getItem("kanji-intro-seen") || !shouldAnimate) {
      setVisible(false);
    }
  }, [shouldAnimate]);

  useGSAP(
    () => {
      if (!visible || !container.current) return;

      // Register brush easing for organic calligraphy feel
      CustomEase.create(
        "brush",
        "M0,0 C0.14,0.18 0.25,1 0.5,1 0.7,1 0.86,0.82 1,1"
      );

      const strokes = container.current.querySelectorAll(".kanji-stroke");
      const slashLine = container.current.querySelector(".slash-line");

      const tl = gsap.timeline({
        onComplete: () => {
          // Katana slash transition
          const splitTl = gsap.timeline();

          // Red slash line flash
          splitTl.fromTo(
            slashLine,
            { opacity: 0 },
            { opacity: 1, duration: 0.1, ease: "power2.in" }
          );
          splitTl.to(slashLine, { opacity: 0, duration: 0.1 });

          // Split screen halves apart
          splitTl.to(
            ".intro-top",
            {
              yPercent: -100,
              duration: 0.6,
              ease: "power3.inOut",
            },
            "-=0.05"
          );
          splitTl.to(
            ".intro-bottom",
            {
              yPercent: 100,
              duration: 0.6,
              ease: "power3.inOut",
              onComplete: () => {
                sessionStorage.setItem("kanji-intro-seen", "true");
                setVisible(false);
              },
            },
            "<"
          );
        },
      });

      // Animate each stroke sequentially with DrawSVGPlugin
      strokes.forEach((stroke, i) => {
        tl.from(
          stroke,
          {
            drawSVG: "0%",
            duration: 0.4,
            ease: "brush",
          },
          i * 0.4
        );

        // Ink particle scatter at stroke endpoint
        if (shouldParticle && particlesRef.current) {
          const endpoint = getStrokeEndpoint(KANJI_STROKES[i]);
          const particleCount = 3 + Math.floor(Math.random() * 3); // 3-5 particles

          for (let p = 0; p < particleCount; p++) {
            const dot = document.createElement("div");
            dot.className = "ink-dot";
            // Position relative to SVG center mapping
            // SVG is 256px (w-64) centered, viewBox 0-109
            const svgEl = container.current!.querySelector("svg");
            if (!svgEl) continue;
            const svgRect = svgEl.getBoundingClientRect();
            const scaleX = svgRect.width / 109;
            const scaleY = svgRect.height / 109;
            const dotX = svgRect.left + endpoint.x * scaleX;
            const dotY = svgRect.top + endpoint.y * scaleY;

            dot.style.cssText = `
              position: fixed;
              left: ${dotX}px;
              top: ${dotY}px;
              width: ${2 + Math.random() * 3}px;
              height: ${2 + Math.random() * 3}px;
              border-radius: 50%;
              background: #f5f0e8;
              pointer-events: none;
              z-index: 15;
            `;
            particlesRef.current.appendChild(dot);

            tl.to(
              dot,
              {
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 60,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => dot.remove(),
              },
              i * 0.4 + 0.2
            );
          }
        }
      });
    },
    { scope: container, dependencies: [visible] }
  );

  if (!visible) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-50 bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Split halves for katana slash transition */}
      <div className="intro-top absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[1]" />
      <div className="intro-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[1]" />

      {/* Red slash line */}
      <div
        className="slash-line absolute left-0 top-1/2 w-full h-[2px] bg-[#c0392b] z-[2] opacity-0 -translate-y-1/2"
      />

      {/* Kanji SVG */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-10"
        viewBox="0 0 109 109"
      >
        {KANJI_STROKES.map((d, i) => (
          <path
            key={i}
            className="kanji-stroke"
            d={d}
            stroke="#f5f0e8"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Ink particle container */}
      <div
        ref={particlesRef}
        className="ink-particles absolute inset-0 z-10 pointer-events-none"
      />

      {/* Skip button */}
      <button
        onClick={skip}
        className="absolute bottom-6 right-6 text-sm text-white/40 hover:text-white/70 z-20 transition-colors"
      >
        Skip
      </button>
    </div>
  );
}
