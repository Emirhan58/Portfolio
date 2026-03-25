import { getTranslations } from "next-intl/server";
import { ACHIEVEMENTS_DATA } from "@/lib/data";
import { MedalBadge } from "@/components/ui/MedalBadge";

export async function Achievements() {
  const t = await getTranslations("achievements");

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-12 font-bold">
        {t("heading")}
      </h2>

      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        {ACHIEVEMENTS_DATA.map((achievement) => (
          <MedalBadge
            key={achievement.key}
            name={t(`items.${achievement.key}.name`)}
            subtitle={t(`items.${achievement.key}.subtitle`)}
            description={t(`items.${achievement.key}.description`)}
            className="flex-1 max-w-[360px]"
          />
        ))}
      </div>
    </div>
  );
}
