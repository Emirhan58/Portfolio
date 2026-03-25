# Pitfalls Research

**Domain:** Heavily animated samurai-themed portfolio (GSAP + Framer Motion + Next.js 15 + Audio + i18n)
**Researched:** 2026-03-25
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Kanji Intro Animation Destroys Core Web Vitals (LCP/FCP)

**What goes wrong:**
A full-screen loading animation (the brush-stroke kanji intro) blocks the Largest Contentful Paint (LCP). Lighthouse measures when the largest visible content element renders. If the actual hero content is hidden behind a 3-5 second intro animation, LCP is delayed to 5+ seconds (target is under 2.5s). Google penalizes this in search rankings. The project targets Lighthouse 90+ but a blocking intro animation makes that nearly impossible.

**Why it happens:**
Developers treat the intro animation as a "loading screen" that renders before content. The real content mounts only after the animation completes, meaning Lighthouse sees an empty or decorative page for seconds.

**How to avoid:**
- Render hero content immediately in the DOM (even if visually hidden at opacity: 0.1 -- this still counts for LCP measurement).
- Layer the kanji animation ON TOP of the already-rendered hero section using absolute/fixed positioning.
- After the animation completes, fade it out to reveal the hero that was already painted underneath.
- Consider making the intro animation skippable and only showing it once per session (sessionStorage flag).
- Alternative: make the kanji animation the LCP element itself by ensuring it is the largest painted element and starts rendering immediately (not after JS loads).

**Warning signs:**
- LCP > 3 seconds in Lighthouse
- FCP and LCP timestamps are far apart (> 2 seconds gap)
- Content is conditionally rendered based on animation state (`showContent && <Hero />`)

**Phase to address:**
Phase 1 (Foundation/Hero) -- the intro animation architecture must be correct from day one. Retrofitting is painful because it changes the entire mount sequence.

---

### Pitfall 2: GSAP ScrollTrigger Memory Leaks in Single-Page Scroll Architecture

**What goes wrong:**
ScrollTrigger instances are not properly cleaned up when components unmount or re-render. In a single-page scroll site with 7 sections, each with scroll-triggered animations, leaked ScrollTriggers accumulate and cause: degrading scroll performance, animations firing at wrong positions, increasing memory consumption, and eventually janky or frozen scrolling.

**Why it happens:**
GSAP is imperative and manipulates the DOM directly. React's component lifecycle does not automatically clean up GSAP instances. Developers create ScrollTriggers in useEffect but forget cleanup, or use useGSAP incorrectly. The single-page architecture means all 7 sections' ScrollTriggers coexist simultaneously, amplifying any leak.

**How to avoid:**
- Use the `@gsap/react` package's `useGSAP()` hook exclusively (never raw useEffect for GSAP). It wraps `gsap.context()` and handles automatic cleanup.
- For every component with ScrollTrigger, ensure the useGSAP scope is set to the component's container ref.
- Call `ScrollTrigger.refresh()` once after all sections have mounted (not inside each section).
- Never nest ScrollTrigger inside a timeline -- either keep tweens independent with their own ScrollTrigger, or apply a single ScrollTrigger to the parent timeline.
- Create a centralized GSAP config file that registers plugins once: `gsap.registerPlugin(ScrollTrigger)` in a single location, not per-component.

**Warning signs:**
- Scroll animations misfire after navigating away and returning
- Browser DevTools show increasing memory usage over time
- Console warnings about "ScrollTrigger already exists" or duplicate triggers
- Animations snap to wrong positions on window resize

**Phase to address:**
Phase 1 (Foundation) -- establish GSAP initialization pattern and useGSAP wrapper before building any scroll animations. Every subsequent phase inherits this pattern.

---

### Pitfall 3: GSAP and Framer Motion Fighting Over the Same DOM Elements

**What goes wrong:**
Both libraries try to control the same element's transform/opacity properties. GSAP directly mutates inline styles on DOM nodes. Framer Motion controls styles through React's rendering cycle and its own animation engine. When both target the same element, animations stutter, snap to wrong values, or one library's changes get overwritten by the other on every React re-render.

**Why it happens:**
Developers don't establish clear ownership boundaries. A component might use Framer Motion's `<motion.div>` for enter/exit transitions AND have a GSAP ScrollTrigger animation on the same element. Framer Motion's layout animation engine re-measures and re-applies transforms on every render, undoing GSAP's imperative changes.

**How to avoid:**
- Establish a strict separation rule: Framer Motion owns UI component transitions (mount/unmount, hover, tap, layout changes). GSAP owns scroll-driven animations, complex timelines, SVG path animations, and canvas-level effects.
- NEVER apply both libraries to the same DOM node. If a section needs both, nest them: outer `<motion.div>` for Framer Motion enter/exit, inner plain `<div ref={gsapRef}>` for GSAP scroll animations.
- Document which library owns which animation in a project-level animation guide.

**Warning signs:**
- Elements "snap" or "jump" between animation states
- Animations work in isolation but break when combined
- `<motion.div>` elements have GSAP `.to()` or ScrollTrigger targeting them

**Phase to address:**
Phase 1 (Foundation) -- define the animation ownership contract before writing any animations. Create an ANIMATION_GUIDE.md or equivalent.

---

### Pitfall 4: Noto Serif JP Font Obliterates Initial Load Performance

**What goes wrong:**
Noto Serif JP is a CJK font that supports 43,000+ characters. The full font family across weights can be multiple megabytes. Even with Google Fonts' automatic subsetting, loading Japanese characters for decorative kanji headings adds significant weight. Combined with Latin fonts (Playfair Display, Inter), the total font payload can exceed 1-2MB, destroying Time to First Byte and causing severe FOUT (Flash of Unstyled Text) or layout shifts (CLS).

**Why it happens:**
Developers add the font via next/font/google for all weights without realizing CJK fonts are fundamentally larger than Latin fonts. Google Fonts does subset CJK fonts automatically using unicode-range, but the project uses kanji in every section heading, meaning many subsets get downloaded.

**How to avoid:**
- Only load Noto Serif JP for the specific kanji characters used (7 decorative kanji: shichigatsu/mon/dou/gi/sen/saku/yo/ketsu). Use the `text` parameter in next/font/google: `Noto_Serif_JP({ subsets: ['latin'], text: 'some kanji here' })` -- this creates a custom subset with only those glyphs.
- Limit Noto Serif JP to 1-2 weights maximum (Regular 400 + Bold 700).
- Use `font-display: swap` to prevent invisible text during loading.
- Preload the critical font subset in `<head>`.
- For body text, stick entirely to Inter (Latin only, small payload).

**Warning signs:**
- Network tab shows font files > 200KB each
- Multiple large font file downloads on initial load
- CLS score > 0.1 in Lighthouse
- Text "pops in" visibly after page renders

**Phase to address:**
Phase 1 (Foundation) -- font loading strategy must be established before any content is styled. Wrong font setup cascades into every component.

---

### Pitfall 5: Web Audio Autoplay Policy Causes Silent Failures and Broken UX

**What goes wrong:**
The ambient Japanese music and interaction sound effects silently fail to play. The AudioContext is created in "suspended" state because browsers (Chrome since v71, all major browsers) block audio playback until user interaction. Developers wire up audio on component mount, it never plays, and there is no error -- just silence. Worse: if the toggle button's click handler creates the AudioContext, it works on desktop but may fail on mobile Safari with different gesture requirements.

**Why it happens:**
Browser autoplay policies require a user gesture (click/tap) before any audio can play. Developers test locally where the policy may be relaxed, or test after having already interacted with the page. The "default muted with toggle" design is correct but the implementation details matter enormously.

**How to avoid:**
- Create the AudioContext lazily -- only on the FIRST user click of the sound toggle, not on mount.
- Call `audioContext.resume()` inside a click/tap event handler.
- Pre-load audio files as ArrayBuffers but do NOT connect them to an AudioContext until user interaction.
- Test in incognito mode (no prior site engagement history) on Chrome, Firefox, Safari, and mobile Safari.
- Provide visual feedback on the toggle button that audio is "ready" vs "playing" vs "muted".
- Use the Howler.js library or a similar wrapper that handles autoplay policy internally rather than raw Web Audio API.

**Warning signs:**
- Audio works in development but not in production
- Audio works after refreshing but not on first visit
- Mobile Safari is completely silent
- No errors in console (suspended AudioContext is not an error)

**Phase to address:**
Mid-phase (Audio implementation) -- but the audio architecture decision (lazy AudioContext) must be planned from the start.

---

### Pitfall 6: Hydration Mismatches from GSAP SSR in Next.js 15

**What goes wrong:**
GSAP's ScrollTrigger adds inline styles to elements during initialization. If any GSAP code runs during server-side rendering (or if components don't have `"use client"` directive), the server-rendered HTML differs from the client hydration, causing React hydration errors. In Next.js 15 with React 19, hydration errors are stricter and more visible.

**Why it happens:**
GSAP accesses `window`, `document`, and measures DOM layout -- none of which exist on the server. Developers import GSAP in a component but forget `"use client"`, or import a shared utility that pulls in GSAP transitively. Next.js 15 App Router defaults components to Server Components.

**How to avoid:**
- Every component that imports GSAP or Framer Motion MUST have `"use client"` at the top.
- Create a client-only animation wrapper component. Server components render the static markup; the client wrapper adds animations on mount.
- Use dynamic imports with `{ ssr: false }` for heavy animation components (particle systems, canvas effects).
- Register GSAP plugins in a single client-side initialization file, not at the component level.
- Never use `typeof window !== 'undefined'` guards inside render -- use useEffect/useGSAP instead.

**Warning signs:**
- Red hydration error overlays in development
- Console warnings about "Text content does not match server-rendered HTML"
- Random style flickering on initial page load
- GSAP imports in files without `"use client"`

**Phase to address:**
Phase 1 (Foundation) -- the client/server component boundary must be established in the project architecture.

---

### Pitfall 7: Mobile Performance Collapse from Particle Systems and Parallax

**What goes wrong:**
Sakura particle effects, parallax layers, and continuous canvas animations run at 60fps on desktop but cause severe frame drops (below 30fps), excessive battery drain, and thermal throttling on mobile devices. The project spec calls for "reduced animations on mobile" but the reduction is often insufficient.

**Why it happens:**
Developers test on their development machine (desktop) and check mobile via browser DevTools device simulation, which does NOT simulate mobile GPU constraints. A canvas particle system rendering 200 sakura petals at 60fps is trivial for a desktop GPU but can consume 15-20% battery over 12 hours on a mobile device. CSS parallax with multiple layers triggers constant GPU compositing.

**How to avoid:**
- Use `matchMedia('(max-width: 768px)')` to COMPLETELY DISABLE (not just reduce) particle systems and parallax on mobile. Not "fewer particles" -- zero particles.
- Also respect `prefers-reduced-motion: reduce` -- disable ALL non-essential animations, keep only simple fade-ins.
- For particle systems, use `requestAnimationFrame` with a frame budget check. If a frame takes > 16ms, reduce particle count dynamically.
- Pause all canvas animations when the tab is not visible (`document.visibilitychange` event).
- Test on a REAL mid-range Android device (not just iPhone), not browser DevTools.

**Warning signs:**
- Mobile Lighthouse performance score below 70
- Visible frame drops when scrolling on mobile
- Phone gets warm while browsing the site
- Battery usage spikes during site visit

**Phase to address:**
Every animation phase must include mobile testing, but the responsive animation framework (the detection and toggle system) belongs in Phase 1.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline GSAP animations without useGSAP wrapper | Faster to write, fewer abstractions | Memory leaks accumulate, cleanup is manual and error-prone | Never -- useGSAP is minimal overhead |
| Loading all Noto Serif JP weights | "It just works" with any weight | 2-4MB font payload, destroys load time | Never -- subset to exact characters needed |
| Skipping `prefers-reduced-motion` support | Ship faster, less conditional code | Accessibility failure, potential legal liability, excludes users with vestibular disorders | Never -- it's a few lines of CSS/JS |
| Hardcoding strings instead of using i18n from start | Faster prototyping | Painful extraction later, missed strings, broken layouts from different text lengths | Only in throwaway prototypes |
| Using `suppressHydrationWarning` to hide GSAP issues | Silences console errors | Masks real hydration bugs that cause visual glitches in production | Only for known-safe cases like timestamps |
| Single massive animation timeline for entire page | Conceptually simple | Impossible to debug, cannot lazy-load sections, one bug breaks all animations | Never for 7-section single-page sites |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GSAP + Next.js 15 | Importing GSAP in Server Components | All GSAP code must be in `"use client"` components; register plugins once in a client-side init file |
| Framer Motion + Next.js 15 | Using `AnimatePresence` without `LazyMotion` | Use `LazyMotion` with `domAnimation` or `domMax` feature bundle to enable tree-shaking (~5KB vs ~25KB) |
| next-intl + App Router | Using `next/navigation` Link/useRouter instead of next-intl's locale-aware versions | Import Link, useRouter, usePathname from your next-intl routing config, not from `next/navigation` |
| next-intl + Static Generation | Forgetting `setRequestLocale(locale)` in pages | Call `setRequestLocale(locale)` in every page.tsx and layout.tsx before using any next-intl function |
| Google Fonts (CJK) + next/font | Loading full character set for decorative kanji | Use the `text` parameter to subset to exact characters used |
| Web Audio API + Mobile Safari | Creating AudioContext on page load | Create AudioContext lazily inside first user interaction event handler; call `.resume()` in click handler |
| Vercel + Large Assets | Committing audio files and large images to git | Use Vercel Blob or external CDN for audio files; optimize images with next/image |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Canvas particle system on mobile | Frame drops, hot phone, battery drain | Completely disable canvas particles on mobile (not just reduce count) | Any mobile device with < 4GB RAM |
| Too many simultaneous ScrollTriggers | Scroll jank, trigger misfires | Batch related animations into timeline groups, limit to ~15 active triggers | 20+ active ScrollTriggers on page |
| Unoptimized SVG brush stroke animations | High CPU during animation, jank | Pre-simplify SVG paths, limit control points, use will-change sparingly | Complex SVGs with 1000+ path points |
| Multiple font families loading in parallel | FOUT, CLS, slow initial render | Preload critical subset, limit to 2 families, use font-display: swap | More than 3 font files or CJK fonts |
| CSS parallax with many layers | Constant GPU compositing, mobile frame drops | Use transform3d for GPU acceleration, limit to 2-3 layers, disable on mobile | More than 3 parallax layers on mobile |
| Audio files not compressed | Slow load, wasted bandwidth | Use compressed formats (OGG/MP3 at 96-128kbps), keep ambient loop under 500KB | Audio files > 1MB each |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Unskippable intro animation on every visit | Returning visitors (recruiters revisiting) wait 3-5 seconds every time | Show intro once per session (sessionStorage), skip on return visits |
| Sound auto-playing even briefly before muting | Startles users, especially in office/interview settings | Default to muted, require explicit click to enable, show clear visual indicator |
| Animations block content reading | Recruiters want to scan quickly, not wait for animations | Content should be readable immediately; animations enhance, not gate |
| Language switch resets scroll position | User loses their place when switching TR/EN | Preserve scroll position across language switches using next-intl's routing |
| Interaction sounds on every click | Annoying after novelty wears off (10 seconds) | Limit sounds to major transitions (section changes), not every hover/click |
| No way to disable animations globally | Users with motion sensitivity cannot use the site | Add a visible "reduce motion" toggle that respects OS-level `prefers-reduced-motion` |
| Japanese font fallback looks wrong | Kanji renders in system font (ugly) before custom font loads | Use font-display: swap with a visually similar fallback, or font-display: optional for decorative kanji |

## "Looks Done But Isn't" Checklist

- [ ] **Intro animation:** Works on first visit, but does it skip correctly on return visit? Test with sessionStorage.
- [ ] **ScrollTrigger positions:** Correct after initial load, but do they survive a browser resize? Call `ScrollTrigger.refresh()` on resize.
- [ ] **i18n:** All visible text translated, but are meta tags (OG, title, description) also translated per locale?
- [ ] **Audio toggle:** Sound plays/mutes, but does the state persist across sections? Does it resume correctly after tab switch?
- [ ] **Mobile animations:** Disabled on small screens, but what about tablets? Test the breakpoint boundaries (768px, 1024px).
- [ ] **Font loading:** Looks fine on fast connection, but test on 3G throttling -- does the page look acceptable before fonts load?
- [ ] **PDF download:** Button works, but does it track which language version (TR/EN) the user wants?
- [ ] **Dark theme contrast:** Looks great on your monitor, but test with accessibility contrast checker -- red (#c0392b) on dark background may fail WCAG AA.
- [ ] **Keyboard navigation:** Tab order works through nav, but can users navigate through all 7 sections and interactive elements?
- [ ] **Screen reader:** Decorative kanji have `aria-hidden="true"`, section landmarks have proper headings and ARIA labels?

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| LCP destroyed by intro animation | MEDIUM | Restructure to render hero underneath intro overlay; 1-2 day refactor |
| GSAP memory leaks throughout codebase | HIGH | Audit every component, replace raw useEffect with useGSAP, add cleanup; 2-3 days |
| Both libraries on same elements | MEDIUM | Create wrapper components with clear ownership, migrate element by element; 1-2 days |
| Font payload too large | LOW | Reconfigure next/font with text param for subsetting, remove unused weights; hours |
| Audio broken on mobile Safari | LOW | Switch to lazy AudioContext creation pattern; hours if caught early |
| Hydration errors everywhere | HIGH | Audit component boundaries, add "use client" directives, may need to restructure component tree; 2-4 days |
| Mobile performance collapse | MEDIUM-HIGH | Add device detection layer, conditionally disable features; 1-2 days if animation system is modular |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| LCP blocked by intro animation | Phase 1: Foundation/Hero | Lighthouse LCP < 2.5s with intro animation enabled |
| GSAP ScrollTrigger memory leaks | Phase 1: Foundation | No increasing memory in DevTools after 5 minutes of scrolling |
| GSAP/Framer Motion DOM conflicts | Phase 1: Foundation | Animation ownership documented; no element targeted by both libraries |
| Noto Serif JP font bloat | Phase 1: Foundation | Total font payload < 300KB; Lighthouse flags no font issues |
| Audio autoplay failures | Audio Phase | Audio plays on first click in incognito Chrome, Firefox, Safari, mobile Safari |
| Hydration mismatches | Phase 1: Foundation | Zero hydration warnings in development console |
| Mobile performance collapse | Every animation phase | Mobile Lighthouse performance > 85; test on real mid-range device |
| i18n string extraction misses | Phase 1: Foundation (i18n setup) | Language switch shows all strings translated; no raw strings in JSX |
| Accessibility / reduced motion | Phase 1: Foundation | `prefers-reduced-motion: reduce` disables all non-essential animation |
| Recruiter UX (slow content access) | Hero/Content phases | Content readable within 1 second; all animations are enhancement, not gate |

## Sources

- [GSAP ScrollTrigger tips & mistakes (official)](https://gsap.com/resources/st-mistakes/)
- [GSAP hydration error in Next.js 15 (community)](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/)
- [Optimizing GSAP in Next.js 15 (Medium)](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [GSAP useGSAP hook cleanup (community)](https://gsap.com/community/forums/topic/42900-usegsap-cleanup/)
- [@gsap/react package (GitHub)](https://github.com/greensock/react)
- [Web Audio autoplay policy (Chrome)](https://developer.chrome.com/blog/web-audio-autoplay)
- [Autoplay guide (MDN)](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- [next-intl App Router setup (official docs)](https://next-intl.dev/docs/getting-started/app-router)
- [Next.js hydration error docs (official)](https://nextjs.org/docs/messages/react-hydration-error)
- [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG 2.3.3 Animation from Interactions (W3C)](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Web fonts and CLS (Sentry)](https://blog.sentry.io/web-fonts-and-the-dreaded-cumulative-layout-shift/)
- [Noto Serif CJK JP min (subsetting)](https://github.com/hiz8/Noto-Serif-CJK-JP.min)
- [Lighthouse LCP scoring (Chrome DevDocs)](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Core Web Vitals optimization (Vercel)](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024)
- [GSAP vs Motion comparison (Motion.dev)](https://motion.dev/docs/gsap-vs-motion)

---
*Pitfalls research for: Samurai-themed animated portfolio (Next.js 15 + GSAP + Framer Motion + Audio + i18n)*
*Researched: 2026-03-25*
