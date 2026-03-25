import { getTranslations } from "next-intl/server";
import { ACHIEVEMENTS_DATA } from "@/lib/data";
import { MedalBadge } from "@/components/ui/MedalBadge";

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  teknofest: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Rocket icon */}
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />
    </svg>
  ),
  cansat: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Satellite icon */}
      <path d="M13 7L9 3 5 7l4 4" />
      <path d="M17 11l4 4-4 4-4-4" />
      <path d="M8 12l4 4" />
      <path d="M16 8l-4-4" />
      <circle cx="18" cy="18" r="3" />
      <path d="M4.9 19.1C2 16.2 2 11.8 4.9 8.9" />
      <path d="M7.8 16.2c-1.7-1.7-1.7-4.7 0-6.4" />
    </svg>
  ),
};

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
            icon={ACHIEVEMENT_ICONS[achievement.key]}
            className="flex-1 max-w-[360px]"
          />
        ))}
      </div>
    </div>
  );
}
