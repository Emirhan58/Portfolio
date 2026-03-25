import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const aboutSrc = safeRead("../../src/components/sections/About.tsx");

describe("About Section (CONT-02)", () => {
  it("About.tsx file exists", () => {
    expect(aboutSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(aboutSrc).not.toContain('"use client"');
  });

  it("uses getTranslations for i18n", () => {
    expect(aboutSrc).toMatch(/getTranslations.*about/);
  });

  it("exports async function About", () => {
    expect(aboutSrc).toMatch(/export\s+async\s+function\s+About/);
  });

  it("renders profile photo with ink-wash frame (mask-image)", () => {
    expect(aboutSrc).toContain("maskImage");
  });

  it("imports and uses STATS_DATA for stat counters", () => {
    expect(aboutSrc).toContain("STATS_DATA");
  });

  it("renders education info", () => {
    expect(aboutSrc).toMatch(/education\.degree|education\.university/);
  });

  it("uses Next.js Image component", () => {
    expect(aboutSrc).toContain("next/image");
  });
});
