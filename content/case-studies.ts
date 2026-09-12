export type BandTone = "cream" | "dark";

export type Band =
  | {
      type: "hero";
      tone: BandTone;
      kicker?: string;
      title: string;
      italic?: string;
      body: string;
      role: string;
      client: string;
      year: string;
      image: string;
      alt?: string;
    }
  | {
      type: "panel";
      tone: BandTone;
      number?: string;
      eyebrow?: string;
      heading: string;
      italic?: string;
      body: string;
      image?: string;
      alt?: string;
      note?: { label: string; items: string[] };
    }
  | {
      type: "quote";
      tone: BandTone;
      quote: string;
      attribution?: string;
    }
  | {
      type: "gallery";
      tone: BandTone;
      heading?: string;
      images: string[];
      imageAlts?: string[];
    }
  | {
      type: "logoband";
      tone: BandTone;
      label: string;
      logos: string[];
    }
  | {
      type: "closing";
      tone: BandTone;
      heading: string;
      italic?: string;
      body: string;
    }
  | {
      type: "readnext";
      slug: string;
    };

export type CaseStudy = {
  slug: string;
  title: string;
  accent: "coral" | "gold" | "slate";
  repo?: string;
  bands: Band[];
};

export const tinigTuro: CaseStudy = {
  slug: "tinig-turo",
  title: "Tinig-Turo",
  accent: "coral",
  repo: "https://github.com/TadeyRuk/Tinig-Turo",
  bands: [
    {
      type: "hero",
      tone: "cream",
      kicker: "PROJECT KENSHO · THESIS · 2026",
      title: "Tinig-Turo",
      italic: "hears the world in real time",
      body: "An Android app for Deaf and Hard-of-Hearing users that names a sound and points to where it’s coming from. The whole pipeline runs on-device — no server, no cloud.",
      role: "Software Engineer",
      client: "FEU Institute of Technology",
      year: "2026",
      image: "/work/tinig-turo-hero.jpg",
      alt: "Tinig-Turo home screen showing the sound radar and detected sound label.",
    },
    {
      type: "panel",
      tone: "cream",
      number: "01",
      eyebrow: "THE PROBLEM",
      heading: "A label without a direction",
      italic: "still leaves you scanning the room",
      body: "Sirens, alarms, traffic, a knock at the door — environmental sound is spatial. Most classifiers stop at a name. Tinig-Turo had to answer what and where, stay fully offline, and keep every cue visual so the interface never depends on hearing.",
      note: {
        label: "In the repo",
        items: [
          "Flutter app + Kotlin stereo capture",
          "GCC-PHAT localization (TDOA)",
          "YAMNet TFLite, 521 classes",
          "On-device isolate pipeline",
        ],
      },
    },
    {
      type: "quote",
      tone: "cream",
      quote: "The pipeline names the sound and points to it — on the phone, with no server in the loop.",
    },
    {
      type: "panel",
      tone: "dark",
      number: "02",
      eyebrow: "THE PIPELINE",
      heading: "Two algorithms,",
      italic: "one isolate, zero network",
      body: "Kotlin AudioRecord pulls raw UNPROCESSED stereo PCM. GCC-PHAT estimates direction from mic-pair TDOA. YAMNet classifies a one-second buffer. A fusion engine stamps priority, confidence, and a needs-attention flag. DSP stays off the UI thread so the radar can hold 120 Hz.",
      image: "/work/tinig-turo-01.jpg",
      alt: "Tinig-Turo detection screen with directional radar pointing at an active sound source.",
    },
    {
      type: "gallery",
      tone: "dark",
      heading: "Detection, settings, sound classes",
      images: [
        "/work/tinig-turo-01.jpg",
        "/work/tinig-turo-02.jpg",
        "/work/tinig-turo-03.jpg",
      ],
      imageAlts: [
        "Tinig-Turo detection screen with directional radar pointing at an active sound source.",
        "Tinig-Turo settings screen listing sound classes and alert priorities.",
        "Tinig-Turo sound class picker with search and category list.",
      ],
    },
    {
      type: "panel",
      tone: "cream",
      number: "03",
      eyebrow: "THE PRODUCT",
      heading: "Alerts that work",
      italic: "when you can’t hear them",
      body: "Five priority levels. Critical sounds get visual plus haptic. A background daemon keeps classification running when the app is away. Dark mode, colorblind mode, large targets, and a radar that degrades to “direction uncertain” instead of guessing.",
    },
    {
      type: "logoband",
      tone: "cream",
      label: "In the stack",
      logos: ["Flutter", "Kotlin", "TFLite", "YAMNet", "GCC-PHAT"],
    },
    {
      type: "closing",
      tone: "cream",
      heading: "Shipped.",
      italic: "Best Thesis, FEU Tech CS Expo",
      body: "Recognized as Best Thesis at the FEU Tech CS Expo and Top 3 Best Poster at the Student Research Colloquium 2026. Source, pipeline, and app live in the Tinig-Turo repository.",
    },
    { type: "readnext", slug: "commutenity" },
  ],
};

export const commuteNity: CaseStudy = {
  slug: "commutenity",
  title: "CommuteNity",
  accent: "coral",
  repo: "https://github.com/geadlydrim/CommuteNity-Web",
  bands: [
    {
      type: "hero",
      tone: "cream",
      kicker: "WEB APP · PH TRANSIT · 2026",
      title: "CommuteNity",
      italic: "routes that live in riders’ heads",
      body: "Community-driven commute navigation for the Philippines. Ask how to get from A to B, pin the path on OpenStreetMap, and let people who actually ride the jeepney fill in the stops and fares.",
      role: "Software Engineer",
      client: "Independent",
      year: "2026",
      image: "/work/commutenity-hero.png?v=2",
      alt: "CommuteNity landing page showing the commute feed and a pinned OpenStreetMap route.",
    },
    {
      type: "panel",
      tone: "cream",
      number: "01",
      eyebrow: "THE GAP",
      heading: "Informal transit",
      italic: "is missing from the map",
      body: "Google Maps covers highways and MRT. Jeepneys, UV Express, tricycles, and provincial buses live in muscle memory. New arrivals overpay or board the wrong line because there is no shared reference. CommuteNity is that reference — written by riders.",
      note: {
        label: "In the repo",
        items: [
          "Next.js App Router + TypeScript",
          "Supabase auth, Postgres, RLS",
          "MapLibre + OpenStreetMap",
          "Public feed, votes, comments",
        ],
      },
    },
    {
      type: "quote",
      tone: "cream",
      quote: "Jeepneys and UV routes live in riders’ heads. Maps never got the memo.",
    },
    {
      type: "panel",
      tone: "dark",
      number: "02",
      eyebrow: "THE FEED",
      heading: "Ask the route,",
      italic: "pin it, answer it",
      body: "A public feed of commute questions. Each post can carry an ordered pin list — origin, waypoints, destination — rendered as a static map in the feed and an interactive MapLibre view in focus. Replies can attach their own maps. Votes and comments decide which answer to trust.",
      image: "/work/commutenity-post.png?v=2",
      alt: "CommuteNity feed post with an ordered pin list rendered on a map.",
    },
    {
      type: "gallery",
      tone: "dark",
      heading: "Landing, a pinned commute, sign-in",
      images: [
        "/work/commutenity-hero.png?v=2",
        "/work/commutenity-post.png?v=2",
        "/work/commutenity-signin.png?v=2",
      ],
      imageAlts: [
        "CommuteNity landing page showing the commute feed and a pinned OpenStreetMap route.",
        "CommuteNity feed post with an ordered pin list rendered on a map.",
        "CommuteNity sign-in screen with email and Google OAuth options.",
      ],
    },
    {
      type: "panel",
      tone: "cream",
      number: "03",
      eyebrow: "THE STACK",
      heading: "Supabase for the community.",
      italic: "Maps stay free",
      body: "Email plus Google OAuth through Supabase SSR cookies. Postgres with RLS so anyone can read and only authors write. Map tiles are OpenStreetMap — no paid map SDK. Dexie caches recently viewed routes for offline browsing; next-pwa makes the app installable.",
      image: "/work/commutenity-signin.png?v=2",
      alt: "CommuteNity sign-in screen with email and Google OAuth options.",
    },
    {
      type: "logoband",
      tone: "cream",
      label: "In the stack",
      logos: ["Next.js", "Supabase", "MapLibre", "PostGIS", "PWA"],
    },
    {
      type: "closing",
      tone: "cream",
      heading: "Built for riders.",
      italic: "Jeepney Gold on the web",
      body: "Source lives in CommuteNity-Web. The product docs still call for full route search and community moderation; the live surface is the feed, the maps, and the accounts that make contribution possible.",
    },
    { type: "readnext", slug: "stellar4" },
  ],
};

export const stellar4: CaseStudy = {
  slug: "stellar4",
  title: "Stellar4",
  accent: "gold",
  repo: "https://github.com/geadlydrim/stellar-payment-dapp",
  bands: [
    {
      type: "hero",
      tone: "cream",
      kicker: "DAPP · STELLAR TESTNET · 2026",
      title: "Stellar4",
      italic: "play it, then trade it",
      body: "A Next.js game plus NFT marketplace on Stellar. Spin, equip, and fight in Play — then export an item as an NFT and list it on Marketplace as a fixed-price sale, auction, or offer-board trade.",
      role: "Software Engineer",
      client: "Independent",
      year: "2026",
      image: "/work/stellar4-hero.png",
      alt: "Stellar4 landing screen with Play and Marketplace entry points.",
    },
    {
      type: "panel",
      tone: "cream",
      number: "01",
      eyebrow: "THE RULE",
      heading: "In-game or NFT.",
      italic: "Never both at once",
      body: "An item is usable in Play or tradable as an NFT — not both. Export locks it, self-mints on-chain, and lists. Cancel or settle burns or redeems it back into inventory. The game never imports Stellar SDKs; Registry is the inventory truth.",
      note: {
        label: "In the repo",
        items: [
          "Next.js 14 + TypeScript + Tailwind",
          "Four Soroban crates (Rust)",
          "Mock vs stellar adapters",
          "GitHub Actions CI on main",
        ],
      },
    },
    {
      type: "quote",
      tone: "cream",
      quote: "One game, one market. An item is in play or on-chain — never both.",
    },
    {
      type: "panel",
      tone: "dark",
      number: "02",
      eyebrow: "THE CONTRACTS",
      heading: "Four crates,",
      italic: "one settlement path",
      body: "item-nft handles mint, burn, transfer, and player self-mint. Auction escrows XLM then settles the NFT. Fixed-price and offer-board escrow the token, then call item-nft.transfer. Marketplace reloads listings after each action; Auction polls listActive every five seconds.",
      image: "/work/stellar4-play.png",
      alt: "Stellar4 Play screen showing inventory items available to equip or export.",
    },
    {
      type: "gallery",
      tone: "dark",
      heading: "Landing, play, marketplace",
      images: [
        "/work/stellar4-hero.png",
        "/work/stellar4-play.png",
        "/work/stellar4-market.png",
      ],
      imageAlts: [
        "Stellar4 landing screen with Play and Marketplace entry points.",
        "Stellar4 Play screen showing inventory items available to equip or export.",
        "Stellar4 Marketplace screen listing NFT items for sale, auction, and offer.",
      ],
    },
    {
      type: "panel",
      tone: "cream",
      number: "03",
      eyebrow: "THE SHAPE",
      heading: "Ports, adapters,",
      italic: "and a green CI line",
      body: "Local default is mock adapters — no contract IDs required. Point NEXT_PUBLIC_MARKET_ADAPTER at stellar plus four C… IDs for testnet. Frontend tests cover registry, adapters, identity, and errors. Contracts run cargo test. GitHub Actions gates lint, typecheck, build, and both test suites.",
      image: "/work/stellar4-ci.png",
      alt: "Stellar4 GitHub Actions CI run showing lint, typecheck, build, and test jobs passing.",
    },
    {
      type: "logoband",
      tone: "cream",
      label: "In the stack",
      logos: ["Next.js", "TypeScript", "Soroban", "Rust", "Stellar"],
    },
    {
      type: "closing",
      tone: "cream",
      heading: "Live on testnet.",
      italic: "stellar-4.vercel.app",
      body: "Source, contracts, and CI live in stellar-payment-dapp. The demo is on Stellar testnet — a second funded Freighter wallet is required to buy, bid, or offer. There is no on-chain demo-buy shortcut.",
    },
    { type: "readnext", slug: "tiktok-automate" },
  ],
};

export const tiktokAutomate: CaseStudy = {
  slug: "tiktok-automate",
  title: "TikTok Automate",
  accent: "slate",
  repo: "https://github.com/geadlydrim/tiktok-automate",
  bands: [
    {
      type: "hero",
      tone: "cream",
      kicker: "RPA · LOCAL TOOLKIT · 2026",
      title: "TikTok Automate",
      italic: "the repetitive parts, gone",
      body: "A local toolkit for operating a batch of TikTok accounts across social-media schedulers. It cuts the busywork of onboarding — credentials, emailed codes, OAuth connect, and uploading the same media set — without a remote backend of its own.",
      role: "Software Engineer",
      client: "TikTok Engagement & Advertising",
      year: "2026",
      image: "/work/tiktok-automate-hero.jpg",
      alt: "TikTok Automate desktop app queue view alongside a browser window mid-automation.",
    },
    {
      type: "panel",
      tone: "cream",
      number: "01",
      eyebrow: "THE SHAPE",
      heading: "Small pieces,",
      italic: "not one app",
      body: "A Tkinter desktop app, five Firefox extensions, and a handful of shell scripts. Nothing phones home. The only listener is a loopback HTTP server on 127.0.0.1:8765 so an extension can hand verification codes to the desktop window.",
      note: {
        label: "In the repo",
        items: [
          "Desktop app: queue, clipboard, codes",
          "Five Manifest V2 Firefox extensions",
          "Multi-profile Firefox launcher",
          "ffmpeg batch for scheduler-safe video",
        ],
      },
    },
    {
      type: "quote",
      tone: "cream",
      quote: "The batch work never leaves the machine: credentials, codes, connect, then publish.",
    },
    {
      type: "panel",
      tone: "dark",
      number: "02",
      eyebrow: "THE RUN",
      heading: "Paste a batch.",
      italic: "The clipboard keeps up",
      body: "Paste accounts into the desktop app. It parses them and feeds the next username, password, or code to the clipboard on each paste. kuku-code-watcher scrapes verification emails and POSTs them to the app. tiktok-connect drives Connect → Authorize → Confirm. Publish goes through VistaSocial in the browser or Buffer via the mass-post runbook.",
      image: "/work/tiktok-automate-01.jpg",
      alt: "TikTok Automate desktop app clipboard queue feeding a browser sign-in form.",
    },
    {
      type: "gallery",
      tone: "dark",
      heading: "The local run",
      images: [
        "/work/tiktok-automate-hero.jpg",
        "/work/tiktok-automate-01.jpg",
        "/work/tiktok-automate-02.jpg",
      ],
      imageAlts: [
        "TikTok Automate desktop app queue view alongside a browser window mid-automation.",
        "TikTok Automate desktop app clipboard queue feeding a browser sign-in form.",
        "TikTok Automate Setup panel for re-picking a broken CSS selector.",
      ],
    },
    {
      type: "panel",
      tone: "cream",
      number: "03",
      eyebrow: "THE CATCH",
      heading: "Selectors break.",
      italic: "Setup is the repair path",
      body: "These extensions automate specific pages by CSS selector, so a redesign will break them. Every extension has a Setup panel for re-picking selectors without touching code. VistaSocial and Buffer are the maintained paths. Meant for accounts you own or are authorised to manage.",
      image: "/work/tiktok-automate-02.jpg",
      alt: "TikTok Automate Setup panel for re-picking a broken CSS selector.",
    },
    {
      type: "logoband",
      tone: "cream",
      label: "In the stack",
      logos: ["Python", "Tkinter", "Firefox", "Bash", "ffmpeg"],
    },
    {
      type: "closing",
      tone: "cream",
      heading: "Local only.",
      italic: "No remote service of its own",
      body: "Source lives in tiktok-automate. Linux-first, developed on Fedora. Keep real account data out of the repo — input.txt is git-ignored on purpose.",
    },
    { type: "readnext", slug: "tinig-turo" },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  "tinig-turo": tinigTuro,
  commutenity: commuteNity,
  stellar4,
  "tiktok-automate": tiktokAutomate,
};

export function getCaseStudy(slug: string) {
  return caseStudies[slug];
}

export function allCaseStudySlugs() {
  return Object.keys(caseStudies);
}
