# Portfolio template

Cassette-futurist catalog skin on a structured Next.js portfolio: sticky hero, hardware nav, work tiles, testimonials, about, playground, and data-driven case studies.

Structure and motion come from the original template. The visual language is late-70s / early-80s Japanese electronics print — cream paper, mustard slabs, safety orange, condensed grotesque type, spec-sheet labels, print grain.

## Run

```bash
npm install
npm run dev
```

## Customize

All visitor-facing copy lives in `/content`:

| File | What it controls |
|---|---|
| `content/site.ts` | Name, role, location, intro, footer, contact, socials, avatar |
| `content/projects.ts` | Home work tiles (`wide` / `narrow`) and slugs |
| `content/testimonials.ts` | Carousel quotes |
| `content/experience.ts` | About timeline + fun-fact photos |
| `content/playground.ts` | Coverflow experiments |
| `content/case-studies.ts` | Band arrays for `/work/[slug]` |

Add a case study by appending a `CaseStudy` object to `caseStudies` and a matching tile in `projects.ts`. Bands are `hero`, `panel`, `quote`, `gallery`, `logoband`, `closing`, `readnext`.

Drop an audio file URL into `site.audioSrc` to drive the cassette player and nav wave.

## Theme

Day/night is stored in `localStorage` under `theme`. Tokens live in `app/globals.css`: cream paper + mustard + safety orange in day; warm charcoal workshop at night. Semantic roles (`--bg-base`, `--hero-from`, …) flip under `[data-theme="night"]`.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, `next/font` (Barlow Condensed, Archivo, Libre Bodoni, IBM Plex Mono).
