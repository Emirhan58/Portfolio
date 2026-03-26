# Phase 3: Animations - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

The site comes alive with the full animation experience — kanji intro, scroll-triggered ink/brush reveals, parallax depth layers, floating sakura particles, katana slash transitions, typing effect, and animated stat counters — with graceful degradation on mobile and reduced-motion. No audio (Phase 4 handles sound).

</domain>

<decisions>
## Implementation Decisions

### Kanji Intro Animation
- **SVG path draw** for 侍 character — each stroke drawn sequentially like real brush calligraphy
- **Duration: 3-4 seconds** for full kanji drawing, followed by katana slash transition
- **Ink drop + dust particles** scatter from brush tip during each stroke — realistic sumi-e feel
- **Kanji color: white/cream (#f5f0e8)** on pure black (#0a0a0a) background — inverted sumi-e aesthetic
- **Transition: horizontal split** — screen splits horizontally (top half up, bottom half down) like a katana slash, revealing hero beneath
- **Skip button: small 'Skip' text** in bottom-right corner, minimal styling
- **After intro: kanji disappears** — overlay fully removed, no watermark persistence
- **No text** during intro — just the kanji, pure and minimal
- **No sound effects** — Phase 4 handles audio integration
- **sessionStorage** for first-visit-only detection (per ANIM-01 requirement)
- **Hero pre-rendered beneath overlay** — LCP not blocked, hero content ready when overlay lifts

### Scroll-Triggered Reveals
- **Ink splash reveal per section** — each section gets an ink splash mask animation as it enters viewport
- **Staggered fadeInUp for inner elements** — after section reveals, child elements appear sequentially (0.1-0.15s stagger) using existing fadeInUp variant
- **Trigger point: 20% of section visible** in viewport — natural feel, animation starts just before user focuses
- **One-time trigger** — animations play once, don't reverse on scroll back
- **Decorative kanji watermarks: fade-in + slight float up** when their section reveals — subtle, maintains 10% gold opacity

### Katana Slash Section Dividers
- **Left-to-right fast draw** (0.3-0.5s) when divider enters viewport
- Existing static red line (#c0392b, 25% opacity) becomes animated with ScrollTrigger
- One-time trigger, synchronized with section reveal

### Hero Section Animations
- **Mount-triggered staggered reveal** (not scroll) — after intro completes, hero elements appear sequentially: name first, then role, tagline, CTA button
- **JP→EN typing effect on tagline**: Japanese text types out ("精密と目的を持って..."), short pause, characters delete (30-40ms/char), then English types ("Crafting robust systems...", 60-80ms/char)
- **Blinking cursor (█)** during typing, disappears after English text completes
- **Scroll indicator bounce** already exists (Tailwind animate-bounce)

### Stat Counters (About Section)
- **0 to target fast count** — triggered by ScrollTrigger when About section enters viewport
- Duration: 1.5-2s per counter, ease-out (fast start, slow end)
- One-time trigger, all three count simultaneously
- Values: 1+ Years, 39+ Projects, 4 Companies

### Skill Proficiency Bars
- **Left-to-right fill + spark effect** — bars fill with red (#c0392b) when Skills section reveals
- Small spark/glow at the tip as fill completes
- Staggered — each bar fills sequentially within its category card

### Experience Timeline
- **Path drawing + card stagger** — timeline vertical line draws top-to-bottom as user scrolls through section (SVG path with ScrollTrigger)
- Red dot markers appear as the line reaches them
- Job cards stagger in alternating left/right with fadeInUp

### Project Cards
- **Staggered fadeInUp** when Projects section reveals — cards appear sequentially
- Existing CSS-only hover ink-wash overlay preserved, no JS animation changes

### Mobile & Reduced Motion (ANIM-08)
- **useReducedMotion hook** (three-tier) gates all animations:
  - `"full"`: all animations active (desktop with motion enabled)
  - `"reduced"`: no parallax, no particles, basic fadeInUp reveals only (mobile or preference)
  - `"none"`: zero animations (prefers-reduced-motion: reduce)
- Sakura particles: `shouldParticle` flag (full tier only)
- Parallax layers: `shouldParallax` flag (full tier only)
- Scroll reveals: simplified to basic fade on reduced tier

### Claude's Discretion
- GSAP DrawSVG vs stroke-dashoffset technique for SVG path animations
- Exact ink splash SVG mask design and animation curve
- Ink drop particle count and scatter pattern during kanji intro
- Katana slash transition easing and timing details
- ScrollTrigger scrub values and pin behavior
- SplitText usage vs manual character splitting for typing effect
- Exact parallax scroll speed ratios for mountain/cloud/mist layers

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Full project vision, animation strategy overview, color palette, section definitions
- `.planning/REQUIREMENTS.md` — ANIM-01 through ANIM-08 requirements for this phase
- `EMIRHAN_KAYA_DATA.md` — Source data for stat counter values and tagline content

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Animation infrastructure decisions (GSAP vs Framer Motion ownership split, Lenis integration, useReducedMotion three-tier)
- `.planning/phases/02-content-and-visual-design/02-CONTEXT.md` — Section layout decisions, static elements that Phase 3 animates (tagline, stat counters, katana dividers, proficiency bars)

### Animation Infrastructure (existing code)
- `src/lib/gsap-config.ts` — GSAP + ScrollTrigger + useGSAP registration (may need additional plugins)
- `src/lib/animation-variants.ts` — Framer Motion presets: fadeInUp, scaleIn, staggerContainer, shoji variants
- `src/hooks/useReducedMotion.ts` — Three-tier motion detection with shouldAnimate/shouldParticle/shouldParallax flags
- `src/components/ui/SakuraFall.tsx` — Existing CSS keyframe sakura petals (needs refinement, not replacement)
- `src/components/layout/SectionDivider.tsx` — Static katana slash divider (needs scroll animation)
- `src/components/sections/Hero.tsx` — Static tagline, SVG background art, SakuraFall integration point

### Research (from Phase 1)
- `.planning/research/PITFALLS.md` — GSAP memory leaks, hydration errors, performance concerns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SakuraFall.tsx`: 50 CSS petals with keyframe animation — needs refinement (reduce to 20-25 petals, increase opacity to 15-25%)
- `animation-variants.ts`: fadeInUp, scaleIn, staggerContainer presets ready for scroll reveals
- `useReducedMotion.ts`: Three-tier detection with shouldParticle/shouldParallax flags — gates all Phase 3 work
- `gsap-config.ts`: ScrollTrigger registered, ready for scroll-triggered animations
- `SectionDivider.tsx`: Static red diagonal line — animation target for katana slash
- `SectionShell.tsx`: Section wrapper with data-section and kanji watermark — animation entry point

### Established Patterns
- **GSAP**: scroll-driven animations via ScrollTrigger. Never import gsap directly — use `@/lib/gsap-config`
- **Framer Motion**: component lifecycle animations (mount, hover, in-view). useGSAP hook for GSAP cleanup
- **Server Components by default**: animation components must be Client Components with 'use client'
- **Lenis + GSAP ticker**: smooth scroll synced via LenisProvider — ScrollTrigger.update() on Lenis scroll event

### Integration Points
- `src/app/[locale]/page.tsx`: Section loop with SectionShell — intro overlay mounts here (z-index above all)
- `src/components/providers/LenisProvider.tsx`: Lenis + GSAP ticker sync — ScrollTrigger already wired
- Hero.tsx line ~268: Static tagline `{t("tagline")}` — typing effect replaces this
- About section: Static stat numbers — counting animation wraps these

</code_context>

<specifics>
## Specific Ideas

- Kanji intro should feel like watching a calligrapher — deliberate, organic brush strokes with ink particles scattering
- Katana slash transition (intro → hero): clean horizontal split, top goes up, bottom goes down — cinematic
- Ink splash reveals should feel like ink dropped on paper, spreading organically — not geometric wipes
- Timeline path drawing should feel like tracing a samurai's journey — the path draws as you scroll through it
- Proficiency bar fill + spark: katana being drawn from sheath, spark at the tip when fully drawn
- Typing effect: the JP→EN switch should feel like a language transformation, not just text replacement

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-animations*
*Context gathered: 2026-03-26*
