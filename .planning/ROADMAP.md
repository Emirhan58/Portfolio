# Roadmap: Samurai Portfolio — Emirhan Kaya

## Overview

Build a single-page samurai-themed portfolio from the ground up: establish the technical foundation with i18n and design system first, then build all 7 content sections with their Japanese visual treatment, layer on the full animation system (scroll effects, kanji intro, particles, parallax), and finish with audio and Vercel deployment. Each phase delivers a progressively richer, always-deployable site.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js 15 scaffold with i18n, design tokens, navigation, animation infrastructure, and accessibility groundwork
- [ ] **Phase 2: Content and Visual Design** - All 7 themed sections with Japanese visual treatment, typography, textures, and decorative elements
- [ ] **Phase 3: Animations** - Kanji intro, scroll-triggered reveals, parallax, particles, katana transitions, typing effect, and mobile reduction
- [ ] **Phase 4: Audio and Deploy** - Ambient music, interaction SFX, audio toggle, and Vercel deployment

## Phase Details

### Phase 1: Foundation
**Goal**: A working Next.js 15 app with i18n routing, dark theme design tokens, responsive layout shell, scroll-spy navigation, animation library setup, and reduced-motion detection — the scaffolding every subsequent component depends on
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. User can visit the site and see a responsive dark-themed layout that adapts to mobile, tablet, and desktop
  2. User can switch between Turkish and English and all visible text updates accordingly
  3. User sees a sticky navigation bar with section links that highlight the currently visible section on scroll
  4. User with prefers-reduced-motion enabled sees a fully functional site with zero animations
  5. GSAP plugins are registered once and Framer Motion is available — no hydration errors in console
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 15 with dependencies, fonts, design tokens, i18n routing (TR/EN)
- [x] 01-02-PLAN.md — Animation infrastructure, responsive layout shell with Navbar, scroll-spy, Lenis smooth scroll

### Phase 2: Content and Visual Design
**Goal**: All 7 portfolio sections populated with real content from EMIRHAN_KAYA_DATA.md, styled with Japanese visual treatment — ink-wash textures, decorative kanji, Japanese typography, geometric patterns, and parchment-style cards — resulting in a complete, recruiter-usable static portfolio
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, VISL-01, VISL-02, VISL-03, VISL-04
**Success Criteria** (what must be TRUE):
  1. User scrolls through all 7 sections (Hero, About, Skills, Experience, Projects, Achievements, Contact) and sees real content in both TR and EN
  2. User sees brush-style typography, ink-wash textures, paper grain, and decorative kanji characters (門, 道, 技, 戦, 作, 誉, 結) on each section
  3. User sees categorized skills with proficiency indicators, a vertical experience timeline, masonry project cards with GitHub links, and medal-style achievements
  4. User can download a PDF CV from the hero or navbar
  5. User on mobile sees the same content in a properly adapted responsive layout
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Animations
**Goal**: The site comes alive with the full animation experience — kanji intro, scroll-triggered ink/brush reveals, parallax depth layers, floating sakura particles, katana slash transitions, typing effect, and animated stat counters — with graceful degradation on mobile and reduced-motion
**Depends on**: Phase 2
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-08
**Success Criteria** (what must be TRUE):
  1. First-time visitor sees the kanji (侍) brush-stroke intro animation, can skip it, and does not see it again on return visits
  2. User scrolling through the site sees ink splash reveals on sections, katana slash dividers between sections, and parallax mountain/cloud layers moving at different speeds
  3. User sees sakura particles floating on desktop, stat numbers counting up in the About section, and a JP-to-EN typing effect on the hero tagline
  4. Mobile user sees simplified animations only — no parallax, no particles, basic scroll reveals preserved
  5. The kanji intro does not block LCP — hero content is pre-rendered beneath the intro overlay
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: Audio and Deploy
**Goal**: The portfolio experience is completed with ambient Japanese music and interaction sound effects, and the site is deployed live on Vercel
**Depends on**: Phase 3
**Requirements**: AUDL-01, AUDL-02, AUDL-03, DEPL-01
**Success Criteria** (what must be TRUE):
  1. User can toggle ambient Japanese background music on/off from an always-visible control (default is muted)
  2. User hears interaction sound effects (katana draw, brush stroke) on section transitions when audio is enabled
  3. AudioContext is created lazily on first user click — no autoplay policy violations in any browser
  4. Site is live on Vercel at a public URL with zero-config deployment
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-03-25 |
| 2. Content and Visual Design | 0/0 | Not started | - |
| 3. Animations | 0/0 | Not started | - |
| 4. Audio and Deploy | 0/0 | Not started | - |
