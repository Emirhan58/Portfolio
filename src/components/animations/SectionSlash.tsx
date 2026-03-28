"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAudio } from "@/components/providers/AudioProvider";

interface SectionSlashProps {
  prevSectionId: string;
}

export function SectionSlash({ prevSectionId }: SectionSlashProps) {
  const container = useRef<HTMLDivElement>(null);
  const { shouldAnimate, tier } = useReducedMotion();
  const { playSfx } = useAudio();
  const playSfxRef = useRef(playSfx);
  playSfxRef.current = playSfx;
  const isMobile = tier === "reduced";

  useGSAP(() => {
    if (!shouldAnimate || !container.current) return;

    const slash = container.current.querySelector(".slash-line") as HTMLElement;
    const glow = container.current.querySelector(".slash-glow") as HTMLElement;
    if (!slash || !glow) return;

    const prevSection = document.getElementById(prevSectionId);
    if (!prevSection) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 50%",
        once: true,
      },
    });

    // SFX: katana slash sound on enter
    tl.call(() => playSfxRef.current("slash2"));

    // 1. Katana slash sweeps left → right
    tl.fromTo(slash,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.15, ease: "power4.in" }
    );

    // 2. Red glow flash on impact
    tl.fromTo(glow,
      { opacity: 0 },
      { opacity: 1, duration: 0.06 },
      "-=0.04"
    );

    // 3. Previous section falls (desktop only — causes jank and overlap on mobile)
    if (!isMobile) {
      const randomRot = (Math.random() - 0.5) * 4;
      const randomX = (Math.random() - 0.5) * 20;
      const randomOrigin = Math.random() > 0.5 ? "top left" : "top right";

      tl.to(prevSection, {
        rotation: randomRot,
        x: randomX,
        y: 60,
        transformOrigin: randomOrigin,
        scale: 0.97,
        duration: 1.2,
        ease: "power2.in",
      }, "-=0.1");

      // Click to bring fallen section to front
      const onClick = () => {
        document.querySelectorAll("[data-raised]").forEach((el) => {
          if (el !== prevSection) {
            gsap.set(el, { zIndex: "" });
            el.removeAttribute("data-raised");
          }
        });

        if (prevSection.hasAttribute("data-raised")) {
          gsap.set(prevSection, { zIndex: "" });
          prevSection.removeAttribute("data-raised");
        } else {
          gsap.set(prevSection, { zIndex: 20 });
          prevSection.setAttribute("data-raised", "true");
        }
      };
      prevSection.addEventListener("click", onClick);
    }

    // 4. Glow + slash fade
    tl.to(glow, { opacity: 0, duration: 0.3 }, isMobile ? "+=0.1" : "-=0.8");
    tl.to(slash, { opacity: 0, duration: 0.4 }, "<");

  }, { scope: container, dependencies: [shouldAnimate, isMobile] });

  return (
    <div ref={container} className="relative w-full h-0 overflow-visible z-10">
      {/* Katana slash line */}
      <div
        className="slash-line absolute top-1/2 left-[-2%] w-[104%] h-[2px] -translate-y-1/2"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #f5f0e8 15%, #ffffff 50%, #f5f0e8 85%, transparent 100%)",
        }}
      />

      {/* Red glow along cut */}
      <div
        className="slash-glow absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0"
        style={{
          height: "16px",
          background: "radial-gradient(ellipse at center, rgba(192,57,43,0.6) 0%, rgba(192,57,43,0.2) 40%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />
    </div>
  );
}
