import { getTranslations } from "next-intl/server";
import { SKILLS_DATA, type SkillCategory } from "@/lib/data";
import { ParchmentCard } from "@/components/ui/ParchmentCard";
import { ProficiencyBar } from "@/components/ui/ProficiencyBar";

const CATEGORY_ORDER: SkillCategory[] = [
  "languages",
  "frameworks",
  "infrastructure",
  "security",
];

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-12 font-bold">
        {t("heading")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CATEGORY_ORDER.map((category) => (
          <ParchmentCard key={category}>
            <h3 className="font-heading text-h3 text-paper font-bold mb-6">
              {t(`categories.${category}`)}
            </h3>
            <div className="flex flex-col gap-4">
              {SKILLS_DATA[category].map((skill) => (
                <ProficiencyBar
                  key={skill.key}
                  label={t(`items.${skill.key}`)}
                  percentage={skill.proficiency}
                />
              ))}
            </div>
          </ParchmentCard>
        ))}
      </div>
    </div>
  );
}
