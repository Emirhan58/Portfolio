---
phase: 03-animations
plan: 03
subsystem: ui
tags: [gsap, scrolltrigger, parallax, clip-path, sakura, scroll-animation]

requires:
  - phase: 03-animations-01
    provides: "GSAP config with ScrollTrigger, DrawSVGPlugin, CustomEase, useReducedMotion hook"
provides:
  - "ScrollReveal component with ink splash clip-path section reveals"
  - "Animated SectionDivider with katana slash scroll animation"
  - "ParallaxLayers with 3-layer SVG depth (mountains/clouds/mist)"
  - "Refined SakuraFall with 22 petals, higher opacity, motion-tier gating"
affects: [03-animations-04, page-layout]

tech-stack:
  added: []
  patterns: ["ScrollTrigger once:true for one-shot reveals", "clip-path circle animation for ink splash", "scrub:true for scroll-linked parallax", "shouldParallax/shouldParticle gating pattern"]

key-files:
  created:
    - src/components/animations/ScrollReveal.tsx
    - src/components/animations/ParallaxLayers.tsx
  modified:
    - src/components/layout/SectionDivider.tsx
    - src/components/ui/SakuraFall.tsx
    - src/app/[locale]/page.tsx

key-decisions:
  - "Hero section skipped in ScrollReveal -- has own mount animation from Plan 04"
  - "Kanji watermarks get subtle fade-in tied to parent section reveal"
  - "ParallaxLayers returns null on non-full tier -- zero DOM on mobile"

patterns-established:
  - "data-section attribute as animation hook for scroll reveals"
  - "data-animate attribute for staggered child animations"
  - "Three-tier motion gating: full (clip-path), reduced (fade), none (static)"

requirements-completed: [ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-08]

duration: 3min
completed: 2026-03-26
---

# Phase 03 Plan 03: Scroll Animations Summary

**Ink splash clip-path section reveals, katana slash dividers, 3-layer SVG parallax, and refined sakura particles -- all gated by three-tier useReducedMotion hook**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T11:47:24Z
- **Completed:** 2026-03-26T11:50:21Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- ScrollReveal wraps all sections with ink splash circle clip-path reveal (full tier) or simple fade (reduced tier)
- SectionDivider converted to client component with katana slash scaleX animation on viewport entry
- ParallaxLayers creates depth with mountains/clouds/mist SVGs at different scroll speeds
- SakuraFall refined to 22 petals with 0.15-0.25 opacity, gated by shouldParticle

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ScrollReveal wrapper** - `519add5` (feat)
2. **Task 2: Animate SectionDivider + ParallaxLayers + SakuraFall** - `816a0b1` (feat)
3. **Task 3: Wire into page.tsx** - `47f645a` (feat, shared with 03-02 parallel agent)

## Files Created/Modified
- `src/components/animations/ScrollReveal.tsx` - Ink splash clip-path section reveals with staggered children
- `src/components/animations/ParallaxLayers.tsx` - Fixed background with 3 parallax SVG layers
- `src/components/layout/SectionDivider.tsx` - Client component with katana slash scaleX animation
- `src/components/ui/SakuraFall.tsx` - Reduced to 22 petals, higher opacity, shouldParticle gating
- `src/app/[locale]/page.tsx` - ScrollReveal wrapper and ParallaxLayers added

## Decisions Made
- Hero section explicitly skipped in ScrollReveal (it has its own mount animation in Plan 04)
- Kanji watermarks get subtle fade-in + float-up tied to parent section's ScrollTrigger
- ParallaxLayers returns null (no DOM) when shouldParallax is false, eliminating mobile overhead
- Task 3 page.tsx commit was shared with parallel 03-02 agent that committed the same file

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Two pre-existing test failures (Achievements MedalBadge, Projects hover overlay) unrelated to this plan's changes -- left as-is per scope rules
- Task 3 page.tsx changes were committed by parallel 03-02 agent (`47f645a`) which saw the edits on disk

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All scroll-driven animations in place, ready for Plan 04 (hero mount animation)
- ScrollReveal specifically skips hero section to avoid conflict with Plan 04's mount reveal

---
*Phase: 03-animations*
*Completed: 2026-03-26*
