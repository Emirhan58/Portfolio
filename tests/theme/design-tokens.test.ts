import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const globalsCss = readFileSync(
  resolve(__dirname, "../../src/app/globals.css"),
  "utf-8"
);

describe("Design Tokens", () => {
  it("contains --color-bg: #0a0a0a", () => {
    expect(globalsCss).toContain("--color-bg: #0a0a0a");
  });

  it("contains --color-accent-red: #c0392b", () => {
    expect(globalsCss).toContain("--color-accent-red: #c0392b");
  });

  it("contains --color-accent-gold: #d4a574", () => {
    expect(globalsCss).toContain("--color-accent-gold: #d4a574");
  });

  it("contains --color-paper: #f5f0e8", () => {
    expect(globalsCss).toContain("--color-paper: #f5f0e8");
  });

  it("contains --font-heading", () => {
    expect(globalsCss).toContain("--font-heading");
  });

  it("contains --font-body", () => {
    expect(globalsCss).toContain("--font-body");
  });

  it("contains prefers-reduced-motion: reduce", () => {
    expect(globalsCss).toContain("prefers-reduced-motion: reduce");
  });
});
