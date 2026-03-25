export const SECTION_IDS = [
  "hero", "about", "skills", "experience",
  "projects", "achievements", "contact"
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_KANJI: Record<SectionId, string> = {
  hero: "\u9580", about: "\u9053", skills: "\u6280", experience: "\u6226",
  projects: "\u4F5C", achievements: "\u8A89", contact: "\u7D50"
};

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
