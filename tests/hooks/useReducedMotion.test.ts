import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "../../src/hooks/useReducedMotion.ts");
const content = readFileSync(filePath, "utf-8");

describe("useReducedMotion.ts", () => {
  it("defines MotionTier type with full, reduced, and none", () => {
    expect(content).toContain('type MotionTier = "full" | "reduced" | "none"');
  });

  it("exposes shouldAnimate flag", () => {
    expect(content).toContain("shouldAnimate");
  });

  it("exposes shouldParticle flag", () => {
    expect(content).toContain("shouldParticle");
  });

  it("exposes shouldParallax flag", () => {
    expect(content).toContain("shouldParallax");
  });

  it("exposes shouldSnap flag", () => {
    expect(content).toContain("shouldSnap");
  });

  it("checks prefers-reduced-motion: reduce media query", () => {
    expect(content).toContain("prefers-reduced-motion: reduce");
  });

  it("checks max-width: 768px mobile breakpoint", () => {
    expect(content).toContain("max-width: 768px");
  });
});
