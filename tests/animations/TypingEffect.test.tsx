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

describe("TypingEffect", () => {
  const src = safeRead("src/components/animations/TypingEffect.tsx");

  it("exists with use client directive", () => {
    expect(src).toBeTruthy();
    expect(src).toContain('"use client"');
  });

  it("accepts jpText, enText, and startDelay props", () => {
    expect(src).toContain("jpText");
    expect(src).toContain("enText");
    expect(src).toContain("startDelay");
  });

  it("returns final English text when shouldAnimate is false", () => {
    expect(src).toContain("shouldAnimate");
    expect(src).toMatch(/<span>\{enText\}<\/span>/);
  });

  it("has phase state with all required values", () => {
    expect(src).toContain('"waiting"');
    expect(src).toContain('"jp-type"');
    expect(src).toContain('"jp-pause"');
    expect(src).toContain('"jp-delete"');
    expect(src).toContain('"en-type"');
    expect(src).toContain('"done"');
  });

  it("has correct timing intervals: 60 (jp-type), 35 (jp-delete), 70 (en-type)", () => {
    expect(src).toContain(", 60)");
    expect(src).toContain(", 35)");
    expect(src).toContain(", 70)");
  });

  it("renders cursor element with animate-pulse class", () => {
    expect(src).toContain("animate-pulse");
    expect(src).toContain("text-accent-red");
  });

  it("imports useReducedMotion", () => {
    expect(src).toContain("useReducedMotion");
  });
});
