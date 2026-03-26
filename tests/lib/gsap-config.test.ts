import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "../../src/lib/gsap-config.ts");
const content = readFileSync(filePath, "utf-8");

describe("gsap-config.ts", () => {
  it('starts with "use client" directive', () => {
    expect(content.trimStart().startsWith('"use client"')).toBe(true);
  });

  it("registers GSAP plugins via gsap.registerPlugin", () => {
    expect(content).toContain("gsap.registerPlugin");
  });

  it("exports gsap, ScrollTrigger, DrawSVGPlugin, CustomEase, and useGSAP", () => {
    expect(content).toContain(
      "export { gsap, ScrollTrigger, DrawSVGPlugin, CustomEase, useGSAP }"
    );
  });

  it("imports DrawSVGPlugin from gsap/DrawSVGPlugin", () => {
    expect(content).toContain('import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"');
  });

  it("imports CustomEase from gsap/CustomEase", () => {
    expect(content).toContain('import { CustomEase } from "gsap/CustomEase"');
  });
});
