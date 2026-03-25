import { setRequestLocale } from "next-intl/server";
import { SECTION_IDS } from "@/lib/constants";
import type { SectionId } from "@/lib/constants";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";

// Placeholder for sections not yet implemented (Plan 02-03 replaces these)
function PlaceholderSection({ id }: { id: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-20">
      <h2 className="font-heading text-h2 text-text-primary capitalize">{id}</h2>
    </div>
  );
}

const SECTION_BG: Record<SectionId, string> = {
  hero: "bg-bg",
  about: "bg-surface",
  skills: "bg-bg",
  experience: "bg-surface",
  projects: "bg-bg",
  achievements: "bg-surface",
  contact: "bg-bg",
};

const SECTION_COMPONENTS: Partial<
  Record<SectionId, React.ComponentType>
> = {
  hero: Hero as unknown as React.ComponentType,
  about: About as unknown as React.ComponentType,
  skills: Skills as unknown as React.ComponentType,
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {SECTION_IDS.map((id, index) => {
        const Component = SECTION_COMPONENTS[id];
        return (
          <div key={id}>
            <SectionShell
              id={id}
              className={`${SECTION_BG[id]} ${id === "hero" ? "min-h-[90vh]" : ""}`}
            >
              {Component ? <Component /> : <PlaceholderSection id={id} />}
            </SectionShell>
            {index < SECTION_IDS.length - 1 && <SectionDivider />}
          </div>
        );
      })}
    </main>
  );
}
