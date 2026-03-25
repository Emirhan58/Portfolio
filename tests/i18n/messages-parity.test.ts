import { describe, it, expect } from "vitest";
import { loadMessages, getNestedKeys } from "../helpers/next-intl-mock";

describe("i18n Messages Parity (all sections)", () => {
  const en = loadMessages("en");
  const tr = loadMessages("tr");

  const REQUIRED_SECTIONS = [
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "achievements",
    "contact",
  ];

  it("en.json contains all required section namespaces", () => {
    for (const section of REQUIRED_SECTIONS) {
      expect(en).toHaveProperty(section);
    }
  });

  it("tr.json contains all required section namespaces", () => {
    for (const section of REQUIRED_SECTIONS) {
      expect(tr).toHaveProperty(section);
    }
  });

  for (const section of REQUIRED_SECTIONS) {
    it(`${section}: en.json and tr.json have identical key structure`, () => {
      const enKeys = getNestedKeys(en[section] ?? {});
      const trKeys = getNestedKeys(tr[section] ?? {});
      expect(trKeys).toEqual(enKeys);
    });
  }

  it("hero section has required keys: name, role, tagline, downloadCV", () => {
    expect(en.hero).toHaveProperty("name");
    expect(en.hero).toHaveProperty("role");
    expect(en.hero).toHaveProperty("tagline");
    expect(en.hero).toHaveProperty("downloadCV");
  });

  it("about section has required keys: heading, bio, stats, education", () => {
    expect(en.about).toHaveProperty("heading");
    expect(en.about).toHaveProperty("bio");
    expect(en.about).toHaveProperty("stats");
    expect(en.about).toHaveProperty("education");
  });
});
