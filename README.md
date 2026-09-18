<div align="center">

<img src="./public/logoicon.png" alt="Sk Mahir Ashef — monogram" width="72" />

# Sk Mahir Ashef — Portfolio

**AI Engineer & Full-Stack Developer**

*I turn ideas into intelligent software. Because “just make it work” needed an interpreter.*

**Live site:** https://mahirashef12.vercel.app/

</div>

Single-page portfolio that proves ability across AI/ML and modern full-stack — selected work, skills, philosophy, and a one-step path to contact.

## Overview

This is a [Next.js 16](https://nextjs.org/) App Router site (React 19, TypeScript, Tailwind v4). One page composes everything:

`Header / Hero / About / Skills / Projects / News / Contact / Footer`

- **Hero** — availability badge (`Available for Q1–Q4`), poster type, GSAP scroll sequence
- **About** — philosophy + live Quote-of-the-day
- **Skills** — AI/ML (Core) → Full-Stack (Build) → Systems (Foundation) → DevOps (Tooling)
- **Work** — 4 real projects: UniVibe, OuraCode, Carbon Chat, RAG Web (typographic index)
- **Contact** — Google sign-in → message via Resend

> [!NOTE]
> `NewsArticles` renders on desktop only (`useIsDesktop()`, 768px breakpoint, `ssr: false`). This keeps mobile fast and avoids SSR issues.

## Features

- Editorial paper + ink design system (Space Grotesk / system body / JetBrains Mono)
- Animated hero with pinned scroll, magnetic CTAs, island nav
- Live quote (`/api/quote`), tech news proxy (`/api/news`)
- Auth-gated contact form (better-auth Google + Resend)
- Vercel auto-deploy on push to `main`


## Getting started

### Prerequisites

- [Node.js LTS](https://nodejs.org/download/)
- [Git](https://git-scm.com/downloads)

### Run locally

```bash
git clone https://github.com/Mahir-o4/Portfolio.git
cd Portfolio/portfolio
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> [!IMPORTANT]
> Commands run from `portfolio/`, not the workspace root. The git repo and Next.js app both live in `portfolio/`.

## Environment variables

Copy `.env.example` to `.env` and fill these in:

| Variable | Used for |
|---|---|
| `NEWS_API` | newsdata.io key (`/api/news`) |
| `MAIL_API_KEY` | Resend key (`/api/mail`) |
| `GOOGLE_CLIENT_ID` | Google sign-in (better-auth) |
| `GOOGLE_CLIENT_SECRET` | Google sign-in (better-auth) |

> [!WARNING]
> `app/api/news/route.ts` reads `NEWS_API`, but its missing-key error says `NEWSDATA_API_KEY`. Trust `NEWS_API`.
>
> Without keys, `/api/news` returns 500 and `/api/mail` returns 500/401 — the UI falls back to error/empty states.

## Project structure

```text
portfolio/
├── app/            # Routes, layout, single page + api/
│   └── api/        # auth/[...all], mail, news, quote
├── components/     # Sections + UI (Header, Hero, About, Skills, Projects, News, Contact, Footer)
├── hooks/          # useIsDesktop
├── lib/            # auth (server), auth-client
└── public/         # logoicon.png (monogram), myimage.png (portrait)
```

Path alias `@/*` maps to `portfolio/*` — import as `@/components/...`.

## Scripts

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run start  # Serve production build
npm run lint   # ESLint
npx tsc --noEmit  # Typecheck (no script defined)
```

## API routes

| Route | Method | Notes |
|---|---|---|
| `/api/auth/[...all]` | * | better-auth handler (Google) |
| `/api/mail` | POST | Requires Google session, sends via Resend |
| `/api/news` | GET | Proxies newsdata.io, `cache: no-store` |
| `/api/quote` | GET | Proxies ZenQuotes, `revalidate: 43200` |


## Deployment

Deployed on [Vercel](https://vercel.com/). Pushes to `main` deploy automatically — no manual steps.

## License

This project is open source and available under the [MIT License](LICENSE).