---
phase: 03-animations
plan: 01
subsystem: testing, animations
tags: [gsap, DrawSVGPlugin, CustomEase, vitest, test-stubs]

requires:
  - phase: 01-foundation
    provides: GSAP config with ScrollTrigger and useGSAP
  - phase: 01-foundation
    provides: useReducedMotion hook with motion tiers
provides:
  - GSAP DrawSVGPlugin and CustomEase plugin registration
  - 7 animation test stub files (25 todo tests) for Nyquist compliance
affects: [03-02, 03-03, 03-04]

tech-stack:
  added: [gsap/DrawSVGPlugin, gsap/CustomEase]
  patterns: [it.todo test stubs for Nyquist pre-testing]

key-files:
  created:
    - tests/animations/KanjiIntro.test.tsx
    - tests/animations/InkSplashReveal.test.tsx
    - tests/animations/SectionDivider.test.tsx
    - tests/animations/ParallaxLayers.test.tsx
    - tests/animations/SakuraFall.test.tsx
    - tests/animations/StatCounter.test.tsx
    - tests/animations/TypingEffect.test.tsx
  modified:
    - src/lib/gsap-config.ts
    - tests/lib/gsap-config.test.ts

key-decisions:
  - "Updated existing gsap-config test to verify new exports (Rule 1 deviation)"

patterns-established:
  - "it.todo() stubs in tests/animations/ for each animation component"
  - "Single gsap.registerPlugin call for all plugins"

requirements-completed: [ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-08]

duration: 2min
completed: 2026-03-26
---

# Phase 03 Plan 01: Test Stubs and GSAP Plugin Registration Summary

**GSAP DrawSVGPlugin + CustomEase registration and 25 todo test stubs across 7 animation component files**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-26T11:43:38Z
- **Completed:** 2026-03-26T11:45:15Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Registered DrawSVGPlugin and CustomEase in gsap-config.ts for Plans 02-04
- Created 7 test stub files with 25 it.todo() markers covering all animation components
- All test stubs pass (skipped/todo state) with zero regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Register DrawSVGPlugin and CustomEase** - `80e9d55` (feat)
2. **Task 2: Create test stubs for all 7 animation components** - `bffaf7b` (test)

## Files Created/Modified
- `src/lib/gsap-config.ts` - Added DrawSVGPlugin and CustomEase imports, registration, and exports
- `tests/lib/gsap-config.test.ts` - Updated to verify new plugin exports
- `tests/animations/KanjiIntro.test.tsx` - 6 todo stubs for kanji brush intro animation
- `tests/animations/InkSplashReveal.test.tsx` - 3 todo stubs for ink splash scroll reveal
- `tests/animations/SectionDivider.test.tsx` - 3 todo stubs for animated section dividers
- `tests/animations/ParallaxLayers.test.tsx` - 3 todo stubs for parallax background layers
- `tests/animations/SakuraFall.test.tsx` - 4 todo stubs for sakura petal particle system
- `tests/animations/StatCounter.test.tsx` - 3 todo stubs for animated stat counters
- `tests/animations/TypingEffect.test.tsx` - 3 todo stubs for typing effect animation

## Decisions Made
- Updated existing gsap-config.test.ts to match new exports (auto-fix, Rule 1 - test would fail otherwise)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated gsap-config test for new exports**
- **Found during:** Task 1 (GSAP plugin registration)
- **Issue:** Existing test asserted `export { gsap, ScrollTrigger, useGSAP }` which no longer matches
- **Fix:** Updated assertion to check for all 5 exports plus added DrawSVGPlugin and CustomEase import checks
- **Files modified:** tests/lib/gsap-config.test.ts
- **Verification:** `npx vitest run tests/lib/gsap-config.test.ts` - 5/5 pass
- **Committed in:** 80e9d55 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Necessary to keep existing tests green after changing exports. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- GSAP plugins registered and ready for Plans 02-04 animation implementation
- Test stubs provide verification scaffold - each plan will convert todos to real tests
- 2 pre-existing test failures in Achievements.test.tsx and Projects.test.tsx (unrelated to this plan)

## Self-Check: PASSED

- All 9 files verified present on disk
- Both task commits (80e9d55, bffaf7b) verified in git log

---
*Phase: 03-animations*
*Completed: 2026-03-26*
