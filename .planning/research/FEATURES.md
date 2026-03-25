# Feature Research

**Domain:** Samurai/Japanese-themed developer portfolio (single-page scroll, animation-heavy)
**Researched:** 2026-03-25
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features recruiters and visitors assume exist. Missing these = portfolio feels broken or amateur.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Responsive / mobile-first layout | 60%+ traffic is mobile; recruiters check on phones between meetings | MEDIUM | Tailwind handles this well, but animation scaling needs manual tuning per breakpoint |
| Fast load time (Lighthouse 90+) | Recruiters spend <30 seconds deciding; slow = bounce. Google penalizes slow sites in search | MEDIUM | Next.js SSG/SSR + image optimization + code splitting. Heavy animations are the main threat here |
| Clear navigation / section anchoring | Single-page scroll needs orientation; visitors must know where they are and jump to sections | LOW | Sticky nav with scroll-spy highlighting active section. Smooth scroll-to behavior |
| Hero section with name + role | First impression. Recruiter must know WHO this is and WHAT they do in 2 seconds | LOW | Full-screen hero, name in brush-style typography, "Mid-Level Backend Developer" subtitle |
| Project showcase with descriptions | 70% of recruiters want diverse projects with clear problem/solution framing | MEDIUM | Card grid with tech stack tags, descriptions, and GitHub links. 4-6 strong projects |
| Skills / tech stack display | Recruiters scan for keyword matches against job requirements | LOW | Categorized skill list (Backend, Frontend, DevOps, etc.). Visual but scannable |
| Work experience timeline | Demonstrates career progression and stability | MEDIUM | Vertical timeline with company, role, dates, key achievements. Scroll-triggered reveals |
| Contact / social links | Visitors need a clear next action. No contact info = dead end | LOW | Email, GitHub, LinkedIn prominently placed. No form needed for v1 |
| SEO meta tags + Open Graph | Portfolio must be shareable on LinkedIn/Twitter with proper preview cards | LOW | Next.js metadata API handles this. OG images should match the Samurai theme |
| PDF CV download | Recruiters often need a document to forward internally or attach to ATS | LOW | Static PDF asset, download button in hero or nav. Keep PDF design consistent with site theme |
| Accessibility basics | Screen reader users, keyboard navigation, reduced-motion preference | MEDIUM | `prefers-reduced-motion` media query is CRITICAL for animation-heavy sites. ARIA labels, focus states, contrast ratios |
| i18n (TR + EN) | International reach for a Turkey-based developer targeting global roles | MEDIUM | next-intl or next-i18next. Must be baked in from day one -- retrofitting i18n is painful |

### Differentiators (Competitive Advantage)

Features that make this portfolio memorable. The Samurai theme itself is the primary differentiator -- these features bring it to life.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Kanji intro loading animation | First-impression "wow" moment. The brushstroke-drawing kanji (侍) sets the entire mood before the site even loads. Recruiters remember this | HIGH | Canvas or SVG path animation with brush-stroke effect. Must complete in 2-3 seconds max or users bounce. Skip button mandatory. Use `sessionStorage` to show only on first visit |
| Scroll-triggered ink splash / brush reveals | Content appears as if painted onto scroll (washi paper). Creates a storytelling flow where the user "unrolls" the portfolio like a scroll | HIGH | Framer Motion `whileInView` + SVG clip-path animations simulating ink spread. GSAP ScrollTrigger for precise scroll-linked timing. Performance-critical -- must be GPU-accelerated (transform/opacity only) |
| Sakura particle system | Ambient floating cherry blossom petals create atmosphere without demanding attention. Subtle but unmistakable Japanese identity | MEDIUM | Canvas-based particle system (not DOM elements). 15-30 particles max. Disable entirely on mobile and when `prefers-reduced-motion` is set. requestAnimationFrame loop with proper cleanup |
| Ambient Japanese audio + interaction sounds | Shamisen/koto background music and katana-draw sound effects on interactions create an immersive multi-sensory experience | MEDIUM | Howler.js for audio management. DEFAULT MUTED -- this is non-negotiable. Toggle button always visible. Sound effects on section transitions and hover. Keep audio files small (<500KB total) |
| Themed section transitions (katana slash) | Section dividers use a katana slash animation instead of generic fades. Reinforces the Samurai identity at every scroll point | MEDIUM | SVG line animation timed with GSAP ScrollTrigger. The slash "cuts" to reveal the next section. GPU-friendly -- just path animation + opacity |
| Japanese typography pairing (Noto Serif JP + Playfair) | Kanji section headers with decorative characters create a bilingual aesthetic layer that is visually distinctive even for non-Japanese readers | LOW | Google Fonts. Kanji as decorative elements per section (門, 道, 技, etc.). Subset fonts to only needed characters to avoid large downloads |
| Dark-only ink/night aesthetic | Fully committed dark theme with ink-wash textures, paper grain, and muted gold/red accents. No light mode compromise means every pixel is designed for this palette | LOW | No theme toggle needed. Commit fully to the dark palette. Use CSS custom properties for the color system. Ink-wash background textures as optimized WebP images |
| Scroll-driven parallax (mountain/cloud layers) | Background layers of Japanese mountains and clouds move at different speeds, creating depth. Evokes traditional ukiyo-e woodblock print perspective | MEDIUM | 3-4 CSS layers with `transform: translateY()` driven by scroll position. Disable on mobile -- use static background instead. GSAP or pure CSS `scroll-timeline` |
| Animated stat counters | Numbers (years of experience, projects completed, etc.) count up when scrolled into view. Adds dynamism to the About section | LOW | Framer Motion `useInView` + `animate` from 0 to target number. Simple but effective. Already a well-known pattern |
| Typing effect (JP to EN) | Text types out in Japanese, then "translates" to English with a typewriter effect. Shows bilingual nature of the site and the developer | MEDIUM | Custom hook or library like `typed.js`. Must be interruptible -- if user scrolls past, it should complete instantly. Use for hero tagline only, not everywhere |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem appealing but create real problems for this specific project.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Custom cursor (katana/brush) | Seems thematic and immersive | Breaks native cursor behavior, confuses users, terrible on touch devices, accessibility nightmare. Many awwwards sites do this but recruiter audiences are not design-award judges | Cursor hover effects on interactive elements only (ink ripple on buttons, glow on cards) |
| WebGL/Three.js 3D scenes | "Premium" feel, technically impressive | Massive bundle size (Three.js is 150KB+ gzipped), GPU-intensive, kills mobile performance, complex to maintain, overkill for a portfolio. Lighthouse score will tank | 2D Canvas for particles, SVG for brush effects. These achieve 90% of the wow factor at 10% of the cost |
| Horizontal scroll sections | Trendy on awwwards, feels unique | Confusing for recruiters who expect vertical scroll. Breaks natural scroll behavior, accessibility issues, mobile swipe conflicts | Vertical scroll with creative section transitions (katana slash, ink reveals) |
| Contact form with backend | "Professional" to have a contact form | Needs backend/serverless function, spam protection, email service. Recruiters use LinkedIn/email anyway. Maintenance burden for zero value | Direct email link (mailto:), GitHub profile link, LinkedIn link. Clear and immediate |
| Light mode / theme toggle | "Everyone has dark mode toggle" | Dilutes the aesthetic. The entire design system (ink textures, gold accents, kanji styling) is built for dark. Light mode would need a completely separate design pass | Commit to dark. The theme IS the brand. Ensure sufficient contrast for accessibility |
| Blog / CMS integration | "Content is king" | Adds massive complexity (CMS, dynamic routes, content management). This is a portfolio, not a blog. Static data from a data file is simpler and faster | Static data in TypeScript constants or JSON. Update by redeploying. Blog can be a separate project if needed later |
| Excessive page transitions between sections | "Smooth experience" | Too many animations competing for attention = visual chaos. Recruiter gets dizzy, leaves. Animation fatigue is real -- users with vestibular disorders may get physically ill | Pick 2-3 signature animations (intro, section reveals, parallax) and use subtle fades everywhere else. Less is more |
| Auto-playing audio (not muted) | "Immersive from the start" | Universally hated. Browsers block it anyway. Users will immediately close the tab. Violates web accessibility guidelines | Default muted with a visible, attractive toggle. Let users opt IN to sound |
| Separate pages / multi-page routing | "Better SEO, more organized" | Breaks the scroll-as-storytelling concept. Adds routing complexity. For a portfolio with 7 sections, single-page is faster and more impactful | Single-page with smooth scroll anchoring. Each section has a hash URL for direct linking |

## Feature Dependencies

```
[i18n Setup]
    └──required-by──> [All Content Sections]
                          └──required-by──> [SEO / Open Graph Meta]

[Dark Theme / Design Tokens]
    └──required-by──> [All Visual Components]
                          └──required-by──> [Ink/Brush Animations]
                          └──required-by──> [Sakura Particles]

[Scroll Infrastructure (GSAP ScrollTrigger + Framer Motion)]
    └──required-by──> [Section Reveal Animations]
    └──required-by──> [Parallax Layers]
    └──required-by──> [Katana Slash Transitions]
    └──required-by──> [Stat Counters]

[Kanji Intro Animation]
    └──independent──  (runs before main site, can be built separately)

[Audio System (Howler.js)]
    └──enhances──> [Section Transitions] (adds sound effects)
    └──enhances──> [Kanji Intro] (adds brush sound)
    └──independent of──> [Core Layout]

[Responsive Layout]
    └──required-by──> [Animation Scaling / Mobile Reduction]

[prefers-reduced-motion Detection]
    └──required-by──> [ALL Animation Features]
```

### Dependency Notes

- **i18n must come first:** Retrofitting internationalization into existing components is 3-5x harder than building with it from the start. All text must flow through the translation system from day one.
- **Design tokens / theme before components:** Color palette, typography scale, and spacing must be defined as CSS custom properties before any component is built. Every component depends on these.
- **Scroll infrastructure is a foundation layer:** GSAP ScrollTrigger and Framer Motion viewport detection power 80% of the differentiating features. Set this up once, reuse everywhere.
- **Audio is a pure enhancement:** The entire site must work perfectly without sound. Audio is layered on top and can be built last.
- **`prefers-reduced-motion` is a gatekeeper:** Every single animation must check this. Build the detection utility first, then wrap every animation with it.

## MVP Definition

### Launch With (v1)

Minimum viable portfolio that a recruiter can use and be impressed by.

- [ ] **Responsive single-page layout (7 sections)** -- the skeleton everything hangs on
- [ ] **Dark theme with full design token system** -- colors, typography, spacing
- [ ] **i18n (TR + EN) with language toggle** -- baked in from the start
- [ ] **Hero with name, role, animated brush typography** -- first impression
- [ ] **About section with bio + stat counters** -- personal context
- [ ] **Skills section with categorized tech stack** -- keyword scanning for recruiters
- [ ] **Experience timeline** -- career progression
- [ ] **Projects grid with descriptions + links** -- proof of work
- [ ] **Achievements section (TEKNOFEST/CanSat)** -- unique differentiator for Emirhan
- [ ] **Contact section with social links** -- clear call to action
- [ ] **PDF CV download** -- recruiter workflow essential
- [ ] **SEO + Open Graph** -- shareable on LinkedIn
- [ ] **Scroll-triggered section reveals (ink/brush style)** -- the signature animation
- [ ] **Kanji intro loading animation** -- the "wow" first impression
- [ ] **Parallax background layers** -- depth and atmosphere
- [ ] **`prefers-reduced-motion` support** -- accessibility requirement
- [ ] **Mobile animation reduction** -- performance on lower-end devices
- [ ] **Sticky nav with scroll-spy** -- orientation and navigation

### Add After Validation (v1.x)

Features to polish after the core site is live and tested with real users.

- [ ] **Sakura particle system** -- add once performance is validated on target devices
- [ ] **Ambient audio + interaction sound effects** -- add after core UX is solid
- [ ] **Katana slash section transitions** -- upgrade from simple fades
- [ ] **Typing effect (JP to EN)** -- hero enhancement
- [ ] **Ink-wash hover effects on project cards** -- micro-interaction polish
- [ ] **Animated skill proficiency bars (katana style)** -- visual enhancement for skills section

### Future Consideration (v2+)

Features to defer until the portfolio has served its primary purpose.

- [ ] **Blog or writing section** -- only if Emirhan starts publishing technical content
- [ ] **Case study deep-dives** -- expanded project pages with full write-ups
- [ ] **Visitor analytics dashboard** -- understand which sections get attention
- [ ] **A/B testing on intro animation** -- skip vs. show, measure bounce rate
- [ ] **Additional languages** -- Japanese, German, etc. if targeting those markets

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Responsive layout + 7 sections | HIGH | MEDIUM | P1 |
| Dark theme design system | HIGH | LOW | P1 |
| i18n (TR + EN) | HIGH | MEDIUM | P1 |
| Hero with brush typography | HIGH | MEDIUM | P1 |
| Project showcase grid | HIGH | MEDIUM | P1 |
| Experience timeline | HIGH | MEDIUM | P1 |
| Skills display | MEDIUM | LOW | P1 |
| Contact links + PDF download | HIGH | LOW | P1 |
| SEO + Open Graph | HIGH | LOW | P1 |
| Kanji intro animation | HIGH | HIGH | P1 |
| Scroll-triggered ink reveals | HIGH | HIGH | P1 |
| Parallax background layers | MEDIUM | MEDIUM | P1 |
| prefers-reduced-motion support | HIGH | LOW | P1 |
| Nav with scroll-spy | MEDIUM | LOW | P1 |
| Sakura particles | MEDIUM | MEDIUM | P2 |
| Audio system | MEDIUM | MEDIUM | P2 |
| Katana slash transitions | MEDIUM | MEDIUM | P2 |
| Typing effect | LOW | LOW | P2 |
| Ink hover effects | LOW | LOW | P2 |
| Animated skill bars | LOW | LOW | P2 |
| Blog / case studies | LOW | HIGH | P3 |
| Analytics | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch -- the site is incomplete without these
- P2: Should have, add in polish phase -- enhances the experience
- P3: Nice to have, future consideration -- separate project scope

## Competitor Feature Analysis

| Feature | Generic Dev Portfolios | Awwwards-Style Creative Sites | Our Approach |
|---------|----------------------|------------------------------|--------------|
| Theme | Light/dark toggle, generic | Bold artistic direction | Committed dark-only Samurai aesthetic -- no compromise |
| Animations | Subtle fade-ins | Heavy WebGL, 3D, custom cursors | Strategic middle ground -- ink/brush 2D animations, no WebGL bloat |
| Content structure | Multi-page with routing | Often obscure navigation | Single-page scroll -- recruiter-friendly, easy to scan |
| Load time | Usually fast (minimal effects) | Often 5-10s load times | Target <3s load, intro animation masks any remaining load |
| Sound | Almost never | Occasionally | Opt-in ambient audio -- unique but respectful |
| Mobile experience | Usually good | Often broken or degraded | Graceful degradation -- reduced animations, full content |
| Personality | Template-feeling | Over-designed, content buried | Theme serves content, not the other way around |
| i18n | Rarely | Rarely | TR + EN from day one -- competitive advantage for international roles |

## Sources

- [Portfolio Design Trends 2026 - Colorlib](https://colorlib.com/wp/portfolio-design-trends/)
- [What Recruiters Look for in Developer Portfolios - Pesto](https://pesto.tech/resources/what-recruiters-look-for-in-developer-portfolios)
- [What Makes A Developer Portfolio Stand Out - Proxify](https://proxify.io/knowledge-base/job-descriptions/what-makes-a-developer-portfolio-stand-out-to-recruiters)
- [Junior Dev Resume & Portfolio in 2025 - DEV Community](https://dev.to/dhruvjoshi9/junior-dev-resume-portfolio-in-the-age-of-ai-what-recruiters-care-about-in-2025-26c7)
- [Distinctive Features of Japanese-Style Web Design - DesignModo](https://designmodo.com/japanese-web-design/)
- [Japanese Website Design Examples - Subframe](https://www.subframe.com/tips/japanese-website-design-examples)
- [Creating Accessible UI Animations - Smashing Magazine](https://www.smashingmagazine.com/2023/11/creating-accessible-ui-animations/)
- [Making Web Animations Accessible - BOIA](https://www.boia.org/blog/making-your-web-animations-accessible-5-tips)
- [Awwwards Scroll Animations Inspiration](https://www.awwwards.com/inspiration/scroll-animations)
- [Awwwards GSAP Animation Websites](https://www.awwwards.com/websites/gsap/)
- [Best Japanese Web Design 2026](https://mycodelesswebsite.com/japanese-web-design/)

---
*Feature research for: Samurai/Japanese-themed developer portfolio*
*Researched: 2026-03-25*
