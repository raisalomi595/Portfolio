# Master Design System — Salomi Rai Portfolio

Direction: **Editorial Print Journal** (quiet-luxury / Kenya Hara–Aesop school)
Mode: **Redesign · Preserve** — routes, IA, content voice, form contracts, accessibility wins are protected.
Source: user-approved Checkpoint 1 declaration, validated against ui-ux-pro-max search results (see "Evidence").

## Concept

A two-ink printed journal. Every section is a "plate": hairline rules, folio numbers,
running heads, `Fig.` captions, drop caps, marginalia tags. One accent color only.
No rounded pills, no dashed orange brutalism, no purple gradients, no glassmorphism,
no bento grids, no Inter as display, no emoji icons.

## Color (two-ink press: ink + terracotta on paper)

| Role | Token | Hex |
|---|---|---|
| Page | `--color-paper` | `#FAF7F2` |
| Alt section | `--color-paper-deep` | `#EFE7DA` |
| Text | `--color-ink` | `#1E1C18` |
| Secondary text | `--color-ink-soft` | `#3D3830` |
| Muted text (4.5:1 checked on paper) | `--color-muted` | `#6F675C` |
| Accent (spot ink) | `--color-terracotta` | `#C97B5A` |
| Accent hover/deep | `--color-terracotta-deep` | `#B06449` |
| Hairline rule | `--color-rule` | `ink @ 15%` |

Retired: `#FF5C39` (26 uses), Contact reds `#E63946/#D97B7B/#C73E1E`, duplicate creams
`#ECE8DC/#F5EDE4/#E8DEC9/#C9B896`, raw `#8B8174/#3D3830` hex in JSX.

Note: no warm-editorial palette existed in the color DB for this product type
(no verified match) — palette derives from the user's existing brand assets
(favicon terracotta `#C97B5A`, honey paper tones), per skill fallback rule.

## Typography (4 families, down from 9 — serif + serif + mono, no UI sans)

| Token | Family | Use |
|---|---|---|
| `--font-display` | **Fraunces** (variable, opsz/SOFT/WONK) | masthead, h1–h3, project titles |
| `--font-body` | **Newsreader** | body copy, bios, case-study prose |
| `--font-mono` | **Inconsolata** | folios, eyebrows, tags, labels, dates (uppercase, tracking-widest) |
| `--font-script` | **Great Vibes** | exactly one signature moment (About) |

Retired: Anton, Playfair Display, Cormorant Garamond, Nunito Sans, Special Elite, Inter,
system `ui-monospace`. Fluid display via `clamp()`. Body 17px / line-height 1.6.
h1:body ratio ≥ 4×. `text-wrap: pretty`.

## Geometry & spacing

- Radius: **0** everywhere (sharp print corners).
- Structure: 1px hairline rules `ink/15`; double-rule section dividers.
- Shadows: 0–1 subtle level (paper lift only, e.g. portrait plate).
- Container: `max-w-8xl px-6 md:px-10` unified (ProjectDetail included).
- Prose measure: `max-w-[68ch]`.
- Section rhythm: `py-24 md:py-32` + `scroll-mt-20` (kept).
- Base grid: 4px unit.

## Motion

"Type settling onto paper": masked line reveals, rule-draw (`scaleX`), plate fades.
≤ 1–2 animated elements per view (ux rule: excessive motion, High severity).
Global `MotionConfig reducedMotion="user"`; parallax must present final readable
state under reduced motion; scroll effects paused when offscreen.
Easing: keep `EASE = [0.22, 1, 0.36, 1]`; durations 200–600ms; hover 150–300ms.

## Section vocabulary

- **Header**: running-head bar; monogram (SR) visible; mono nav with folio numbers `01–04`; hairline rule.
- **Hero**: Fraunces masthead "SALOMI RAI", standfirst deck, portrait plate + `Fig. 01`
  caption, printed "open to work" stamp, square marginalia tags, hand-drawn bee kept.
- **Projects**: "Index of Work" — numbered editorial entries (folio, Fraunces title,
  mono tech line), hairline hover rule-draw, honest descriptions.
- **ProjectDetail**: article layout — running head, drop cap, 68ch measure,
  numbered figures, margin notes, next-issue link.
- **About**: plate + fig caption, numbered departments (01 Design / 02 Develop / 03 Level Up).
- **Resume**: paper-deep, mono eyebrows (unified with all sections).
- **Contact**: correspondence form — underline inputs, blur validation,
  inline errors via `aria-describedby` + `role="alert"`, focusable error summary.
- **Footer**: classifieds/cartoon-panel strip (One Piece fleet, lazy-loaded 3D).
- **404**: same system (folio-style mono + terracotta, no raw `#FF5C39`).

## Content integrity (user-approved)

Fabricated metrics rewritten to truthful build descriptions. Real facts kept
(education, certificate, contact details, live URLs). Stock project images retained
but captioned honestly; `TODO` markers mark slots for real screenshots.

## Evidence (ui-ux-pro-max search)

- typography "editorial serif elegant magazine" → *Minimalist Monochrome Editorial*:
  serif display + serif body + mono labels, "NO UI sans-serif — 100% serif/mono",
  best for "portfolio apps, editorial publications".
- style "editorial minimal print" → Minimalism & Swiss: `border-radius: 0`,
  `box-shadow: none`, single accent, 12–16 col grid.
- ux "reduced motion scroll reveal" → High severity: reduced-motion honored,
  final readable state without parallax; animate 1–2 elements per view max.
- landing "portfolio hero about contact" → `portfolio-grid`: Hero (Name/Role) >
  Project Grid > About > Contact; neutral background, minimal accent. Matches preserved IA.
- ux "inline validation error" → blur validation, field-level inline errors
  with `aria-describedby`, focusable error summary with `role="alert"`.
- design-system generator returned Brutalism/monochrome-blue — rejected: search
  output never overrides the user's chosen direction (per skill query contract).

## Pre-delivery checklist

- [ ] No emoji as icons (Lucide/SVG only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Text contrast ≥ 4.5:1 light mode
- [ ] Visible focus states for keyboard nav
- [ ] `prefers-reduced-motion` respected (CSS **and** framer via MotionConfig)
- [ ] Responsive at 375 / 768 / 1024 / 1440, no horizontal scroll
- [ ] All colors from this document — no rogue hex
- [ ] No clipped/overflowing text, chips wrap
- [ ] Hover/focus/active/disabled/loading states on interactive components
- [ ] No fabricated data, no filler content
- [ ] Routes, form contracts, anchors unchanged
- [ ] `npm run lint` + `npm run build` pass
