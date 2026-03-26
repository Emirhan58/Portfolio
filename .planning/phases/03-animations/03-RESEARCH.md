# Phase 3: Animations - Research

**Researched:** 2026-03-26
**Domain:** GSAP + Framer Motion animation system (SVG path drawing, ScrollTrigger, particles, parallax, typing effects)
**Confidence:** HIGH

## Summary

Phase 3 transforms a fully static site into an animated experience. The existing infrastructure is solid: GSAP 3.14.2 with ScrollTrigger registered, Framer Motion animation-variants, a three-tier `useReducedMotion` hook, Lenis smooth scroll synced to GSAP ticker, and a clear client/server component boundary. All sections are Server Components rendering static HTML -- animation must be layered on top via Client Component wrappers.

The most critical discovery: **GSAP 3.13+ made ALL plugins completely free** (including DrawSVG, SplitText, MorphSVG, CustomEase). This means DrawSVGPlugin is the correct choice for the kanji intro SVG path animation and SplitText can be used for the typing effect. No need to hand-roll stroke-dashoffset math or manual character splitting.

**Primary recommendation:** Use GSAP DrawSVGPlugin for kanji strokes, GSAP SplitText for typing effect, ScrollTrigger for all scroll-driven animations, and keep Framer Motion only for component mount/lifecycle animations (existing fadeInUp variants). Never mix both libraries on the same DOM node.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- SVG path draw for 侍 character -- each stroke drawn sequentially like real brush calligraphy
- Duration: 3-4 seconds for full kanji drawing, followed by katana slash transition
- Ink drop + dust particles scatter from brush tip during each stroke
- Kanji color: white/cream (#f5f0e8) on pure black (#0a0a0a) background
- Transition: horizontal split -- screen splits horizontally (top half up, bottom half down) revealing hero
- Skip button: small 'Skip' text in bottom-right corner
- After intro: kanji disappears, overlay fully removed
- No text during intro, no sound effects (Phase 4)
- sessionStorage for first-visit-only detection
- Hero pre-rendered beneath overlay -- LCP not blocked
- Ink splash reveal per section with staggered fadeInUp for inner elements
- Trigger point: 20% of section visible, one-time trigger
- Katana slash dividers: left-to-right fast draw (0.3-0.5s) when divider enters viewport
- Hero mount-triggered staggered reveal (not scroll) after intro completes
- JP to EN typing effect on tagline with blinking cursor
- Stat counters: 0 to target fast count, 1.5-2s, ease-out, all three simultaneous
- Proficiency bars: left-to-right fill + spark effect, staggered within category
- Timeline: path drawing + card stagger with ScrollTrigger
- Three-tier useReducedMotion hook gates all animations (full/reduced/none)

### Claude's Discretion
- GSAP DrawSVG vs stroke-dashoffset technique for SVG path animations
- Exact ink splash SVG mask design and animation curve
- Ink drop particle count and scatter pattern during kanji intro
- Katana slash transition easing and timing details
- ScrollTrigger scrub values and pin behavior
- SplitText usage vs manual character splitting for typing effect
- Exact parallax scroll speed ratios for mountain/cloud/mist layers

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANIM-01 | Kanji intro animation (侍 brush stroke, skip, sessionStorage first-visit) | DrawSVGPlugin for stroke animation, KanjiVG for stroke path data, sessionStorage pattern |
| ANIM-02 | Scroll-triggered ink splash/brush stroke reveals per section | ScrollTrigger + SVG clipPath mask animation on SectionShell |
| ANIM-03 | Katana slash animation as section transition dividers | ScrollTrigger on existing SectionDivider, scaleX or DrawSVG approach |
| ANIM-04 | Parallax mountain/cloud background layers at different scroll speeds | GSAP ScrollTrigger with scrub for transform translateY at different rates |
| ANIM-05 | Sakura particles floating on Canvas (disabled on mobile) | Refine existing SakuraFall.tsx (reduce count, increase opacity), gate with shouldParticle |
| ANIM-06 | Stat numbers count up when About section scrolls into view | GSAP tween with snap and ScrollTrigger on stat elements |
| ANIM-07 | JP to EN typing effect on hero tagline | SplitText or manual approach for character-level animation |
| ANIM-08 | Mobile reduced animations (no parallax/particles, basic reveals) | useReducedMotion three-tier hook already implemented |

</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Animation engine, timelines, ScrollTrigger | Industry standard, all plugins now free |
| @gsap/react | 2.1.2 | useGSAP hook for React lifecycle cleanup | Official GSAP React integration |
| motion (Framer Motion) | 12.38.0 | Component mount/lifecycle animations | Already used for fadeInUp, shoji menu |
| lenis | 1.3.20 | Smooth scroll synced with GSAP ticker | Already integrated in LenisProvider |

### GSAP Plugins to Register (Free, No Install Needed)
| Plugin | Purpose | When to Use |
|--------|---------|-------------|
| DrawSVGPlugin | SVG stroke path drawing animation | Kanji intro strokes, timeline path drawing |
| SplitText | Split text into chars/words for animation | JP-to-EN typing effect (discretionary) |
| CustomEase | Custom easing curves | Brush stroke organic feel |
| ScrollTrigger | Scroll-driven triggers (already registered) | All scroll animations |

**Plugin registration** -- add to existing `src/lib/gsap-config.ts`:
```typescript
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, CustomEase, useGSAP);

export { gsap, ScrollTrigger, DrawSVGPlugin, CustomEase, useGSAP };
```

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| DrawSVGPlugin | Manual stroke-dashoffset | DrawSVG handles all edge cases (partial draws, reverse), manual approach requires getTotalLength() + manual math |
| SplitText | Manual char splitting | SplitText handles whitespace, revert, and line wrapping; manual is simpler for this use case since typing effect is sequential, not simultaneous |
| Canvas particles | CSS-only particles | Current SakuraFall already uses CSS keyframes -- keep it, no need to switch to Canvas |

**Recommendation on discretionary items:**
- **Use DrawSVGPlugin** for kanji strokes -- it is now free and handles stroke direction, partial draws, and cleanup automatically.
- **Use manual character splitting** for typing effect -- the JP-to-EN typing is sequential (one char at a time), which is simpler than what SplitText solves. A `setInterval` + substring approach is cleaner.
- **Use CustomEase** for organic brush stroke feel -- define a custom ease curve that mimics brush pressure (slow start, fast middle, slow taper).

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   ├── animations/
│   │   ├── KanjiIntro.tsx          # Full-screen overlay with kanji brush animation
│   │   ├── InkSplashReveal.tsx     # Scroll-triggered section reveal wrapper
│   │   ├── ScrollReveal.tsx        # Generic scroll-triggered fadeInUp wrapper
│   │   ├── ParallaxLayers.tsx      # Mountain/cloud/mist background layers
│   │   ├── TypingEffect.tsx        # JP→EN typing effect component
│   │   ├── StatCounter.tsx         # Animated number counter
│   │   └── TimelinePath.tsx        # SVG timeline path drawing
│   ├── layout/
│   │   ├── SectionDivider.tsx      # MODIFIED: add scroll-triggered slash animation
│   │   └── SectionShell.tsx        # UNCHANGED (Server Component)
│   ├── sections/
│   │   └── Hero.tsx                # MODIFIED: wrap tagline with TypingEffect
│   └── ui/
│       ├── ProficiencyBar.tsx      # MODIFIED: add scroll-triggered fill animation
│       └── SakuraFall.tsx          # MODIFIED: reduce count, increase opacity
├── hooks/
│   └── useReducedMotion.ts         # UNCHANGED (already three-tier)
└── lib/
    ├── gsap-config.ts              # MODIFIED: register DrawSVGPlugin, CustomEase
    └── animation-variants.ts       # MAY EXTEND: add new Framer Motion variants
```

### Pattern 1: Client Wrapper for Server Component Animation
**What:** Server Components render static HTML. Client Component wrappers add animation on mount.
**When to use:** Every section that needs scroll-triggered animation.
**Example:**
```typescript
// InkSplashReveal.tsx (Client Component)
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function InkSplashReveal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useReducedMotion();

  useGSAP(() => {
    if (!shouldAnimate || !container.current) return;

    const sections = container.current.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      gsap.from(section, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",  // 20% visible
          once: true,
        },
      });
    });
  }, { scope: container, dependencies: [shouldAnimate] });

  return <div ref={container}>{children}</div>;
}
```

### Pattern 2: useGSAP with Scope for Cleanup
**What:** All GSAP animations use useGSAP with a scope container ref for automatic cleanup.
**When to use:** Every component with GSAP animations.
**Example:**
```typescript
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function AnimatedComponent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All GSAP animations scoped to container
    gsap.to(".child", { opacity: 1 });
  }, { scope: container });

  return <div ref={container}>...</div>;
}
```

### Pattern 3: KanjiIntro Overlay Architecture
**What:** Full-screen fixed overlay on top of pre-rendered hero content.
**When to use:** First-visit kanji intro (ANIM-01).
**Critical:** Hero is in the DOM, visible (opacity 1) underneath the overlay. LCP measures the hero, not the overlay.
```typescript
// page.tsx integration point
<main>
  <KanjiIntro />  {/* Fixed overlay, z-50, removed after animation */}
  {SECTION_IDS.map(...)}  {/* Hero renders normally beneath */}
</main>
```

### Pattern 4: Parallax with ScrollTrigger Scrub
**What:** Background layers move at different speeds relative to scroll.
**When to use:** ANIM-04 -- mountain/cloud/mist layers.
```typescript
// Each layer gets different y translation speed
gsap.to(".mountains", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: "main",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});
gsap.to(".clouds", {
  y: -200,
  ease: "none",
  scrollTrigger: { /* same trigger, deeper y */ },
});
```

### Anti-Patterns to Avoid
- **GSAP + Framer Motion on same DOM node:** Never put `gsap.to()` and `<motion.div>` on the same element. Nest them: outer motion.div for lifecycle, inner div ref for GSAP.
- **ScrollTrigger inside child of timeline:** Put ScrollTrigger on the timeline itself or on independent tweens. Never on tweens that are children of a timeline.
- **Raw useEffect for GSAP:** Always use useGSAP hook. It handles gsap.context() cleanup automatically.
- **Importing gsap directly:** Always import from `@/lib/gsap-config` to ensure plugins are registered once.
- **Conditional render gating content:** Never do `{introComplete && <Hero />}`. Hero must always be in DOM for LCP.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG stroke drawing | Manual stroke-dasharray/offset math | GSAP DrawSVGPlugin | Handles getTotalLength(), partial draws, reverse, cross-browser |
| Custom easing curves | Cubic-bezier trial-and-error | GSAP CustomEase | Visual editor at gsap.com/docs/v3/Eases/CustomEase, paste string |
| Scroll-triggered animations | IntersectionObserver + manual state | GSAP ScrollTrigger | Handles resize, refresh, pin, scrub, batch, cleanup |
| Number counting animation | setInterval + manual increment | gsap.to() with snap:1 | Handles easing, cleanup, scroll-trigger integration |
| Kanji stroke SVG paths | Drawing 侍 strokes from scratch | KanjiVG project data | Open-source SVG stroke data for all kanji with correct order |

**Key insight:** GSAP's plugin ecosystem (now entirely free) covers every animation need in this phase. The only custom code needed is the ink splash mask SVG shape and the parallax layer artwork.

## Common Pitfalls

### Pitfall 1: LCP Blocked by Intro Overlay
**What goes wrong:** KanjiIntro overlay conditionally renders hero content, delaying LCP to 5+ seconds.
**Why it happens:** Developer uses `{showHero && <Hero />}` pattern.
**How to avoid:** Hero is ALWAYS in the DOM. KanjiIntro is a fixed overlay (z-50) on top. After animation, remove overlay entirely. Hero has opacity:1 from the start.
**Warning signs:** LCP > 3s in Lighthouse, FCP and LCP timestamps far apart.

### Pitfall 2: ScrollTrigger Memory Leaks
**What goes wrong:** Leaked ScrollTrigger instances cause scroll jank and misfiring animations.
**Why it happens:** Using raw useEffect instead of useGSAP, or not scoping to container ref.
**How to avoid:** ALWAYS use `useGSAP(() => {...}, { scope: containerRef })`. Never create ScrollTriggers in raw useEffect.
**Warning signs:** Animations misfire after language switch, increasing memory in DevTools.

### Pitfall 3: GSAP + Framer Motion DOM Conflict
**What goes wrong:** Both libraries fight over same element's transform/opacity.
**Why it happens:** `<motion.div>` with GSAP ScrollTrigger targeting same node.
**How to avoid:** Strict ownership. Motion owns mount/unmount/hover. GSAP owns scroll-driven. Nest, never overlap.
**Warning signs:** Elements "snap" or "jump" between states.

### Pitfall 4: Hydration Mismatch from Animation State
**What goes wrong:** Client renders different HTML than server due to animation initial state.
**Why it happens:** Animation component sets opacity:0 during SSR, but server rendered opacity:1.
**How to avoid:** All animation components must be Client Components ("use client"). Initial styles applied via useGSAP/useEffect, not in JSX render.
**Warning signs:** Red hydration error overlays in dev mode.

### Pitfall 5: Mobile Performance Collapse
**What goes wrong:** Particles + parallax + ScrollTrigger cause frame drops on mobile.
**Why it happens:** Testing only in desktop browser DevTools, not real mobile GPU.
**How to avoid:** useReducedMotion gates everything. Mobile ("reduced" tier) gets: no parallax, no particles, simple fadeIn reveals only. Test on real device.
**Warning signs:** Lighthouse mobile performance < 70.

### Pitfall 6: sessionStorage Check Causes Flash
**What goes wrong:** Returning visitor briefly sees kanji intro before sessionStorage check completes.
**Why it happens:** sessionStorage read happens in useEffect (after first paint).
**How to avoid:** Check sessionStorage synchronously in the component body or use a CSS class on `<html>` set by an inline script in layout.tsx (before React hydration).
**Warning signs:** Brief flash of overlay on page revisit.

### Pitfall 7: ScrollTrigger Positions Wrong After Lenis Init
**What goes wrong:** ScrollTrigger triggers fire at wrong scroll positions.
**Why it happens:** Lenis changes scroll behavior after ScrollTrigger measures positions.
**How to avoid:** Lenis is already wired with `lenisInstance.on("scroll", ScrollTrigger.update)` in LenisProvider. Additionally, call `ScrollTrigger.refresh()` once after all sections mount.
**Warning signs:** Animations trigger too early or too late.

## Code Examples

### Kanji Intro with DrawSVGPlugin
```typescript
// Source: GSAP DrawSVGPlugin docs + KanjiVG stroke data
"use client";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin, CustomEase } from "@/lib/gsap-config";

export function KanjiIntro() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Synchronous sessionStorage check -- avoid flash
  useEffect(() => {
    if (sessionStorage.getItem("kanji-intro-seen")) {
      setVisible(false);
    }
  }, []);

  useGSAP(() => {
    if (!visible || !container.current) return;

    // Register custom brush ease
    CustomEase.create("brush", "M0,0 C0.1,0 0.3,1 0.5,1 0.7,1 0.9,0 1,0");

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("kanji-intro-seen", "true");
        // Katana slash transition
        gsap.to(".intro-top", { yPercent: -100, duration: 0.6, ease: "power3.inOut" });
        gsap.to(".intro-bottom", { yPercent: 100, duration: 0.6, ease: "power3.inOut",
          onComplete: () => setVisible(false),
        });
      },
    });

    // Draw each stroke sequentially (8 strokes for 侍)
    const strokes = container.current.querySelectorAll(".kanji-stroke");
    strokes.forEach((stroke, i) => {
      tl.from(stroke, {
        drawSVG: "0%",
        duration: 0.4,
        ease: "brush",
      }, i * 0.35); // stagger offset
    });
  }, { scope: container, dependencies: [visible] });

  if (!visible) return null;

  return (
    <div ref={container} className="fixed inset-0 z-50">
      {/* Split halves for katana slash transition */}
      <div className="intro-top absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a]" />
      <div className="intro-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a]" />
      {/* Kanji SVG centered */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-10" viewBox="0 0 109 109">
        {/* 8 stroke paths from KanjiVG data for 侍 */}
        <path className="kanji-stroke" d="..." stroke="#f5f0e8" strokeWidth="3" fill="none" />
        {/* ... repeat for all 8 strokes */}
      </svg>
      {/* Skip button */}
      <button
        onClick={() => { sessionStorage.setItem("kanji-intro-seen", "true"); setVisible(false); }}
        className="absolute bottom-6 right-6 text-sm text-white/40 hover:text-white/70 z-20"
      >
        Skip
      </button>
    </div>
  );
}
```

### Stat Counter with ScrollTrigger
```typescript
// Source: GSAP docs -- gsap.to with snap + ScrollTrigger
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StatCounterProps {
  value: number;
  suffix?: string;
}

export function StatCounter({ value, suffix = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { shouldAnimate } = useReducedMotion();

  useGSAP(() => {
    if (!shouldAnimate || !ref.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      snap: { val: 1 },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = obj.val + suffix;
      },
    });
  }, { dependencies: [shouldAnimate, value] });

  return <span ref={ref}>{shouldAnimate ? "0" + suffix : value + suffix}</span>;
}
```

### Scroll-Triggered Section Reveal
```typescript
// Source: GSAP ScrollTrigger + SVG clipPath for ink splash effect
useGSAP(() => {
  if (!shouldAnimate) return;

  // Ink splash reveal using animated clipPath
  gsap.fromTo(sectionRef.current,
    { clipPath: "circle(0% at 50% 100%)" },
    {
      clipPath: "circle(150% at 50% 100%)",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    }
  );

  // Staggered children after reveal
  const children = sectionRef.current.querySelectorAll("[data-animate]");
  gsap.from(children, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
    },
  });
}, { scope: container });
```

### JP-to-EN Typing Effect
```typescript
// Manual approach -- simpler than SplitText for sequential typing
"use client";
import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TypingEffect({ jpText, enText }: { jpText: string; enText: string }) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"jp-type" | "jp-pause" | "jp-delete" | "en-type" | "done">("jp-type");
  const { shouldAnimate } = useReducedMotion();

  // If no animation, show final English text
  if (!shouldAnimate) return <span>{enText}</span>;

  // ... typing logic with setInterval:
  // jp-type: add JP chars at 60ms intervals
  // jp-pause: wait 800ms
  // jp-delete: remove chars at 35ms intervals
  // en-type: add EN chars at 70ms intervals
  // done: static

  return (
    <span>
      {display}
      {phase !== "done" && <span className="animate-pulse">|</span>}
    </span>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GSAP plugins behind paywall | All GSAP plugins free (DrawSVG, SplitText, MorphSVG, etc.) | GSAP 3.13 (May 2025) | Can use DrawSVGPlugin freely for kanji strokes |
| Manual stroke-dashoffset math | DrawSVGPlugin handles it all | Always available, now free | Eliminates cross-browser getTotalLength() bugs |
| Framer Motion + GSAP overlap | Clear ownership split pattern | Community consensus 2024-2025 | FM for lifecycle, GSAP for scroll/SVG/timeline |
| IntersectionObserver for scroll reveals | ScrollTrigger with batch/once | GSAP standard | Better performance, cleanup, resize handling |
| Canvas 2D for particles | CSS keyframe particles (existing) | Project decision | Zero JS overhead, simpler, already implemented |

**Deprecated/outdated:**
- GSAP Club GreenSock membership -- no longer needed, all plugins free
- `gsap.timeline().scrollTrigger` on child tweens -- put ScrollTrigger on timeline or independent tweens only

## Open Questions

1. **Kanji SVG Stroke Paths**
   - What we know: KanjiVG provides stroke-order SVG data for 侍 (8 strokes, cubic bezier paths)
   - What's unclear: The KanjiVG paths are optimized for educational display, not calligraphic beauty. May need artistic modification for brush-stroke thickness variation.
   - Recommendation: Start with KanjiVG paths, apply variable strokeWidth via GSAP per stroke to simulate brush pressure. If unsatisfactory, hand-draw custom paths in a vector editor.

2. **Ink Splash Mask Shape**
   - What we know: clipPath circle() or SVG mask can create organic reveal shapes
   - What's unclear: How to make it look like ink dropped on paper vs geometric circle
   - Recommendation: Use an irregular SVG clipPath shape (hand-drawn organic blob) scaled from 0 to cover, combined with feDisplacementMap turbulence filter for edge roughness. This is Claude's discretion per CONTEXT.md.

3. **Parallax Layer Artwork**
   - What we know: Need mountain silhouette, cloud layer, mist layer as SVG or image backgrounds
   - What's unclear: These assets don't exist yet. Need to be created.
   - Recommendation: Create as inline SVG with simple path silhouettes (like existing Hero background art style). Mountains as dark silhouettes, clouds as semi-transparent shapes. Keep path complexity low for performance.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 + jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANIM-01 | Kanji intro renders, sessionStorage skip, overlay removed after animation | unit + integration | `npx vitest run tests/animations/KanjiIntro.test.tsx -x` | No -- Wave 0 |
| ANIM-02 | Ink splash reveal triggers on scroll, one-time only | unit | `npx vitest run tests/animations/InkSplashReveal.test.tsx -x` | No -- Wave 0 |
| ANIM-03 | Katana slash divider animates on scroll entry | unit | `npx vitest run tests/animations/SectionDivider.test.tsx -x` | No -- Wave 0 |
| ANIM-04 | Parallax layers render, disabled on mobile tier | unit | `npx vitest run tests/animations/ParallaxLayers.test.tsx -x` | No -- Wave 0 |
| ANIM-05 | SakuraFall renders 20-25 petals, disabled when shouldParticle=false | unit | `npx vitest run tests/animations/SakuraFall.test.tsx -x` | No -- Wave 0 |
| ANIM-06 | Stat counters count from 0 to target | unit | `npx vitest run tests/animations/StatCounter.test.tsx -x` | No -- Wave 0 |
| ANIM-07 | Typing effect shows JP then EN text | unit | `npx vitest run tests/animations/TypingEffect.test.tsx -x` | No -- Wave 0 |
| ANIM-08 | Reduced motion tier disables parallax, particles, shows basic reveals | unit | `npx vitest run tests/hooks/useReducedMotion.test.ts -x` | Yes |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/animations/KanjiIntro.test.tsx` -- covers ANIM-01 (sessionStorage, skip, overlay removal)
- [ ] `tests/animations/InkSplashReveal.test.tsx` -- covers ANIM-02
- [ ] `tests/animations/SectionDivider.test.tsx` -- covers ANIM-03
- [ ] `tests/animations/ParallaxLayers.test.tsx` -- covers ANIM-04
- [ ] `tests/animations/SakuraFall.test.tsx` -- covers ANIM-05
- [ ] `tests/animations/StatCounter.test.tsx` -- covers ANIM-06
- [ ] `tests/animations/TypingEffect.test.tsx` -- covers ANIM-07

Note: GSAP animations are difficult to unit test in jsdom (no real layout, no scroll). Tests should focus on: component renders, sessionStorage behavior, motion tier gating (shouldAnimate/shouldParticle/shouldParallax), skip button functionality, and correct props/attributes. Actual animation visual verification requires manual testing or Puppeteer (already in devDependencies).

## Sources

### Primary (HIGH confidence)
- GSAP official docs -- DrawSVGPlugin, ScrollTrigger, CustomEase, useGSAP hook
- [GSAP free announcement](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) -- all plugins free since v3.13
- [GSAP React integration](https://gsap.com/resources/React/) -- useGSAP scope/cleanup pattern
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) -- batch, scrub, once, pin
- [GSAP ScrollTrigger mistakes](https://gsap.com/resources/st-mistakes/) -- common pitfalls
- [KanjiVG project](https://kanjivg.tagaini.net/) -- SVG stroke data for 侍 (8 strokes)
- [@gsap/react GitHub](https://github.com/greensock/react) -- useGSAP hook API

### Secondary (MEDIUM confidence)
- [Setting Up GSAP with Next.js 2025](https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6) -- Next.js App Router patterns
- [Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) -- cleanup best practices
- [SVG Animation Encyclopedia 2025](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) -- stroke-dashoffset techniques
- [Animate Calligraphy with SVG](https://css-tricks.com/animate-calligraphy-with-svg/) -- mask-based stroke reveal

### Tertiary (LOW confidence)
- KanjiVG stroke paths for 侍 may need artistic modification for portfolio aesthetic (educational vs calligraphic style)
- Ink splash SVG mask shape design is discretionary and needs experimentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed, versions verified against npm registry
- Architecture: HIGH -- patterns validated against GSAP official React docs and existing codebase patterns
- Pitfalls: HIGH -- documented from PITFALLS.md research + GSAP official troubleshooting guides
- Kanji stroke paths: MEDIUM -- KanjiVG data exists but may need artistic refinement
- Ink splash visual design: LOW -- discretionary, needs experimentation during implementation

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (stable ecosystem, no expected breaking changes)
