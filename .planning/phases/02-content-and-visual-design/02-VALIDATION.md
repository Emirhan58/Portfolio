---
phase: 02
slug: content-and-visual-design
status: draft
nyquist_compliant: false  # Will become true after 02-00 executes
wave_0_complete: false
created: 2026-03-25
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 with jsdom |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose && npx next build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose && npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | CONT-01 | unit | `npx vitest run tests/sections/Hero.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 0 | CONT-02 | unit | `npx vitest run tests/sections/About.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 0 | CONT-03 | unit | `npx vitest run tests/sections/Skills.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 0 | CONT-04 | unit | `npx vitest run tests/sections/Experience.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-05 | 01 | 0 | CONT-05 | unit | `npx vitest run tests/sections/Projects.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-06 | 01 | 0 | CONT-06 | unit | `npx vitest run tests/sections/Achievements.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-07 | 01 | 0 | CONT-07 | unit | `npx vitest run tests/sections/Contact.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-08 | 01 | 0 | CONT-08 | unit | `npx vitest run tests/sections/Hero.test.tsx -t "CV download"` | ❌ W0 | ⬜ pending |
| 02-01-09 | 01 | 0 | — | unit | `npx vitest run tests/i18n/messages-parity.test.ts` | ❌ W0 | ⬜ pending |
| 02-xx-xx | xx | 1+ | VISL-01 | unit | Kanji font class covered by SectionShell tests | ✅ Partial | ⬜ pending |
| 02-xx-xx | xx | 1+ | VISL-02 | smoke | `npx next build` (CSS validity) | N/A | ⬜ pending |
| 02-xx-xx | xx | 1+ | VISL-03 | unit | Decorative kanji tested in Phase 1 SectionShell | ✅ | ⬜ pending |
| 02-xx-xx | xx | 1+ | VISL-04 | smoke | `npx next build` (divider elements) | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/sections/Hero.test.tsx` — stubs for CONT-01, CONT-08
- [ ] `tests/sections/About.test.tsx` — stubs for CONT-02
- [ ] `tests/sections/Skills.test.tsx` — stubs for CONT-03
- [ ] `tests/sections/Experience.test.tsx` — stubs for CONT-04
- [ ] `tests/sections/Projects.test.tsx` — stubs for CONT-05
- [ ] `tests/sections/Achievements.test.tsx` — stubs for CONT-06
- [ ] `tests/sections/Contact.test.tsx` — stubs for CONT-07
- [ ] `tests/i18n/messages-parity.test.ts` — verifies en.json and tr.json have identical key structure
- [ ] Test helper: next-intl mock provider for Server Component translation testing

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Paper grain texture visible at 5-10% opacity | VISL-02 | Visual quality subjective | Open in browser, inspect background noise texture on sections |
| Ink-wash effect on hero/About/card edges | VISL-02 | Visual quality subjective | Verify subtle ink wash on hero bg, About photo frame, card borders |
| Kanji decorations render correctly (門道技戦作誉結) | VISL-01 | Font rendering varies by OS | Verify Noto Serif JP renders all 7 characters, no fallback boxes |
| Mobile responsive layout | — | Layout verification | Test at 375px, 768px, 1024px widths |
| Katana slash dividers visible | VISL-04 | Visual quality subjective | Verify thin red diagonal lines between sections at 20-30% opacity |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
