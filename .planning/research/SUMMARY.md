# Project Research Summary

**Project:** Samurai-themed animated portfolio site (cv-sitem)
**Domain:** Heavily animated single-page developer portfolio with Japanese/samurai aesthetic
**Researched:** 2026-03-25
**Confidence:** HIGH

## Executive Summary

This is a single-page, scroll-driven developer portfolio targeting mid-level backend developers seeking international roles. The site differentiates itself through a committed samurai/Japanese ink aesthetic — brush-stroke animations, parallax ukiyo-e layers, kanji typography, and optional ambient audio — while remaining recruiter-functional (fast load, clear content, TR/EN bilingual). Research across all four areas converges on a clear approach: build content first (working static site with i18n), layer animation infrastructure second, then add the signature visual effects on top. This order ensures the site is always deployable and SEO-indexable, while keeping animations as enhancement rather than gate.

The recommended stack (Next.js 15 + Tailwind 4 + GSAP + Motion + next-intl + howler.js) is well-matched to the project requirements and fully confirmed against current documentation. The most critical architectural decision is establishing strict animation ownership between GSAP and Motion before writing any animations: GSAP owns all scroll-driven effects, timelines, and SVG animations; Motion owns component mount/unmount, hover, and layout transitions. Violating this boundary causes the most common and most expensive bugs in this tech combination.

The dominant risks all concentrate in Phase 1. Five of the seven critical pitfalls must be addressed before any content sections are built: GSAP plugin registration pattern, client/server component boundaries, font subsetting strategy, the `prefers-reduced-motion` detection utility, and the kanji intro animation's LCP architecture. Getting these wrong means expensive retroactive fixes. Getting them right makes all subsequent phases low-risk.

## Key Findings

### Recommended Stack

The stack is fully specified in constraints and validated by research. Next.js 15 with `output: 'export'` for static site generation, TypeScript 5, and Tailwind CSS 4 (CSS-first config via `@theme`, no config file) form the foundation. The animation layer uses two libraries with clear division: GSAP 3.14 (with `@gsap/react` hook, ScrollTrigger, SplitText — all now free) for scroll-driven and complex effects, and Motion 12 (`motion/react`) for declarative component animations. Lenis 1.3 provides smooth scrolling synchronized with GSAP via the ticker pattern. For i18n, next-intl 4.8 is the correct choice over next-i18next for App Router RSC. Audio is handled by howler.js 2.2.4 directly (not the `use-sound` wrapper) to support ambient loops, sprites, and global mute. Sakura particles should be a custom canvas component rather than tsParticles — approximately 100 lines of canvas code vs. 50KB+ of dependency.

**Core technologies:**
- Next.js 15.x: Framework with App Router and static export — specified constraint, excellent Vercel deploy
- TypeScript 5.x: Type safety across animation configs and data layer — catches GSAP config errors at compile time
- Tailwind CSS 4.x: Styling with CSS-first `@theme` config — 5x faster builds vs v3, no config.js needed
- GSAP 3.14 + @gsap/react: Scroll-driven animations, SVG, timelines — industry standard, now fully free
- Motion 12 (motion/react): Component-level declarative animations — simpler API for hover/mount/layout
- Lenis 1.3: Smooth scrolling — lightweight, pairs cleanly with GSAP ScrollTrigger via ticker sync
- next-intl 4.8: i18n for App Router RSC — purpose-built for Next.js 15, zero hydration overhead
- howler.js 2.2.4: Audio playback — handles ambient music, SFX sprites, lazy init, and mute toggle
- Custom canvas: Sakura particles — smaller bundle than tsParticles, full visual control

### Expected Features

Research confirms a clear three-tier feature model. The first tier is table-stakes items that recruiters assume exist and whose absence signals an unprofessional portfolio. The second tier is the samurai aesthetic differentiators that make the site memorable. The third tier is anti-features — things that look appealing but actively harm the recruiter audience (custom cursor, WebGL, horizontal scroll, contact form, auto-playing audio).

**Must have (table stakes for launch):**
- Responsive single-page layout with 7 sections — skeleton everything hangs on
- Dark theme with design token system — foundation for all visual components
- i18n TR + EN with language toggle — must be baked in from day one, not retrofitted
- Hero with name, role, and brush typography — first impression sets the tone
- Projects grid with descriptions and GitHub/live links — primary proof of work
- Skills section with categorized tech stack — recruiter keyword scanning
- Experience timeline with scroll-triggered reveals — career progression
- Achievements section (TEKNOFEST/CanSat) — unique differentiator for this developer
- Contact section with social links and PDF CV download — clear call to action
- SEO meta tags and Open Graph — shareable on LinkedIn with proper preview
- Scroll-triggered section reveals in ink/brush style — signature animation
- Kanji intro loading animation — the "wow" first impression, but with correct LCP architecture
- Parallax background layers — depth and atmosphere
- `prefers-reduced-motion` support and mobile animation reduction — required for accessibility and performance

**Should have (add after core launch, v1.x):**
- Sakura particle canvas — once performance is validated on target devices
- Ambient audio with interaction SFX — after core UX is solid
- Katana slash section transitions — upgrade from simple fades
- JP-to-EN typing effect in hero — enhancement once content is locked
- Ink-wash hover effects on project cards — micro-interaction polish
- Animated katana-style skill proficiency bars — visual skills section enhancement

**Defer to v2+:**
- Blog or writing section — only if developer starts publishing technical content
- Case study deep-dives with expanded project pages
- Visitor analytics dashboard
- Additional languages beyond TR and EN

**Anti-features to avoid entirely:**
- Custom cursor — accessibility nightmare, terrible on touch devices
- WebGL/Three.js 3D — 150KB+ bundle, kills mobile performance, Lighthouse score tanks
- Horizontal scroll sections — confuses recruiters, breaks accessibility
- Contact form with backend — recruiters use LinkedIn/email anyway, maintenance burden
- Light mode/theme toggle — would require a completely separate design pass, dilutes the aesthetic
- Auto-playing audio — browsers block it and users close tabs immediately

### Architecture Approach

The architecture uses three layers: a static Presentation Layer (Navbar, Hero, 7 sections, Footer), an Animation Layer (GSAP ScrollTrigger for scroll-driven effects, Motion for component animations, custom canvas for particles), and a System Layer (next-intl for i18n, howler.js AudioManager, static data in TypeScript, performance monitoring via the `useReducedMotion` hook). The `app/[locale]/` structure satisfies next-intl's App Router requirements while keeping the single-page design. All animation-heavy components are Client Components (`"use client"`); the root layout and page composition shell remain Server Components that pass static data as props. State management uses React Context only — AudioContext for mute/volume state, ScrollContext for active section, IntlContext via next-intl — no Zustand or Redux needed.

**Major components:**
1. `lib/gsap-config.ts` — GSAP plugin registration (single file, imported by Providers, never per-component)
2. `hooks/useReducedMotion.ts` — three-tier animation capability detection (full/reduced/none)
3. `components/providers/Providers.tsx` — composed client providers (GSAP init, audio context, i18n client)
4. `components/intro/KanjiIntro.tsx` — brush-stroke loading animation layered over pre-rendered hero
5. `components/sections/SectionWrapper.tsx` — shared scroll-trigger registration, reused by all 7 sections
6. `components/effects/ParticleCanvas.tsx` — sakura petal canvas, dynamically imported with `ssr: false`
7. `lib/data.ts` — all portfolio data as typed TypeScript objects, no API, no CMS

### Critical Pitfalls

1. **Kanji intro blocks LCP** — render hero content in DOM immediately (opacity 0.1 counts for LCP), layer the kanji animation on top with absolute/fixed positioning, fade it out to reveal the pre-painted hero. Never conditionally render `<Hero />` based on animation state.

2. **GSAP ScrollTrigger memory leaks** — use `useGSAP()` from `@gsap/react` exclusively (never raw `useEffect` for GSAP), set scope to component container ref, call `ScrollTrigger.refresh()` once after all sections mount, register plugins in a single `gsap-config.ts` file.

3. **GSAP and Motion fighting over the same DOM elements** — strict ownership rule: Motion handles component mount/unmount/hover (outer wrapper), GSAP handles scroll-driven animations (inner ref target). Never apply both to the same node; use nesting if both are needed.

4. **Noto Serif JP font payload destroys load performance** — use the `text` parameter in `next/font/google` to subset to only the 7 decorative kanji used. Limit to 2 weights (400 + 700). Total font payload must stay under 300KB.

5. **Hydration mismatches from GSAP in Server Components** — every component that imports GSAP or Motion must have `"use client"`. Use `dynamic({ ssr: false })` for canvas effects and particle systems. Never use `typeof window !== 'undefined'` guards inside render — use `useEffect`/`useGSAP` instead.

6. **Mobile performance collapse from particles and parallax** — completely disable (not just reduce) canvas particle systems and parallax layers on mobile via `matchMedia('(max-width: 768px)')`. Test on real mid-range Android hardware, not DevTools simulation.

7. **Web Audio autoplay failures** — create `AudioContext` lazily on first user click of the sound toggle, not on mount. Call `.resume()` inside the click event handler. Howler.js handles this internally if used correctly. Test in incognito mode across Chrome, Firefox, Safari, and mobile Safari.

## Implications for Roadmap

Research from all four files converges on a 6-phase build order that matches the architecture's dependency graph. Content-first, infrastructure-second, effects-last.

### Phase 1: Foundation
**Rationale:** Five of the seven critical pitfalls must be addressed before any content is built. Getting project setup, i18n, design tokens, GSAP initialization pattern, and the `prefers-reduced-motion` utility wrong means expensive retroactive fixes. Every subsequent component depends on these being correct.
**Delivers:** Project scaffold with correct architecture — i18n routing works, design tokens defined, GSAP registered once, animation degradation detection in place, font subsetting configured.
**Addresses:** i18n (must be day one per FEATURES.md), design token system, prefers-reduced-motion utility, PDF CV linked, SEO metadata skeleton
**Avoids:** Hydration mismatches (Pitfall 6), font payload bloat (Pitfall 4), missing i18n strings found late (FEATURES.md dependency note)

### Phase 2: Static Content Sections
**Rationale:** The site should be deployable with real content before any animation is added. This validates content completeness, i18n translation coverage, and responsive layout in all 7 sections. A working static site is the safety net for all later animation work.
**Delivers:** Fully functional, navigable, recruiter-usable portfolio — zero animations, all content present in TR and EN, responsive at all breakpoints.
**Addresses:** All P1 table-stakes features: Hero, About (stat counters static), Skills, Experience timeline (static), Projects grid, Achievements, Contact + PDF download, sticky nav with section anchors
**Avoids:** Animation blocking content access (FEATURES.md anti-pattern), i18n string extraction misses

### Phase 3: Animation Infrastructure
**Rationale:** The shared animation scaffolding — `SectionWrapper`, `useGSAPScrollTrigger` hook, `animation-variants.ts`, scroll-spy for Navbar — must be built and tested once before per-section animations are layered in. This phase delivers no visible animation but makes Phase 4 parallel-safe.
**Delivers:** Reusable animation primitives that all sections will use. `ScrollTrigger.refresh()` called correctly after all sections mount. Animation ownership documented.
**Uses:** `@gsap/react useGSAP`, `motion/react`, `lenis` with GSAP ticker sync
**Avoids:** ScrollTrigger memory leaks (Pitfall 2), GSAP/Motion DOM conflicts (Pitfall 3)

### Phase 4: Section Animations
**Rationale:** With infrastructure in place, per-section animations can be built confidently. Motion `whileInView` reveals, GSAP timeline sequences, stat counters, typewriter effect, and experience timeline node animations all follow the patterns established in Phase 3.
**Delivers:** All P1 animation features live: scroll-triggered ink/brush reveals, stat counter animations, experience timeline reveals, parallax background layers, sticky nav scroll-spy active highlighting.
**Implements:** `SectionWrapper` scroll triggers on all 7 sections, `ParallaxLayer` component (desktop only), `StatCounter`, `TypeWriter`

### Phase 5: Visual Effects (Kanji Intro + Particles)
**Rationale:** The highest-complexity visual effects — kanji brush intro animation and sakura particle canvas — are isolated to this phase because they have the most performance risk and require the LCP architecture pattern to be implemented correctly. Building them last means all content is already confirmed safe.
**Delivers:** The "wow" differentiators: `KanjiIntro` with correct LCP overlay architecture (sessionStorage skip on return visits), `ParticleCanvas` with `ssr: false` dynamic import, `InkSplash` SVG animations, `ScrollProgress` indicator.
**Avoids:** LCP blocked by intro (Pitfall 1), mobile performance collapse (Pitfall 7)

### Phase 6: Audio + Polish
**Rationale:** Audio is a pure enhancement — the entire site must work perfectly without it. Building it last means no other feature depends on it. The polish pass (Lighthouse audit, mobile testing on real hardware, accessibility audit, katana slash transitions upgrade) ensures launch quality.
**Delivers:** `AudioManager` with lazy AudioContext, ambient music toggle, interaction SFX on section transitions, Lighthouse 90+ on desktop and 85+ on mobile, WCAG AA contrast verified, keyboard navigation tested, all "Looks Done But Isn't" checklist items cleared.
**Avoids:** Audio autoplay failures (Pitfall 5), recruiter UX blockers (PITFALLS.md UX section)

### Phase Ordering Rationale

- **i18n must be Phase 1.** Retrofitting i18n into existing components is 3-5x harder than building with it from the start per FEATURES.md dependency analysis. All text must flow through the translation system from day one.
- **Design tokens before components.** CSS custom properties defining the color palette, typography scale, and spacing must exist before any component is built — every component depends on these.
- **Static site before animation.** A working static site can be deployed at the end of Phase 2. Animations are never on the critical path for content delivery.
- **Shared animation infrastructure before per-section animations.** Prevents 7 sections each implementing ScrollTrigger registration differently, which is the most common source of memory leaks in this stack.
- **Kanji intro after content is confirmed.** The intro animation's LCP architecture depends on knowing the hero content is correctly structured. Building it after Phase 2 is validated is safer.
- **Audio last.** Zero other features depend on audio. It can slip to v1.x without affecting any other phase.

### Research Flags

Phases likely needing `/gsd:research-phase` deeper investigation during planning:
- **Phase 5 (Kanji Intro):** SVG brush-stroke path animation technique needs specific research — exact approach for simulating ink brush strokes with SVG `stroke-dashoffset` animation or canvas path drawing. Multiple valid techniques exist; needs a definitive choice before implementation.
- **Phase 5 (Particle Canvas):** Custom canvas sakura particle physics (sway, rotation, varying speeds, responsive to scroll velocity) has several implementation approaches. Worth a focused research spike before building.

Phases with standard patterns (can skip research-phase):
- **Phase 1 (Foundation):** Next.js 15 + Tailwind 4 + next-intl setup is well-documented with official guides. GSAP plugin registration pattern is confirmed and straightforward.
- **Phase 2 (Static Content):** Tailwind utility-first layout with responsive breakpoints is a solved problem. No research needed.
- **Phase 3 (Animation Infrastructure):** `useGSAP` hook and Lenis+GSAP ticker sync pattern are documented and confirmed in STACK.md. Patterns are established.
- **Phase 4 (Section Animations):** Motion `whileInView` and GSAP ScrollTrigger per-element are standard patterns with abundant documentation.
- **Phase 6 (Audio):** howler.js lazy AudioContext pattern is documented in PITFALLS.md and the howler.js docs. No surprises expected.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All libraries verified against current npm versions and official docs. Version compatibility table confirmed. No speculative recommendations. |
| Features | HIGH | Based on recruiter research (multiple sources), established portfolio patterns, and Japanese design research. MVP vs v2 boundaries are well-reasoned. |
| Architecture | HIGH | Patterns derived from official GSAP/Motion/next-intl documentation and community best practices. Build order matches documented dependency graph. |
| Pitfalls | HIGH | All 7 critical pitfalls sourced from official documentation (GSAP community, Chrome autoplay policy, Next.js hydration docs) or widely-reproduced community issues. |

**Overall confidence:** HIGH

### Gaps to Address

- **Exact kanji brush animation technique:** Research identified the goal (SVG path stroke animation simulating brush strokes) but did not produce a definitive code pattern. Options include `stroke-dashoffset` animation, canvas path drawing with blur/pressure simulation, or a hybrid approach. Needs a focused spike in Phase 5 planning.
- **Lenis + ScrollTrigger sync performance on mid-range mobile:** The `lenis.on('scroll', ScrollTrigger.update)` + GSAP ticker pattern is documented, but real-world performance on Android mid-range (e.g., Samsung Galaxy A-series) with 7 active ScrollTriggers is unconfirmed. Validate during Phase 4 testing.
- **Noto Serif JP specific kanji characters:** The `text` subsetting approach requires knowing all kanji used in the final design. The decorative section kanji (門, 道, 技, 戦, 績, 接, etc.) must be finalized during Phase 1 before font configuration is locked.
- **Red accent color WCAG compliance:** PITFALLS.md flags that red (#c0392b) on dark background may fail WCAG AA contrast ratio (4.5:1). The exact accent color values need contrast-ratio verification before being committed to the design token system.

## Sources

### Primary (HIGH confidence)
- [Next.js Blog](https://nextjs.org/blog) — Next.js 15.5 status, version compatibility
- [GSAP Installation Docs](https://gsap.com/docs/v3/Installation/) — plugin registration, free license, plugin list
- [GSAP ScrollTrigger tips & mistakes (official)](https://gsap.com/resources/st-mistakes/) — pitfall patterns
- [Motion Docs](https://motion.dev/docs) — rebranding from framer-motion, React 19 support
- [Tailwind CSS v4 Blog](https://tailwindcss.com/blog/tailwindcss-v4) — v4 stable, CSS-first config
- [next-intl Docs](https://next-intl.dev/) — App Router setup, RSC support, middleware routing
- [Howler.js npm](https://www.npmjs.com/package/howler) — v2.2.4, API stability
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) — package rename, autoRaf pattern
- [Web Audio autoplay policy (Chrome)](https://developer.chrome.com/blog/web-audio-autoplay) — autoplay restrictions
- [Next.js hydration error docs](https://nextjs.org/docs/messages/react-hydration-error) — SSR/client boundary rules
- [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — accessibility requirement

### Secondary (MEDIUM confidence)
- [GSAP + Next.js Best Practices (community)](https://gsap.com/community/forums/topic/43831-what-are-the-best-practices-for-using-gsap-with-next-15-clientserver-components/) — "use client" strategy
- [GSAP ScrollTrigger + Lenis pattern (devdreaming)](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — integration pattern
- [Optimizing GSAP in Next.js 15 (Medium)](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — cleanup patterns
- [What Recruiters Look for in Developer Portfolios (Pesto)](https://pesto.tech/resources/what-recruiters-look-for-in-developer-portfolios) — feature priorities
- [Portfolio Design Trends 2026 (Colorlib)](https://colorlib.com/wp/portfolio-design-trends/) — differentiators

### Tertiary (LOW confidence)
- Community forum posts on GSAP/Next.js hydration (corroborated by official docs, but forum-sourced)

---
*Research completed: 2026-03-25*
*Ready for roadmap: yes*
