import { setRequestLocale } from "next-intl/server";
import { SECTION_IDS } from "@/lib/constants";
import type { SectionId } from "@/lib/constants";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionDivider } from "@/components/layout/SectionDivider";

// Placeholder components — replaced by real sections in Plans 02-02 and 02-03
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {SECTION_IDS.map((id, index) => (
        <div key={id}>
          <SectionShell
            id={id}
            className={`${SECTION_BG[id]} ${id === "hero" ? "min-h-[90vh]" : ""}`}
          >
            <PlaceholderSection id={id} />
          </SectionShell>
          {index < SECTION_IDS.length - 1 && <SectionDivider />}
        </div>
      ))}
    </main>
  );
}
