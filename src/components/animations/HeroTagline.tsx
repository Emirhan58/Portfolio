"use client";
import { useTranslations } from "next-intl";
import { TypingEffect } from "./TypingEffect";

export function HeroTagline() {
  const t = useTranslations("hero");
  return (
    <TypingEffect
      jpText={t("jpTagline")}
      finalText={t("tagline")}
      statusText={t("resolving")}
    />
  );
}
