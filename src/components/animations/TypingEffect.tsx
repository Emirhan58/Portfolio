"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypingEffectProps {
  jpText: string;
  finalText: string;
  statusText: string;
}

const JP_CHARS =
  "侍刀剣道武士忍風雷火水木金土月日天地精密構築技術戦略ァアィイゥウェエォオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

/**
 * blocked   → kanji intro oynamaya devam ediyor
 * jp        → Japonca tagline gösteriliyor
 * cmd-type  → "$ decoding..." harf harf yazılıyor
 * cmd-pause → kısa bekleme, sonra scramble
 * scramble  → JP karakterler → final text
 * done      → son hali
 */
type Phase = "blocked" | "jp" | "cmd-type" | "cmd-pause" | "scramble" | "done";

export function TypingEffect({ jpText, finalText, statusText }: TypingEffectProps) {
  const [phase, setPhase] = useState<Phase>("blocked");
  const [mainText, setMainText] = useState("");
  const [cmdText, setCmdText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const { shouldAnimate } = useReducedMotion();
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  const randomJP = useCallback((len: number) => {
    let s = "";
    for (let i = 0; i < len; i++) {
      s += JP_CHARS[Math.floor(Math.random() * JP_CHARS.length)];
    }
    return s;
  }, []);

  // Kanji intro bitene kadar bekle
  useEffect(() => {
    if (!shouldAnimate) return;
    const handler = () => setPhase("jp");
    window.addEventListener("kanji-intro-done", handler);
    return () => window.removeEventListener("kanji-intro-done", handler);
  }, [shouldAnimate]);

  // JP phase: Japonca tagline göster, 800ms sonra cmd-type'a geç
  useEffect(() => {
    if (phase !== "jp") return;
    setMainText(jpText);
    const timer = setTimeout(() => setPhase("cmd-type"), 800);
    return () => clearTimeout(timer);
  }, [phase, jpText]);

  // CMD-TYPE: "$ decoding..." harf harf yazılıyor
  useEffect(() => {
    if (phase !== "cmd-type") return;

    const full = "$ " + statusText;
    let i = 0;
    setCmdText("");
    setShowCursor(true);

    const interval = setInterval(() => {
      i++;
      setCmdText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setPhase("cmd-pause");
      }
    }, 65);

    return () => clearInterval(interval);
  }, [phase, statusText]);

  // CMD-PAUSE: kısa bekleme sonra scramble başla
  useEffect(() => {
    if (phase !== "cmd-pause") return;
    const timer = setTimeout(() => setPhase("scramble"), 600);
    return () => clearTimeout(timer);
  }, [phase]);

  // SCRAMBLE: JP karakterler kaos → soldan sağa çözümlenme
  useEffect(() => {
    if (phase !== "scramble") return;

    const len = finalText.length;
    const scrambleDuration = 800;
    startTimeRef.current = performance.now();
    let resolved = 0;
    let resolving = false;

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;

      if (!resolving && elapsed >= scrambleDuration) {
        resolving = true;
        startTimeRef.current = performance.now();
      }

      if (resolving) {
        const resolveElapsed = performance.now() - startTimeRef.current;
        const newResolved = Math.min(len, Math.floor(resolveElapsed / 45));
        if (newResolved > resolved) resolved = newResolved;

        const left = finalText.slice(0, resolved);
        const right = randomJP(Math.max(0, len - resolved));
        setMainText(left + right);

        if (resolved >= len) {
          setMainText(finalText);
          setCmdText("");
          setShowCursor(false);
          setPhase("done");
          return;
        }
      } else {
        const lenVariance = Math.floor(Math.sin(elapsed / 80) * 2);
        setMainText(randomJP(Math.max(3, len + lenVariance)));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, finalText, randomJP]);

  if (!shouldAnimate) {
    return <span>{finalText}</span>;
  }

  const cursor = (
    <span
      className="inline-block w-[2px] h-[1em] bg-accent-red ml-0.5 align-middle"
      style={{ animation: "pulse 530ms steps(1) infinite" }}
    />
  );

  return (
    <span className="inline-flex flex-col items-center gap-1.5">
      <span>
        {phase === "blocked" ? "\u00A0" : mainText}
        {phase !== "blocked" && phase !== "done" && phase !== "cmd-type" && phase !== "cmd-pause" && showCursor && cursor}
      </span>
      {(phase === "cmd-type" || phase === "cmd-pause" || phase === "scramble") && (
        <span className="text-xs font-mono text-accent-gold/70 tracking-wider">
          {cmdText}
          {(phase === "cmd-type" || phase === "cmd-pause") && cursor}
        </span>
      )}
      <style>{`
        @keyframes pulse {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
