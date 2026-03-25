import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const enJson = JSON.parse(
  readFileSync(resolve(__dirname, "../../src/messages/en.json"), "utf-8")
);
const trJson = JSON.parse(
  readFileSync(resolve(__dirname, "../../src/messages/tr.json"), "utf-8")
);
const routingTs = readFileSync(
  resolve(__dirname, "../../src/i18n/routing.ts"),
  "utf-8"
);
const middlewareTs = readFileSync(
  resolve(__dirname, "../../src/middleware.ts"),
  "utf-8"
);

describe("i18n Locale Configuration", () => {
  const requiredNavKeys = [
    "about",
    "skills",
    "experience",
    "projects",
    "achievements",
    "contact",
    "downloadCV",
  ];

  it("en.json contains all required nav keys", () => {
    for (const key of requiredNavKeys) {
      expect(enJson.nav).toHaveProperty(key);
    }
  });

  it("tr.json contains all the same keys as en.json (structural parity)", () => {
    const enKeys = Object.keys(enJson.nav);
    const trKeys = Object.keys(trJson.nav);
    expect(trKeys.sort()).toEqual(enKeys.sort());
  });

  it("routing.ts exports locales array containing en and tr", () => {
    expect(routingTs).toContain('"en"');
    expect(routingTs).toContain('"tr"');
    expect(routingTs).toContain("defineRouting");
  });

  it("middleware.ts imports from routing", () => {
    expect(middlewareTs).toContain("routing");
    expect(middlewareTs).toContain("createMiddleware");
  });
});
