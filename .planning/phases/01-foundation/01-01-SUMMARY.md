---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [nextjs, tailwind-css-4, next-intl, i18n, design-tokens, typescript, vitest]

requires:
  - phase: none
    provides: greenfield project
provides:
  - Next.js 15 scaffold with TypeScript and Tailwind CSS 4
  - Dark theme design tokens as CSS custom properties via @theme
  - Three-font system (Inter, Playfair Display, Noto Serif JP)
  - next-intl i18n routing with TR/EN locales
  - EN/TR message files with nav, hero, and meta keys
  - Section constants with kanji mappings for 7 sections
  - Vitest test infrastructure with jsdom
affects: [01-02, 02-content, 03-animations, 04-audio-deploy]

tech-stack:
  added: [next@15, react@19, tailwindcss@4, next-intl, gsap@3, "@gsap/react", motion, lenis, clsx, tailwind-merge, vitest]
  patterns: [tailwind-css-4-theme-block, next-intl-app-router, locale-layout-pattern, server-component-pages]

key-files:
  created:
    - src/app/globals.css
    - src/app/fonts.ts
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/i18n/routing.ts
    - src/i18n/request.ts
    - src/i18n/navigation.ts
    - src/middleware.ts
    - src/messages/en.json
    - src/messages/tr.json
    - src/lib/cn.ts
    - src/lib/constants.ts
    - vitest.config.ts
    - tests/theme/design-tokens.test.ts
    - tests/i18n/locale-switch.test.ts
  modified:
    - next.config.ts
    - package.json

key-decisions:
  - "Manual scaffold instead of create-next-app due to non-empty directory"
  - "Fixed dynamic import path in i18n/request.ts from ../../messages to ../messages"

patterns-established:
  - "Tailwind CSS 4 @theme block for all design tokens (colors, fonts, spacing, animations, z-index)"
  - "next-intl App Router pattern: defineRouting + createMiddleware + getRequestConfig + NextIntlClientProvider"
  - "Server Component pages with async params (Next.js 15 Promise params)"
  - "setRequestLocale() called before any getTranslations/getMessages in server components"
  - "File-based tests: read source files as text and assert string/structure presence"

requirements-completed: [FOUND-06, FOUND-04, FOUND-03]

duration: 8min
completed: 2026-03-25
---

# Phase 01 Plan 01: Project Scaffold Summary

**Next.js 15 scaffold with Tailwind CSS 4 dark theme tokens, three-font system, and next-intl TR/EN locale routing building and serving 7 section placeholders**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-25T03:53:52Z
- **Completed:** 2026-03-25T04:02:11Z
- **Tasks:** 2
- **Files modified:** 27

## Accomplishments
- Next.js 15 app builds with zero TypeScript errors, generates static /en and /tr routes
- Full dark theme design token system in globals.css @theme block (9 colors, 3 fonts, 6 text sizes, spacing, animation durations, easing curves, z-index layers)
- Complete next-intl i18n routing: middleware locale detection, [locale] layout with NextIntlClientProvider, EN/TR message files with structural parity
- 11 tests passing across 2 test suites (7 design token tests, 4 i18n tests)

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project with all dependencies, fonts, design tokens, and Vitest** - `5990b55` (feat)
2. **Task 2: Set up next-intl i18n routing with TR/EN locales, message files, and layout integration** - `dfd3082` (feat)

## Files Created/Modified
- `package.json` - Next.js 15 project with all runtime and dev dependencies
- `tsconfig.json` - TypeScript config with @/* path alias
- `next.config.ts` - Wrapped with createNextIntlPlugin
- `postcss.config.mjs` - PostCSS config for Tailwind CSS 4
- `src/app/globals.css` - Full design token system via @theme block
- `src/app/fonts.ts` - Inter, Playfair Display, Noto Serif JP font declarations
- `src/app/[locale]/layout.tsx` - Root locale layout with fonts, NextIntlClientProvider, generateStaticParams
- `src/app/[locale]/page.tsx` - 7 section placeholders with kanji and section names
- `src/i18n/routing.ts` - defineRouting with en/tr locales
- `src/i18n/request.ts` - getRequestConfig with locale resolution and message loading
- `src/i18n/navigation.ts` - createNavigation exports (Link, redirect, usePathname, useRouter, getPathname)
- `src/middleware.ts` - Locale detection middleware with route matcher
- `src/messages/en.json` - English translations (nav, hero, meta)
- `src/messages/tr.json` - Turkish translations (nav, hero, meta)
- `src/lib/cn.ts` - clsx + tailwind-merge utility
- `src/lib/constants.ts` - SECTION_IDS, SECTION_KANJI, NAV_LINKS
- `vitest.config.ts` - Vitest with jsdom environment and @/ alias
- `tests/theme/design-tokens.test.ts` - 7 design token presence tests
- `tests/i18n/locale-switch.test.ts` - 4 i18n structure tests

## Decisions Made
- **Manual scaffold**: create-next-app refused non-empty directory, so scaffolded in temp directory and copied files
- **Fixed import path**: Plan specified `../../messages` in request.ts but correct relative path from src/i18n/ to src/messages/ is `../messages` -- auto-fixed as Rule 1 (bug)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed dynamic import path in i18n/request.ts**
- **Found during:** Task 2 (i18n routing setup)
- **Issue:** Plan specified `../../messages/${locale}.json` but from `src/i18n/request.ts` that resolves to project root, not `src/messages/`
- **Fix:** Changed to `../messages/${locale}.json`
- **Files modified:** src/i18n/request.ts
- **Verification:** `npx next build` succeeds with both /en and /tr routes
- **Committed in:** dfd3082 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential fix for build to succeed. No scope creep.

## Issues Encountered
- create-next-app refused to scaffold in non-empty directory (contains .planning/, data files). Resolved by scaffolding in temp directory and copying files back.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Full scaffold ready for Plan 01-02 (navbar, scroll-spy, animation infrastructure, Lenis smooth scroll)
- All design tokens available as Tailwind utilities (e.g., `bg-bg`, `text-accent-gold`, `font-heading`)
- i18n infrastructure ready for all future content sections to use message keys
- Section placeholder shells in place for progressive replacement with real content

---
*Phase: 01-foundation*
*Completed: 2026-03-25*

## Self-Check: PASSED

- All 15 key files verified present on disk
- Both task commits (5990b55, dfd3082) verified in git log
- 11/11 tests passing
- `npx next build` exits 0 with /en and /tr routes
