import { getTranslations } from "next-intl/server";
import { ACHIEVEMENTS_DATA } from "@/lib/data";

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  fixedwing2021: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-accent-gold)" style={{ transform: "rotate(45deg)" }}>
      <path d="M12 2C12 2 11 2 11 3L11 8L3 13L3 15L11 12L11 19L8 21L8 22.5L12 21L16 22.5L16 21L13 19L13 12L21 15L21 13L13 8L13 3C13 2 12 2 12 2Z" />
    </svg>
  ),
  fixedwing2022: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-accent-gold)" style={{ transform: "rotate(45deg)" }}>
      <path d="M12 2C12 2 11 2 11 3L11 8L3 13L3 15L11 12L11 19L8 21L8 22.5L12 21L16 22.5L16 21L13 19L13 12L21 15L21 13L13 8L13 3C13 2 12 2 12 2Z" />
    </svg>
  ),
  rocket: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />
    </svg>
  ),
  cansat: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-8 font-bold">
        {t("heading")}
      </h2>

      <div className="flex flex-col gap-4">
        {ACHIEVEMENTS_DATA.map((achievement) => (
          <div
            key={achievement.key}
            className="flex items-start sm:items-center gap-4 sm:gap-5 bg-surface rounded-lg p-4 sm:p-5 border border-accent-gold/10"
          >
            {/* Medal circle */}
            <div className="w-12 h-12 min-w-[48px] sm:w-16 sm:h-16 sm:min-w-[64px] rounded-full border-2 border-accent-gold/40 flex items-center justify-center shadow-[0_0_10px_rgba(212,165,116,0.15)] mt-1 sm:mt-0">
              <div className="scale-75 sm:scale-100">
                {ACHIEVEMENT_ICONS[achievement.key]}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <h3 className="font-heading text-base sm:text-h3 text-paper font-bold">
                  {t(`items.${achievement.key}.name`)}
                </h3>
                <span className="text-small text-accent-gold font-medium">
                  {t(`items.${achievement.key}.subtitle`)}
                </span>
                {/* Date — inline on mobile */}
                <span className="text-small text-text-secondary sm:hidden">
                  {achievement.period}
                </span>
              </div>
              <p className="text-sm sm:text-body text-text-secondary mt-1">
                {t(`items.${achievement.key}.description`)}
              </p>
            </div>

            {/* Date — right side on desktop */}
            <span className="text-small text-text-secondary whitespace-nowrap hidden sm:block">
              {achievement.period}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
