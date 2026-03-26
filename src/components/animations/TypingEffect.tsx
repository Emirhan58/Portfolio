"use client";
import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypingEffectProps {
  jpText: string;
  enText: string;
  /** Delay before starting in ms -- allows hero stagger to complete first */
  startDelay?: number;
}

type Phase = "waiting" | "jp-type" | "jp-pause" | "jp-delete" | "en-type" | "done";

export function TypingEffect({ jpText, enText, startDelay = 0 }: TypingEffectProps) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<Phase>("waiting");
  const [cursorVisible, setCursorVisible] = useState(true);
  const { shouldAnimate } = useReducedMotion();
  const indexRef = useRef(0);

  // If no animation, show final English text immediately
  // Start delay
  useEffect(() => {
    if (!shouldAnimate) return;
    const timer = setTimeout(() => setPhase("jp-type"), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay, shouldAnimate]);

  // Typing logic
  useEffect(() => {
    if (!shouldAnimate || phase === "waiting") return;

    let interval: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>;

    switch (phase) {
      case "jp-type":
        indexRef.current = 0;
        interval = setInterval(() => {
          indexRef.current++;
          setDisplay(jpText.slice(0, indexRef.current));
          if (indexRef.current >= jpText.length) {
            clearInterval(interval as ReturnType<typeof setInterval>);
            setTimeout(() => setPhase("jp-pause"), 100);
          }
        }, 60); // 60ms per JP char
        break;

      case "jp-pause":
        interval = setTimeout(() => setPhase("jp-delete"), 800);
        break;

      case "jp-delete":
        indexRef.current = jpText.length;
        interval = setInterval(() => {
          indexRef.current--;
          setDisplay(jpText.slice(0, indexRef.current));
          if (indexRef.current <= 0) {
            clearInterval(interval as ReturnType<typeof setInterval>);
            setPhase("en-type");
          }
        }, 35); // 35ms per char delete
        break;

      case "en-type":
        indexRef.current = 0;
        interval = setInterval(() => {
          indexRef.current++;
          setDisplay(enText.slice(0, indexRef.current));
          if (indexRef.current >= enText.length) {
            clearInterval(interval as ReturnType<typeof setInterval>);
            setPhase("done");
          }
        }, 70); // 70ms per EN char
        break;

      case "done":
        // Hide cursor after 1s
        interval = setTimeout(() => setCursorVisible(false), 1000);
        break;
    }

    return () => {
      clearInterval(interval as ReturnType<typeof setInterval>);
      clearTimeout(interval as ReturnType<typeof setTimeout>);
    };
  }, [phase, jpText, enText, shouldAnimate]);

  if (!shouldAnimate) {
    return <span>{enText}</span>;
  }

  return (
    <span>
      {display}
      {cursorVisible && phase !== "waiting" && (
        <span className="animate-pulse inline-block ml-0.5 text-accent-red">|</span>
      )}
    </span>
  );
}
