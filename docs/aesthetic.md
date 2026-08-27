# Aesthetic direction

Grounding document for this portfolio’s visual language. New agent sessions should treat this as source of truth when changing UI. Images and copy will be swapped; **the system stays**.

## Name the look

**Cassette futurism** — analog portable audio as industrial design, drawn like a late-1970s / early-1980s Japanese consumer-electronics catalog (Sony / Aiwa / Walkman print).

Related, if useful: analog tech, transparent/clear-case electronics, spec-sheet / technical-manual layout, offset print, Swiss grotesque + pop burst.

Not: synthwave, vaporwave, Y2K chrome, Windows 95, web brutalism, Memphis, cyberpunk, celestial editorial (the previous cream/gold sky hero).

Reference mood (do not copy assets): cream paper + mustard slab + safety orange; compressed italic grotesque lockups; Bodoni-like serif slogans; starbursts; tape reels; hard graphic shadows; print grain.

## What is locked

Keep unless the owner explicitly asks to change it:

- Routes and sectioning: home (hero → intro → work tiles → testimonials → footer), `/about`, `/playground`, `/work/[slug]`
- Chrome behavior: sticky nav, compact-on-scroll, day/night toggle, music wave, contact drawer, page loader, route curtain, scramble headline, cassette recorder, theme persistence
- Two-tier tokens in `app/globals.css`: raw `--c-*` palette, semantic roles (`--bg-base`, `--text-heading`, `--hard-shadow`, …) that flip under `[data-theme="night"]`
- Print grain overlay on `body::after`
- Hard 2px ink borders and offset shadows (`--hard-shadow: 4px 4px 0`), not CSS blurs or glass

## Palette

Use CSS variables. Do not introduce a new brand hex without updating `:root` and the night block together.

| Role | Token | Day | Notes |
|---|---|---|---|
| Paper | `--c-cream` | `#fcfaf0` | Aged catalog stock, not cool white |
| Paper 2 | `--c-cream-2` | `#f7f1de` | Slightly warmer cream |
| Raised | `--c-sand` | `#f0e6c8` | Cards, secondary fields |
| Ink | `--c-ink` | `#2b2b2b` | Body and borders; charcoal, not `#000` |
| Mustard slab | `--c-gold` | `#ffb900` | Large fields (hero base, footer, loader dots) |
| Safety orange | `--c-coral` | `#ff7a00` | Bursts, CTAs, small hardware |
| Slate | `--c-slate` | `#4a86ad` | Cool counterweight (night burst, roll word) |
| Signal red | `--c-red` | `#d83d36` | Spare accent; don’t flood |
| Night paper | `--c-night` | `#1c1916` | Warm workshop charcoal |
| Night raised | `--c-navy` | `#2a2622` | Raised night surface |

Day page: cream paper, mustard as a **slab**, orange as a **hit**. Night page: charcoal workshop; mustard/orange still punch; type goes cream.

## Type

Loaded in `app/layout.tsx` via `next/font`:

| Role | Face | Use |
|---|---|---|
| Display | **Barlow Condensed** 800 italic | Hero, menu, footer headline, case-study titles. All-caps, tight tracking (`letter-spacing: -0.03em` to `-0.045em`), period as a full stop where it helps (`Selected work.`) |
| Grotesk | **Archivo** | Body, UI chrome |
| Serif | **Libre Bodoni** | Slogans, intro, quotes — the “catalog prestige” line |
| Spec | **IBM Plex Mono** | Eyebrows, nav links, labels, location, loader line. Uppercase, wide tracking |

Do not add a fifth family without a reason. Do not return to DM Serif Display / Space Grotesk / Figtree for this skin.

## Surface grammar

- **Hardware, not glass.** Nav, recorder, tiles, cards: cream (or mustard) fill, 2px ink stroke, 4px offset shadow. Corner radius ~4–8px, not pills (nav height can stay 56px; radius is 6px).
- **Catalog collage.** Starburst behind hero objects; tape-reel SVGs; square knobs for day/night art; bus stripes (ink + orange) along the top edge; hazard hatch on mustard slabs.
- **Grain.** Global `body::after` turbulence overlay. Keep it. Don’t stack extra noise on every section.
- **No soft UI.** No `backdrop-filter` on chrome, no sky gradients, no sun/moon orbs, no meadow/willow footer art.

## Layout rhythm

- Hero: cream (or night charcoal) field, mustard slab on the lower ~38%, starburst + reels + knob on the right, condensed lockup center-left, cassette recorder sitting on the slab.
- Work tiles: ink outline, hard hover offset, overlay uses `--overlay-scrim`.
- Footer: mustard field, ink hazard strip at the join, ink ground band at the bottom for credit/social (cream type on that band).
- Case studies: cream/dark bands, numbered rail, italic condensed headings, orange/slate em-accent via `--cs-accent`.

## Copy tone (when writing UI chrome)

Spec-sheet, not garden. Prefer: `UNIT Z-87`, `SIDE A`, `CUE THE NEXT TRACK?`, `TAPE LOADED.`, `CASSETTE / 2026`. Avoid pastoral: planted, meadow, grow together.

Owner will replace placeholder identity and photography. Decorative SVGs may be replaced with refined illustrations **as long as they stay cassette-futurist objects** (decks, reels, knobs, bursts, stripes) — not landscapes or fashion editorial.

## Images

Remote placeholders live in `content/*.ts` (Unsplash URLs). Swapping images is expected.

When adding local files, put them in `public/` and point content fields at `/filename.ext`. Keep `next.config.ts` `images.remotePatterns` in sync if using new hosts.

Treat photography as catalog product shots or print stills: warm, slightly analog, not glossy SaaS mockups unless the case study needs them.

## Checklist before shipping a visual change

- [ ] Day and night both still read as the same catalog
- [ ] New color is a token, not a one-off hex in a component
- [ ] Type is one of the four families
- [ ] Borders/shadows match the hardware grammar
- [ ] Motion already in the template still runs (`prefers-reduced-motion` respected)
- [ ] No glass, neon grid, or celestial leftover
