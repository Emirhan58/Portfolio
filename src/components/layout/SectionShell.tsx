import { cn } from "@/lib/cn";
import type { SectionId } from "@/lib/constants";
import { SECTION_KANJI } from "@/lib/constants";

interface SectionShellProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  showKanji?: boolean;
}

export function SectionShell({ id, children, className, showKanji = true }: SectionShellProps) {
  return (
    <section
      id={id}
      data-section
      className={cn(
        "relative min-h-screen py-section-mobile lg:py-section",
        className
      )}
    >
      {showKanji && (
        <span
          className="absolute top-8 right-8 font-kanji text-[8rem] lg:text-[12rem] text-accent-gold/10 select-none pointer-events-none"
          aria-hidden="true"
        >
          {SECTION_KANJI[id]}
        </span>
      )}
      {children}
    </section>
  );
}
