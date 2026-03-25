# Architecture Research

**Domain:** Heavily animated single-page portfolio site (Samurai/Japanese aesthetic)
**Researched:** 2026-03-25
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
+---------------------------------------------------------------+
|                     Presentation Layer                         |
|  +----------+ +----------+ +----------+ +----------+          |
|  | Navbar   | | Hero     | | Sections | | Footer   |          |
|  | (sticky) | | (fullscr)| | (x7)    | |          |          |
|  +----+-----+ +----+-----+ +----+-----+ +----+-----+         |
|       |             |            |            |               |
+-------+-------------+------------+------------+---------------+
|                     Animation Layer                            |
|  +------------------+ +------------------+ +--------------+   |
|  | GSAP ScrollTrig. | | Framer Motion    | | Particle Eng.|   |
|  | (scroll-driven)  | | (component anim) | | (canvas/WebGL)|  |
|  +--------+---------+ +--------+---------+ +------+-------+   |
|           |                    |                   |          |
+---------------------------------------------------------------+
|                     System Layer                               |
|  +-------------+ +-------------+ +-----------+ +----------+  |
|  | i18n        | | Audio Mgr   | | Data Layer| | Perf     |  |
|  | (next-intl) | | (Web Audio) | | (static)  | | Monitor  |  |
|  +-------------+ +-------------+ +-----------+ +----------+  |
+---------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| RootLayout | HTML shell, font loading, metadata, providers wrapping | `app/[locale]/layout.tsx` (Server Component) |
| Providers | Client-side context composition (i18n, audio, animation) | `components/providers/Providers.tsx` ("use client") |
| Navbar | Sticky navigation, section links, language toggle, audio toggle, CV download | `components/layout/Navbar.tsx` ("use client") |
| KanjiIntro | Full-screen loading animation with brush-stroke kanji reveal | `components/intro/KanjiIntro.tsx` ("use client") |
| Section Wrapper | Scroll-trigger registration, viewport detection, section transitions | `components/sections/SectionWrapper.tsx` ("use client") |
| Hero Section | Full-screen landing, name/title reveal, ink splash animation | `components/sections/Hero.tsx` ("use client") |
| About Section | Bio, profile photo with ink-wash frame, stat counters | `components/sections/About.tsx` ("use client") |
| Skills Section | Skill categories in scroll/tomar style, katana-style proficiency bars | `components/sections/Skills.tsx` ("use client") |
| Experience Section | Vertical timeline (samurai journey), job cards with ink stamps | `components/sections/Experience.tsx` ("use client") |
| Projects Section | Grid/masonry layout, parchment-style cards, hover ink reveal | `components/sections/Projects.tsx` ("use client") |
| Achievements Section | TEKNOFEST/CanSat medals, badge-style presentation | `components/sections/Achievements.tsx` ("use client") |
| Contact Section | Social links as mon (crest) icons | `components/sections/Contact.tsx` ("use client") |
| ParticleCanvas | Sakura petal particle system rendered on a fixed canvas overlay | `components/effects/ParticleCanvas.tsx` ("use client") |
| AudioManager | Ambient music playback, interaction sound effects, mute toggle state | `components/audio/AudioManager.tsx` ("use client") via context |
| ScrollProgress | Visual scroll position indicator (katana slash or ink trail) | `components/effects/ScrollProgress.tsx` ("use client") |

## Recommended Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with fonts, metadata, providers
│   │   └── page.tsx            # Single page composing all sections
│   ├── globals.css             # Tailwind directives, custom CSS variables
│   └── favicon.ico
├── components/
│   ├── intro/
│   │   └── KanjiIntro.tsx      # Brush-stroke loading animation
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with section links
│   │   └── Footer.tsx          # Minimal footer
│   ├── sections/
│   │   ├── SectionWrapper.tsx  # Shared scroll-trigger + reveal logic
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Achievements.tsx
│   │   └── Contact.tsx
│   ├── effects/
│   │   ├── ParticleCanvas.tsx  # Sakura particle overlay
│   │   ├── InkSplash.tsx       # Reusable ink splash SVG animation
│   │   ├── BrushStroke.tsx     # Brush stroke reveal effect
│   │   ├── ParallaxLayer.tsx   # Mountain/cloud parallax background
│   │   └── ScrollProgress.tsx  # Scroll position indicator
│   ├── ui/
│   │   ├── KatanaBar.tsx       # Skill proficiency bar (katana style)
│   │   ├── InkCard.tsx         # Card with ink-wash hover reveal
│   │   ├── TimelineNode.tsx    # Single timeline entry component
│   │   ├── MonIcon.tsx         # Japanese crest-styled social icon
│   │   ├── StatCounter.tsx     # Animated number counter
│   │   └── TypeWriter.tsx      # JP-to-EN typing effect
│   ├── audio/
│   │   └── AudioManager.tsx    # Audio context provider + controls
│   └── providers/
│       └── Providers.tsx       # Composed client providers wrapper
├── hooks/
│   ├── useScrollSection.ts     # Active section detection from scroll position
│   ├── useReducedMotion.ts     # Respect prefers-reduced-motion + mobile detection
│   ├── useAudio.ts             # Audio context consumer hook
│   └── useGSAPScrollTrigger.ts # Encapsulated GSAP ScrollTrigger setup + cleanup
├── lib/
│   ├── gsap-config.ts          # GSAP plugin registration (ScrollTrigger, etc.)
│   ├── animation-variants.ts   # Shared Framer Motion animation variants
│   ├── data.ts                 # Typed portfolio data (from EMIRHAN_KAYA_DATA.md)
│   └── constants.ts            # Section IDs, color tokens, breakpoints
├── i18n/
│   ├── routing.ts              # next-intl routing config (TR, EN)
│   ├── request.ts              # next-intl request config
│   └── messages/
│       ├── tr.json             # Turkish translations
│       └── en.json             # English translations
├── assets/
│   ├── images/                 # Sumi-e backgrounds, profile photo, decorative SVGs
│   ├── sounds/                 # Ambient music, interaction SFX (small files)
│   └── fonts/                  # If self-hosting any fonts
├── middleware.ts                # next-intl locale detection middleware
└── next.config.ts              # next-intl plugin, image config
```

### Structure Rationale

- **`app/[locale]/`:** next-intl requires a `[locale]` dynamic segment for App Router i18n. Since this is single-page, there is only one `page.tsx` inside it.
- **`components/sections/`:** Each section is self-contained with its own animations. The `SectionWrapper` provides shared scroll-trigger registration so each section does not re-implement boilerplate.
- **`components/effects/`:** Decoupled visual effects (particles, ink splash, parallax) that can be toggled off on mobile without touching section logic.
- **`components/ui/`:** Small, reusable presentational components with no scroll/animation awareness. They receive data via props and render.
- **`hooks/`:** Custom hooks encapsulate animation lifecycle (GSAP cleanup), scroll state, and audio state. Critical for preventing memory leaks.
- **`lib/gsap-config.ts`:** Single file that registers GSAP plugins once. Imported by the Providers component to avoid duplicate registration.
- **`lib/data.ts`:** All portfolio data typed as TypeScript objects. No API calls, no CMS. Sections import what they need.

## Architectural Patterns

### Pattern 1: Animation Responsibility Split (GSAP + Framer Motion)

**What:** Use GSAP exclusively for scroll-driven animations (ScrollTrigger, timelines, complex sequences). Use Framer Motion exclusively for component-level animations (mount/unmount, hover, layout transitions, `whileInView`).

**When to use:** Always in this project. This is the core architectural decision.

**Trade-offs:**
- PRO: Each library does what it is best at. GSAP excels at scroll-pinned timelines and complex sequencing. Framer Motion excels at React-lifecycle-aware component animations.
- PRO: Avoids conflicts -- both libraries trying to animate the same property on the same element will cause jank.
- CON: Two animation libraries increase bundle size (~55KB combined gzipped). Acceptable for a portfolio site.

**Rule of thumb:**
```
GSAP owns:           Framer Motion owns:
- ScrollTrigger      - whileInView fade/slide reveals
- Pinned sections    - whileHover effects
- Kanji brush anim   - AnimatePresence (intro exit)
- Parallax layers    - Layout animations
- Complex timelines  - Gesture-based animations
```

### Pattern 2: Centralized GSAP Registration

**What:** Register all GSAP plugins (ScrollTrigger, etc.) once in a top-level client component, not in each section.

**When to use:** Always. Prevents duplicate registration and ensures cleanup consistency.

**Trade-offs:**
- PRO: Single point of plugin registration, easier to debug
- PRO: ScrollTrigger.refresh() can be called from one place after all sections mount
- CON: Slightly couples the provider to knowing which plugins are needed

**Example:**
```typescript
// lib/gsap-config.ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

### Pattern 3: Server Component Shell + Client Islands

**What:** The root layout and page composition are Server Components. Each section is a "use client" island. Data is passed from server to client via props.

**When to use:** Always in Next.js 15 App Router projects with heavy interactivity.

**Trade-offs:**
- PRO: Static HTML shell is fast to render and SEO-friendly. Metadata, fonts, and initial structure are server-rendered.
- PRO: Each section hydrates independently.
- CON: Since every section needs animations, almost all leaf components are client components. The server component benefit is mainly in the layout/page shell and data preparation.

**Example:**
```typescript
// app/[locale]/page.tsx (Server Component)
import { getTranslations } from "next-intl/server";
import { portfolioData } from "@/lib/data";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
// ... other sections

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <main>
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      {/* ... remaining sections */}
    </main>
  );
}
```

### Pattern 4: Progressive Animation Degradation

**What:** Detect device capability and user preference, then reduce or disable animations accordingly. Three tiers: full (desktop), reduced (mobile), none (prefers-reduced-motion).

**When to use:** Always. Required for both performance and accessibility.

**Trade-offs:**
- PRO: Mobile gets smooth 60fps by disabling particles and parallax
- PRO: Respects accessibility preferences
- CON: Must maintain animation code that conditionally executes, adding complexity

**Example:**
```typescript
// hooks/useReducedMotion.ts
export function useReducedMotion() {
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  return {
    tier: prefersReduced ? "none" : isMobile ? "reduced" : "full",
    shouldAnimate: !prefersReduced,
    shouldParticle: !prefersReduced && !isMobile,
    shouldParallax: !prefersReduced && !isMobile,
  };
}
```

### Pattern 5: Audio Context with Lazy Initialization

**What:** Audio context is created only after the first user interaction (click/tap). Ambient music and SFX are loaded lazily. State is managed through React context.

**When to use:** Always for web audio. Browsers block autoplay, so audio must be user-initiated.

**Trade-offs:**
- PRO: Complies with browser autoplay policy
- PRO: Default muted means no unexpected sound
- CON: First interaction has a small delay while AudioContext initializes

## Data Flow

### Page Load Flow

```
Browser Request
    |
    v
Next.js Server (RSC)
    |-- Resolves locale from URL/middleware
    |-- Loads translations (next-intl)
    |-- Imports static portfolio data
    |-- Renders HTML shell with section placeholders
    |
    v
Client Hydration
    |-- Providers mount (GSAP registration, Audio context, i18n client)
    |-- KanjiIntro plays (AnimatePresence)
    |-- After intro exit: ScrollTrigger.refresh()
    |-- Sections register their scroll triggers
    |-- ParticleCanvas starts rendering (desktop only)
    |
    v
User Scrolls
    |-- ScrollTrigger fires section animations (GSAP)
    |-- useInView triggers component reveals (Framer Motion)
    |-- Active section updates navbar highlight
    |-- Parallax layers shift (GSAP, desktop only)
    |-- Audio SFX fire on section transitions (if unmuted)
```

### State Management

```
React Context (no external state library needed)
    |
    +-- AudioContext -----> { isMuted, volume, playEffect() }
    |                         ^
    |                         | (toggle from Navbar)
    |
    +-- ScrollContext ----> { activeSection, scrollProgress }
    |                         ^
    |                         | (IntersectionObserver / ScrollTrigger)
    |
    +-- IntlContext ------> { locale, t() }  (provided by next-intl)
```

No Redux, Zustand, or external state library is needed. This is a static portfolio with three simple pieces of global state: audio mute toggle, active scroll section, and locale. React Context handles all of these cleanly.

### Key Data Flows

1. **Portfolio data:** `lib/data.ts` (typed static objects) --> imported in `page.tsx` (Server Component) --> passed as props to section Client Components. No API, no fetch, no loading states.

2. **Translations:** `i18n/messages/{locale}.json` --> loaded by `next-intl` via `getTranslations()` on server --> passed to client via `NextIntlClientProvider` --> consumed via `useTranslations()` hook in sections.

3. **Scroll position:** Browser scroll event --> `IntersectionObserver` in `useScrollSection` hook --> updates `activeSection` state --> Navbar re-renders active link highlight. GSAP ScrollTrigger independently fires section animations (does not depend on React state).

4. **Audio:** User clicks unmute --> `AudioContext` created (lazy) --> ambient music starts --> scroll/interaction events fire `playEffect()` --> effects play through shared `AudioContext`.

## Scaling Considerations

This is a portfolio site. Scaling to millions of users is not a concern. The "scaling" axis here is content growth and animation complexity.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (7 sections) | Monolithic single page works perfectly. All sections in one render. |
| 15+ sections | Consider lazy-loading below-fold sections with `dynamic()` + `loading` prop. ScrollTrigger still registers on mount. |
| Adding a blog | Add `app/[locale]/blog/` route. Blog pages are separate from portfolio. Navbar gets a Blog link. |
| CMS integration | Replace `lib/data.ts` imports with `fetch()` calls in Server Components. Section components stay unchanged (they receive data via props). |

### Performance Priorities

1. **First bottleneck: Bundle size from animations.** GSAP core + ScrollTrigger (~23KB) + Framer Motion (~32KB) = ~55KB gzipped. Acceptable but monitor. Use dynamic imports for GSAP plugins not needed on initial load.
2. **Second bottleneck: Particle canvas on low-end devices.** Use `requestAnimationFrame` with frame budgeting. Disable entirely on mobile. Consider reducing particle count on mid-range devices.
3. **Third bottleneck: Font loading.** Four font families (Noto Serif JP, Playfair Display, Inter, Noto Sans) is heavy, especially Noto Serif JP with Japanese characters. Use `next/font` with `display: swap` and subset Japanese characters to only the kanjis used (7 decorative characters).

## Anti-Patterns

### Anti-Pattern 1: Animating the Same Property with Both Libraries

**What people do:** Use Framer Motion `animate` on a div's `opacity`, then also GSAP `gsap.to()` on the same div's opacity via ScrollTrigger.
**Why it's wrong:** Both libraries fight for control of the same CSS property. Results in flickering, janky animations, and unpredictable behavior.
**Do this instead:** Establish clear ownership. If GSAP ScrollTrigger controls an element's entrance, do NOT also put `whileInView` on it. Use wrapper divs if you need both (outer div for scroll positioning via GSAP, inner div for hover via Framer Motion).

### Anti-Pattern 2: Registering ScrollTrigger in Every Section Component

**What people do:** Call `gsap.registerPlugin(ScrollTrigger)` inside each section's `useEffect` or `useGSAP`.
**Why it's wrong:** Redundant registration, harder to debug, and ScrollTrigger.refresh() timing becomes unpredictable when each section refreshes independently.
**Do this instead:** Register once in `lib/gsap-config.ts`, import from there. Call `ScrollTrigger.refresh()` once after the intro animation completes and all sections are mounted.

### Anti-Pattern 3: Not Cleaning Up GSAP Animations

**What people do:** Create GSAP tweens and timelines in `useEffect` without returning cleanup functions.
**Why it's wrong:** Memory leaks, stale ScrollTrigger instances, and animations that fire on unmounted components. Especially bad in Next.js with React Strict Mode (double-mounts in development).
**Do this instead:** Use the `useGSAP` hook from `@gsap/react` which handles cleanup automatically. Or manually call `ScrollTrigger.getAll().forEach(t => t.kill())` in cleanup.

### Anti-Pattern 4: Loading All Audio Files on Page Load

**What people do:** Import all audio files at the top level or preload them in the HTML.
**Why it's wrong:** Ambient music files can be 1-5MB. Loading them before the user even unmutes wastes bandwidth and hurts Lighthouse scores.
**Do this instead:** Lazy-load audio files. Only fetch the ambient music file when the user clicks unmute. Pre-load only tiny SFX files (~10-50KB each) that need instant playback.

### Anti-Pattern 5: Making Every Component a Client Component

**What people do:** Add "use client" to every file because animations need it.
**Why it's wrong:** Loses server-rendering benefits for static content (SEO, initial paint speed).
**Do this instead:** Keep `page.tsx` and `layout.tsx` as Server Components. They import and compose Client Component sections. The server renders the HTML structure; sections hydrate for interactivity.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel | `vercel deploy` via Git push | Zero-config for Next.js. Edge middleware for i18n locale detection. |
| Google Fonts | `next/font/google` in layout.tsx | Automatic font optimization, self-hosting, no layout shift. Subset JP fonts to used characters. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Components <-> Client Components | Props (data flows down) | Portfolio data and translations serialized at the server boundary. No "use server" actions needed (no forms). |
| GSAP <-> Framer Motion | No direct communication | Separate DOM targets. GSAP owns scroll-driven elements, Framer Motion owns component lifecycle elements. Coordinate via CSS class toggling if needed. |
| Sections <-> Navbar | Shared scroll state via context | `useScrollSection` hook updates `activeSection` in context. Navbar reads from context. |
| Audio <-> UI Components | Audio context + hook | Components call `useAudio().playEffect("katana")`. AudioManager handles actual playback. |
| i18n <-> All Components | `useTranslations()` hook | Every component that renders text calls the hook. Translation keys namespaced by section. |
| Effects <-> Reduced Motion | `useReducedMotion()` hook | ParticleCanvas, ParallaxLayer, and complex GSAP timelines check the hook before initializing. |

## Build Order (Dependencies)

The component dependency graph dictates build order:

```
Phase 1: Foundation (no animation dependencies)
  - Project setup (Next.js 15, Tailwind 4, TypeScript)
  - lib/data.ts (typed portfolio data)
  - i18n setup (next-intl, messages, middleware)
  - app/[locale]/layout.tsx + page.tsx shell
  - Providers.tsx skeleton

Phase 2: Static Sections (content renders, no animation)
  - Navbar (static, no scroll detection yet)
  - All 7 sections rendering data with Tailwind styling
  - Footer
  --> At this point: a working, ugly-but-functional portfolio

Phase 3: Animation Infrastructure
  - lib/gsap-config.ts (plugin registration)
  - hooks/useReducedMotion.ts
  - hooks/useScrollSection.ts
  - SectionWrapper with scroll-trigger registration
  - lib/animation-variants.ts (Framer Motion presets)

Phase 4: Section Animations
  - Framer Motion whileInView reveals on each section
  - GSAP ScrollTrigger timelines per section
  - Stat counter animations
  - TypeWriter effect
  - Timeline node animations

Phase 5: Visual Effects
  - KanjiIntro brush-stroke animation
  - InkSplash SVG animations
  - ParallaxLayer backgrounds
  - ParticleCanvas (sakura petals)
  - ScrollProgress indicator

Phase 6: Audio + Polish
  - AudioManager context + lazy loading
  - Ambient music integration
  - Interaction SFX
  - Performance optimization (Lighthouse audit)
  - Mobile animation degradation tuning
  - Accessibility audit
```

**Build order rationale:** Content-first ensures the site is always deployable and SEO-indexable. Animation layers on top without blocking content delivery. Visual effects are the most complex and least critical for functionality -- they come last. Audio is pure enhancement and can be added independently.

## Sources

- [GSAP ScrollTrigger in Next.js with useGSAP](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/)
- [Optimizing GSAP Animations in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [GSAP vs Framer Motion Performance Comparison](https://blog.uavdevelopment.io/blogs/comparing-the-performance-of-framer-motion-and-gsap-animations-in-next-js)
- [Framer Motion Complete Guide for React/Next.js](https://inhaq.com/blog/framer-motion-complete-guide-react-nextjs-developers)
- [Motion.dev Scroll Animations Documentation](https://motion.dev/docs/react-scroll-animations)
- [next-intl App Router Setup](https://next-intl.dev/docs/getting-started/app-router)
- [Next.js App Router Best Practices 2025](https://www.raftlabs.com/blog/building-with-next-js-best-practices-and-benefits-for-performance-first-teams/)
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Web Audio API Best Practices (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [use-sound React Hook](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/)
- [Framer vs GSAP Comparison](https://pentaclay.com/blog/framer-vs-gsap-which-animation-library-should-you-choose)

---
*Architecture research for: Samurai-themed animated portfolio site*
*Researched: 2026-03-25*
