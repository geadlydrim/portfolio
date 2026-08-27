# Portfolio

Personal site: a **cassette-futurist** product-design catalog. Analog electronics print (cream paper, mustard slabs, safety orange, condensed type) on a small Next.js app.

Placeholder identity and photos are in `content/` so they can be replaced without a redesign.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
|---|---|
| `npm run dev` | Local server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

Node 20+.

## What’s here

- `/` — hero, intro, selected work, testimonials, contact footer
- `/about` — bio, experience, photos
- `/playground` — experiment coverflow
- `/work/[slug]` — case studies assembled from content bands

## Make it yours

1. Edit [`content/site.ts`](content/site.ts) (name, role, location, email, avatar).
2. Replace tiles and case studies in [`content/projects.ts`](content/projects.ts) and [`content/case-studies.ts`](content/case-studies.ts).
3. Drop images in `public/` or keep remote URLs (see `next.config.ts`).
4. Optional: set `audioSrc` for the cassette player.

Longer walkthrough: **[docs/codebase.md](docs/codebase.md)**.

## Design

The look is locked in **[docs/aesthetic.md](docs/aesthetic.md)** so future work (and new agent sessions) stay on the same catalog language. Images can be refined; the system (tokens, type, hardware chrome, grain) should not drift without an explicit decision.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, `next/font` (Barlow Condensed, Archivo, Libre Bodoni, IBM Plex Mono).
