"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAudio } from "@/components/providers/AudioProvider";

// Stroke paths for 鍛冶 (Kaji — blacksmith/forge)
const KANJI_STROKES = [
  // ===== 鍛 (forge/temper) =====
  // 金 radical
  "M25,12 C25,12 26,16 26,20",
  "M26,20 C26,20 18,30 10,38",
  "M26,20 C26,20 34,30 42,38",
  "M12,44 C12,44 26,43 40,44",
  "M20,44 C20,44 19,56 18,64",
  "M32,44 C32,44 33,56 34,64",
  "M10,68 C10,68 26,67 42,68",
  "M18,72 C18,72 14,80 12,85",
  "M34,72 C34,72 38,80 40,85",
  // 段
  "M54,16 C54,16 54,32 54,45",
  "M62,20 C62,20 78,19 94,20",
  "M62,34 C62,34 78,33 94,34",
  "M62,48 C62,48 78,47 94,48",
  "M88,20 C88,20 90,42 86,60 C86,60 82,72 74,82",
  "M72,60 C72,60 82,72 98,88",
  // ===== 冶 (smelt/cast) =====
  // 冫radical
  "M130,28 C130,28 132,34 131,38",
  "M128,48 C128,48 132,56 134,62",
  // 台
  "M148,22 C148,22 156,18 164,22",
  "M152,22 C152,22 144,38 142,48",
  "M162,22 C162,22 162,36 158,48",
  "M138,52 C138,52 158,51 178,52",
  "M142,52 C142,52 142,68 142,80",
  "M174,52 C174,52 174,68 174,80",
  "M142,80 C142,80 158,79 174,80",
];

const VIEWBOX = "0 0 195 109";

const KanjiSvg = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox={VIEWBOX}>
    {KANJI_STROKES.map((d, i) => (
      <path
        key={i}
        className={i < KANJI_STROKES.length ? "kanji-stroke-clone" : ""}
        d={d}
        stroke="#f5f0e8"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

export function KanjiIntro() {
  const container = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [visible, setVisible] = useState(true);
  const { shouldAnimate } = useReducedMotion();
  const { playSfx } = useAudio();

  const skip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    sessionStorage.setItem("kanji-intro-seen", "true");
    setVisible(false);
    window.dispatchEvent(new Event("kanji-intro-done"));
  }, []);

  useEffect(() => {
    if (!shouldAnimate) setVisible(false);
  }, [shouldAnimate]);

  useGSAP(
    () => {
      if (!visible || !container.current) return;

      const mainScene = container.current.querySelector(".intro-scene");
      if (!mainScene) return;
      const kanjiSvg = mainScene.querySelector("svg");

      const tl = gsap.timeline({
        onComplete: () => {
          if (!container.current) return;
          const splitTl = gsap.timeline();
          const scene = container.current!.querySelector(".intro-scene") as HTMLElement;
          const slashTrail = container.current!.querySelector(".slash-trail") as HTMLElement;
          const slashGlow = container.current!.querySelector(".slash-glow") as HTMLElement;
          const topHalf = container.current!.querySelector(".intro-top") as HTMLElement;
          const bottomHalf = container.current!.querySelector(".intro-bottom") as HTMLElement;

          // Tension pause
          splitTl.to({}, { duration: 0.35 });

          // Slash sweeps left→right
          splitTl.fromTo(
            slashTrail,
            { opacity: 1, scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.12, ease: "power4.in" }
          );

          // Katana-slash SFX — syncs with visual slash
          splitTl.call(() => playSfx("katana-slash"), [], "-=0.04");

          // Red glow flash
          splitTl.fromTo(
            slashGlow,
            { opacity: 0 },
            { opacity: 1, duration: 0.05 },
            "-=0.04"
          );

          // Impact shake
          splitTl.to(container.current, {
            x: () => (Math.random() - 0.5) * 20,
            y: () => (Math.random() - 0.5) * 12,
            duration: 0.04,
            repeat: 6,
            yoyo: true,
            onComplete: () => gsap.set(container.current, { x: 0, y: 0 }),
          }, "-=0.03");

          // Swap: hide full scene, show split halves — hero becomes visible here
          splitTl.call(() => {
            scene.style.display = "none";
            topHalf.style.display = "block";
            bottomHalf.style.display = "block";
            window.dispatchEvent(new Event("kanji-intro-done"));
          });

          // Fade slash effects
          splitTl.to(slashGlow, { opacity: 0, duration: 0.2 });
          splitTl.to(slashTrail, { opacity: 0, duration: 0.2 }, "<");

          // Halves separate — kanji tears apart
          splitTl.to(topHalf, {
            yPercent: -100,
            duration: 0.65,
            ease: "power2.in",
          }, "-=0.1");
          splitTl.to(bottomHalf, {
            yPercent: 100,
            duration: 0.65,
            ease: "power2.in",
            onComplete: () => {
              sessionStorage.setItem("kanji-intro-seen", "true");
              setVisible(false);
            },
          }, "<");
        },
      });

      // Fade in kanji gradually
      tl.fromTo(
        kanjiSvg,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.inOut" }
      );

      // Stagger brush-stroke SFX during the 0.8s fade-in to evoke calligraphy
      const brushCount = 5;
      for (let i = 0; i < brushCount; i++) {
        tl.call(
          () => playSfx("brush-stroke"),
          [],
          (i * 0.8) / brushCount - 0.8
        );
      }

      // Ink-drop SFX — ink settles after kanji fully visible
      tl.call(() => playSfx("ink-drop"), []);

      // Brief hold before the cut
      tl.to({}, { duration: 0 });

      tlRef.current = tl;
    },
    { scope: container, dependencies: [visible, playSfx] }
  );

  if (!visible) return null;

  // Shared SVG sizing — must match exactly between scene and split halves
  const svgClass = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-52";
  const svgClassHidden = svgClass + " opacity-0";

  return (
    <div ref={container} className="fixed inset-0 z-50" aria-hidden="true">
      {/* Main scene — kanji draws here, hidden at cut */}
      <div className="intro-scene absolute inset-0 bg-[#0a0a0a] z-[3]">
        <KanjiSvg className={svgClassHidden} />
      </div>

      {/* Top half — clips top 50% of screen, slides up */}
      <div
        className="intro-top absolute top-0 left-0 w-full h-[50vh] bg-[#0a0a0a] overflow-hidden z-[3]"
        style={{ display: "none" }}
      >
        {/* Full-height inner positions SVG at screen center; overflow clips bottom */}
        <div className="relative w-full" style={{ height: "100vh" }}>
          <KanjiSvg className={svgClass} />
        </div>
      </div>

      {/* Bottom half — clips bottom 50% of screen, slides down */}
      <div
        className="intro-bottom absolute bottom-0 left-0 w-full h-[50vh] bg-[#0a0a0a] overflow-hidden z-[3]"
        style={{ display: "none" }}
      >
        {/* Shift inner up by 50vh so the bottom half of the kanji is visible */}
        <div className="relative w-full" style={{ height: "100vh", top: "-50vh" }}>
          <KanjiSvg className={svgClass} />
        </div>
      </div>

      {/* Katana slash trail — hidden until cut animation */}
      <div
        className="slash-trail absolute left-0 top-1/2 w-full h-[3px] -translate-y-1/2 z-[6] opacity-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #f5f0e8 20%, #ffffff 50%, #f5f0e8 80%, transparent 100%)",
        }}
      />

      {/* Red glow along the cut */}
      <div
        className="slash-glow absolute left-0 top-1/2 w-full -translate-y-1/2 z-[6] opacity-0"
        style={{
          height: "20px",
          background: "radial-gradient(ellipse at center, rgba(192,57,43,0.8) 0%, rgba(192,57,43,0.3) 40%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      <button
        onClick={skip}
        className="absolute bottom-6 right-6 text-sm text-white/40 hover:text-white/70 z-20 transition-colors"
      >
        Skip
      </button>
    </div>
  );
}
