# Phase 1: Foundation - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Next.js 15 scaffold with i18n routing (TR/EN), dark theme design tokens, responsive layout shell, scroll-spy navigation with section snap, animation library setup (GSAP + Framer Motion), smooth scroll (Lenis), and reduced-motion detection. This is the scaffolding every subsequent component depends on.

</domain>

<decisions>
## Implementation Decisions

### Navbar Design
- **Japon minimal** style — thin, clean, transparent/dark background
- **EK monogram** on the left — Emirhan Kaya initials in Japanese brush style
- Section links in **English only** (About, Skills, Experience, Projects, Achievements, Contact)
- **Active section indicator**: ink brush mark effect under active link
- **CV download button** at the far right, visually prominent
- **Scroll behavior**: navbar **shrinks** on scroll (padding reduces, becomes more compact)
- **Mobile menu**: full-screen overlay with **shoji door sliding animation** (opens from center outward), kanji + section names centered
- Bayrak ikonlari (🇹🇷 / 🇬🇧) for language toggle in navbar

### Page Structure
- **Section snap** scroll behavior (CSS scroll-snap)
- **Lenis smooth scroll** combined with snap
- **Wide spacing** between sections with katana slash dividers
- **Hero height**: 90vh — shows hint of next section below
- **Japanese-style footer** at bottom: bamboo/mountain silhouette background, copyright + social links
- All 7 sections + footer = 8 scroll snap targets

### Color System
- **Red (#c0392b)** used everywhere: CTA buttons, active/hover states, katana slash dividers, accent kanji/icons
- **Gold (#d4a574)** used everywhere: section headings, thin border lines, icon/badge accents, hover glow effects
- **Base dark**: #0a0a0a (background), #1a1a1a (card/surface)
- **Paper/Bej**: #f5f0e8 (text highlights, decorative)
- **Green accent**: #2d5016 (bamboo, nature elements)
- WCAG AA contrast verification needed for red (#c0392b) on dark background

### Typography
- **Headings (English)**: Playfair Display — dramatic serif
- **Headings (Kanji/Japanese)**: Noto Serif JP — subset to 7 decorative kanji only (門, 道, 技, 戦, 作, 誉, 結)
- **Body**: Inter — clean sans-serif
- Design tokens: font sizes, weights, line heights as CSS custom properties

### i18n Strategy
- **Default language**: English (for international recruiters)
- **URL structure**: /en, /tr prefix — next-intl standard App Router pattern with [locale] segment
- **Language toggle**: Flag icons (🇹🇷 / 🇬🇧) in navbar
- **Decorative kanji**: DO NOT translate — they are theme elements, not content
- All user-facing text flows through next-intl message keys from day one

### Animation Infrastructure
- **GSAP**: scroll-driven animations (ScrollTrigger), timelines, SVG brush strokes, parallax
- **Framer Motion (Motion)**: component lifecycle (whileInView, hover, AnimatePresence, mount/unmount)
- **Ownership split**: Never animate the same DOM property with both libraries
- **@gsap/react** useGSAP hook — mandatory for cleanup, never raw useEffect
- **Lenis**: smooth scroll with GSAP ticker integration
- **prefers-reduced-motion**: useReducedMotion hook gates all animations — three tiers: full desktop, reduced mobile, none for reduced-motion

### Claude's Discretion
- Exact CSS custom property naming convention
- Tailwind CSS 4 configuration approach (@theme block vs CSS variables)
- GSAP plugin registration pattern
- Scroll snap + Lenis integration specifics
- next-intl middleware configuration details

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Full project vision, design direction, color palette, section definitions
- `.planning/REQUIREMENTS.md` — FOUND-01 through FOUND-07 requirements for this phase
- `EMIRHAN_KAYA_DATA.md` — Source data (not needed for Phase 1, but referenced for section names)

### Research
- `.planning/research/STACK.md` — Technology recommendations with versions (GSAP 3.14, Motion 12, next-intl 4.8, Lenis)
- `.planning/research/ARCHITECTURE.md` — Component structure, server/client boundaries, data flow
- `.planning/research/PITFALLS.md` — Critical pitfalls for Phase 1 (GSAP memory leaks, hydration errors, font bloat, reduced-motion)
- `.planning/research/SUMMARY.md` — Synthesized findings and phase implications

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — Phase 1 establishes all patterns

### Integration Points
- `EMIRHAN_KAYA_DATA.md` — will be consumed as static data in Phase 2
- `PROJECT.md` — design tokens defined here should match PROJECT.md color palette exactly

</code_context>

<specifics>
## Specific Ideas

- Shoji door sliding animation for mobile menu — opens from center outward like traditional Japanese sliding doors
- EK monogram should feel hand-drawn, brush-style — not a clean geometric logo
- Section snap should feel intentional, not jarring — smooth easing between sections
- Footer with bamboo/mountain silhouette should be subtle, not overwhelming the contact section above it

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-25*
