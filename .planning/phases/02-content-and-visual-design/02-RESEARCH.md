# Phase 2: Content and Visual Design - Research

**Researched:** 2026-03-25
**Domain:** Static content sections with Japanese visual treatment (Next.js 15 + Tailwind CSS 4 + next-intl)
**Confidence:** HIGH

## Summary

Phase 2 transforms 7 placeholder SectionShell components into fully content-populated, visually styled portfolio sections. The foundation from Phase 1 provides SectionShell wrappers with decorative kanji, a responsive Navbar with scroll-spy, Lenis smooth scroll, GSAP/Motion animation infrastructure, i18n via next-intl, and Tailwind CSS 4 design tokens. Phase 2 fills each shell with real data from EMIRHAN_KAYA_DATA.md, adds Japanese visual textures (ink-wash, paper grain, parchment cards, katana slash dividers), and delivers a complete recruiter-usable portfolio.

This phase is purely content and styling -- no scroll-triggered animations, no particles, no parallax (those are Phase 3). The only interactive elements are CSS hover states (card overlays, button glows, contact icon effects) and a CSS bounce animation on the scroll indicator. All section components should be Server Components where possible (static content rendering), with Client Components only where interactivity is needed (hero scroll indicator fade-on-scroll).

**Primary recommendation:** Build each section as an independent component file under `src/components/sections/`, populate i18n message files with all content, create shared UI sub-components (tech tag pills, proficiency bars, parchment cards) for reuse across sections, and add a static PDF to the public directory.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Hero Section:** Centered dramatic layout, Playfair Display name (clamp 3rem-6rem), paper-white color, subtle ink splash background (CSS/SVG, 5-8% opacity), static English tagline, red CTA button (#c0392b) for Download CV, bouncing scroll indicator, no profile photo, 90vh height
- **About Section:** Profile photo with ink-wash circular frame (CSS mask/SVG clip-path), bio from DATA.md, 3 stat counters (static numbers), education info, photo left + text right on desktop
- **Skills Section:** 4 parchment/tomar cards (Languages, Frameworks, Infrastructure & DevOps, Messaging & Security), katana-styled proficiency bars (red fill on dark track)
- **Experience Section:** Vertical samurai path timeline (dashed line, red dot markers), alternating left/right cards on desktop, all 5 positions shown equally, most recent first, tech tags with ink-stamp styling
- **Projects Section:** Masonry/staggered parchment grid, 6 projects, hover ink-wash overlay reveals full description (CSS only), GitHub links with star counts
- **Achievements Section:** Medal/badge style, circular medals with gold border and metallic gradient, 2 achievements (TEKNOFEST, CanSat)
- **Contact Section:** Mon (crest) styled icons, 64px circles with gold border, red hover glow, email/GitHub/LinkedIn
- **Visual Textures:** Subtle paper grain (5-10% opacity), alternating section backgrounds (odd #0a0a0a, even #1a1a1a), thin red diagonal katana slash dividers (20-30% opacity), asanoha/seigaiha patterns as section divider strips only, decorative kanji as-is from Phase 1, ink-wash limited to hero bg/About photo frame/card edges
- **PDF CV:** Static file in /public, both navbar and hero CTA link to same file, download attribute

### Claude's Discretion
- Exact masonry grid column count and breakpoints
- Card padding, border-radius, shadow values
- About section layout (photo left/right, stacked on mobile)
- Stat counter visual styling
- Tech tag pill design
- Exact proficiency bar percentages for each skill
- i18n message key structure for all new content
- Responsive breakpoints for timeline (stacked on mobile)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Full-screen hero with name/role in brush-style typography over ink splash | Hero section component with Playfair Display clamp sizing, CSS radial gradient ink texture, centered layout within existing 90vh SectionShell |
| CONT-02 | About section with bio, photo in ink-wash frame, stat counters | About component with CSS mask/clip-path for brush-stroke photo frame, grid layout, static stat counters |
| CONT-03 | Skills section with categorized display in scroll/tomar style with katana proficiency bars | 4 parchment cards with paper grain texture, proficiency bar sub-component with red fill |
| CONT-04 | Experience timeline as vertical scroll with samurai journey metaphor | Timeline component with CSS dashed line, red dot markers, alternating card layout, responsive collapse |
| CONT-05 | Projects in masonry grid with parchment cards, hover ink reveal, GitHub links | CSS columns or grid masonry, hover overlay with line-clamp reveal, GitHub link + star display |
| CONT-06 | Achievements with TEKNOFEST/CanSat as medals/badges | Medal card component with gold gradient border, circular top element |
| CONT-07 | Contact section with email/GitHub/LinkedIn as mon (crest) icons | Circular icon containers with inline SVG, gold border, red hover glow transition |
| CONT-08 | PDF CV download from hero or navbar | Static PDF in /public, update navbar href, hero CTA with download attribute |
| VISL-01 | Japanese typography pairing (Noto Serif JP subset + Inter body) | Already configured in Phase 1 fonts.ts; verify Noto Serif JP renders for 7 kanji chars in SectionShell |
| VISL-02 | Ink-wash background textures and paper grain effects | CSS/SVG radial gradients for hero ink splash, repeating noise texture for paper grain at 5-10% opacity |
| VISL-03 | Each section displays decorative kanji character | Already implemented in Phase 1 SectionShell -- no work needed, just verify presence |
| VISL-04 | Subtle Japanese geometric patterns as accents | SVG pattern elements for asanoha/seigaiha used only as section divider strip decoration |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 15.5.14 | App Router, SSR, static generation | Installed |
| React | 19.1.0 | UI framework | Installed |
| Tailwind CSS | 4.x | Utility-first styling with @theme tokens | Installed |
| next-intl | 4.8.3 | i18n for all user-facing text | Installed |
| motion | 12.38.0 | Framer Motion for CSS hover transitions | Installed |
| clsx + tailwind-merge | 2.1.1 / 3.5.0 | Conditional class merging via cn() | Installed |

### No New Dependencies Needed
Phase 2 requires zero new npm packages. All visual effects (paper grain, ink-wash, parchment cards, proficiency bars, timeline, masonry, medals) are achievable with Tailwind CSS 4 utilities, inline SVGs, and CSS techniques. The existing stack is sufficient.

**Installation:** None required.

## Architecture Patterns

### Recommended Project Structure (Phase 2 additions)
```
src/
├── components/
│   ├── sections/           # NEW: One component per section
│   │   ├── Hero.tsx        # Server Component (mostly static, scroll indicator is CSS-only)
│   │   ├── About.tsx       # Server Component
│   │   ├── Skills.tsx      # Server Component
│   │   ├── Experience.tsx  # Server Component
│   │   ├── Projects.tsx    # Client Component (hover state for ink overlay)
│   │   ├── Achievements.tsx # Server Component
│   │   └── Contact.tsx     # Server Component
│   ├── ui/                 # NEW: Shared reusable sub-components
│   │   ├── ParchmentCard.tsx   # Reusable card with paper grain, gold border
│   │   ├── ProficiencyBar.tsx  # Katana-style proficiency bar
│   │   ├── TechTag.tsx         # Ink-stamp tech tag pill
│   │   ├── TimelineCard.tsx    # Single experience entry
│   │   ├── ProjectCard.tsx     # Single project card with hover overlay
│   │   ├── MedalBadge.tsx      # Achievement medal/badge
│   │   └── MonIcon.tsx         # Mon crest-styled social link icon
│   └── layout/
│       └── SectionDivider.tsx  # NEW: Katana slash + geometric pattern divider
├── lib/
│   └── data.ts             # NEW: Typed portfolio data objects
├── messages/
│   ├── en.json             # UPDATED: All section content added
│   └── tr.json             # UPDATED: All section content added
└── public/
    ├── Emirhan_Kaya_CV.pdf # NEW: Static CV PDF
    └── images/
        └── emirhan-3.jpg   # NEW: Profile photo
```

### Pattern 1: Server Components for Static Content Sections
**What:** Most section components should be Server Components (no "use client") because they render static content from i18n messages. Only components needing browser APIs or interactive state need "use client".
**When to use:** Always for sections that are pure data display (About, Skills, Experience, Achievements, Contact, Hero).
**Why:** Server Components render faster, produce smaller bundles, and the content is static -- no interactivity beyond CSS hover states (which don't need JS).

**Exception:** Projects section needs "use client" ONLY if the hover overlay needs JS state management. However, the UI-SPEC specifies CSS-only hover (`:hover` with `opacity` transition), so Projects can also be a Server Component. The scroll indicator on Hero that fades on scroll would need a small Client Component wrapper or can use CSS-only (`@keyframes` bounce + intersection observer via CSS).

**Recommendation:** Make ALL 7 sections Server Components. Use pure CSS for hover effects and the bounce animation. If the scroll indicator fade-on-scroll absolutely needs JS, extract just that element into a tiny Client Component child.

```typescript
// src/components/sections/About.tsx (Server Component -- NO "use client")
import { getTranslations } from "next-intl/server";
import { ParchmentCard } from "@/components/ui/ParchmentCard";

export async function About() {
  const t = await getTranslations("about");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section content using t() for all text */}
    </div>
  );
}
```

### Pattern 2: Data via i18n Messages (Not lib/data.ts)
**What:** All user-visible text content goes through next-intl message files (en.json / tr.json). Non-translatable data (GitHub URLs, star counts, tech stack arrays) can live in a separate data module.
**When to use:** For this portfolio where all content needs TR + EN support.
**Why:** The CONTEXT.md and Phase 1 established next-intl as the content delivery mechanism. Having a parallel lib/data.ts with translatable strings would create dual-source-of-truth problems.

**Split approach:**
- `en.json` / `tr.json`: All display text (bios, role titles, descriptions, section headings, stat labels)
- `src/lib/data.ts`: Structural data that doesn't change by locale (GitHub URLs, star counts, skill proficiency percentages, tech tag arrays, date ranges, contact links)

### Pattern 3: CSS-Only Visual Textures
**What:** Implement ink-wash, paper grain, parchment, and section dividers using pure CSS/SVG -- no external image assets for textures.
**When to use:** Phase 2 visual requirements (VISL-02, VISL-04).
**Why:** Eliminates HTTP requests for texture images, keeps bundle tiny, and textures scale infinitely.

**Paper grain:** CSS noise using a tiny inline SVG `<filter>` with `feTurbulence` + `feColorMatrix`, applied as a pseudo-element at 5-10% opacity.

```css
/* Paper grain via CSS pseudo-element */
.paper-grain::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,..."); /* inline SVG noise */
  pointer-events: none;
}
```

**Ink-wash background (hero):** Radial gradient from center, using semi-transparent dark values to simulate ink diffusion.

```css
/* Sumi-e radial texture */
background: radial-gradient(
  ellipse at center,
  rgba(192, 57, 43, 0.03) 0%,
  rgba(30, 30, 30, 0.05) 30%,
  transparent 70%
);
```

**Katana slash divider:** Pseudo-element with thin red line rotated -2deg.

```css
.section-divider::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -5%;
  width: 110%;
  height: 2px;
  background: rgba(192, 57, 43, 0.25);
  transform: rotate(-2deg);
}
```

### Pattern 4: CSS Columns for Masonry Layout
**What:** Use CSS `columns` property for the Projects masonry grid rather than JavaScript-based masonry.
**When to use:** When items have varying heights and need a staggered grid appearance.
**Why:** Pure CSS, zero JS, no layout shift, works server-side. CSS `columns` naturally fills columns top-to-bottom creating the staggered effect.

```css
/* 3-col masonry on desktop, 2-col tablet, 1-col mobile */
.masonry-grid {
  columns: 1;
  column-gap: 24px;
}
@media (min-width: 768px) {
  .masonry-grid { columns: 2; }
}
@media (min-width: 1024px) {
  .masonry-grid { columns: 3; }
}
.masonry-grid > * {
  break-inside: avoid;
  margin-bottom: 24px;
}
```

**Alternative considered:** CSS Grid with `masonry` template rows -- still experimental (behind flags in Firefox only, not in Chrome/Safari). Not production-ready.

### Pattern 5: Alternating Section Backgrounds via SectionShell
**What:** Odd sections get `bg-bg` (#0a0a0a), even sections get `bg-surface` (#1a1a1a). Apply via className passed to SectionShell.
**When to use:** Every section.
**Implementation:** In `page.tsx`, pass the background class based on index:

```typescript
const bgClass = index % 2 === 0 ? "bg-bg" : "bg-surface";
```

### Anti-Patterns to Avoid
- **Don't use "use client" on section components unless absolutely necessary.** Static content sections with CSS hover states do not need client-side React. This is the single biggest mistake to avoid in Phase 2.
- **Don't create a parallel data.ts with translatable strings.** All display text flows through next-intl. Only non-localizable structural data (URLs, numbers, arrays) belongs in data.ts.
- **Don't use external image files for textures.** Paper grain, ink-wash, and patterns should be CSS/inline-SVG to avoid extra HTTP requests.
- **Don't add scroll-triggered animations.** Phase 2 is static content + CSS hover states only. Phase 3 handles all scroll animations.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Masonry layout | Custom JS masonry with resize observers | CSS `columns` property | Zero JS, SSR-compatible, naturally staggered |
| Paper grain texture | External PNG noise images | Inline SVG feTurbulence filter | No HTTP request, scales to any size, tiny footprint |
| Ink-wash brush stroke photo frame | Canvas drawing or complex JS | CSS `mask-image` with SVG brush-stroke path | Pure CSS, works server-side, no JS needed |
| Proficiency bar animation | Custom JS width animation | CSS `width` property (static in Phase 2) | Static bars now; Phase 3 adds scroll-triggered animation |
| Icon set | External icon library (lucide, heroicons) | Inline SVGs for 3 contact icons + chevron | Only 4 icons needed; adding a library for 4 icons is wasteful |
| Responsive timeline | Complex JS layout switching | CSS flexbox with `order` + media queries | Timeline alternation is a CSS layout problem, not a JS problem |

## Common Pitfalls

### Pitfall 1: Hydration Errors from Server/Client Boundary Confusion
**What goes wrong:** Adding "use client" to section components unnecessarily, or forgetting it on components that use hooks/browser APIs. Mixing server-only imports (getTranslations) with client components.
**Why it happens:** Developers default to "use client" because Phase 1 components (Navbar, Providers) are client components. But content sections are fundamentally different -- they render static text.
**How to avoid:** Use `getTranslations` (server) in Server Components, `useTranslations` (client) in Client Components. Never mix. If a section is a Server Component, it uses `getTranslations` from `next-intl/server`. If it must be a Client Component, it uses `useTranslations` from `next-intl`.
**Warning signs:** Import errors mentioning "server-only" or "client-only" modules.

### Pitfall 2: Missing i18n Structural Parity Between en.json and tr.json
**What goes wrong:** Adding keys to en.json but forgetting the corresponding keys in tr.json (or vice versa). The site crashes or shows raw key names when switching languages.
**Why it happens:** Phase 2 adds ~100+ new message keys across 7 sections. Manual sync is error-prone.
**How to avoid:** Always edit both files in the same task. Use a flat structure with section namespaces (e.g., `about.bio`, `skills.languages.title`). After adding keys, run both locales in dev to verify.
**Warning signs:** Raw key strings like "about.bio" appearing in the rendered page.

### Pitfall 3: CSS `columns` Masonry Breaking Card Hover Overlays
**What goes wrong:** The hover overlay on project cards (which reveals full description) clips incorrectly or the card visually breaks across column boundaries.
**Why it happens:** CSS `columns` can split elements across columns. Without `break-inside: avoid`, a card might span two columns.
**How to avoid:** Always set `break-inside: avoid` on every child of the columns container. Keep card heights reasonable -- extremely tall cards in a narrow column can cause layout issues.

### Pitfall 4: Profile Photo Not Optimized
**What goes wrong:** Raw photo file (emirhan-3.jpg) is large (1-5MB), causes slow section load.
**Why it happens:** Developers drop the raw file into /public without optimization.
**How to avoid:** Use Next.js `<Image>` component with proper width/height/sizes attributes. The Image component handles optimization, WebP conversion, and lazy loading automatically. Set `priority` only if the image is above the fold (About section is below fold, so no priority needed).
**Warning signs:** Network tab shows a >200KB image load for a 200px circle.

### Pitfall 5: Navbar CV Download Link Mismatch
**What goes wrong:** Navbar already has `href="/cv.pdf"` but the actual file will be `/Emirhan_Kaya_CV.pdf`. Links break silently (404 on download).
**Why it happens:** Phase 1 used a placeholder href. Phase 2 adds the real file but forgets to update the navbar href.
**How to avoid:** Update Navbar.tsx href from `/cv.pdf` to `/Emirhan_Kaya_CV.pdf` (or whatever the actual filename is). Also update the mobile menu CV link.

### Pitfall 6: Noto Serif JP Not Rendering for Kanji
**What goes wrong:** The 7 decorative kanji characters render in a system fallback font instead of Noto Serif JP because the font file doesn't include those specific characters.
**Why it happens:** Phase 1 configured `Noto_Serif_JP` with `subsets: ["latin"]` only. The `latin` subset doesn't include Japanese kanji. The font loads but the kanji fall back to system serif.
**How to avoid:** Either add `subsets: ["japanese"]` (loads large subset) or better, use the undocumented but working `text` parameter: `Noto_Serif_JP({ text: "門道技戦作誉結" })` to create a micro-subset of exactly 7 characters.
**Warning signs:** Kanji characters look different from expected Noto Serif JP rendering. Check DevTools computed font on the kanji span.

## Code Examples

### Section Component Pattern (Server Component)
```typescript
// src/components/sections/About.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function About() {
  const t = await getTranslations("about");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-12">
        {t("heading")}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo with ink-wash frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-[200px] h-[200px]">
            <Image
              src="/images/emirhan-3.jpg"
              alt={t("photoAlt")}
              fill
              className="object-cover rounded-full"
              style={{ maskImage: "url(/images/brush-circle.svg)", maskSize: "cover" }}
              sizes="200px"
            />
          </div>
        </div>
        {/* Bio text */}
        <div className="lg:col-span-7">
          <p className="text-body text-paper leading-relaxed max-w-[600px]">
            {t("bio")}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Proficiency Bar Component
```typescript
// src/components/ui/ProficiencyBar.tsx
interface ProficiencyBarProps {
  label: string;
  percentage: number; // 0-100
}

export function ProficiencyBar({ label, percentage }: ProficiencyBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-body">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-secondary text-small">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-surface rounded-sm overflow-hidden">
        <div
          className="h-full bg-accent-red rounded-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

### Tech Tag Pill Component
```typescript
// src/components/ui/TechTag.tsx
export function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-block text-body text-text-secondary bg-accent-red/10 border border-accent-red/20 rounded px-2 py-1">
      {label}
    </span>
  );
}
```

### Parchment Card Component
```typescript
// src/components/ui/ParchmentCard.tsx
import { cn } from "@/lib/cn";

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ParchmentCard({ children, className }: ParchmentCardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface rounded-lg p-6",
        "border border-accent-gold/15",
        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {/* Paper grain pseudo-element handled via CSS class */}
      {children}
    </div>
  );
}
```

### i18n Message Structure (recommended)
```json
{
  "hero": {
    "name": "Emirhan Kaya",
    "role": "Full-Stack Developer",
    "tagline": "Crafting robust systems with precision and purpose",
    "downloadCV": "Download CV",
    "scrollDown": "Scroll down"
  },
  "about": {
    "heading": "About",
    "bio": "Back-End Developer specializing in...",
    "photoAlt": "Emirhan Kaya profile photo",
    "stats": {
      "experience": { "value": "1+", "label": "Years Experience" },
      "projects": { "value": "39+", "label": "Projects" },
      "companies": { "value": "4", "label": "Companies" }
    },
    "education": {
      "degree": "Computer Engineering",
      "university": "Sakarya University",
      "period": "2020-2024",
      "gpa": "GPA: 3.31"
    }
  },
  "skills": {
    "heading": "Skills",
    "categories": {
      "languages": { "title": "Languages" },
      "frameworks": { "title": "Frameworks" },
      "infrastructure": { "title": "Infrastructure & DevOps" },
      "security": { "title": "Messaging & Security" }
    }
  },
  "experience": {
    "heading": "Experience",
    "positions": {
      "seyfhnova": {
        "company": "Seyfhnova",
        "role": "Full-Stack Developer (Freelancer)",
        "period": "Jun 2025 - Present",
        "bullets": ["Kotlin + Spring Boot microservices...", "..."]
      }
    }
  },
  "projects": {
    "heading": "Projects",
    "items": {
      "microservices": {
        "name": "Microservices Java",
        "description": "Spring Boot microservices, scalable distributed architecture..."
      }
    }
  },
  "achievements": {
    "heading": "Achievements",
    "items": {
      "teknofest": {
        "name": "TEKNOFEST 2021 & 2022",
        "subtitle": "Finalist",
        "description": "Image processing, UAV autonomous flight..."
      },
      "cansat": {
        "name": "CanSat Competition",
        "subtitle": "Finalist",
        "description": "ST FOCOUNT team ground station management..."
      }
    }
  },
  "contact": {
    "heading": "Contact",
    "email": "Email",
    "github": "GitHub",
    "linkedin": "LinkedIn"
  }
}
```

### Page.tsx Integration Pattern
```typescript
// src/app/[locale]/page.tsx -- updated
import { setRequestLocale } from "next-intl/server";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
// ... other section imports

const SECTIONS = [
  { id: "hero", Component: Hero, bg: "bg-bg" },
  { id: "about", Component: About, bg: "bg-surface" },
  { id: "skills", Component: Skills, bg: "bg-bg" },
  { id: "experience", Component: Experience, bg: "bg-surface" },
  { id: "projects", Component: Projects, bg: "bg-bg" },
  { id: "achievements", Component: Achievements, bg: "bg-surface" },
  { id: "contact", Component: Contact, bg: "bg-bg" },
] as const;

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {SECTIONS.map(({ id, Component, bg }, index) => (
        <div key={id}>
          <SectionShell id={id} className={`${bg} ${id === "hero" ? "min-h-[90vh]" : ""}`}>
            <Component />
          </SectionShell>
          {index < SECTIONS.length - 1 && <SectionDivider />}
        </div>
      ))}
    </main>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS Grid masonry (experimental) | CSS `columns` for masonry | Still experimental in 2026 | Use `columns` -- grid masonry not production-ready |
| External texture image files | Inline SVG feTurbulence noise | Always available | Zero HTTP requests for textures |
| Client Components for all sections | Server Components with async getTranslations | Next.js 13+ App Router | Smaller bundles, faster initial render |
| `next/font` without CJK subsetting | `text` parameter for micro-subset | next/font supports it | Font payload drops from MBs to KBs |

## Open Questions

1. **Profile photo file availability**
   - What we know: EMIRHAN_KAYA_DATA.md references `/images/emirhan-3.jpg`
   - What's unclear: The file does not exist in `public/` yet (public dir appears empty or non-existent)
   - Recommendation: User must provide the actual photo file. Use a placeholder during development. Document in plan as a user action item.

2. **CV PDF file availability**
   - What we know: A static PDF needs to be placed in `/public/Emirhan_Kaya_CV.pdf`
   - What's unclear: The PDF does not exist yet
   - Recommendation: User must provide the PDF. Use a placeholder link during development. Document in plan as a user action item.

3. **Noto Serif JP subsetting for kanji**
   - What we know: Phase 1 configured `subsets: ["latin"]` which may not include the 7 kanji characters
   - What's unclear: Whether next/font automatically includes the characters when they appear in JSX rendered with that font-family
   - Recommendation: Update fonts.ts to use `text: "門道技戦作誉結"` parameter for precise subsetting. This is a quick fix that should be part of Phase 2 Wave 0.

4. **Brush-stroke SVG for About photo frame**
   - What we know: UI-SPEC calls for "organic brush-stroke SVG clip-path" for the ink-wash photo frame
   - What's unclear: The exact SVG path data for an organic-looking brush circle
   - Recommendation: Create a hand-drawn style circle SVG path for use as CSS `mask-image`. Can be generated as an irregular circle with noise applied to control points. Store as inline SVG data URI or as a file in public/images/.

5. **NAV_LINKS labels are hardcoded English in constants.ts**
   - What we know: `NAV_LINKS` in constants.ts has `label: "About"` etc. hardcoded
   - What's unclear: Whether the Navbar already uses i18n for these labels
   - Recommendation: Navbar currently uses hardcoded labels from NAV_LINKS. Phase 2 should update Navbar to use `useTranslations("nav")` for these labels instead of the constant. This ensures language switching works for nav labels.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 with jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Hero renders name, role, tagline, CTA button | unit | `npx vitest run tests/sections/Hero.test.tsx -t "Hero"` | No -- Wave 0 |
| CONT-02 | About renders bio, photo, stats, education | unit | `npx vitest run tests/sections/About.test.tsx -t "About"` | No -- Wave 0 |
| CONT-03 | Skills renders 4 categories with proficiency bars | unit | `npx vitest run tests/sections/Skills.test.tsx -t "Skills"` | No -- Wave 0 |
| CONT-04 | Experience renders 5 positions in timeline | unit | `npx vitest run tests/sections/Experience.test.tsx -t "Experience"` | No -- Wave 0 |
| CONT-05 | Projects renders 6 cards with GitHub links | unit | `npx vitest run tests/sections/Projects.test.tsx -t "Projects"` | No -- Wave 0 |
| CONT-06 | Achievements renders 2 medal entries | unit | `npx vitest run tests/sections/Achievements.test.tsx -t "Achievements"` | No -- Wave 0 |
| CONT-07 | Contact renders 3 social links | unit | `npx vitest run tests/sections/Contact.test.tsx -t "Contact"` | No -- Wave 0 |
| CONT-08 | CV download link has correct href and download attr | unit | `npx vitest run tests/sections/Hero.test.tsx -t "CV download"` | No -- Wave 0 |
| VISL-01 | Kanji font class applied to decorative elements | unit | Already covered by existing tests (SectionShell has font-kanji class) | Partial |
| VISL-02 | Sections have paper grain / ink-wash CSS | smoke | `npx next build` (build success = CSS valid) | N/A |
| VISL-03 | Each section has decorative kanji | unit | Already tested in Phase 1 SectionShell | Yes |
| VISL-04 | Section dividers include geometric pattern elements | smoke | `npx next build` | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose && npx next build`
- **Phase gate:** Full suite green + `npx next build` succeeds before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/sections/Hero.test.tsx` -- covers CONT-01, CONT-08
- [ ] `tests/sections/About.test.tsx` -- covers CONT-02
- [ ] `tests/sections/Skills.test.tsx` -- covers CONT-03
- [ ] `tests/sections/Experience.test.tsx` -- covers CONT-04
- [ ] `tests/sections/Projects.test.tsx` -- covers CONT-05
- [ ] `tests/sections/Achievements.test.tsx` -- covers CONT-06
- [ ] `tests/sections/Contact.test.tsx` -- covers CONT-07
- [ ] `tests/i18n/messages-parity.test.ts` -- verifies en.json and tr.json have identical key structure
- [ ] Test helper: next-intl mock provider for testing Server Components with translations

## Sources

### Primary (HIGH confidence)
- Existing codebase files: SectionShell.tsx, Navbar.tsx, constants.ts, globals.css, fonts.ts, layout.tsx, page.tsx, en.json, tr.json -- all read directly
- Phase 1 summary (01-02-SUMMARY.md) -- established patterns and component inventory
- 02-CONTEXT.md -- all locked user decisions
- 02-UI-SPEC.md -- complete visual contract with exact colors, sizes, spacing

### Secondary (MEDIUM confidence)
- Phase 1 ARCHITECTURE.md -- component structure and server/client boundary patterns
- Phase 1 PITFALLS.md -- font subsetting, hydration errors, GSAP patterns
- CSS `columns` masonry approach -- well-documented CSS specification, widely supported
- CSS `mask-image` for brush-stroke photo frame -- CSS Masking Level 1 spec, good browser support

### Tertiary (LOW confidence)
- Noto Serif JP `text` parameter in next/font -- behavior confirmed in next/font docs but subsetting behavior for CJK characters specifically should be verified during implementation
- Exact paper grain feTurbulence parameters -- will need visual tuning during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, everything already installed
- Architecture: HIGH -- server/client boundaries clear, patterns established in Phase 1
- Visual implementation: MEDIUM -- CSS texture techniques are well-known but exact visual quality requires tuning
- Pitfalls: HIGH -- hydration and i18n parity are well-documented failure modes

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable -- no fast-moving dependencies)
