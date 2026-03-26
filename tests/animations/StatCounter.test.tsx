import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

function safeRead(filePath: string): string {
  try {
    return fs.readFileSync(path.resolve(filePath), "utf-8");
  } catch {
    return "";
  }
}

describe("StatCounter", () => {
  const src = safeRead("src/components/animations/StatCounter.tsx");

  it("exists with use client directive", () => {
    expect(src).toBeTruthy();
    expect(src).toContain('"use client"');
  });

  it("accepts value (number) and suffix (string) props", () => {
    expect(src).toContain("value: number");
    expect(src).toContain("suffix");
  });

  it("uses gsap.to with val: value pattern", () => {
    expect(src).toContain("gsap.to(obj");
    expect(src).toContain("val: value");
  });

  it("uses snap: { val: 1 } for whole numbers", () => {
    expect(src).toContain("snap: { val: 1 }");
  });

  it("has scrollTrigger with once: true", () => {
    expect(src).toContain("scrollTrigger");
    expect(src).toContain("once: true");
  });

  it("shows final value when shouldAnimate is false", () => {
    expect(src).toContain("shouldAnimate");
    // When not animating, shows value+suffix directly
    expect(src).toMatch(/\$\{value\}\$\{suffix\}/);
  });

  it("imports from gsap-config", () => {
    expect(src).toContain("@/lib/gsap-config");
  });
});
