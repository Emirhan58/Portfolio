"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;       // start X (vw)
  delay: number;    // animation delay (s)
  duration: number; // fall duration (s)
  size: number;     // scale factor
  drift: number;    // horizontal sway (px)
  rotation: number; // initial rotation
  opacity: number;
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 8,
    size: 0.5 + Math.random() * 0.7,
    drift: 40 + Math.random() * 80,
    rotation: Math.random() * 360,
    opacity: 0.06 + Math.random() * 0.09,
  }));
}

export function SakuraFall() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(generatePetals(20));
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(-5vh) translateX(0px) rotate(var(--rot-start)) scale(1);
            opacity: 0;
          }
          8% {
            opacity: var(--petal-opacity);
          }
          25% {
            transform: translateY(25vh) translateX(calc(var(--drift) * 0.3)) rotate(calc(var(--rot-start) + 120deg)) scale(0.95);
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--drift) * -0.15)) rotate(calc(var(--rot-start) + 270deg)) scale(0.9);
            opacity: var(--petal-opacity);
          }
          75% {
            transform: translateY(75vh) translateX(calc(var(--drift) * 0.5)) rotate(calc(var(--rot-start) + 400deg)) scale(0.85);
          }
          90% {
            opacity: calc(var(--petal-opacity) * 0.5);
          }
          100% {
            transform: translateY(105vh) translateX(var(--drift)) rotate(calc(var(--rot-start) + 540deg)) scale(0.8);
            opacity: 0;
          }
        }
        .sakura-petal {
          position: absolute;
          top: 0;
          opacity: 0;
          animation: sakura-fall var(--fall-duration) var(--fall-delay) ease-in-out infinite backwards;
          will-change: transform, opacity;
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.x}%`,
            "--fall-duration": `${p.duration}s`,
            "--fall-delay": `${p.delay}s`,
            "--drift": `${p.drift}px`,
            "--rot-start": `${p.rotation}deg`,
            "--petal-opacity": p.opacity,
          } as React.CSSProperties}
        >
          <svg
            width={16 * p.size}
            height={20 * p.size}
            viewBox="0 0 16 20"
            fill="none"
          >
            {/* Sakura petal — soft teardrop with translucent layers */}
            <path
              d="M8,1 C11,1 14,5 14,9 C14,13 11,17 8,19 C5,17 2,13 2,9 C2,5 5,1 8,1 Z"
              fill="var(--color-accent-red)"
              opacity="0.55"
            />
            {/* Inner lighter area for depth */}
            <path
              d="M8,4 C10,4 11.5,6.5 11.5,9 C11.5,11.5 10,14 8,15.5 C6,14 4.5,11.5 4.5,9 C4.5,6.5 6,4 8,4 Z"
              fill="var(--color-paper)"
              opacity="0.12"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
