# O-52 – App #1 (Website Hub)

Upgrades included:
- Repo/project name aligned to **O-52**
- Interactive background (canvas particles + constellations)
- Seeded **weeks 1–10** with placeholders
- **Unlock animation** highlights the most recently unlocked tile
- **Confetti on click** when opening an unlocked app tile
- **Ritual (Lite)** with **Zen Mode** (keyboard-only: Space start/pause, N/→ next, R reset)

## Quickstart
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Content model
Apps live under `apps/app-XX/` with:
- `meta.json` (slug, title, week, emoji, date, screenshot, codeUrl, blogUrl)
- `post.md` (markdown content)

Auto-discovered at build time via Vite `import.meta.glob`.

## Weekly unlock logic
Set the start date in `src/utils/unlock.ts`:
```ts
const START_DATE_ISO = '2025-09-01'
```
Unlocked = weeks since start (min 1, max 52). Demo override: `?unlock=10`.

## Subscribe (CSV)
Emails are stored locally in the browser. Click **Export subscribers.csv** to download and upload to your newsletter tool.

## GitHub Pages Deploy
1) Push this repo to GitHub as **O-52** (or any name).  
2) Included GitHub Action builds on push to `main` and deploys to `gh-pages`.  
3) In GitHub → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **gh-pages**.

### Vite base path
`vite.config.ts` auto-sets the base using `GITHUB_REPOSITORY` in Actions. If the repo is `username.github.io`, base is `/`; otherwise `/<repo>/`.

## Theming
- Home → Cats
- Apps & Map → Space
- Ritual & Archive → Data
