# How to change this site

A map of the repo for you — not an agent brief. Use this when you want to swap copy, photos, or a section without hunting.

If you only care how it looks, see [aesthetic.md](./aesthetic.md). If you need clone-and-run, see the root [README](../README.md).

## Mental model

The site is a **Next.js App Router** app. Pages are thin. **Copy and images live in `content/`**. **Look-and-feel lives in `app/globals.css`**. **Behavior lives in `components/` + `lib/`**.

You can go surprisingly far by only editing `content/`.

```
content/          ← your words, photos, case studies
app/              ← routes (URLs)
components/       ← UI pieces those routes compose
lib/              ← theme, music, contact drawer, small hooks
app/globals.css   ← colors, type, layout skin
app/layout.tsx    ← fonts + chrome wrapper
```

## Everyday edits

### Identity, hero, footer, contact

[`content/site.ts`](../content/site.ts)

- `name`, `role`, `location`, `email`, `avatar`
- Hero labels: `heroEyebrow`, `heroVertical`, `heroLine`, `heroRoll`
- Intro paragraphs, about blurb, footer headline, contact drawer copy
- `socials`, `featuredOn` (the marquee names)
- `audioSrc` — paste a URL or `/audio/your-track.mp3` after dropping a file in `public/audio/`

Avatar and photos are just strings (URLs). Local files: put them in `public/` and use a path like `/me.jpg`.

### Home work tiles

[`content/projects.ts`](../content/projects.ts)

Each item is a tile. `wide: true` is the large tile in a row; `false` is the narrow one. Rows are pairs in array order.

`slug` must match a key in [`content/case-studies.ts`](../content/case-studies.ts) or the tile 404s.

### Testimonials

[`content/testimonials.ts`](../content/testimonials.ts) — quote, name, role, company, portrait URL.

### About page

[`content/experience.ts`](../content/experience.ts) — jobs plus `funFacts` photo cards.

About heading/body still come from `site.about` in `site.ts`. Polaroid images on the intro are currently hardcoded in [`components/about/AboutIntro.tsx`](../components/about/AboutIntro.tsx).

### Playground

[`content/playground.ts`](../content/playground.ts) — title, tags, description, image. Coverflow + lightbox read this list.

### Case studies

[`content/case-studies.ts`](../content/case-studies.ts)

A study is a `slug`, `title`, `accent` (hex for italic emphasis), and a `bands` array. Band `type`s:

| `type` | What it is |
|---|---|
| `hero` | Title, italic line, body, role/client/year, image |
| `panel` | Numbered section, optional image and “what I owned” note |
| `quote` | Big centered line |
| `gallery` | Three (or so) images |
| `logoband` | Wordmarks as text |
| `closing` | End statement |
| `readnext` | Link to another `slug` |

Renderer: [`components/case-study/CaseStudyView.tsx`](../components/case-study/CaseStudyView.tsx). New studies: add the object, export it on `caseStudies`, add a matching tile.

## Where each URL is

| URL | File | Main components |
|---|---|---|
| `/` | `app/page.tsx` | `Hero`, `IntroStatement`, `FeaturedOn`, `ProjectTiles`, `Testimonials` |
| `/about` | `app/about/page.tsx` | `AboutIntro`, `Experience`, `FunFacts`, `StarryCard` |
| `/playground` | `app/playground/page.tsx` | `PlaygroundTrack` |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | `CaseStudyView` |
| (all pages) | `app/layout.tsx` → `AppChrome` | nav, footer, loader, drawer, cursor |

Shared chrome is always on: [`components/chrome/AppChrome.tsx`](../components/chrome/AppChrome.tsx).

## Look and feel (when you outgrow content files)

| Want to change | Start here |
|---|---|
| Colors, borders, hero slab, grain | `app/globals.css` (`:root` and `[data-theme="night"]`) |
| Fonts | `app/layout.tsx` (`next/font/google`) then CSS that uses `--font-display` etc. |
| Hero decorations (burst, reels, knobs, recorder) | `components/home/Hero.tsx` |
| Nav markup | `components/chrome/SiteNav.tsx` |
| Footer / paper plane | `components/chrome/SiteFooter.tsx` |
| Contact form | `components/chrome/ContactDrawer.tsx` |
| Day/night logic | `lib/theme.tsx` + the tiny script in `lib/theme-script.ts` |
| Cassette player + nav wave | `lib/music.tsx` (driven by `site.audioSrc`) |

CSS is mostly class names on those components (`.hero`, `.nav-pill`, `.project-tile`, `.cs-band`, …), not Tailwind utility soup. Match existing classes before inventing new ones.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production check
```

Requires Node 20+ (the project uses `fnm`/Node 20 locally).

## Images from the internet

`next.config.ts` allowlists `images.unsplash.com` and `picsum.photos`. A new host needs a `remotePatterns` entry **or** you download the file into `public/` and skip remote config.

## Theme

The day/night switch writes `localStorage.theme` (`day` | `night`). If the page looks “stuck” dark, toggle the square control in the nav, or clear that key in DevTools → Application → Local Storage.

## Don’t fight these

- `AGENTS.md` / `CLAUDE.md` are regenerated by `next dev`. Put project guidance in `docs/` and `.cursor/rules/`, not those two.
- `prefers-reduced-motion` is respected in CSS and scramble/loader. Keep it.
- The custom cursor (`DotCursor`) hides the system pointer on fine pointers. Fine to leave alone.
