import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "../../src/hooks/useScrollSection.ts");
const content = readFileSync(filePath, "utf-8");

describe("useScrollSection.ts", () => {
  it("uses IntersectionObserver for section detection", () => {
    expect(content).toContain("IntersectionObserver");
  });

  it("imports SECTION_IDS from constants", () => {
    expect(content).toContain("SECTION_IDS");
  });

  it("sets intersection threshold to 0.5", () => {
    expect(content).toContain("threshold: 0.5");
  });

  it("exports useScrollSection function", () => {
    expect(content).toContain("export function useScrollSection");
  });
});
