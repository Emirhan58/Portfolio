"use client";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAudio } from "@/components/providers/AudioProvider";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export function AudioToggle() {
  const { enabled, volume, toggleAudio, setVolume } = useAudio();
  const [showSlider, setShowSlider] = useState(false);
  const t = useTranslations("nav");
  const throttleRef = useRef<number>(0);

  const handleVolumeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const now = Date.now();
    if (now - throttleRef.current < 16) return; // ~60fps throttle
    throttleRef.current = now;
    setVolume(parseFloat((e.target as HTMLInputElement).value));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        onClick={toggleAudio}
        aria-label={enabled ? t("soundOff") : t("soundOn")}
        title={enabled ? t("soundOff") : t("soundOn")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded transition-colors text-text-secondary hover:text-text-primary",
          enabled && "animate-pulse-red text-accent-red"
        )}
      >
        {enabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-lg border border-white/10 bg-bg/95 p-3 shadow-lg backdrop-blur-md"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onInput={handleVolumeChange}
              className="audio-slider"
              style={{
                writingMode: "vertical-lr",
                direction: "rtl",
                height: "80px",
                width: "4px",
              }}
              aria-label="Volume"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
