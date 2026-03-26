---
phase: 03-animations
plan: 02
subsystem: ui
tags: [gsap, drawsvg, kanji, animation, svg, customease, sessionStorage]

# Dependency graph
requires:
  - phase: 03-01
    provides: GSAP config with DrawSVGPlugin and CustomEase exports
provides:
  - KanjiIntro overlay component with brush stroke animation for 侍
  - SessionStorage first-visit detection pattern
  - Katana slash screen-split transition
affects: [03-03, 03-04]

# Tech tracking
tech-stack:
  added: []
  patterns: [DrawSVGPlugin stroke-by-stroke animation, CustomEase organic brush curve, sessionStorage visit gating, katana slash screen split]

key-files:
  created: [src/components/animations/KanjiIntro.tsx]
  modified: [src/app/[locale]/page.tsx]

key-decisions:
  - "KanjiVG approximate paths for 侍 with 8 strokes — visually sufficient for brush calligraphy effect"
  - "Ink particles created as DOM elements positioned via getBoundingClientRect for accurate SVG-to-screen mapping"

patterns-established:
  - "Animation overlay pattern: fixed z-50 overlay that removes itself from DOM via useState(false) + return null"
  - "First-visit gating: sessionStorage check in useEffect, set on complete/skip"

requirements-completed: [ANIM-01, ANIM-08]

# Metrics
duration: 2min
completed: 2026-03-26
---

# Phase 03 Plan 02: Kanji Intro Animation Summary

**Full-screen 侍 kanji brush stroke intro with DrawSVGPlugin, ink particles, katana slash screen split, skip button, and sessionStorage first-visit gating**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-26T11:47:25Z
- **Completed:** 2026-03-26T11:49:50Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- KanjiIntro component draws 侍 with 8 sequential brush strokes using GSAP DrawSVGPlugin and custom brush easing
- Ink particles scatter from stroke endpoints for organic calligraphy feel
- Katana slash transition (red flash + screen split) reveals hero content beneath
- SessionStorage prevents repeat viewing, skip button for immediate bypass
- Reduced-motion users skip the intro entirely (useReducedMotion hook)
- Hero content always in DOM -- LCP not blocked by overlay

## Task Commits

Each task was committed atomically:

1. **Task 1: Create KanjiIntro component with brush stroke animation** - `0809022` (feat)
2. **Task 2: Wire KanjiIntro into page.tsx** - `47f645a` (feat)

## Files Created/Modified
- `src/components/animations/KanjiIntro.tsx` - Full-screen kanji brush intro overlay with DrawSVGPlugin animation, ink particles, katana slash transition, skip button, sessionStorage gating, reduced-motion support
- `src/app/[locale]/page.tsx` - Added KanjiIntro import and render as first child of main

## Decisions Made
- Used KanjiVG approximate paths for 侍 (8 strokes) -- visually sufficient for brush calligraphy effect without needing exact KanjiVG data
- Ink particles created as positioned DOM elements rather than SVG circles, using getBoundingClientRect for accurate SVG-to-screen coordinate mapping

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing test failures in Projects.test.tsx (hover ink-wash overlay test) -- unrelated to this plan, not addressed per scope boundary rules.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- KanjiIntro overlay wired into page.tsx, ready for visual testing
- Animation infrastructure (gsap-config, useReducedMotion) proven working for subsequent animation plans
- Plans 03-03 and 03-04 can build on established overlay and animation patterns

---
*Phase: 03-animations*
*Completed: 2026-03-26*

## Self-Check: PASSED
- KanjiIntro.tsx: FOUND
- Commit 0809022: FOUND
- Commit 47f645a: FOUND
