import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const achievementsSrc = safeRead("../../src/components/sections/Achievements.tsx");

describe("Achievements Section (CONT-06)", () => {
  it("Achievements.tsx file exists", () => {
    expect(achievementsSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(achievementsSrc).not.toContain('"use client"');
  });

  it("uses getTranslations for i18n", () => {
    expect(achievementsSrc).toMatch(/getTranslations.*achievements/);
  });

  it("exports async function Achievements", () => {
    expect(achievementsSrc).toMatch(/export\s+async\s+function\s+Achievements/);
  });

  it("imports ACHIEVEMENTS_DATA", () => {
    expect(achievementsSrc).toContain("ACHIEVEMENTS_DATA");
  });

  it("uses MedalBadge component for medal/badge display", () => {
    expect(achievementsSrc).toContain("MedalBadge");
  });
});
