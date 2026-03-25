import { setRequestLocale } from "next-intl/server";
import { SECTION_IDS } from "@/lib/constants";
import type { SectionId } from "@/lib/constants";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

const SECTION_BG: Record<SectionId, string> = {
  hero: "bg-bg",
  about: "bg-surface",
  skills: "bg-bg",
  experience: "bg-surface",
  projects: "bg-bg",
  achievements: "bg-surface",
  contact: "bg-bg",
};

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  hero: Hero as unknown as React.ComponentType,
  about: About as unknown as React.ComponentType,
  skills: Skills as unknown as React.ComponentType,
  experience: Experience as unknown as React.ComponentType,
  projects: Projects as unknown as React.ComponentType,
  achievements: Achievements as unknown as React.ComponentType,
  contact: Contact as unknown as React.ComponentType,
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
              className={`${SECTION_BG[id]} ${id === "hero" ? "min-h-[90vh]" : ""} ${id !== "hero" && id !== "skills" && id !== "experience" ? "flex flex-col justify-center" : ""}`}
            >
              <Component />
            </SectionShell>
            {index < SECTION_IDS.length - 1 && <SectionDivider />}
          </div>
        );
      })}
    </main>
  );
}
