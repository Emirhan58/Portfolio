"use client";
import { StatCounter } from "./StatCounter";
import { STATS_DATA } from "@/lib/data";
import { useTranslations } from "next-intl";

export function StatGrid() {
  const t = useTranslations("about");
  return (
    <div className="grid grid-cols-3 gap-6 w-full max-w-xs text-center mt-2">
      {STATS_DATA.map((stat) => (
        <div key={stat.key}>
          <span className="block font-heading text-h2 text-accent-red font-bold">
            <StatCounter
              value={parseInt(stat.value)}
              suffix={stat.value.includes("+") ? "+" : ""}
            />
          </span>
          <span className="text-small text-text-secondary">
            {t(`stats.${stat.key}`)}
          </span>
        </div>
      ))}
    </div>
  );
}
