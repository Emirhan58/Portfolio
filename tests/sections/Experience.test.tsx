import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const experienceSrc = safeRead("../../src/components/sections/Experience.tsx");

describe("Experience Section (CONT-04)", () => {
  it("Experience.tsx file exists", () => {
    expect(experienceSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(experienceSrc).not.toContain('"use client"');
  });

  it("uses getTranslations for i18n", () => {
    expect(experienceSrc).toMatch(/getTranslations.*experience/);
  });

  it("exports async function Experience", () => {
    expect(experienceSrc).toMatch(/export\s+async\s+function\s+Experience/);
  });

  it("imports EXPERIENCE_DATA for timeline entries", () => {
    expect(experienceSrc).toContain("EXPERIENCE_DATA");
  });

  it("has vertical timeline with dashed/dotted line", () => {
    expect(experienceSrc).toMatch(/repeating-linear-gradient|dashed|dotted/);
  });

  it("alternates cards left/right on desktop", () => {
    expect(experienceSrc).toContain("flex-row-reverse");
  });

  it("has red timeline dots", () => {
    expect(experienceSrc).toContain("bg-accent-red");
  });

  it("uses TechTag for technology pills", () => {
    expect(experienceSrc).toContain("TechTag");
  });
});
