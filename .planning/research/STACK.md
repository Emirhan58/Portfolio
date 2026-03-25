# Stack Research

**Domain:** Heavily animated, samurai-themed single-page portfolio site
**Researched:** 2026-03-25
**Confidence:** HIGH

## Important Note: Next.js Version

The project constraints specify Next.js 15. However, Next.js 16 is now stable (released late 2025) with significantly faster Turbopack builds (36s vs 252s), stable PPR, and React 19.2 support. For a greenfield project in March 2026, **Next.js 15 is still perfectly viable** -- it is stable and well-documented. If the team wants to upgrade later, the migration path from 15 to 16 is straightforward. This document respects the Next.js 15 constraint as specified.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (latest 15.5+) | Framework, SSG, App Router | Specified in constraints. Stable, excellent Vercel deploy, App Router for modern patterns. Use `output: 'export'` for static site since no backend needed. |
| TypeScript | 5.x | Type safety | Specified in constraints. Catches animation config errors at compile time, excellent DX with GSAP/Motion types. |
| Tailwind CSS | 4.x | Styling | Specified in constraints. v4 is a ground-up rewrite -- 5x faster full builds, CSS-first config with `@theme`, native cascade layers. No `tailwind.config.js` needed; configure via CSS `@theme` block. |
| React | 19.x | UI library | Ships with Next.js 15. Needed for `use client` component boundary pattern that animation-heavy sites rely on. |

### Animation Stack

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| GSAP | 3.14.x | Complex animations, scroll-driven effects, SVG, timelines | The industry standard for scroll-triggered animations, complex timelines, and SVG brush-stroke effects. Now 100% FREE (all plugins) thanks to Webflow sponsorship. Essential for: ink splash reveals, parallax layers, kanji brush animation, katana slash transitions. |
| @gsap/react | 2.1.x | React integration for GSAP | Provides `useGSAP()` hook -- drop-in replacement for `useEffect` with automatic cleanup via `gsap.context()`. Prevents memory leaks and stuck ScrollTriggers on route changes. |
| GSAP ScrollTrigger | (bundled with gsap) | Scroll-driven animations | Scroll-triggered ink splashes, section reveals, parallax mountain/cloud layers. Register once in a centralized plugin file. |
| GSAP SplitText | (bundled with gsap) | Text animation | Japanese-to-English typing effect, brush-style text reveals. Previously premium, now free. |
| Motion (Framer Motion) | 12.x | Declarative UI animations | Renamed from `framer-motion` to `motion`. Import from `motion/react`. Use for: component mount/unmount transitions, hover states, layout animations, toggle switches. Simpler API for routine UI micro-interactions. |
| Lenis | 1.3.x | Smooth scrolling | Lightweight smooth scroll library from darkroom.engineering. Pairs perfectly with GSAP ScrollTrigger. Configure with `autoRaf: false` and drive from GSAP ticker for synchronized scroll + animation. |

**GSAP vs Motion division of labor:**
- **GSAP** = scroll-driven effects, complex timelines, SVG paths, canvas, ink brush animations, parallax
- **Motion** = component enter/exit, hover/tap states, layout transitions, simple declarative animations
- They coexist well. GSAP for the "wow" effects, Motion for UI polish.

### Internationalization

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-intl | 4.8.x | i18n (TR + EN) | Purpose-built for Next.js App Router + RSC. 1.8M weekly downloads, fastest-growing i18n lib for Next.js. Loads translations in server components with zero hydration overhead. Simpler setup than next-i18next for App Router. |

### Audio

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| howler.js | 2.2.4 | Audio playback engine | 7KB gzipped, no dependencies. Handles ambient music + SFX with Web Audio API (HTML5 Audio fallback). Supports sprites for multiple SFX in one file, volume control, fade, loop. Battle-tested (9+ years). Last npm publish was 2022 but the API is stable and complete -- audio playback is a solved problem. |

**Why howler.js over use-sound:** `use-sound` is a thin React wrapper around howler.js. For this project we need: ambient background music with loop/fade, multiple concurrent SFX, global mute toggle, and sprite sheets. Howler.js directly gives full control. Wrap it in a custom React hook/context for clean integration.

### Particle Effects

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Custom canvas** | -- | Sakura particle effects | Build a lightweight custom canvas component instead of tsParticles. tsParticles is 50KB+ for something you can do in ~100 lines of canvas code. Sakura particles are simple (falling + swaying motion). Custom = smaller bundle, full visual control, no dependency bloat. |

**Why NOT tsParticles:** Overkill for leaf/petal particles. Adds significant bundle weight. A custom `<canvas>` with requestAnimationFrame gives you exact control over particle shape, color, physics, and integrates cleanly with the theme. If particle needs grow complex later, tsParticles can be added.

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.x | Conditional class merging | Combining Tailwind classes conditionally (e.g., mobile animation states) |
| tailwind-merge | 2.x | Tailwind class conflict resolution | Merge component prop classes without conflicts |
| @vercel/analytics | latest | Analytics | Track portfolio visits on Vercel (free tier) |
| sharp | latest | Image optimization | Next.js Image component optimization for ink-wash backgrounds, profile photo |

### Fonts

| Font | Source | Purpose | Notes |
|------|--------|---------|-------|
| Noto Serif JP | Google Fonts | Headings, kanji | Japanese + Latin support. Use `next/font/google` for zero-CLS loading. |
| Inter | Google Fonts | Body text | Clean, professional. Already popular in dev portfolios. |
| Playfair Display | Google Fonts | Accent headings | Elegant serif for section titles. Use sparingly alongside Noto Serif JP. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | Ships with Next.js. Add `eslint-plugin-react-hooks` for hook rules. |
| Prettier | Code formatting | With `prettier-plugin-tailwindcss` for class sorting. |
| Turbopack | Dev server bundler | Use `next dev --turbopack` for fast HMR. Stable in Next.js 15.5+. |

## Installation

```bash
# Core framework
npm install next@15 react@19 react-dom@19 typescript

# Styling
npm install tailwindcss@4 @tailwindcss/postcss postcss

# Animation
npm install gsap @gsap/react motion lenis

# i18n
npm install next-intl

# Audio
npm install howler

# Utilities
npm install clsx tailwind-merge

# Fonts (handled via next/font, no install needed)

# Dev dependencies
npm install -D @types/react @types/react-dom @types/node @types/howler
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| next-intl | next-i18next | Only if migrating an existing Pages Router project with i18next JSON files already in place |
| howler.js | use-sound | If you only need simple one-shot SFX with no ambient music, looping, or sprite sheets |
| Custom canvas particles | tsParticles (@tsparticles/react 3.x) | If particle effects become complex (physics simulations, interactive, multiple emitters). Not worth it for simple sakura petals. |
| Lenis | GSAP ScrollSmoother | ScrollSmoother is now free with GSAP, but Lenis is more lightweight, has a simpler API, and better community patterns for Next.js |
| Tailwind CSS 4 | CSS Modules | Only if the team strongly prefers scoped CSS over utility classes. Not recommended -- Tailwind 4 is faster and matches the rapid prototyping needed for a portfolio. |
| Next.js 15 | Next.js 16 | For a greenfield project in 2026, Next.js 16 offers faster builds and stable PPR. Consider upgrading after v1 ships if performance gains are needed. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` (old package name) | Rebranded to `motion`. The `framer-motion` npm package still works but is the legacy name. New projects should use the current name. | `motion` (import from `motion/react`) |
| `@studio-freight/lenis` | Deprecated. Renamed to `lenis`. | `lenis` |
| `@studio-freight/react-lenis` | Deprecated wrapper. Lenis 1.x has built-in React support or use a thin custom wrapper. | `lenis` with custom React provider |
| react-scroll / react-scroll-parallax | Unnecessary when you have GSAP ScrollTrigger + Lenis. Adding another scroll library creates conflicts. | GSAP ScrollTrigger |
| Animate.css / AOS | CSS-only animation libraries lack the timeline control and scroll precision needed for themed transitions. | GSAP + Motion |
| particles.js | Abandoned, no TypeScript, no tree-shaking. | Custom canvas or tsParticles if needed |
| next-themes | Unnecessary -- project is dark-only. Adding theme switching adds complexity for zero value. | Hardcode dark theme in Tailwind config |
| react-i18next | Requires extra boilerplate for App Router RSC. next-intl is purpose-built for this. | next-intl |
| CSS scroll-snap | Conflicts with Lenis smooth scroll. Scroll-snap enforces rigid snap points that fight smooth inertial scrolling. | Lenis + GSAP ScrollTrigger for scroll control |

## Stack Patterns

**For scroll-triggered animations (ink splash, section reveals):**
- Use GSAP ScrollTrigger in `"use client"` components
- Push `"use client"` as deep as possible -- wrap only the animated element, not the whole page
- Call `ScrollTrigger.refresh()` once after all section animations initialize

**For component micro-interactions (hover, tap, toggle):**
- Use Motion's `<motion.div>` with `whileHover`, `whileTap`, `animate`
- Declarative API is faster to write and easier to maintain for simple states

**For ambient music + SFX:**
- Create an `AudioProvider` context with howler.js
- Expose `playAmbient()`, `playSFX(name)`, `toggleMute()`, `isMuted`
- Default muted. User toggles via floating button.
- Use audio sprites (one file, multiple SFX) to reduce HTTP requests

**For i18n with only 2 languages:**
- next-intl with JSON message files (`messages/tr.json`, `messages/en.json`)
- Middleware-based locale detection
- No URL prefix needed for default locale (TR)

**For mobile animation reduction:**
- Use `matchMedia` or `window.innerWidth` check at GSAP context level
- Disable parallax + particles on mobile; keep fade/slide reveals
- Motion's `reducedMotion` prop respects `prefers-reduced-motion`

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| next@15.5 | react@19, react-dom@19 | Next.js 15 requires React 19 |
| gsap@3.14 | @gsap/react@2.1 | Both from GreenSock, tested together |
| motion@12.x | react@19 | Motion 12 supports React 19 |
| next-intl@4.x | next@15 | next-intl 4.x designed for Next.js 14-15 App Router |
| tailwindcss@4 | postcss, @tailwindcss/postcss | v4 uses new PostCSS plugin, NOT the old `tailwindcss` CLI config |
| lenis@1.3 | gsap@3.14 (ScrollTrigger) | Sync via `lenis.on('scroll', ScrollTrigger.update)` + GSAP ticker |

## Sources

- [Next.js Blog](https://nextjs.org/blog) -- Next.js 15.5, version status (HIGH confidence)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- v16 availability (HIGH confidence)
- [GSAP npm](https://www.npmjs.com/package/gsap) -- v3.14.2, free license (HIGH confidence)
- [GSAP Installation Docs](https://gsap.com/docs/v3/Installation/) -- plugin registration, free status (HIGH confidence)
- [@gsap/react npm](https://www.npmjs.com/package/@gsap/react) -- v2.1.2 (HIGH confidence)
- [Motion (Framer Motion) npm](https://www.npmjs.com/package/framer-motion) -- v12.38.0 (HIGH confidence)
- [Motion Docs](https://motion.dev/docs) -- rebranding, import path (HIGH confidence)
- [Tailwind CSS v4 Blog](https://tailwindcss.com/blog/tailwindcss-v4) -- v4 stable Jan 2025 (HIGH confidence)
- [next-intl npm](https://www.npmjs.com/package/next-intl) -- v4.8.3, App Router support (HIGH confidence)
- [next-intl Docs](https://next-intl.dev/) -- RSC support, middleware routing (HIGH confidence)
- [Howler.js npm](https://www.npmjs.com/package/howler) -- v2.2.4 (HIGH confidence)
- [Lenis npm](https://www.npmjs.com/package/lenis) -- v1.3.20 (HIGH confidence)
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) -- package rename, autoRaf (HIGH confidence)
- [GSAP + Next.js Best Practices](https://gsap.com/community/forums/topic/43831-what-are-the-best-practices-for-using-gsap-with-next-15-clientserver-components/) -- "use client" strategy (MEDIUM confidence)
- [GSAP ScrollTrigger + Lenis pattern](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) -- integration pattern (MEDIUM confidence)
- [GSAP vs Motion comparison](https://motion.dev/docs/gsap-vs-motion) -- coexistence patterns (HIGH confidence)

---
*Stack research for: Samurai-themed animated portfolio with Next.js 15*
*Researched: 2026-03-25*
