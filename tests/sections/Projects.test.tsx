import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const projectsSrc = safeRead("../../src/components/sections/Projects.tsx");

describe("Projects Section (CONT-05)", () => {
  it("Projects.tsx file exists", () => {
    expect(projectsSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(projectsSrc).not.toContain('"use client"');
  });

  it("uses getTranslations for i18n", () => {
    expect(projectsSrc).toMatch(/getTranslations.*projects/);
  });

  it("exports async function Projects", () => {
    expect(projectsSrc).toMatch(/export\s+async\s+function\s+Projects/);
  });

  it("imports PROJECTS_DATA for project entries", () => {
    expect(projectsSrc).toContain("PROJECTS_DATA");
  });

  it("uses masonry layout via CSS columns", () => {
    expect(projectsSrc).toContain("columns");
    expect(projectsSrc).toContain("break-inside-avoid");
  });

  it("uses ParchmentCard for parchment-style cards", () => {
    expect(projectsSrc).toContain("ParchmentCard");
  });

  it("has hover ink-wash overlay", () => {
    expect(projectsSrc).toMatch(/group-hover.*opacity/);
  });

  it("renders GitHub links", () => {
    expect(projectsSrc).toContain("github");
    expect(projectsSrc).toContain('target="_blank"');
  });
});
