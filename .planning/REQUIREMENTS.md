# Requirements: Samurai Portfolio — Emirhan Kaya

**Defined:** 2025-03-25
**Core Value:** Ziyaretciyi ilk saniyede etkileyen, Japon estetigi ile harmanlanan profesyonel portfolio deneyimi

## v1 Requirements

### Foundation

- [x] **FOUND-01**: User sees a responsive, mobile-first layout that adapts seamlessly to all screen sizes
- [x] **FOUND-02**: User sees active section highlighted in scroll-spy navigation and can jump to any section
- [x] **FOUND-03**: User can switch between Turkish and English with all content translated (next-intl)
- [x] **FOUND-04**: Site uses consistent dark theme design tokens (colors, typography, spacing as CSS custom properties)
- [x] **FOUND-05**: User with `prefers-reduced-motion` sees a functional site with all animations disabled
- [x] **FOUND-06**: Site built on Next.js 15 App Router with TypeScript
- [x] **FOUND-07**: Animation infrastructure established with Framer Motion + GSAP (clear ownership split)

### Content

- [x] **CONT-01**: User sees a full-screen hero with name and role in brush-style typography over animated ink splash
- [x] **CONT-02**: User sees About section with bio, profile photo in ink-wash frame, and animated stat counters
- [x] **CONT-03**: User sees Skills section with categorized skill display in scroll/tomar style with katana proficiency bars
- [x] **CONT-04**: User sees Experience timeline as vertical scroll with samurai journey metaphor and ink stamp logos
- [x] **CONT-05**: User sees Projects in masonry grid with parchment-style cards, hover ink reveal, and GitHub links
- [x] **CONT-06**: User sees Achievements section with TEKNOFEST/CanSat displayed as medals/badges
- [x] **CONT-07**: User sees Contact section with email, GitHub, LinkedIn links styled as mon (crest) icons
- [x] **CONT-08**: User can download PDF CV from a button in hero or navbar

### Animations

- [x] **ANIM-01**: User sees kanji intro animation (侍 brush stroke, 2-3s, skip button, sessionStorage first-visit only)
- [x] **ANIM-02**: User sees scroll-triggered ink splash / brush stroke reveals as sections enter viewport
- [x] **ANIM-03**: User sees katana slash animation as section transition dividers
- [x] **ANIM-04**: User sees parallax mountain/cloud background layers that move at different scroll speeds
- [x] **ANIM-05**: User sees subtle sakura particles floating on Canvas (disabled on mobile)
- [x] **ANIM-06**: User sees stat numbers count up when About section scrolls into view
- [x] **ANIM-07**: User sees JP to EN typing effect on hero tagline
- [x] **ANIM-08**: Mobile users see reduced animations (no parallax/particles, basic reveals only)

### Visual

- [x] **VISL-01**: Site uses Japanese typography pairing (Noto Serif JP subset for 7 kanji + Inter body)
- [x] **VISL-02**: Site features ink-wash background textures and paper grain effects
- [x] **VISL-03**: Each section displays its decorative kanji character (門, 道, 技, 戦, 作, 誉, 結)
- [x] **VISL-04**: Subtle Japanese geometric patterns (asanoha, seigaiha) used as accents

### Audio

- [ ] **AUDL-01**: User can toggle ambient Japanese background music (default muted)
- [ ] **AUDL-02**: User hears interaction sound effects on transitions (katana draw, brush stroke)
- [ ] **AUDL-03**: Audio toggle is always visible, AudioContext created lazily on first user click

### Deploy

- [ ] **DEPL-01**: Site deployable to Vercel with zero configuration

## v2 Requirements

### Performance & SEO

- **PERF-01**: Lighthouse performance score 90+
- **PERF-02**: SEO meta tags and Open Graph cards with Samurai-themed preview images
- **PERF-03**: Structured data / JSON-LD for person schema
- **PERF-04**: Image optimization (WebP, lazy loading, blur placeholders)

### Enhancements

- **ENHC-01**: Analytics integration (Vercel Analytics or similar)
- **ENHC-02**: Sitemap and robots.txt
- **ENHC-03**: Domain configuration and custom 404 page

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form / backend | Recruiters use LinkedIn/email anyway; adds complexity for zero value |
| Light mode / theme toggle | Dark theme IS the brand; light mode would need separate design pass |
| Custom mouse cursor | Breaks native behavior, accessibility nightmare, terrible on touch |
| WebGL / Three.js 3D scenes | Massive bundle, kills mobile performance, overkill for portfolio |
| Horizontal scroll sections | Confusing for recruiters, accessibility issues, mobile conflicts |
| Blog / CMS integration | Adds massive complexity; static data file is simpler and faster |
| Separate pages / routing | Breaks scroll-as-storytelling concept; single-page is faster |
| Auto-playing audio (unmuted) | Universally hated, browsers block it, violates accessibility |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| CONT-06 | Phase 2 | Complete |
| CONT-07 | Phase 2 | Complete |
| CONT-08 | Phase 2 | Complete |
| ANIM-01 | Phase 3 | Complete |
| ANIM-02 | Phase 3 | Complete |
| ANIM-03 | Phase 3 | Complete |
| ANIM-04 | Phase 3 | Complete |
| ANIM-05 | Phase 3 | Complete |
| ANIM-06 | Phase 3 | Complete |
| ANIM-07 | Phase 3 | Complete |
| ANIM-08 | Phase 3 | Complete |
| VISL-01 | Phase 2 | Complete |
| VISL-02 | Phase 2 | Complete |
| VISL-03 | Phase 2 | Complete |
| VISL-04 | Phase 2 | Complete |
| AUDL-01 | Phase 4 | Pending |
| AUDL-02 | Phase 4 | Pending |
| AUDL-03 | Phase 4 | Pending |
| DEPL-01 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0

---
*Requirements defined: 2025-03-25*
*Last updated: 2026-03-25 after roadmap phase mapping*
