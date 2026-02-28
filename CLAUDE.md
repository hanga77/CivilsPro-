# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PI-CONSTRUCTION BTP SARL company website — monorepo with a React SPA frontend (`client/`) and an Express + MongoDB backend (`server/`, Phase 2). UI content is primarily in French. Includes Gemini AI integration.

## Monorepo Structure

```
CivilsPro-/
├── client/          → React frontend (Vite)
│   ├── src/
│   │   ├── components/{layout,admin,ui,home,...}
│   │   ├── services/  → geminiService.ts
│   │   ├── types/     → index.ts (all TS interfaces/enums)
│   │   ├── lib/       → constants.tsx (initial data, colors)
│   │   ├── context/   → (Phase 3)
│   │   ├── hooks/     → (Phase 3)
│   │   ├── pages/     → (Phase 3)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/          → Express backend (Phase 2, placeholder)
│   ├── src/{config,models,routes,controllers,middleware,seed}
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Commands

- `cd client && npm run dev` — Start dev server on localhost:3000
- `cd client && npm run build` — Production build via Vite
- `cd client && npm run preview` — Serve production build locally
- No test framework is configured

## Architecture

**Tech stack:** React 18 + TypeScript, Vite, Tailwind CSS (CDN), FontAwesome (CDN).

**Routing:** Tab-based navigation via `activeTab` state in App.tsx (home, expertise, projects, rentals, contact, admin). No router library.

**State management:** All application state lives in App.tsx using useState hooks and is passed down as props. No persistence layer — data resets on page refresh.

**Key files (client):**
- `client/src/App.tsx` — Main component containing all page/tab rendering logic and state
- `client/src/components/layout/Layout.tsx` — Header, navigation, mobile menu, footer (config-driven)
- `client/src/components/admin/AdminDashboard.tsx` — Admin panel with CRUD for projects, industries, rentals, messages, site config
- `client/src/services/geminiService.ts` — Gemini AI integration (model: gemini-3-flash-preview)
- `client/src/types/index.ts` — All TypeScript interfaces and enums (Project, RentalItem, SiteConfig, etc.)
- `client/src/lib/constants.tsx` — Initial data (projects, industries) and color palette constants

**Color scheme:** Navy primary (#001E42), Gold accent (#FFB81C). Defined in `constants.tsx` COLORS object.

**Admin auth:** Hardcoded credentials gated by login state in App.tsx.

## Environment

Requires `GEMINI_API_KEY` set in `client/.env.local` for AI features. Vite exposes env vars via `import.meta.env`.

## Path Aliases

`@/` maps to `client/src/` (configured in both `client/vite.config.ts` and `client/tsconfig.json`).
