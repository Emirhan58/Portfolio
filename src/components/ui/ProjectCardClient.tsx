"use client";

import { useState } from "react";
import { LetterModal } from "./LetterModal";

interface ProjectCardClientProps {
  title: string;
  description: string;
  tech: readonly string[];
  github: string;
  stars: number;
  children: React.ReactNode;
}

export function ProjectCardClient({
  title,
  description,
  tech,
  github,
  stars,
  children,
}: ProjectCardClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        {children}

        {/* Wax seal button — bottom right */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-4 right-4 z-10 group/seal"
          aria-label={`Read more about ${title}`}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover/seal:scale-110 group-hover/seal:shadow-[0_0_16px_rgba(231,76,60,0.4)]"
            style={{
              background: "radial-gradient(circle at 35% 35%, #e74c3c, #8b1a1a)",
              border: "2px solid #a0522d",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.15)",
            }}
          >
            <span className="text-sm" style={{ color: "rgba(255,220,180,0.7)" }}>
              作
            </span>
          </div>
        </button>
      </div>

      <LetterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        tech={tech}
        github={github}
        stars={stars}
      />
    </>
  );
}
