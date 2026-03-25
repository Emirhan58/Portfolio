import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Load messages JSON for a locale.
 */
export function loadMessages(locale: "en" | "tr") {
  const filePath = resolve(__dirname, `../../src/messages/${locale}.json`);
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

/**
 * Get all keys from a nested object as dot-separated paths.
 */
export function getNestedKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getNestedKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}
