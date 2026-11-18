# Childhood Development Centre — Consultancy Brain (Phase 1)

AI Consultancy Brain for planning, feasibility modelling, and establishing a
specialized pediatric intervention and neurodevelopmental therapy centre in
Lahore, Pakistan.

## Structure

```
index.html      — dashboard shell (Stitch design, unchanged layout)
css/style.css   — base styles
js/app.js       — live chat, module data, feasibility calculator
DESIGN.md       — Stitch design system (colours, type, spacing)
screen.png      — reference screenshot of the Stitch design
build.py        — regenerates index.html from the Stitch export (code.html)
```

## How it works

- **Chat (Home)** — talks to the live AI through the n8n webhook
  (`https://n8n.urdubazars.com/webhook/consultancy-demo-chat`, Groq
  `openai/gpt-oss-20b`). Replies in ~7 seconds. On failure it shows an
  honest connection error — never a fake reply.
- **Market Research** — verified Lahore indicators (18 Nov 2026), ECDI by
  province, Pakistan context. No Lahore market-size figure is invented.
- **Competitors** — 10 mapped Lahore centres with services, fees and
  verification badges (Confirmed / Directory / To verify / News report).
- **Feasibility** — working calculator (Lean / Standard / Package presets,
  sliders). Revenue uses the exact product; rent is a placeholder.
- **Location** — 6 Lahore areas with verdicts; Johar Town recommended first.
- **Services** — 12-service blueprint with the clinical boundary.
- **Reports** — revenue lines and the full source list.

## Data rules

- Every figure carries its verification badge. To-verify figures are never
  shown as confirmed prices.
- No personal data, no agency branding, no "At a glance" table.
- Research date: 18 Nov 2026. Sources are public websites / directories
  only — no site visits, calls, or review-mining yet.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy

Static files only — host on any static host (GitHub Pages, or the project
server's storefront folder). The chat calls the n8n webhook directly from
the visitor's browser, so the backend stays on the project server.
