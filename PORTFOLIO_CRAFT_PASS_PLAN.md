# Portfolio craft pass — audit fixes

## Context

Literal ask: scan and audit the portfolio at `C:/Users/KEANUAGUSTIN/orca/portfolio`, then propose changes that improve it. This file is the proposal turned into an execution spec.

The audit ran against the live dev server (`http://localhost:3000`) at 1440×900 and 390×844, in both `day` and `night` themes, plus a full read of `app/globals.css` (2381 lines), `components/`, `lib/`, and `content/`. It found functional breakage (mobile navigation is unreachable, case-study pages ignore the theme, project titles never appear on touch), ~33 MB of eagerly-downloaded media on the home page, leftovers from the site's pre-cassette "celestial" skin, and contrast failures with measured ratios.

End state: same routes, same sections, same motion vocabulary (the `docs/aesthetic.md` contract holds — cassette futurism, 4 font families, 2px ink borders, hard offset shadows, no glass/neon/gradients). What changes is correctness, weight, palette discipline, and the interaction/accessibility layer.

**Scope boundary:** decorative SVG artwork (`Knob`, `Reel`, burst geometry) is repositioned and resized, never redrawn. The four project cover videos are re-encoded/postered but not re-shot.

---

## Approach

Steps are ordered so the tree builds and the existing pages render after each one. Steps 1–3 are sequential (later steps read the tokens and layout they establish). Steps 4–10 are independent of each other once 1–3 land.

### 1. Token layer: fix theming, delete dead tokens, add accessible accents

All edits in `app/globals.css` `:root` (L3–48) and `html[data-theme="night"], html.night` (L50–70).

**1a. Case-study pages are stuck in day colors.** `--cs-cream`, `--cs-black`, `--cs-ink` are defined once in `:root` (L45–47) and never redefined in the night block. `.cs-page` (L2035) and `.cs-band.cream/.dark` (L2042–2049) read them, so `/work/[slug]` stays cream while the chrome flips to night. Add to the night block:

```css
  --cs-cream: var(--c-night);
  --cs-black: #141210;
  --cs-ink: var(--c-cream);
```

(`#141210` is the value the deleted `--c-navy-2` held; inline it here rather than keeping a token with one consumer.)

Also replace the hardcoded `.cs-band.dark { color: #fff9ea }` (L2044) with `color: var(--c-cream)`.

**1b. Hard shadows vanish in night mode.** Night sets `--hard-shadow: 4px 4px 0 var(--c-black)` (L65) — `#1a1a1a` on `--c-night` `#1c1916` measures **1.01:1**, so the site's signature offset shadow is invisible on every card, tile, nav pill, and testimonial in night. Change L65 to:

```css
  --hard-shadow: 4px 4px 0 var(--c-gold);
```

(`#ffb900` on `#1c1916` = 10.16:1.)

**1c. Delete tokens with zero `var()` consumers** (verified across `app/`, `components/`, `lib/`):
- Raw (`:root` L14–19): `--c-navy-1`, `--c-navy-2`, `--c-blue-start`, `--c-blue-end`, `--c-toggle-navy`, `--c-border-dark`.
- Semantic, both day and night definitions: `--dark` (L27 / L69), `--hero-from` (L37 / L60), `--hero-to` (L38 / L61), `--toggle-track` (L39 / L62), `--toggle-border` (L40 / L63), `--toggle-knob` (L41 / L64).

**1d. Fix the inconsistent `--about-ink`.** `:root` L44 re-types the literal `#2b2b2b`; the night override at L68 correctly uses `var(--c-cream)`. Change L44 to `--about-ink: var(--c-ink);`.

**1e. Add three accessible accent tokens.** Case-study emphasis text currently uses per-study hex values. Measured on cream `#fcfaf0`: `#fc9073` = **2.14:1**, `#ff7a00` = **2.50:1**, `#ffb900` = **1.65:1** — all fail WCAG AA even at the 3:1 large-text threshold. Add to `:root`:

```css
  --c-coral-deep: #c4470a;  /* 4.72:1 on cream */
  --c-gold-deep:  #8a6200;  /* 5.24:1 on cream */
  --c-slate-deep: #3a6b8c;  /* 5.48:1 on cream */
```

Then drive `--cs-accent` from a data attribute instead of an inline hex:

```css
/* in :root-scoped rules, next to .cs-page */
.cs-page[data-accent="coral"] { --cs-accent: var(--c-coral-deep); }
.cs-page[data-accent="gold"]  { --cs-accent: var(--c-gold-deep); }
.cs-page[data-accent="slate"] { --cs-accent: var(--c-slate-deep); }
[data-theme="night"] .cs-page[data-accent="coral"] { --cs-accent: var(--c-coral); }
[data-theme="night"] .cs-page[data-accent="gold"]  { --cs-accent: var(--c-gold); }
[data-theme="night"] .cs-page[data-accent="slate"] { --cs-accent: var(--c-slate); }
```

(Night ratios on `#1c1916`: coral 6.70, gold 10.16, slate 4.42 — all pass.)

Callers to migrate, clean cutover:
- `content/case-studies.ts:60` — change `accent: string` to `accent: "coral" | "gold" | "slate"`.
- `content/case-studies.ts:68` `#fc9073` → `"coral"`; `:155` `#ff7a00` → `"coral"`; `:243` `#ffb900` → `"gold"`; `:331` `#4a86ad` → `"slate"`. (Line 419, the `lumen` study, is deleted in step 10.)
- `components/case-study/CaseStudyView.tsx:7` — replace `style={{ ["--cs-accent" as string]: study.accent }}` with `data-accent={study.accent}`.
- `content/projects.ts` — the `accent` field (type L8, values L21/32/43/54) has **no consumer anywhere** in `app/`, `components/`, or `lib/`. Delete the field and all four values.

**1f. Add scale tokens** so new rules stop inventing magic numbers. There is currently no `--space-*`, `--radius-*`, `--duration-*`, or `--ease-*` anywhere. Add to `:root`:

```css
  --radius-hw: 6px;      /* hardware: nav pill, cards, tiles */
  --radius-inner: 2px;   /* inset media inside a bordered frame */
  --dur-fast: 0.18s;
  --dur-base: 0.28s;
  --dur-slow: 0.45s;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --z-section: 10;
  --z-nav: 100;
  --z-overlay: 300;
  --z-loader: 400;
  --z-cursor: 900;
  --z-grain: 1000;
```

Apply them only where this plan already edits a rule (steps 2, 4, 6, 7). Do **not** sweep the whole stylesheet — an unrelated restyle is out of scope for this pass.

### 2. Chrome layout: mobile nav is unusable, anchors land under the nav

**2a. Mobile nav overflows off-screen (blocks all navigation).** Measured at 390 px: `.nav-pill` occupies x 16→70, but `.nav-links` (holding the CTA and burger) renders at **x −32→62** — the "Work with me" button is half off the left edge and the burger sits on top of the avatar. Root cause: `.avail-tag { margin-left: -60px }` (L272) and `.avail-dot { margin-left: -60px; margin-right: -10px }` (L291–292) exist purely to cancel `.nav-pill { gap: 60px }` (L246); the `@media (max-width: 900px)` block sets `.nav-pill { gap: 8px }` (L2291) without neutralising those negative margins.

Fix inside the `@media (max-width: 900px)` block, next to the existing `.nav-pill` rule:

```css
  .avail-tag,
  .avail-dot {
    display: none;
  }
```

The availability badge is the desktop compact-scroll flourish; a 390 px pill has no room for it. This removes the negative-margin interaction entirely rather than patching around it.

**2b. The mobile CTA has no accessible name.** The same media block sets `.nav-cta span { display: none }` (L2284), and that `<span>` is the button's only text (`components/chrome/SiteNav.tsx:82`). `display: none` removes it from the accessibility tree, leaving an unlabeled icon button. Add `aria-label="Work with me"` to the `<button className="nav-cta">` at `SiteNav.tsx:80`.

**2c. Anchor targets land under the fixed nav.** `#nav` is `position: fixed` with an 80 px effective height (24 px padding + 56 px pill); no `scroll-margin-top` exists anywhere in the stylesheet. Clicking "Work" (`/#work`) puts `.featured-heading` behind the pill. Add:

```css
#story,
#work,
#testimonials,
#contact {
  scroll-margin-top: 104px;
}
```

**2d. Left-align the work heading.** `.featured-heading` (L1192–1202) is `text-align: center`, so it is bisected by the centered nav pill on scroll and reinforces the all-centered layout. Change to `text-align: left` and add `padding: 0 60px;` to match `.project-tiles` (L1255); inside the 900 px block add `padding: 0 16px;` to match `.project-tiles` there (L2298).

**2e. Replace `100vh` with `100dvh`** at `.hero` (L727), `.about-intro` (L1757), `.pg-flow` (L1915) — all three currently jump when a mobile URL bar hides.

### 3. Hero: decoration collides with the headline on mobile

Measured at 390×844: `.hero-cloud.cloud-a` occupies y 321→442 and `.hero-copy`/`.h-line` occupy y 281→394 — the reel is drawn straight through the headline, and `.hero-burst` extends to x 413 on a 390 px viewport. Root cause: `--sun-w: clamp(220px, 32vw, 480px)` (L821) floors at 220 px — 56 % of a 390 px screen — while `.hero-cloud.cloud-a/-b` (L852–860) and `.hero-burst` (L778–783) have no mobile rules at all.

Add to the `@media (max-width: 900px)` block:

```css
  .hero-content {
    --sun-w: clamp(120px, 34vw, 168px);
  }
  .sun-group,
  .moon-group {
    top: 88px;
    right: 6%;
  }
  .hero-cloud {
    display: none;
  }
  .hero-burst {
    width: min(300px, 78vw);
    height: min(300px, 78vw);
    right: -16%;
    top: 5%;
  }
  .hero-copy {
    top: 54%;
  }
```

(The existing `.hero-copy { top: 40%; transform: translate(-50%, -50%) }` at L2362–2365 keeps its transform; only `top` changes.) Dropping the two reels on mobile is deliberate: three overlapping objects do not compose in a 390 px column, and the knob plus burst still read as the catalog cover.

Desktop composition also needs one correction: at 1440 px the mustard knob sits directly on top of the upper reel, cutting it in half, and its lower edge dissolves into the mustard slab because both are `--c-gold`. In the base rules, change `.hero-cloud.cloud-b` (L857–860) to `right: 30%; top: 22%;` so the reel clears the knob's left edge, and add a hard ink separation to the knob artwork by giving `.sun-group, .moon-group` `filter: drop-shadow(4px 4px 0 var(--c-ink));`. Verify visually per step V2 and nudge `right`/`top` until the reel is fully visible.

### 4. Work tiles: titles invisible on touch, glass overlay, magic-number grid

`.tile-overlay` (L1288–1306) is `opacity: 0` and only revealed by `:hover`/`:focus-visible`. On any touch device the four project names and subtitles are **never shown** — the home page is four unlabeled videos. It also uses `backdrop-filter: blur(7.7px)` (L1296), which `docs/aesthetic.md` explicitly forbids ("No soft UI. No `backdrop-filter` on chrome").

**4a. Permanent caption bar.** In `components/home/ProjectTiles.tsx`, restructure the `<Link>` body:

```tsx
<Link ... className={`project-tile ${p.wide ? "tile-wide" : "tile-narrow"}`}>
  <span className="tile-media">
    <TileCover src={p.cover} poster={p.poster} />
    <span className="tile-scrim" aria-hidden="true">
      <span className="tile-cue">View case study</span>
    </span>
  </span>
  <span className="tile-caption">
    <span className="tile-caption-meta">{p.client} · {p.year}</span>
    <span className="tile-caption-title">{p.title}</span>
    <span className="tile-caption-sub">{p.subtitle}</span>
  </span>
</Link>
```

CSS: delete `.tile-overlay`, `.tile-overlay-title`, `.tile-overlay-subtitle` (L1288–1319) and add — reusing the existing hardware grammar (cream fill, 2px ink border, `--hard-shadow`) rather than inventing a new card style:

```css
.tile-media {
  position: relative;
  display: block;
  flex: 1;
  overflow: hidden;
  border-bottom: 2px solid var(--c-ink);
}
.tile-scrim {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--overlay-scrim);
  opacity: 0;
  transition: opacity var(--dur-base) ease;
}
.tile-cue {
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-contrast);
}
.project-tile:hover .tile-scrim,
.project-tile:focus-visible .tile-scrim {
  opacity: 1;
}
.tile-caption {
  display: block;
  background: var(--c-cream);
  color: var(--c-ink);
  padding: 14px 18px 16px;
}
.tile-caption-meta {
  display: block;
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.65;
}
.tile-caption-title {
  display: block;
  font-family: var(--font-display), sans-serif;
  font-style: italic;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  font-size: clamp(22px, 2.4vw, 34px);
  line-height: 1.05;
  margin-top: 2px;
}
.tile-caption-sub {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.35;
  text-wrap: pretty;
  opacity: 0.8;
}
```

Add `display: flex; flex-direction: column;` to `.project-tile` (L1261) and change `height: min(595px, 62vw)` to `min-height: min(595px, 62vw)` so the caption cannot be clipped. Change `border-radius: 8px` → `var(--radius-hw)`.

**4b. Grid instead of magic percentages.** `.tiles-row` uses `gap: 1.97%` with `.tile-wide { width: 59.39% }` / `.tile-narrow { width: 38.64% }` (L1257–1287). In `ProjectTiles.tsx` add `data-lead={row[0].wide ? "wide" : "narrow"}` to the `.tiles-row` div, then replace those rules with:

```css
.tiles-row {
  display: grid;
  gap: 24px;
}
.tiles-row[data-lead="wide"]   { grid-template-columns: 3fr 2fr; }
.tiles-row[data-lead="narrow"] { grid-template-columns: 2fr 3fr; }
```

Delete `.project-tile.tile-wide` / `.project-tile.tile-narrow` width rules; keep the class names (they still drive `data-lead`). In the 900 px block, `.tiles-row` becomes `grid-template-columns: 1fr;` and the `.project-tile, .tile-wide, .tile-narrow { width: 100%; height: 360px }` rule (L2304–2309) becomes `min-height: 320px` with no `width`.

**4c. Pressed state.** Add, alongside the existing `:hover` at L1271:

```css
.project-tile:focus-visible {
  box-shadow: var(--hard-shadow);
  transform: translate(-2px, -2px);
  outline: 2px solid var(--focus-ring);
  outline-offset: 4px;
}
.project-tile:active {
  box-shadow: 0 0 0 var(--c-ink);
  transform: translate(2px, 2px);
}
```

### 5. Media weight: ~33 MB downloaded before the user scrolls

`components/home/ProjectTiles.tsx:39–49` renders every cover with `autoPlay preload="auto"` and calls `el.play()` on mount (L31) with no `IntersectionObserver`, no `poster`, and no reduced-motion check (`lib/use-reduced-motion.ts` exists and is not imported). All four `content/projects.ts` covers are MP4s. On-disk sizes: `commutenity.mp4` 8.05 MB, `tinig-turo.mp4` 7.27 MB, `tiktok-automate.mp4` 6.87 MB, `stellar4.mp4` 5.50 MB = **27.7 MB**. `lib/music.tsx:155` adds `<audio preload="auto">` against `audio/mineral-serenading.mp3` at **5.19 MB**, on every route.

**5a. Generate posters.** Run once, from the repo root:

```bash
for f in tinig-turo stellar4 commutenity tiktok-automate; do
  ffmpeg -y -ss 1 -i "public/$f.mp4" -frames:v 1 -q:v 4 "public/work/$f-poster.jpg"
done
```

**5b. Wire posters into content.** Add `poster: string` to the `Project` type (`content/projects.ts:1–11`) and set `poster: "/work/<slug>-poster.jpg"` on all four entries.

**5c. Gate playback.** Rewrite `TileVideo` in `components/home/ProjectTiles.tsx`:
- Accept `poster` and set `poster={poster}`, `preload="none"`, and **remove** `autoPlay`.
- Import `usePrefersReducedMotion` from `@/lib/use-reduced-motion`. When it returns true, render `<img src={poster} alt="" />` instead of a `<video>` and return early.
- Otherwise attach an `IntersectionObserver` with `{ threshold: 0.25 }` on the `<video>`: on intersect, set `el.preload = "auto"` then `void el.play()`; on leave, `el.pause()`. Disconnect in the effect cleanup. Keep the existing `defaultPlaybackRate = 1` / `playbackRate = 1` and `ended` → `currentTime = 0` handlers.
- `TileCover` gains a `poster` prop and forwards it; the non-video branch is unchanged.

**5d. Stop preloading audio.** `lib/music.tsx:155` — change `preload="auto"` to `preload="none"`. The player already seeds its duration from `site.audioDuration` (`seededDuration`, L32–36), so no metadata fetch is needed before first play. The existing `toggle` (L114–118) calls `audio.play()`, which triggers the load.

**5e. Stop the always-on hit-test poll.** `lib/use-nav-contrast.ts:31–36` recurses `window.setTimeout(loop, 80)` for the lifetime of every page, calling the layout-forcing `document.elementsFromPoint` 12.5×/second even when nothing scrolls. Replace the timer with a `scroll` + `resize` listener pair (both `{ passive: true }`) that schedules `sample()` through `requestAnimationFrame`, plus one `sample()` on mount. Keep the exported signature `useNavContrast(): boolean` unchanged — `components/chrome/SiteNav.tsx:14` is the only caller.

### 6. Purge the pre-cassette "celestial" skin

`docs/aesthetic.md` lists the previous look as explicitly retired ("celestial editorial", "no meadow/willow footer art", "no sun/moon orbs"). These survivors contradict it and carry off-palette hardcoded colors.

**6a. `StarryCard` → `CurrentlyCard`.** `components/about/StarryCard.tsx` renders `.starry-card`, whose CSS (L1889–1900) is `background: #0b1020` — a deep navy that appears nowhere in the palette — with `border-radius: 32px` and a `::before` starfield (L1901+). The component also hardcodes `color: "#fff9e9"` inline (L6).
- Rename the file to `components/about/CurrentlyCard.tsx` and the export to `CurrentlyCard`; update the import and usage in `app/about/page.tsx`.
- Replace all three inline `style` objects with classes `.cc-copy`, `.cc-heading`, `.cc-note`.
- Rename `.starry-card` → `.currently-card` in `app/globals.css` (base rule and the 900 px override at L2348), delete the `::before` starfield block, and restyle: `background: var(--surface-raised); color: var(--text-heading); border: 2px solid var(--c-ink); border-radius: var(--radius-hw); box-shadow: var(--hard-shadow);`.
- Keep `data-nav="dark"`? No — the card is now a raised surface that follows the theme. Change it to `data-nav="light"` so the nav contrast sampler reads it correctly in day mode.

**6b. Willow.** Delete `<div className="t-willow" aria-hidden="true" />` (`components/home/Testimonials.tsx:20`) and the `.t-willow` rule (L1329+).

**6c. Paper plane.** Delete the `.plane-fly` wrapper (`components/chrome/SiteFooter.tsx:15`) and its `PaperPlane` SVG child, plus the `.plane-fly`, `.plane-sprite`, and `@keyframes plane-fly` rules (L1552–1581). Its `offset-path: path("M -40 80 … 1480 40")` uses absolute pixel coordinates, so on a 390 px viewport it flies almost entirely off-screen — it is broken as well as off-theme.

**6d. Dead hero rules.** Delete `.hero-stars` (L772–774) and `.hero-meteor` (L775–777); both are `display: none` leftovers.

**6e. Rename celestial class and symbol names to cassette names.** Mechanical, one pass, no behaviour change:

| Old | New | Sites |
|---|---|---|
| `.sun-group` / `.moon-group` | `.knob-day` / `.knob-night` | `globals.css` L823–844; `Hero.tsx:24,25` |
| `.hero-cloud`, `.cloud-a`, `.cloud-b` | `.hero-reel`, `.reel-a`, `.reel-b` | `globals.css` L845–864 (+ new mobile rule from step 3); `Hero.tsx:26,27` |
| `.hero-sky` | `.hero-slab` | `globals.css` L748–771; `Hero.tsx:20` |
| `SkyBand` / `.sky-band` | `SlabBand` / `.slab-band` | `components/home/SkyBand.tsx` → `SlabBand.tsx`; `app/page.tsx:5,13`; `globals.css` L1162 |
| `.ico-sun` / `.ico-moon` | keep | they label literal sun/moon toggle icons, which is correct |

Also replace the two one-off hexes in the toggle icons: `.ico-sun { color: #f5a623 }` (L497) → `var(--c-gold)`, `.ico-moon { color: #f2ead6 }` (L503) → `var(--c-cream-2)`.

**6f. 404 copy.** `app/not-found.tsx:7` reads "This path isn't planted yet." — `docs/aesthetic.md` names `planted` as forbidden pastoral copy. Replace the whole component body with spec-sheet voice, real links, and CSS classes instead of the three inline `style` objects (L5, L8, L11):

```tsx
<main id="main" className="cs-wrap nf-wrap">
  <p className="cs-kicker">ERR 404</p>
  <h1 className="cs-title">No tape in this slot.</h1>
  <p className="cs-body nf-body">That address isn’t on the reel.</p>
  <nav className="nf-links" aria-label="Site sections">
    <Link href="/#work">Work</Link>
    <Link href="/about">About</Link>
    <Link href="/playground">Playground</Link>
  </nav>
  <Link href="/" className="nav-cta nf-cta">Back home</Link>
</main>
```

Add `.nf-wrap { min-height: 70dvh; text-align: center; }`, `.nf-body { margin: 16px auto 20px; }`, `.nf-links { display: flex; gap: 20px; justify-content: center; margin-bottom: 28px; font-family: var(--font-mono), monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }`, `.nf-cta { display: inline-flex; }`.

### 7. Interaction states

**7a. There is no `:active` rule anywhere in 2381 lines.** The hard offset shadow is the site's signature affordance and should collapse on press. Add a shared pattern to every hardware control — `.nav-cta`, `.cd-submit`, `.play-btn`, `.vol-knob`, `.pgf-arrow`, `.t-arrow`, `.ft-head-btn`, plus `.project-tile` (already covered in 4c):

```css
.nav-cta:active,
.cd-submit:active,
.play-btn:active,
.vol-knob:active,
.pgf-arrow:active,
.t-arrow:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 var(--c-ink);
}
```

`.cd-submit` (L1705) additionally has no `:hover` at all despite being the primary contact CTA — add `.cd-submit:hover { box-shadow: var(--hard-shadow); transform: translate(-2px, -2px); }`.

**7b. Extend focus-visible coverage.** Exactly one block provides a custom ring (L440–448, covering `.nav-wave`, `.day-toggle`, `.nav-link`, `.nav-cta`, `.nav-back`, `.nav-burger`). Add the same treatment for the keyboard-focusable elements that currently fall back to the browser default: `.nav-avatar`, `.play-btn`, `.vol-knob`, `.play-slider`, `.pgf-arrow`, `.pgf-card`, `.ft-head-btn`, `.ft-social a`, `.cs-meta a`, `.cd-submit`, `.t-arrow`, `.nf-links a`:

```css
.nav-avatar:focus-visible,
.play-btn:focus-visible,
/* … */
.nf-links a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}
```

Leave the `.cd-field input:focus` underline treatment (L1699–1703) as-is; it is a deliberate form-field affordance, not a missing ring.

**7c. Headline wrapping.** Add `text-wrap: balance` to `.h-line` (L903), `.ai-heading` (L1782), `.cs-hero-title`, `.pgf-title` (L1938), `.t-title` (L1352), and `text-wrap: pretty` to `.cs-hero-body` (L2082) and `.tile-caption-sub`.

### 8. Accessibility

**8a. Skip link.** None exists. In `components/chrome/AppChrome.tsx`, render `<a href="#main" className="skip-link">Skip to content</a>` as the first child. Add `id="main"` to the `<main>` in `app/page.tsx:10`, `app/about/page.tsx`, `app/playground/page.tsx`, `app/work/[slug]/page.tsx`, and `app/not-found.tsx`. CSS:

```css
.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: var(--z-grain);
  transform: translateY(-160%);
  padding: 10px 16px;
  background: var(--c-cream);
  color: var(--c-ink);
  border: 2px solid var(--c-ink);
  border-radius: var(--radius-hw);
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform var(--dur-fast) var(--ease-out);
}
.skip-link:focus-visible {
  transform: none;
}
```

**8b. `aria-current` on nav links.** `components/chrome/SiteNav.tsx:71,74,77` express the active route via `className` only. Add `aria-current={pathname === "/" ? "page" : undefined}` (and `/about`, `/playground` equivalents). Apply the same `active` class and `aria-current` to the three `.menu-link` entries at L145, L152, L159, which today carry no active state at all.

**8c. Shared focus trap.** Three `role="dialog" aria-modal="true"` surfaces leak focus to the background: the mobile `.menu-overlay` (`SiteNav.tsx:141` — also has no Escape handler), `ContactDrawer.tsx:41` (has Escape + initial focus, no trap, no focus restore), and the playground lightbox (`PlaygroundTrack.tsx:108` — no trap, no initial focus, no backdrop dismiss). Create `lib/use-focus-trap.ts`:

```ts
export function useFocusTrap(
  active: boolean,
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
): void
```

It must, while `active`: record `document.activeElement`, focus the first tabbable node inside `ref`, cycle Tab/Shift+Tab within `ref`, call `onClose()` on Escape, and restore focus to the recorded element on deactivate. Wire it into all three call sites and delete `ContactDrawer.tsx`'s now-duplicated Escape listener (L18–23) and initial-focus timeout (L17). Also add a click handler on the lightbox backdrop that calls the close function, and move the lightbox close button's inline `style` (`PlaygroundTrack.tsx:112`) into a `.pgf-close` class.

**8d. Playground keyboard access.** `PlaygroundTrack.tsx:74–93` renders each card as `<article onClick=…>` with no `tabIndex`, `role`, or `onKeyDown`, so inactive cards are unreachable. Add `role="button"`, `tabIndex={0}`, and an `onKeyDown` that fires the same handler on Enter and Space (with `preventDefault` on Space). Separately, the global `window` keydown listener (L20–27) hijacks Enter anywhere on the page — guard it with an early return when `document.activeElement` is an `input`, `textarea`, or has `isContentEditable`.

**8e. Case-study image alt text.** `components/case-study/CaseStudyView.tsx:39, 68, 105` all render `alt=""` on the primary content of each case study. Add `alt?: string` to the `hero` and `panel` band types and `imageAlts?: string[]` to the `gallery` band type in `content/case-studies.ts`, then in the renderer fall back to `` `${study.title} — ${band.heading ?? band.kicker ?? "screenshot"}` `` when the field is absent. Populate the real strings for the four live studies.

**8f. Theme toggle state.** `.day-toggle` (`SiteNav.tsx:115–137`) exposes no state because `lib/theme.tsx` returns only `{ setTheme, toggle }` (L18–21, L45–56) and mutates `document.documentElement` directly. Add a `theme: "day" | "night"` value to the provider state and context, initialised from the attribute the inline `THEME_SCRIPT` already set, and add `aria-pressed={theme === "night"}` to the button. This mirrors the music button, which already does `aria-pressed={playing}` (L101).

**8g. Play slider keyboard.** `.play-slider` (`Hero.tsx:118`) has `role="slider"`, `aria-valuemin/max/now`, and `tabIndex={0}` but **no** `onKeyDown`, so arrow keys do nothing — while its sibling `.vol-knob` (L163–179) implements Arrow/Home/End. Add the same handler shape to the play slider, seeking ±5 s on Left/Right and to 0 / duration on Home/End.

**8h. Marquee list semantics.** `components/home/FeaturedOn.tsx:6` puts `aria-label="Tools and technologies"` on a bare `<div>` (ignored by assistive tech on a generic element) and renders the entries as loose `<span>`s. Convert the inner wrapper to `<ul className="logo-marquee-inner">` with `<li className="client-logo">` children; see step 10c for the surrounding landmark.

### 9. SEO and social metadata

`app/layout.tsx:35–53` holds the only site-wide metadata. There is no `metadataBase`, no `twitter` object, no OG `images`, no `sitemap.ts`, `robots.ts`, or `opengraph-image`. `app/about/page.tsx`, `app/playground/page.tsx`, and `app/work/[slug]/page.tsx` set `title`/`description` but never `openGraph`, so Next inherits the home page's OG verbatim — every shared link unfurls as the home page.

**9a.** Add to `app/layout.tsx` metadata:

```ts
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  twitter: { card: "summary_large_image" },
```

and append `NEXT_PUBLIC_SITE_URL=` to `.env.example` with the comment `# Absolute origin for OG/Twitter image URLs and sitemap. Production deploys must set this.`

**9b.** Remove the `icons` override (L41–44). It points both `icon` and `apple` at `/avatar.jpg?v=2`, a 194 KB portrait rendered at 16×16. `app/icon.jpg` (12.7 KB) already exists and Next serves it from the file convention. Delete `app/favicon.ico` — it is **361 KB**, larger than every image on the site, and `app/icon.jpg` supersedes it.

**9c.** Add `app/opengraph-image.tsx` using `next/og`'s `ImageResponse` at `size = { width: 1200, height: 630 }`: cream `#fcfaf0` field, mustard `#ffb900` band across the lower 38 %, `site.name` in the display face, `site.role` in mono uppercase below it. This one route-level file supplies the default OG image for every page via metadata inheritance.

**9d.** Set `openGraph: { title, description }` explicitly in each of `app/about/page.tsx`, `app/playground/page.tsx`, and the `generateMetadata` return in `app/work/[slug]/page.tsx`, mirroring each route's own `title`/`description`.

**9e.** Add `app/sitemap.ts` returning `/`, `/about`, `/playground`, and `/work/${slug}` for every slug from `allCaseStudySlugs()` (`content/case-studies.ts:489`), and `app/robots.ts` allowing all with `sitemap` pointing at `${metadataBase}/sitemap.xml`.

### 10. Content and information architecture

**10a. Delete the orphan `lumen` case study.** `content/case-studies.ts:415–484` is live code: `client: "Harbor"` (a placeholder company), six hotlinked Unsplash URLs, and generic SaaS copy tonally unlike the four real studies. It is registered in the `caseStudies` record (L483) and therefore in `allCaseStudySlugs()` (L489) and `generateStaticParams` (`app/work/[slug]/page.tsx:9–11`), so it publishes at `/work/lumen` with no tile and no inbound link. Delete the object and its record entry.

**10b. Remove now-dead config and comments.** With `lumen` gone, no Unsplash or picsum URL remains anywhere — delete both `remotePatterns` entries from `next.config.ts:5–7`. Also delete the commented-out placeholder blocks at `content/testimonials.ts:36–53` (Jonah Hale / Kite, Priya Nair / Lumen) and `content/playground.ts:40–74` (five Unsplash items).

**10c. The work heading labels the wrong content.** `app/page.tsx:16–20` renders `<h2>Some of my work.</h2>` immediately followed by `<FeaturedOn />` — a marquee of 21 **technology names** — and only then the project tiles. Move `<FeaturedOn />` out of `.featured-work` and into its own band between `#story` and `#work`:

```tsx
<section className="toolbox" aria-labelledby="toolbox-h" data-nav="light">
  <h2 id="toolbox-h" className="t-eyebrow">Toolbox</h2>
  <FeaturedOn />
</section>
```

Add `.toolbox { background: var(--bg-base); padding: 0 0 40px; text-align: center; }`. Leave `#work` with the heading and tiles only. Drop the now-redundant `aria-label` from the `FeaturedOn` wrapper div.

**10d. Footer is 80 vh of empty mustard.** `.footer { min-height: 80vh }` (L1448) with `.ft-inner { padding: 80px 24px 160px }` (L1485) centres a two-line serif paragraph and one headline in a near-full-screen field, and offers no direct contact address. Change `min-height` to `0` and `.ft-inner` padding to `112px 24px 120px`. Add a mailto beneath the CTA in `components/chrome/SiteFooter.tsx`:

```tsx
<a className="ft-email" href={`mailto:${site.email}`}>{site.email}</a>
```

with `.ft-email { margin-top: 18px; font-family: var(--font-mono), monospace; font-size: 13px; letter-spacing: 0.1em; color: inherit; text-decoration: none; border-bottom: 1px solid color-mix(in srgb, currentColor 45%, transparent); }` and a `:hover { border-bottom-color: currentColor; }`.

**10e. Rewrite the footer sub-line.** `content/site.ts:28` currently reads "From early concepts to refined experiences, I help ambitious teams build products that earn trust, move quickly, and drive growth." — generic agency copy in a spec-sheet site. Replace with: `"Systems, interfaces, and the unglamorous parts in between. Open to teams that care about the last 5%."`

**10f. Marquee edge clipping.** `.logo-marquee-wrap::before/::after` (L1210–1227) are 80 px gradient fades, narrower than the widest entries (`Web3.js/Solidity`, `Git/GitHub`), so words are cut mid-glyph at both edges. Widen both to `width: 140px`.

**10g. Case-study hero mock breaks the hardware grammar.** `.cs-hero-mock` (L2105–2108) is `border-radius: 28px` with no border and no shadow, unlike every other surface on the site. Change to `border-radius: var(--radius-hw); border: 2px solid var(--c-ink); box-shadow: var(--hard-shadow);`.

**10h. Owner action — cover art.** All four project covers and the Tinig-Turo case-study hero are Rotato device mockups on the default macOS Monterey purple/orange wallpaper, and each carries a visible **`rotato.app/free`** watermark (confirmed on `tinig-turo`, `stellar4`, `commutenity`, and the `commutenity` hero). A free-tier watermark on a portfolio's primary work imagery is a credibility problem, and the stock gradient wallpaper is the one visual element on the site that reads as generic. Re-export each mockup with a flat `#fcfaf0` or `#ffb900` background and no watermark, then re-run the step 5a poster command. This is asset work outside the codebase; if it is not done in this pass, everything else in the plan still applies unchanged.

---

## Critical files & anchors

| File | Region | Why it matters |
|---|---|---|
| `app/globals.css` | `:root` L3–48, `[data-theme="night"]` L50–70, `@media (max-width: 900px)` L2270–2381 | Every step touches one of these three blocks; the 900 px block is the **only** non-reduced-motion media query in the file, so all responsive fixes land there |
| `components/chrome/SiteNav.tsx` | `.nav-pill` subtree L55–94, `.menu-overlay` L141–165 | Source of the mobile overflow (steps 2a/2b) and two of the three focus-trap sites |
| `components/home/ProjectTiles.tsx` | `TileVideo` L11–51, `ProjectTiles` L60–88 | Steps 4 and 5 both rewrite this file; do them together to avoid two passes over the same JSX |
| `components/home/Hero.tsx` | L18–55 decorative layer, L118–131 play slider, L163–205 volume knob | Step 3 class renames plus the step 8g keyboard handler |
| `content/case-studies.ts` | `CaseStudy` type L55–63, `lumen` L415–484, record L480–483 | Accent type change (1e), alt-text fields (8e), orphan deletion (10a) |

---

## Verification

Prerequisites: Node 20+, repo root as working directory, `npm run dev` already serving `http://localhost:3000` (a dev server is currently running on that port as PID 4544 — reuse it rather than starting a second one, which exits with "Another next dev server is already running").

**V1 — mobile navigation is reachable (proves step 2a/2b).** Open `http://localhost:3000/` at 390×844, wait 3 s for the nav transition to settle, and evaluate:

```js
const r = (s) => { const b = document.querySelector(s).getBoundingClientRect(); return [Math.round(b.left), Math.round(b.right)]; };
({ pill: r('.nav-pill'), links: r('.nav-links'), burger: r('.nav-burger') })
```

Before the fix this returns `links: [-32, 62]`. Expected after: every `left` ≥ 0, every `right` ≤ 390, and `.nav-burger` width 34. Then click the burger and confirm `.menu-overlay.open` renders with the three links; click "About" and confirm the URL becomes `/about`.

**V2 — hero decoration clears the headline (proves step 3).** At 390×844 with `window.scrollY === 0`, assert the rectangles do not intersect:

```js
const a = document.querySelector('.h-line').getBoundingClientRect();
const b = document.querySelector('.knob-day').getBoundingClientRect();
a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right   // must be true
```

Also assert `document.querySelector('.hero-burst').getBoundingClientRect().right <= 390`. Screenshot at 390×844 and at 1440×900 in both themes and confirm the upper reel is fully visible beside the knob rather than bisected by it.

**V3 — project titles are visible without hover (proves step 4a).** At 390×844, scroll to `#work` and evaluate `[...document.querySelectorAll('.tile-caption-title')].map(e => [e.textContent, getComputedStyle(e).opacity])`. Expected: four entries — `Tinig-Turo`, `Stellar4`, `CommuteNity`, `TikTok Automate` — each at opacity `1`. Also assert `getComputedStyle(document.querySelector('.tile-scrim')).backdropFilter === 'none'`.

**V4 — case studies follow the theme (proves step 1a/1b).** Load `/work/tinig-turo`, click the day/night toggle, and evaluate:

```js
({ page: getComputedStyle(document.querySelector('.cs-page')).backgroundColor,
   back: getComputedStyle(document.querySelector('.nav-back')).color })
```

Before the fix, night returns `page: rgb(252, 250, 240)` and `back: rgb(247, 241, 222)` — a **1.08:1** contrast ratio, an invisible back link. Expected after: `page` is `rgb(28, 25, 22)` in night and `rgb(252, 250, 240)` in day, with `back` legible against it in both. Repeat the toggle on `/` and `/about` to confirm no regression.

**V5 — media is no longer eager (proves step 5).** Hard-reload `/` at 1440×900, wait 8 s **without scrolling**, then evaluate:

```js
performance.getEntriesByType('resource')
  .filter(e => /\.mp4|\.mp3/.test(e.name))
  .map(e => [e.name.split('/').pop(), Math.round((e.transferSize || e.encodedBodySize) / 1024)])
```

Expected: an empty array. Then scroll to `#work`, wait 2 s, and re-run — expected: only the covers whose tiles are on screen, and `document.querySelector('.project-tile video').preload === 'auto'` for those. Confirm each off-screen tile still shows its poster image. Separately, set `prefers-reduced-motion: reduce` via CDP emulation, reload, and assert `document.querySelectorAll('.project-tile video').length === 0` with four `.project-tile img` in their place.

**V6 — accent contrast passes.** On `/work/tinig-turo` in day mode, read `getComputedStyle(document.querySelector('.cs-title em')).color` and compute its ratio against `#fcfaf0`. Expected ≥ 4.5 (the `--c-coral-deep` `#c4470a` value measures 4.72). Repeat in night against `#1c1916` — expected ≥ 4.5 (`#ff7a00` measures 6.70).

**V7 — keyboard path end to end.** From a fresh load of `/`, press Tab once: the skip link must appear; press Enter and confirm focus lands inside `<main>`. Tab through the nav and confirm every control shows the ink/cream focus ring (no browser-default outline). Open the contact drawer, Tab past the last field, and confirm focus wraps to the first control rather than escaping to the page; press Escape and confirm focus returns to the "Work with me" button. On `/playground`, Tab to an inactive card and press Enter — the lightbox must open; press Escape — it must close and return focus to that card.

**V8 — build and lint.** `npm run build` then `npm run lint`, both clean. The build output must no longer list `/work/lumen` among the prerendered routes, and must list `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`.

---

## Assumptions & contingencies

- **Production origin is unknown.** No deployed URL appears in `README.md`, `.env.example`, `next.config.ts`, or `lib/analytics.ts`. `metadataBase` therefore reads `process.env.NEXT_PUBLIC_SITE_URL` with a `http://localhost:3000` fallback rather than a guessed domain. If the owner supplies the real origin during execution, hardcode it as the fallback and still keep the env override.
- **Mustard night shadow may read as too loud** once applied to every card at once. If it does after V2's night screenshots, use `4px 4px 0 color-mix(in srgb, var(--c-gold) 60%, transparent)` instead — do not revert to `var(--c-black)`, which is the 1.01:1 invisible state being fixed.
- **`ffmpeg` may be absent** on the machine running step 5a. If so, capture the four poster frames with any screenshot of the video's first second, save them to the same `public/work/<slug>-poster.jpg` paths, and continue — the code path in 5c does not care how the files were produced.
- **The Rotato watermark (10h) needs source files** only the owner has. If re-exported art does not arrive in this pass, ship every other step; nothing else in the plan depends on the covers changing.
- **Class renames in 6e are cosmetic.** If execution time runs short, this is the one step that can be dropped without leaving the codebase inconsistent — every other step fixes a defect or a stated aesthetic violation.
