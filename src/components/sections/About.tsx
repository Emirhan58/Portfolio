import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { STATS_DATA } from "@/lib/data";

export async function About() {
  const t = await getTranslations("about");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section heading */}
      <h2 className="font-heading text-h2 text-paper text-center mb-12 font-bold">
        {t("heading")}
      </h2>

      {/* Photo + Bio grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile photo with ink-wash frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-[200px] h-[200px]">
            <Image
              src="/images/emirhan-3.jpg"
              alt={t("photoAlt")}
              fill
              className="object-cover"
              sizes="200px"
              style={{
                maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 8c25 -2 48 8 65 25s28 40 27 65c-1 25 -12 48 -30 63s-42 23 -65 22c-23 -1 -45 -10 -60 -27S12 116 13 93c1 -23 13 -45 32 -60S75 10 100 8z' fill='black'/%3E%3C/svg%3E")`,
                maskSize: "cover",
                maskRepeat: "no-repeat",
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 8c25 -2 48 8 65 25s28 40 27 65c-1 25 -12 48 -30 63s-42 23 -65 22c-23 -1 -45 -10 -60 -27S12 116 13 93c1 -23 13 -45 32 -60S75 10 100 8z' fill='black'/%3E%3C/svg%3E")`,
                WebkitMaskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
            {/* Ink-wash ring decoration */}
            <div
              className="absolute inset-[-8px] rounded-full border-2 border-accent-gold/20 pointer-events-none"
              style={{
                borderRadius: "48% 52% 45% 55% / 52% 48% 52% 48%",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bio + Education */}
        <div className="lg:col-span-7">
          <p className="text-body text-paper leading-relaxed max-w-[600px]">
            {t("bio")}
          </p>
          {/* Education */}
          <div className="mt-4 text-body text-text-secondary">
            <p>
              {t("education.degree")} — {t("education.university")}
            </p>
            <p>
              {t("education.period")} | {t("education.gpa")}
            </p>
          </div>
        </div>
      </div>

      {/* Stat counters */}
      <div className="grid grid-cols-3 gap-8 mt-12 max-w-lg mx-auto text-center">
        {STATS_DATA.map((stat) => (
          <div key={stat.key}>
            <span className="block font-heading text-h2 text-accent-red font-bold">
              {stat.value}
            </span>
            <span className="text-body text-text-secondary">
              {t(`stats.${stat.key}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
