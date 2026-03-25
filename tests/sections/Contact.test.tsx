import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function safeRead(rel: string): string {
  const p = resolve(__dirname, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

const contactSrc = safeRead("../../src/components/sections/Contact.tsx");

describe("Contact Section (CONT-07)", () => {
  it("Contact.tsx file exists", () => {
    expect(contactSrc.length).toBeGreaterThan(0);
  });

  it("is a Server Component (no 'use client')", () => {
    expect(contactSrc).not.toContain('"use client"');
  });

  it("uses getTranslations for i18n", () => {
    expect(contactSrc).toMatch(/getTranslations.*contact/);
  });

  it("exports async function Contact", () => {
    expect(contactSrc).toMatch(/export\s+async\s+function\s+Contact/);
  });

  it("imports CONTACT_LINKS from data module", () => {
    expect(contactSrc).toContain("CONTACT_LINKS");
  });

  it("uses MonIcon for mon crest-styled icons", () => {
    expect(contactSrc).toContain("MonIcon");
  });

  it("has inline SVG icons for email, GitHub, LinkedIn", () => {
    expect(contactSrc).toContain("viewBox");
    // At least 3 SVG elements for 3 contact methods
    const svgCount = (contactSrc.match(/<svg/g) || []).length;
    expect(svgCount).toBeGreaterThanOrEqual(3);
  });
});
