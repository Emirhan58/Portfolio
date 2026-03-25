---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [gsap, scrolltrigger, lenis, motion, framer-motion, animation, scroll-spy, navbar, footer, intersection-observer, reduced-motion, a11y]

requires:
  - phase: 01-01
    provides: Next.js 15 scaffold, design tokens, i18n, section constants
provides:
  - GSAP centralized plugin registration with ScrollTrigger
  - Motion animation presets including shoji door variants
  - Three-tier reduced motion detection hook
  - IntersectionObserver scroll-spy hook
  - Lenis smooth scroll with GSAP ticker sync
  - Responsive sticky Navbar with scroll-spy highlighting and shoji door mobile menu
  - Footer with mountain silhouette decoration
  - SectionShell wrapper with decorative kanji
  - Composed Providers wrapper (Lenis + Scroll context)
affects: [02-content, 03-animations, 04-audio-deploy]

tech-stack:
  added: []
  patterns: [gsap-central-import, lenis-gsap-ticker-sync, three-tier-reduced-motion, intersection-observer-scroll-spy, shoji-door-mobile-menu, server-component-section-shell]

key-files:
  created:
    - src/lib/gsap-config.ts
    - src/lib/animation-variants.ts
    - src/hooks/useReducedMotion.ts
    - src/hooks/useScrollSection.ts
    - src/hooks/useLenis.ts
    - src/components/providers/LenisProvider.tsx
    - src/components/providers/ScrollProvider.tsx
    - src/components/providers/Providers.tsx
    - src/components/layout/Navbar.tsx
    - src/components/layout/Footer.tsx
    - src/components/layout/SectionShell.tsx
    - tests/lib/gsap-config.test.ts
    - tests/hooks/useReducedMotion.test.ts
    - tests/hooks/useScrollSection.test.ts
  modified:
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx

key-decisions:
  - "Removed lenis/snap entirely per user feedback -- smooth scroll only, no section snapping"
  - "LenisProvider uses GSAP ticker (autoRaf: false) for synchronized scroll and animation"
  - "SectionShell is a Server Component; Navbar is a Client Component inside Providers boundary"

patterns-established:
  - "GSAP imports always from @/lib/gsap-config, never from gsap directly"
  - "Lenis driven by GSAP ticker (autoRaf: false) for synchronized scroll + animation"
  - "Three-tier motion: full (desktop), reduced (mobile), none (prefers-reduced-motion)"
  - "Shoji door mobile menu: two panels split from center via Motion AnimatePresence"
  - "SectionShell wraps all sections with data-section attr and optional decorative kanji"

requirements-completed: [FOUND-01, FOUND-02, FOUND-05, FOUND-07]

duration: 1min
completed: 2026-03-25
---

# Phase 01 Plan 02: Animation Infrastructure and Layout Summary

**GSAP/Motion/Lenis animation stack with responsive sticky Navbar (scroll-spy, shoji door mobile menu), SectionShell wrappers, and smooth scroll -- all wired into composed Providers**

## Performance

- **Duration:** 1 min (continuation only -- original execution was separate session)
- **Started:** 2026-03-25T04:13:51Z
- **Completed:** 2026-03-25T04:14:55Z
- **Tasks:** 3 (2 from prior session + 1 continuation)
- **Files modified:** 16

## Accomplishments
- GSAP centrally registered with ScrollTrigger, Motion animation presets (fadeInUp, scaleIn, shoji door variants) ready for all sections
- Lenis smooth scroll synced to GSAP ticker, snap removed per user feedback for better UX
- Responsive Navbar with EK monogram, scroll-spy active section highlighting, language toggle (EN/TR), CV download button, and shoji door mobile menu animation
- Footer with mountain silhouette, SectionShell with decorative kanji, all wired through Providers in layout
- 25 tests passing across 5 test suites, `next build` succeeds with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create animation infrastructure, hooks, and providers** - `5764f62` (feat)
2. **Task 2: Build responsive Navbar, Footer, SectionShell, and wire into layout** - `82a3a5d` (feat)
3. **Task 3 fix: Remove section snap, keep smooth scroll only** - `b448a2e` (fix)

## Files Created/Modified
- `src/lib/gsap-config.ts` - Centralized GSAP plugin registration (use client)
- `src/lib/animation-variants.ts` - Shared Motion animation presets including shoji door variants
- `src/hooks/useReducedMotion.ts` - Three-tier motion detection (full/reduced/none)
- `src/hooks/useScrollSection.ts` - IntersectionObserver-based active section tracking
- `src/hooks/useLenis.ts` - Lenis context for accessing smooth scroll instance
- `src/components/providers/LenisProvider.tsx` - Lenis smooth scroll with GSAP ticker sync (no snap)
- `src/components/providers/ScrollProvider.tsx` - Scroll context exposing active section and scrollTo
- `src/components/providers/Providers.tsx` - Composed Lenis + Scroll provider wrapper
- `src/components/layout/Navbar.tsx` - Sticky responsive nav with scroll-spy, shoji door mobile menu
- `src/components/layout/Footer.tsx` - Footer with mountain silhouette decoration
- `src/components/layout/SectionShell.tsx` - Section wrapper with data-section attr and kanji
- `src/app/[locale]/layout.tsx` - Wired Providers, Navbar, Footer
- `src/app/[locale]/page.tsx` - Sections using SectionShell with hero at 90vh
- `tests/lib/gsap-config.test.ts` - GSAP config file verification tests
- `tests/hooks/useReducedMotion.test.ts` - Reduced motion hook contract tests
- `tests/hooks/useScrollSection.test.ts` - Scroll section hook structure tests

## Decisions Made
- **Removed lenis/snap**: User tested section snap scroll and found it felt bad. Removed all snap configuration, keeping only Lenis smooth scroll with GSAP ticker sync.
- **autoRaf: false on Lenis**: Lenis driven by GSAP ticker for synchronized scroll and animation timing.
- **Server Component SectionShell**: No "use client" needed -- kanji decoration is static, data-section attr enables client-side scroll detection.

## Deviations from Plan

### User-requested Change (from checkpoint feedback)

**1. Removed section snap scroll entirely**
- **Found during:** Task 3 (human-verify checkpoint)
- **Issue:** User tested the site and found section snap scroll felt bad
- **Fix:** Removed `lenis/snap` import, `Snap` class usage, and `shouldSnap` dependency from LenisProvider.tsx. Kept Lenis smooth scroll with GSAP ticker sync intact.
- **Files modified:** src/components/providers/LenisProvider.tsx
- **Committed in:** b448a2e

---

**Total deviations:** 1 user-requested change
**Impact on plan:** Improved UX per user feedback. Smooth scroll still fully functional without snap.

## Issues Encountered
None beyond the user-requested snap removal.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Animation infrastructure (GSAP, Motion, Lenis) fully operational and ready for Phase 2 content sections
- All 7 section shells in place with SectionShell wrappers, ready for progressive content replacement
- Navbar scroll-spy, language toggle, and mobile menu working for immediate Phase 2 integration
- Design tokens, fonts, and i18n all flowing through the complete foundation stack

---
*Phase: 01-foundation*
*Completed: 2026-03-25*

## Self-Check: PASSED

- All 16 key files verified present on disk
- All 3 task commits (5764f62, 82a3a5d, b448a2e) verified in git log
- 25/25 tests passing across 5 test suites
- `npx next build` exits 0 with /en and /tr routes
- No lenis/snap references remain in source code
