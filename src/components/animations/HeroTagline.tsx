"use client";
import { useTranslations } from "next-intl";
import { TypingEffect } from "./TypingEffect";

export function HeroTagline() {
  const t = useTranslations("hero");
  return (
    <TypingEffect
      jpText="\u7CBE\u5BC6\u3068\u76EE\u7684\u3092\u6301\u3063\u3066\u69CB\u7BC9\u3059\u308B"
      enText={t("tagline")}
      startDelay={1500}
    />
  );
}
