---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (lightweight, Vite-native, good Next.js support) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run && npx next build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run && npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | FOUND-01 | manual-only | Visual inspection at 375px, 768px, 1440px | N/A | ⬜ pending |
| TBD | TBD | TBD | FOUND-02 | unit | `npx vitest run tests/hooks/useScrollSection.test.ts` | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | FOUND-03 | integration | `npx vitest run tests/i18n/locale-switch.test.ts` | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | FOUND-04 | unit | `npx vitest run tests/theme/design-tokens.test.ts` | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | FOUND-05 | unit | `npx vitest run tests/hooks/useReducedMotion.test.ts` | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | FOUND-06 | smoke | `npx next build` | N/A | ⬜ pending |
| TBD | TBD | TBD | FOUND-07 | unit | `npx vitest run tests/lib/gsap-config.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Vitest configuration with jsdom environment
- [ ] `tests/hooks/useScrollSection.test.ts` — scroll-spy hook tests
- [ ] `tests/hooks/useReducedMotion.test.ts` — reduced motion tier tests
- [ ] `tests/i18n/locale-switch.test.ts` — locale switching integration test
- [ ] `tests/theme/design-tokens.test.ts` — design token CSS custom property tests
- [ ] `tests/lib/gsap-config.test.ts` — GSAP plugin registration tests

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Responsive layout at breakpoints | FOUND-01 | Visual layout verification requires browser rendering | Open dev tools, check 375px, 768px, 1440px widths |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
