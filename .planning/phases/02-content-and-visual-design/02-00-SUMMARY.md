---
phase: 02-content-and-visual-design
plan: 00
subsystem: testing
tags: [vitest, i18n, tdd, file-system-assertions, server-components]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: vitest config, i18n message files, project structure
provides:
  - 7 section component test stubs (Hero, About, Skills, Experience, Projects, Achievements, Contact)
  - i18n messages parity test for all 7 section namespaces
  - next-intl mock helper (loadMessages, getNestedKeys)
affects: [02-01, 02-02, 02-03]

# Tech tracking
tech-stack:
  added: []
  patterns: [file-system-read testing for Server Components, safeRead helper pattern]

key-files:
  created:
    - tests/helpers/next-intl-mock.ts
    - tests/i18n/messages-parity.test.ts
    - tests/sections/Hero.test.tsx
    - tests/sections/About.test.tsx
    - tests/sections/Skills.test.tsx
    - tests/sections/Experience.test.tsx
    - tests/sections/Projects.test.tsx
    - tests/sections/Achievements.test.tsx
    - tests/sections/Contact.test.tsx
  modified: []

key-decisions:
  - "File-system read pattern for Server Component tests (no React rendering in jsdom)"
  - "safeRead helper returns empty string on missing files instead of crashing test suite"

patterns-established:
  - "safeRead pattern: use existsSync + readFileSync to safely read component source for assertions"
  - "Section test structure: each test file covers one CONT-XX requirement with behavioral string assertions"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08]

# Metrics
duration: 2min
completed: 2026-03-25
---

# Phase 02 Plan 00: Test Stubs Summary

**9 test files establishing RED verification layer for all 7 section components and i18n parity across CONT-01 through CONT-08**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-25T14:21:32Z
- **Completed:** 2026-03-25T14:23:20Z
- **Tasks:** 2
- **Files created:** 9

## Accomplishments
- next-intl mock helper with loadMessages and getNestedKeys utilities for test reuse
- i18n messages parity test validating all 7 section namespaces between en.json and tr.json
- 7 section test files with 56 behavioral assertions covering CONT-01 through CONT-08
- All tests run without crashing; 57 failures confirm expected RED state (components not created yet)

## Task Commits

Each task was committed atomically:

1. **Task 1: next-intl mock helper and i18n messages parity test** - `c48e6da` (test)
2. **Task 2: Section component test stubs for CONT-01 through CONT-08** - `025027b` (test)

## Files Created/Modified
- `tests/helpers/next-intl-mock.ts` - loadMessages and getNestedKeys helpers for i18n test utilities
- `tests/i18n/messages-parity.test.ts` - Validates structural parity of all 7 section namespaces between en.json and tr.json
- `tests/sections/Hero.test.tsx` - CONT-01 (hero content) and CONT-08 (CV download) behavioral assertions
- `tests/sections/About.test.tsx` - CONT-02 assertions: Server Component, i18n, mask-image, STATS_DATA, education
- `tests/sections/Skills.test.tsx` - CONT-03 assertions: SKILLS_DATA, ParchmentCard, ProficiencyBar, 4 categories
- `tests/sections/Experience.test.tsx` - CONT-04 assertions: EXPERIENCE_DATA, timeline, alternating cards, TechTag
- `tests/sections/Projects.test.tsx` - CONT-05 assertions: PROJECTS_DATA, masonry columns, ParchmentCard, GitHub links
- `tests/sections/Achievements.test.tsx` - CONT-06 assertions: ACHIEVEMENTS_DATA, MedalBadge component
- `tests/sections/Contact.test.tsx` - CONT-07 assertions: CONTACT_LINKS, MonIcon, inline SVG icons

## Decisions Made
- Used file-system read pattern (matching existing locale-switch.test.ts) instead of React rendering -- Server Components cannot render in jsdom
- safeRead helper returns empty string on missing files so test suite completes without crashes, giving meaningful per-assertion failure messages

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All RED tests in place; Plans 02-01, 02-02, 02-03 will create components that turn these tests GREEN
- i18n parity test will require section namespaces added to en.json and tr.json (Plan 02-01)

## Self-Check: PASSED

- All 9 files confirmed present on disk
- Commits c48e6da and 025027b verified in git log

---
*Phase: 02-content-and-visual-design*
*Completed: 2026-03-25*
