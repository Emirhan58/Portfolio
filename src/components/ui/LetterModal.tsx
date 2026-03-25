"use client";

import { useState, useEffect, useCallback } from "react";

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tech: readonly string[];
  github: string;
  stars: number;
}

export function LetterModal({
  isOpen,
  onClose,
  title,
  description,
  tech,
  github,
  stars,
}: LetterModalProps) {
  const [phase, setPhase] = useState<"closed" | "breaking" | "opening" | "open">("closed");

  useEffect(() => {
    if (isOpen) {
      setPhase("breaking");
      const t1 = setTimeout(() => setPhase("opening"), 600);
      const t2 = setTimeout(() => setPhase("open"), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setPhase("closed");
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setPhase("closed");
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!isOpen && phase === "closed") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        phase === "closed" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Letter container */}
      <div
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Envelope back */}
        <div
          className={`relative transition-all duration-600 ${
            phase === "closed" || phase === "breaking"
              ? "scale-95"
              : "scale-100"
          }`}
        >
          {/* Envelope body */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ backgroundColor: "#2a1f14", border: "1px solid var(--color-accent-gold)" }}
          >
            {/* Envelope flap (top triangle) */}
            <div
              className={`absolute top-0 left-0 right-0 h-24 origin-top transition-transform duration-600 z-10 ${
                phase === "opening" || phase === "open"
                  ? "[transform:rotateX(180deg)]"
                  : "[transform:rotateX(0deg)]"
              }`}
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                <polygon
                  points="0,0 400,0 200,80"
                  fill="#1e1510"
                  stroke="var(--color-accent-gold)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Wax seal */}
            <div
              className={`absolute top-12 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
                phase === "breaking"
                  ? "scale-125 rotate-12 opacity-60"
                  : phase === "opening" || phase === "open"
                  ? "scale-0 opacity-0 rotate-45"
                  : "scale-100 opacity-100"
              }`}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #e74c3c, #8b1a1a)",
                  border: "2px solid #a0522d",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15)",
                }}
              >
                {/* Kanji stamp on seal */}
                <span className="text-xl font-bold" style={{ color: "rgba(255,220,180,0.7)" }}>
                  作
                </span>
              </div>
            </div>

            {/* Letter paper — slides up from envelope */}
            <div
              className={`transition-all duration-600 ease-out ${
                phase === "open"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >
              <div
                className="mx-3 mb-3 mt-20 rounded-md p-6"
                style={{
                  backgroundColor: "#f5f0e8",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {/* Title with brush stroke underline */}
                <h3
                  className="font-heading text-xl font-bold mb-1"
                  style={{ color: "#1a1a1a" }}
                >
                  {title}
                </h3>
                <div
                  className="w-16 h-0.5 mb-4"
                  style={{ background: "linear-gradient(90deg, var(--color-accent-red), transparent)" }}
                />

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#3a3a3a" }}
                >
                  {description}
                </p>

                {/* Tech tags on paper */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "rgba(26,26,26,0.08)",
                        color: "#4a4a4a",
                        border: "1px solid rgba(26,26,26,0.15)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* GitHub link */}
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  style={{ color: "var(--color-accent-red)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                  {stars > 0 && (
                    <span className="inline-flex items-center gap-1" style={{ color: "var(--color-accent-gold)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                      </svg>
                      {stars}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-paper transition-all duration-300 ${
            phase === "open" ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ backgroundColor: "var(--color-accent-red)" }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
