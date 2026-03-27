import { cn } from "@/lib/cn";
import type { SectionId } from "@/lib/constants";
import { SECTION_KANJI } from "@/lib/constants";

interface SectionShellProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  showKanji?: boolean;
  bgImage?: string;
}

export function SectionShell({ id, children, className, showKanji = true, bgImage }: SectionShellProps) {
  return (
    <section
      id={id}
      data-section
      className={cn(
        "relative min-h-screen py-section-mobile lg:py-section",
        className
      )}
    >
      {bgImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
      )}
      {bgImage && (
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg via-bg/80 to-bg/60" />
      )}
      {showKanji && (
        <span
          className="absolute top-8 right-8 font-kanji text-[8rem] lg:text-[12rem] text-accent-gold/10 select-none pointer-events-none z-[1]"
          aria-hidden="true"
        >
          {SECTION_KANJI[id]}
        </span>
      )}
      <div className={bgImage ? "relative z-[1]" : undefined}>
        {children}
      </div>
    </section>
  );
}
