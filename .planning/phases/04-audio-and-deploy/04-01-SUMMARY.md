---
phase: 04-audio-and-deploy
plan: 01
subsystem: audio
tags: [howler, web-audio, react-context, sfx, ambient-music]

requires:
  - phase: 03-animations
    provides: KanjiIntro with kanji-intro-done event and sessionStorage flag
provides:
  - AudioProvider context with toggleAudio, playSfx, setVolume
  - AudioToggle navbar component with volume slider popup
  - useAudio hook for consuming audio state
  - Intro-aware music delay (defers until kanji intro completes)
affects: [04-02-PLAN]

tech-stack:
  added: [howler, "@types/howler", "@vitejs/plugin-react"]
  patterns: [AudioProvider React Context with lazy AudioContext, SFX debounce, intro-aware music gating]

key-files:
  created:
    - src/components/providers/AudioProvider.tsx
    - src/components/layout/AudioToggle.tsx
    - tests/hooks/useAudio.test.ts
    - tests/components/AudioToggle.test.ts
  modified:
    - src/components/providers/Providers.tsx
    - src/components/layout/Navbar.tsx
    - src/messages/en.json
    - src/messages/tr.json
    - src/app/globals.css
    - vitest.config.ts
    - package.json

key-decisions:
  - "Added @vitejs/plugin-react to vitest config to enable JSX transformation for component-level tests"
  - "Howl mock uses function constructor (not arrow fn) for vi.mock compatibility with new keyword"
  - "SFX debounce at 200ms per sound name to prevent rapid-fire overlap"

patterns-established:
  - "AudioProvider as innermost provider in Providers.tsx chain"
  - "Intro-aware music: check sessionStorage kanji-intro-seen + listen for kanji-intro-done CustomEvent"
  - "Component-level React testing with @testing-library/react (first real render tests in project)"

requirements-completed: [AUDL-01, AUDL-03]

duration: 6min
completed: 2026-03-28
---

# Phase 04 Plan 01: Audio Infrastructure Summary

**Howler.js audio system with AudioProvider context, intro-aware music delay, and navbar AudioToggle with volume slider**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-28T10:36:41Z
- **Completed:** 2026-03-28T10:42:11Z
- **Tasks:** 3
- **Files modified:** 11

## Accomplishments
- AudioProvider with lazy AudioContext, localStorage persistence, SFX debounce, and intro-aware ambient music delay
- AudioToggle component with inline SVG volume icons, red pulse animation, and vertical slider popup
- 9 new passing tests (6 AudioProvider unit tests + 3 AudioToggle component tests)
- Full i18n support for audio toggle tooltip in EN and TR

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Howler.js and create AudioProvider with test stubs** - `8736ebc` (feat)
2. **Task 2: Create AudioToggle component with volume slider popup and test stubs** - `70c1d01` (feat)
3. **Task 3: Wire AudioProvider into Providers.tsx, AudioToggle into Navbar, add i18n keys** - `ce94713` (feat)

## Files Created/Modified
- `src/components/providers/AudioProvider.tsx` - React Context with lazy Howl instances, startMusicIfReady, playSfx with debounce
- `src/components/layout/AudioToggle.tsx` - Volume toggle button with AnimatePresence slider popup
- `tests/hooks/useAudio.test.ts` - 6 unit tests for AudioProvider state management
- `tests/components/AudioToggle.test.ts` - 3 component render/interaction tests
- `src/components/providers/Providers.tsx` - Added AudioProvider as innermost wrapper
- `src/components/layout/Navbar.tsx` - Added AudioToggle after language selector
- `src/messages/en.json` - Added soundOn/soundOff nav keys
- `src/messages/tr.json` - Added soundOn/soundOff nav keys
- `src/app/globals.css` - Added pulse-red keyframes and audio-slider styling
- `vitest.config.ts` - Added @vitejs/plugin-react for JSX component testing
- `package.json` - Added howler, @types/howler, @vitejs/plugin-react

## Decisions Made
- Added @vitejs/plugin-react to vitest config because existing tsconfig has `jsx: "preserve"` which prevents vite from parsing JSX in component tests. This is the first time the project uses actual React render tests (all prior tests used file-system string checks).
- Used function constructor for Howl mock instead of arrow function, since vitest mocks with arrow functions cannot be instantiated with `new`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added @vitejs/plugin-react for JSX test support**
- **Found during:** Task 1 (AudioProvider test creation)
- **Issue:** vitest could not parse `.tsx` files because tsconfig `jsx: "preserve"` prevented vite's import analysis from transforming JSX
- **Fix:** Installed @vitejs/plugin-react and added it to vitest.config.ts plugins
- **Files modified:** vitest.config.ts, package.json, package-lock.json
- **Verification:** All 6 AudioProvider tests pass with real React rendering
- **Committed in:** 8736ebc (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Required for component-level testing. No scope creep.

## Issues Encountered
- Pre-existing test failures in Projects (hover ink-wash overlay), Achievements (MedalBadge), and TypingEffect (enText prop) -- these are unrelated to audio changes and were failing before this plan.

## User Setup Required
None - no external service configuration required. Audio asset files (OGG/MP3) should be placed in `public/audio/music/` and `public/audio/sfx/` directories.

## Next Phase Readiness
- AudioProvider exports `playSfx` function ready for Plan 02 to hook into GSAP animation callbacks
- `startMusicIfReady` correctly defers music until kanji intro completes
- All audio infrastructure in place for SFX integration with KanjiIntro and SectionDivider animations

---
*Phase: 04-audio-and-deploy*
*Completed: 2026-03-28*
