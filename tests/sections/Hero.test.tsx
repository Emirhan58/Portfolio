import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const heroSrc = safeRead("../../src/components/sections/Hero.tsx");

describe("Hero Section (CONT-01)", () => {
  it("Hero.tsx file exists", () => {
    expect(heroSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(heroSrc).not.toContain('"use client"');
    expect(heroSrc).not.toContain("'use client'");
  });

  it("uses getTranslations for i18n", () => {
    expect(heroSrc).toMatch(/getTranslations.*hero/);
  });

  it("exports async function Hero", () => {
    expect(heroSrc).toMatch(/export\s+async\s+function\s+Hero/);
  });

  it("renders name with brush-style typography (clamp sizing)", () => {
    expect(heroSrc).toContain("clamp(");
    expect(heroSrc).toContain("font-heading");
  });

  it("has ink splash radial gradient background", () => {
    expect(heroSrc).toContain("radial-gradient");
  });

  it("has scroll-down indicator with bounce animation", () => {
    expect(heroSrc).toContain("animate-bounce");
  });
});

describe("CV Download (CONT-08)", () => {
  it("has download link to CV PDF", () => {
    expect(heroSrc).toContain('download');
    expect(heroSrc).toMatch(/href.*\.pdf/);
  });

  it("CTA button has accent-red styling", () => {
    expect(heroSrc).toContain("bg-accent-red");
  });
});
