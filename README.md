<h1 align="center">Velcora AI</h1>

<div align="center">
  Autonomous web scraper, data-intelligence studio, workflow-automation builder, and a deep-focus suite — in one cinematic workspace.
</div>

---

## What it is

Velcora AI is a web application that helps founders, analysts, and ops teams turn the open web and raw data into structured, actionable intelligence — fast. It pairs a cinematic single-page workspace with a Gemini-powered backend that scrapes, parses, and transforms information on demand.

## Who it's for

- Founders and agencies doing market, competitor, or lead research
- Analysts who need clean, structured data pulled from messy web pages
- Ops teams automating repeatable extract → transform → dispatch workflows
- Anyone who wants a focused, distraction-free work environment with ambient sound

## What it does

- **Scraper Studio** — paste any public URL and get a structured JSON extract (title, summary, key metrics, items, sentiment, confidence) powered by Google Gemini. This is the live, working feature.
- **Data Engine** — paste raw text/data and have Gemini clean, normalize, and reformat it.
- **Automation Builder** — design visual extract → AI → dispatch workflows (UI demo; backend wiring is the next step).
- **Focus Station** — Pomodoro timer with a task queue and procedural ambient sound (no audio files needed).
- **Pricing & Checkout** — plan selector with a demo checkout. Live payments activate when Stripe is connected (no card is charged in this preview).
- **Community Recipes** — one-click load sample scrape targets into the Studio.

## Tech

- Vite + React 19 + TypeScript frontend
- Express backend (`server.ts`) hosting the API and serving the built app
- Google Gemini (`gemini-3.7-flash`, a current GA model) via `@google/genai`

## Quick start (local)

```bash
npm install
# add your key to a .env file (see .env.example): GEMINI_API_KEY=your_key_here
npm run dev
```

The app runs at http://localhost:3000.

## Deploy (Railway / Render / Fly)

This is a persistent Node server (it calls `app.listen`), so it needs a long-lived host — **not** Vercel serverless.

1. Build:
   ```bash
   npm run build
   ```
2. Set environment variables on the host:
   - `GEMINI_API_KEY` — your Gemini key
   - `NODE_ENV=production` — serves the built `dist/` (without this it loads dev middleware)
   - `PORT` is injected automatically by the host
3. Start command: `node dist/server.cjs`
4. Health check: `GET /api/health`

## Security notes

- `/api/scrape` and `/api/process-data` are rate-limited per IP and protected against internal/metadata URL fetches (SSRF). For public production use, add authentication and tighten limits.
- The checkout is a demo — no real payment processor is connected. Wire Stripe before accepting live orders.

## Status

High-fidelity marketing prototype: the AI scraper and data engine are real and working; the automation builder and billing are front-end demos awaiting backend wiring.

## Brand

Velcora is an AI automation brand. Logo and name are property of Velcora.

---

<p align="center">Built by Velcora — clarity in a noisy universe.</p>
