# Abdullah Al Amin — Cinematic Portfolio

> *Legacy is Greater Than Currency.*

A world-class personal portfolio for **Abdullah Al Amin** — visionary entrepreneur, ecosystem builder, and transformation leader. Built with the precision of a film and the discipline of a brand system: cinematic GSAP choreography, dual-theme design, and WCAG 2.1 AAA accessibility across every breakpoint.

---

## Table of contents

- [Highlights](#highlights)
- [Stack](#stack)
- [Design system](#design-system)
- [Sections](#sections)
- [Project structure](#project-structure)
- [Accessibility (WCAG 2.1 AAA)](#accessibility-wcag-21-aaa)
- [Responsive (6+ breakpoints)](#responsive-6-breakpoints)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Performance notes](#performance-notes)
- [License](#license)
- [Credits](#credits)

---

## Highlights

- **Cinematic motion** — GSAP 3 + ScrollTrigger power the hero reveal, parallax, counters, marquee, and the horizontal Journey timeline. All motion respects `prefers-reduced-motion`.
- **Two production-grade themes** — Dark Luxury (default, `#050505` ink on `#D4AF37` gold, 21:1 contrast) and Light Editorial (`#F5F1E8` paper on `#8B6F1E` warm gold, 17:1 contrast). Theme persists in `localStorage` and follows `prefers-color-scheme` on first visit.
- **Custom cursor** — dot + ring with magnetic CTAs that snap to interactive elements.
- **Custom typography stack** — Bebas Neue (display), Inter (body), Cormorant Garamond (quote) loaded via `next/font`.
- **Film grain** — animated SVG noise overlay, `mix-blend-mode: overlay`, GPU-friendly.
- **Hand-tuned design tokens** — every color, spacing, easing, and font-size lives in `tailwind.config.ts` or `globals.css` for single-source-of-truth theming.

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

### Themes

| Token              | Dark Luxury              | Light Editorial           |
| ------------------ | ------------------------ | ------------------------- |
| Surface (ink/paper)| `#050505`                | `#F5F1E8`                 |
| Accent (gold)      | `#D4AF37`                | `#8B6F1E`                 |
| Contrast           | **21:1** (AAA)           | **17:1** (AAA)            |
| Mood               | Cinema, noir, monument   | Editorial, paper, gallery |

- Persisted via `localStorage` under `theme`.
- SSR-safe — initial render uses system preference, client takes over.
- Toggle is announced with `aria-pressed` for screen readers.

### Typography

| Role     | Family              | Use                                        |
| -------- | ------------------- | ------------------------------------------ |
| Display  | Bebas Neue          | Hero, section headlines, marquee           |
| Body     | Inter               | Paragraphs, UI, navigation                 |
| Quote    | Cormorant Garamond  | Pull-quotes in the Manifesto               |

Fluid sizing uses `clamp()` so headlines scale from mobile to ultrawide without media queries.

### Motion tokens

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances.
- Marquee: 30s linear infinite.
- Slow zoom (hero plates): 20s alternate, infinite.
- All driven by GSAP timelines gated behind `prefers-reduced-motion: no-preference`.

## Sections

Built in `src/app/page.tsx` as a composition of 16 client components:

1. `Navigation` — sticky top nav with theme toggle
2. `Hero` — display headline + portrait plate + scroll cue
3. `Manifesto` — *Legacy is Greater Than Currency* pull-quote
4. `About` — biography and operating philosophy
5. `Stats` — animated counters (years, ventures, lives impacted)
6. `Journey` — horizontal-scroll timeline of milestones
7. `Principles` — expandable cards that open a `role="dialog"` modal
8. `Ventures` — SVG ecosystem of companies and initiatives
9. `Speaking` — keynotes, panels, podcasts
10. `Media` — press features and interviews
11. `Writings` — long-form essays and notes
12. `Personal` — beyond the work
13. `Newsletter` — subscribe form
14. `Contact` — direct channels
15. `Footer` — legal, social, back-to-top
16. `SiteInit` — boot-time client effects (Lenis, reveal observers)

## Project structure

```
.
├── public/
│   └── images/                 # static assets served at /
├── src/
│   ├── app/
│   │   ├── globals.css         # design system: tokens, themes, grain, skip link
│   │   ├── layout.tsx          # html shell, metadata, viewport, providers
│   │   └── page.tsx            # composition root (16 sections)
│   ├── components/             # 17 React components
│   └── lib/
│       └── useReveal.ts        # GSAP + ScrollTrigger + Lenis hook
├── .editorconfig
├── .gitignore
├── .nvmrc                      # Node 20
├── eslint.config.mjs           # ESLint 9 flat config
├── LICENSE                     # MIT
├── next.config.mjs             # image remotePatterns, reactStrictMode
├── package.json
├── postcss.config.mjs          # tailwindcss + autoprefixer
├── README.md
├── tailwind.config.ts          # design tokens, keyframes, fonts
└── tsconfig.json               # strict TS, @/* path alias
```

## Accessibility (WCAG 2.1 AAA)

- **Skip-to-content link** as the first focusable element on every page.
- **Semantic landmarks** — `<header>`, `<main id="main">`, `<nav>`, `<section aria-labelledby>`, `<footer>`.
- **ARIA** — `aria-pressed` on the theme toggle, `aria-expanded` on modal triggers, `role="dialog"` with focus trap on modals, `aria-label` on icon-only buttons.
- **Motion** — `@media (prefers-reduced-motion: reduce)` disables GSAP and Lenis globally.
- **Focus** — 3px `focus-visible` outlines on every interactive element, never removed.
- **Contrast** — documented inline in `globals.css` (21:1 dark, 17:1 light).
- **Keyboard** — all interactions reachable and operable without a pointer.

## Responsive (6 breakpoints)

| Breakpoint      | Range                | Notes                         |
| --------------- | -------------------- | ----------------------------- |
| Mobile          | `<640px`             | Single column, large display  |
| Large mobile    | `640–767px`          | Slightly tighter spacing      |
| Tablet          | `768–1023px`         | Two-column layouts engage     |
| Laptop          | `1024–1279px`        | Full nav, side gutters        |
| Desktop         | `1280–1535px`        | Display type scales up        |
| Wide / Ultrawide| `≥1536px`            | Hero plates fill viewport     |

Typography scales fluidly via `clamp()`, so most layouts don't need per-breakpoint overrides.

## Getting started

### Prerequisites

- **Node.js ≥ 18.17** (recommended: Node 20 via `.nvmrc`)
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

- **Remote images** — `next.config.mjs` whitelists `abdullah-al-alamin.vercel.app` for `next/image`. Add additional hostnames under `images.remotePatterns` if needed.
- **Theme default** — set in `src/components/ThemeProvider.tsx`. Dark Luxury is default; users can override.
- **Cursor** — swap or disable in `src/components/Cursor.tsx`.
- **Reveal hook** — `src/lib/useReveal.ts` accepts `selector`, `stagger`, `y`, `duration` options.

## Performance notes

- **Static-first** — every section is a server component unless it needs browser APIs.
- **Code splitting** — components are client-side only where required; layout, page, and most markup stay on the server.
- **Image optimization** — `next/image` with explicit `sizes` on hero plates.
- **No heavy 3D libs** — keeps the bundle small (no `three`, `ogl`, or `motion` runtime).
- **Lenis** — passive smooth-scroll, ~3 KB gzipped.

## License

[MIT](./LICENSE) © 2025 Abdullah Al Amin.

## Credits

- Typography: **Bebas Neue**, **Inter**, **Cormorant Garamond** (Google Fonts).
- Animation: **GSAP** & **ScrollTrigger** (GreenSock).
- Smooth scroll: **Lenis**.
- Icons & glyphs: handcrafted SVG, no icon-pack dependencies.

---

*Built with care as a digital monument to a life of building, not buying.*