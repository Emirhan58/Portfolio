import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const skillsSrc = safeRead("../../src/components/sections/Skills.tsx");

describe("Skills Section (CONT-03)", () => {
  it("Skills.tsx file exists", () => {
    expect(skillsSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(skillsSrc).not.toContain('"use client"');
  });

  it("uses getTranslations for i18n", () => {
    expect(skillsSrc).toMatch(/getTranslations.*skills/);
  });

  it("exports async function Skills", () => {
    expect(skillsSrc).toMatch(/export\s+async\s+function\s+Skills/);
  });

  it("imports SKILLS_DATA from data module", () => {
    expect(skillsSrc).toContain("SKILLS_DATA");
  });

  it("uses ParchmentCard for scroll/tomar display", () => {
    expect(skillsSrc).toContain("ParchmentCard");
  });

  it("uses ProficiencyBar for katana-styled bars", () => {
    expect(skillsSrc).toContain("ProficiencyBar");
  });

  it("has 4 skill categories", () => {
    expect(skillsSrc).toContain("languages");
    expect(skillsSrc).toContain("frameworks");
    expect(skillsSrc).toContain("infrastructure");
    expect(skillsSrc).toContain("security");
  });
});
