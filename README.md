# Abdullah Al Alamin — Cinematic Portfolio

> *Legacy is Greater Than Currency.*

A world-class personal portfolio for **Abdullah Al Alamin** — Group CMO at Betopia Group and doctoral researcher in AI at Carnegie Mellon. Built like a film and engineered like a brand system: GSAP scroll choreography, horizontal-pinned Journey timeline, scroll-spy navigation, and WCAG 2.1 AAA accessibility across every breakpoint.

> Latest refactor: [cb82ba0](https://github.com/nibir404/portfolio-CMO/commit/cb82ba0) — restructure sections + reposition as CMO/AI researcher.

---

## Table of contents

- [Highlights](#highlights)
- [Stack](#stack)
- [Design system](#design-system)
- [Sections](#sections)
- [Project structure](#project-structure)
- [Hooks (src/lib)](#hooks-srclib)
- [Accessibility (WCAG 2.1 AAA)](#accessibility-wcag-21-aaa)
- [Responsive (6 breakpoints)](#responsive-6-breakpoints)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Performance notes](#performance-notes)
- [License](#license)
- [Credits](#credits)

---

## Highlights

- **Horizontal-pinned Journey timeline** — 7 career mandates scroll horizontally as you scroll vertically, GSAP `useHorizontalPin` hook with snap-to-slide, scrub, and image-aware `ScrollTrigger.refresh()`.
- **Cinematic hero** — 4-image crossfading portrait strip with thumbnail plates, GSAP entrance choreography via `useGSAPHero`, parallax on background, magnetic CTA.
- **Animated counters + count-up** — Accomplishments section animates `350%`, `12`, `1,500+`, `14+` from zero on enter.
- **Scroll-spy navigation** — top nav highlights the section currently in view; tone (dark/light) flips based on overlapping `[data-nav-tone]` sections.
- **Strict B&W palette** — pure `#0A0A0A` ink on `#FFFFFF` paper, no greys, no creams, no golds. AAA contrast by construction.
- **Dual theme system** — Dark (default, 21:1 contrast) and Light Editorial, persisted in `localStorage` under `theme`, SSR-safe via `data-theme` on `<html>`.
- **Custom typography stack** — Anton (display), Inter (body), Cormorant Garamond (quote), JetBrains Mono (mono) loaded via `next/font`.
- **Reusable GSAP + Lenis motion hooks** — `useGSAPHero`, `useHorizontalPin`, `useReveal`, `useScrollFx`, `useScrollSpy`, `useSplitText`, `useCountUp`, `useActiveMarker`. All gated behind `prefers-reduced-motion`.

## Stack

| Layer            | Tooling                                                   |
| ---------------- | --------------------------------------------------------- |
| Framework        | **Next.js 14.2.18** (App Router, RSC, TypeScript)          |
| UI               | **React 18.3.1**                                         |
| Animation        | **GSAP 3.12.5** + ScrollTrigger, **Lenis 1.1.18**         |
| Styling          | **Tailwind CSS 3.4.15** + handcrafted `globals.css`      |
| Media            | **next/image** + responsive `sizes`                       |
| Linting          | **ESLint 9** flat config + `eslint-config-next`          |
| Type-checking    | **TypeScript 5.6.3** (strict)                             |
| Deploy target    | **Vercel** (zero env vars required)                       |

## Design system

### Color tokens

Single B&W axis — defined in `tailwind.config.ts`:

| Token     | Hex        | Use                                |
| --------- | ---------- | ---------------------------------- |
| `ink`     | `#0A0A0A`  | Text, borders, glyphs              |
| `paper`   | `#FFFFFF`  | Surface, headlines, grain inversion|

Themed surfaces swap the relationship in light mode via CSS variables (`--ink`, `--paper`, `--ink-soft`, `--line`, `--bg-elev`). No creams, no golds, no greys by design.

### Typography

| Role     | Family              | Loaded via                              |
| -------- | ------------------- | --------------------------------------- |
| Display  | Anton               | `next/font/google` → `--font-display`  |
| Body     | Inter               | `next/font/google` → `--font-body`     |
| Quote    | Cormorant Garamond  | `next/font/google` → `--font-quote`    |
| Mono     | JetBrains Mono      | `next/font/google` → `--font-mono`     |

Fluid sizing uses `clamp()` so headlines scale from mobile to ultrawide without per-breakpoint media queries. Tailwind exposes `text-mega`, `text-hero`, `text-section` shortcuts.

### Motion tokens

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances.
- Marquee: `marquee 30s linear infinite`.
- Slow zoom (hero plates): `slowZoom 20s alternate, infinite`.
- Snap-to-slide (Journey): `power2.inOut`, 0.45s.
- All driven by GSAP timelines gated behind `prefers-reduced-motion: no-preference`.

## Sections

Built in `src/app/page.tsx` as a composition of 10 client sections + Navigation + Footer + SiteInit:

| # | Section           | id           | What it does |
|---|-------------------|--------------|--------------|
| 0 | Navigation        | (top-fixed)  | Tone-tracking nav, scroll-spy, theme toggle, mobile drawer |
| 1 | Hero              | `hero`       | Crossfading 4-image portrait, display headline, scroll cue |
| 2 | About             | `about`      | "Brand Architect at the Intersection of Marketing & AI" framing |
| 3 | Journey           | `journey`    | **Horizontal-pinned** GSAP scroll — 7 mandates, 1 chapter slide + 6 step slides |
| 4 | Accomplishments   | `results`    | Animated count-up stats (350%, 12 units, 1,500+, 14+), parallax break images |
| 5 | Awards            | `awards`     | 12 awards across 3 categories (International / Government / Industry) |
| 6 | Expertise         | `expertise`  | 7 capabilities + engagement/sectors/geography grid |
| 7 | Education         | `education`  | 6 entries incl. PhD CMU + iMBA UIUC, with active-marker dot animation |
| 8 | Media             | `media`      | 3 press tiles, parallax, press-token marquee |
| 9 | BeyondWork        | `beyond`     | AI enthusiast, marathon, scouting, Rotary, community |
|10 | Contact           | `contact`    | Direct channels (already routed in Navigation `Get in touch` CTA) |
|11 | Footer            | (site)       | Legal, social, back-to-top |
|-- | SiteInit          | (client)     | Boot-time client effects (Lenis, reveal observers) |

The Journey section is the signature interaction: a GSAP-pinned horizontal scroll through 7 career chapters with snap-to-slide, a progress counter (`01 / 07`), and a mobile vertical fallback for screens under 1024px.

## Project structure

```
.
├── public/
│   └── images/                 # static assets served at /
├── src/
│   ├── app/
│   │   ├── globals.css         # design system: tokens, themes, grain, skip link
│   │   ├── layout.tsx          # html shell, metadata, viewport, JSON-LD, providers
│   │   └── page.tsx            # composition root (sections + Footer + SiteInit)
│   ├── components/             # 14 React components (10 sections + 4 chrome)
│   │   ├── About.tsx
│   │   ├── Accomplishments.tsx
│   │   ├── Awards.tsx
│   │   ├── BeyondWork.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Expertise.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Journey.tsx
│   │   ├── Media.tsx
│   │   ├── Navigation.tsx
│   │   ├── SiteInit.tsx
│   │   └── ThemeProvider.tsx
│   └── lib/                    # 8 reusable motion + ui hooks
│       ├── useGSAPHero.ts
│       ├── useHorizontalPin.ts
│       ├── useReveal.ts
│       ├── useScrollFx.ts
│       ├── useScrollSpy.ts
│       ├── useSplitText.ts
│       ├── useCountUp.ts
│       └── useActiveMarker.ts
├── .editorconfig
├── .gitignore
├── .nvmrc                      # Node 18.17+
├── abdullah-al-alamin-landing-page-content.md   # content/SEO blueprint
├── eslint.config.mjs           # ESLint 9 flat config
├── LICENSE                     # MIT
├── next.config.mjs             # reactStrictMode
├── package.json
├── postcss.config.mjs          # tailwindcss + autoprefixer
├── README.md
├── tailwind.config.ts          # ink/paper palette, keyframes, font families
└── tsconfig.json               # strict TS, @/* path alias
```

## Hooks (src/lib)

All hooks are client-only, properly tear down GSAP contexts on unmount, and respect `prefers-reduced-motion`.

| Hook                  | Used by           | What it does |
|-----------------------|-------------------|--------------|
| `useGSAPHero`         | Hero              | Crossfade portraits, parallax portrait, split-text headline reveal, magnetic CTAs |
| `useHorizontalPin`    | Journey           | Pins a section, translates inner track horizontally based on scroll progress, snap-to-slide, image-aware refresh |
| `useReveal`           | most sections     | Generic ScrollTrigger stagger reveal for `.fx-fade-up` / `.fx-stagger` |
| `useScrollFx`         | (utility)         | Lower-level parallax helper for components that need bespoke scrubbed motion |
| `useScrollSpy`        | Navigation        | Returns the id of the section currently in viewport center |
| `useSplitText`        | (utility)         | Splits text nodes into spans/words for char-anim entrance (powered by `gsap.SplitText` fallback) |
| `useCountUp`          | Accomplishments   | Animates a numeric node from 0 to target value on enter |
| `useActiveMarker`     | Education         | Highlights the active `.edu-row` dot based on scroll position |

## Accessibility (WCAG 2.1 AAA)

- **Skip-to-content link** as the first focusable element on every page.
- **Semantic landmarks** — `<header>`, `<main id="main">`, `<nav aria-label="Primary">`, `<section aria-labelledby>`, `<footer>`.
- **ARIA** — `aria-pressed` on the theme toggle, `aria-expanded` on the mobile drawer, `aria-label` on icon-only buttons, `aria-hidden` on decorative grain/marquee/dot indicators.
- **Motion** — `@media (prefers-reduced-motion: reduce)` disables GSAP timelines, Lenis smooth-scroll, and all scrubbed animations globally.
- **Focus** — 3px `focus-visible` outlines on every interactive element, never removed.
- **Contrast** — strict B&W guarantees AAA contrast for primary text in both themes.
- **Keyboard** — all interactions reachable and operable without a pointer; theme toggle, drawer, and Journey pins all have non-pointer paths.

## Responsive (6 breakpoints)

| Breakpoint      | Range                | Notes                                |
| --------------- | -------------------- | ------------------------------------ |
| Mobile          | `<640px`             | Single column, journey vertical fallback |
| Large mobile    | `640–767px`          | Slightly tighter spacing             |
| Tablet          | `768–1023px`         | Two-column layouts engage, journey still vertical |
| Laptop          | `1024–1279px`        | Journey switches to horizontal-pinned, full nav |
| Desktop         | `1280–1535px`        | Display type scales up               |
| Wide / Ultrawide| `≥1536px`            | Hero plates fill viewport            |

Typography scales fluidly via `clamp()`, so most layouts don't need per-breakpoint overrides.

## Getting started

### Prerequisites

- **Node.js ≥ 18.17** (any modern LTS — `.nvmrc` is a hint, not a strict pin)
- **npm 9+** (or pnpm/yarn — examples use npm)

### Install & run

```bash
git clone https://github.com/nibir404/portfolio-CMO.git
cd portfolio-CMO
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                                       |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start the dev server on port 3000 with HMR         |
| `npm run build` | Production build (`.next/`)                        |
| `npm start`     | Serve the production build                         |
| `npm run lint`  | Run ESLint (flat config)                           |

## Deployment

**Vercel** (recommended):

1. Push to GitHub (already done).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. No environment variables are required.
4. Vercel auto-detects Next.js and uses `npm run build`.

**Other hosts** — any platform that supports Next.js 14 with the Node runtime:

- Netlify (`@netlify/plugin-nextjs`)
- Cloudflare Pages (with the Next.js adapter)
- Self-hosted (`npm run build && npm start` behind a reverse proxy)

## Configuration

- **Theme default** — set in `src/components/ThemeProvider.tsx`. Dark is default; users can override.
- **Journey pins** — `useHorizontalPin` accepts `{ scrub, snap, speed, start, anticipatePin }` options per usage.
- **Reveal hook** — `src/lib/useReveal.ts` accepts `{ selector, stagger, y, duration }` options per usage.

## Performance notes

- **Static-first** — every section is a server component unless it needs browser APIs (Hero, Journey, Accomplishments, Awards, Expertise, Education, Media, BeyondWork, Navigation, SiteInit, ThemeProvider are `"use client"`).
- **Code splitting** — components are client-side only where required; `layout.tsx` and most markup stay on the server.
- **Image optimization** — `next/image` with explicit `sizes` on every plate.
- **No heavy 3D libs** — keeps the bundle small (no `three`, `ogl`, or `motion` runtime).
- **Lenis** — passive smooth-scroll, ~3 KB gzipped.

## License

[MIT](./LICENSE) © 2025 Abdullah Al Alamin.

## Credits

- Typography: **Anton**, **Inter**, **Cormorant Garamond**, **JetBrains Mono** (Google Fonts via `next/font`).
- Animation: **GSAP** & **ScrollTrigger** (GreenSock).
- Smooth scroll: **Lenis**.
- Icons & glyphs: handcrafted SVG, no icon-pack dependencies.

---

*Built with care as a digital monument to a life of building, not buying.*
