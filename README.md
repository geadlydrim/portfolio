# Keanu Agustin — portfolio

Personal site for **Keanu Agustin**, a software developer in Valenzuela, Philippines. The skin is a **cassette-futurist** electronics catalog: cream paper, mustard slabs, safety-orange hits, condensed italic type — analog portable-audio print, not generic retro or celestial editorial.

This README is the tour. How to swap copy and photos without a redesign lives in **[docs/codebase.md](docs/codebase.md)**. How it should look lives in **[docs/aesthetic.md](docs/aesthetic.md)**.

- LinkedIn: [keanuagustin31](https://www.linkedin.com/in/keanuagustin31/)
- GitHub: [geadlydrim](https://github.com/geadlydrim)
- Email: keanuagustin.tech@gmail.com

## Me as a developer

I study software development and deep learning, and I engineer systems and interfaces people actually want to use. I started in low-level programming, where every function has to be planned and you have to understand program flow. That stuck. In an age of agentic tools I still want to know how a thing works and why.

I work across **mobile, web, blockchain, and applied AI** — enough range to prototype instead of only describing. Building rarely happens alone. I communicate across research, design, and engineering, and I will pick up whatever the team needs, from debugging someone else’s code to documenting a system for the next person.

The goal is the same each time: software people can trust, built by people who trust each other.

Recent work on this site:

| Project | What it is |
|---|---|
| **Tinig-Turo** | On-device Android app for Deaf and Hard-of-Hearing users: names a sound and points to where it came from. Best Thesis, FEU Tech CS Expo. [Repo](https://github.com/TadeyRuk/Tinig-Turo) |
| **CommuteNity** | Community-driven commute navigation for the Philippines — jeepney / UV / tricycle knowledge as a rider-written feed with maps. [Repo](https://github.com/geadlydrim/CommuteNity-Web) |
| **Stellar4** | Next.js game plus NFT marketplace on Stellar (Soroban). Play, export an item as an NFT, list it. [Repo](https://github.com/geadlydrim/stellar-payment-dapp) |

Outside the case studies: RPA and scripting for TikTok engagement/advertising (parsers, OTP scrapers, UI bots), and a work immersion at the Valenzuela Alert Center IT office (helpdesk, hardware, networks).

Stack I reach for often: TypeScript / React / Next.js, Python, Kotlin, Rust, TensorFlow / PyTorch, Solidity / Stellar, Playwright / Selenium, SQL.

## How the site is structured

Pages are thin. **Copy and images live in `content/`**. **Look-and-feel lives in `app/globals.css`**. **Behavior lives in `components/` and `lib/`**. Shared chrome wraps every route.

```
app/                 routes (URLs)
content/             words, photos, case studies, testimonials
components/          UI those routes compose
  chrome/            nav, footer, loader, curtain, contact drawer
  home/              landing sections
  about/             about sections
  case-study/        band renderer
  playground/        coverflow
lib/                 theme, music, contact, small hooks
public/              local images, video, audio
docs/                aesthetic + editing map
```

| URL | What you see |
|---|---|
| `/` | Hero → intro → selected work → testimonials → footer |
| `/about` | Bio, polaroids, experience, off-the-grid photos, close |
| `/playground` | Coverflow of smaller experiments |
| `/work/[slug]` | Long-form case study assembled from content bands |

### Home (`/`)

Sticky full-viewport **hero**: scramble headline (`PROGRAMMER WHO` + rolling `design / build / ship / solve`), cassette recorder on a mustard slab, tape-reel ornaments, square day/night knobs. Optional track via `site.audioSrc`.

Then a cream **intro** band (lead + body from `content/site.ts`).

**Selected work:** a skills marquee (`featuredOn`), then a tile grid from `content/projects.ts`. Tiles come in pairs; `wide: true` is the large tile in a row. Covers can be stills or looping video. Each `slug` must exist in `content/case-studies.ts` or the tile 404s.

**Testimonials:** overlapping hardware-plate portrait + quote card. One quote at a time; a pager appears when there is more than one (currently thesis teammates from Project Kensho).

The **footer** is mustard: headline opens the contact drawer, credit line, LinkedIn / GitHub. Same footer on every page.

### About (`/about`)

Heading and three paragraphs from `site.about`, with a stack of polaroids. **Experience** is a dated list (`content/experience.ts`). **Off the grid** is three photo cards (`funFacts`). A closing card repeats the “work with me” cue.

### Playground (`/playground`)

A 3D-ish coverflow of weekend studies (`content/playground.ts`). Arrow keys, click to lightbox. These do not need a case study.

### Case studies (`/work/[slug]`)

A study is a `slug`, `title`, `accent`, optional `repo` (renders **Repo · GitHub** on the hero), and a `bands` array. Band types: `hero`, `panel`, `quote`, `gallery`, `logoband`, `closing`, `readnext`. Sequence is per study, not a fixed template. Renderer: `components/case-study/CaseStudyView.tsx`.

### Chrome (every page)

- Sticky **nav** that compactifies on scroll: Work / About / Playground, “Work with me”, music wave, day/night toggle
- First-load **tape loader**, **route curtain** between pages, scramble on the hero line
- **Contact drawer** (name, email, brief) from the nav button or footer headline
- Theme persisted; grain overlay on `body`; hard 2px ink borders and offset shadows — hardware, not glass

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion. Fonts via `next/font`: **Barlow Condensed** (display), **Archivo** (body), **Libre Bodoni** (slogans / quotes), **IBM Plex Mono** (spec labels).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Node 20+.

| Command | What it does |
|---|---|
| `npm run dev` | Local server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
