import { getTranslations } from "next-intl/server";
import { EXPERIENCE_DATA } from "@/lib/data";
import { TechTag } from "@/components/ui/TechTag";
import { cn } from "@/lib/cn";

export async function Experience() {
  const t = await getTranslations("experience");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-16 font-bold">
        {t("heading")}
      </h2>

      {/* Timeline container */}
      <div className="relative">
        {/* Vertical dashed line — desktop only */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(160, 160, 160, 0.3) 0px, rgba(160, 160, 160, 0.3) 6px, transparent 6px, transparent 12px)",
          }}
          aria-hidden="true"
        />

        {/* Timeline entries */}
        <div className="flex flex-col gap-12">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div
              key={exp.key}
              className={cn(
                "relative flex flex-col lg:flex-row lg:gap-12",
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              {/* Timeline dot */}
              <div
                className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-red z-10"
                aria-hidden="true"
              />

              {/* Card */}
              <div
                className={cn(
                  "lg:w-[calc(50%-24px)]",
                  index % 2 === 0 ? "lg:ml-0" : "lg:mr-0",
                  // Mobile: left border instead of center timeline
                  "border-l-[3px] border-accent-red/50 lg:border-l-0",
                  "pl-6 lg:pl-0"
                )}
              >
                <div className="bg-bg rounded-lg p-6">
                  <h3 className="font-heading text-h3 text-paper font-bold">
                    {t(`positions.${exp.key}.company`)}
                  </h3>
                  <p className="text-body text-accent-gold mt-1">
                    {t(`positions.${exp.key}.role`)}
                  </p>
                  <p className="text-body text-text-secondary mt-1">
                    {t(`positions.${exp.key}.period`)}
                    {t.has(`positions.${exp.key}.location`) &&
                      ` \u2014 ${t(`positions.${exp.key}.location`)}`}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2">
                    {(
                      t.raw(`positions.${exp.key}.bullets`) as string[]
                    ).map((bullet: string, i: number) => (
                      <li
                        key={i}
                        className="text-body text-text-secondary leading-relaxed flex gap-2"
                      >
                        <span className="text-accent-red mt-1.5 flex-shrink-0">
                          &#x2022;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden lg:block lg:w-[calc(50%-24px)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
