# FreeCut, Color & Noise integration branch

FreeCut is the Video environment of Color & Noise, served under `/video` on
the host app's origin. `main` tracks upstream (walterlow/freecut);
`color-and-noise` is the deployed integration branch.

## What differs from upstream

Routing and packaging only. No editor logic is changed.

| Change | Where | Why |
|---|---|---|
| `FREECUT_BASE` builds under a base into `dist/<base>` | `vite.config.ts` | Every asset and route must live under `/video/` for the host to forward it. |
| Router `basepath` | `src/app.tsx` | TanStack Router matches the URL path; it needs the base to match `/video/editor/...`. |
| Base-aware pathname reads | `src/shared/base-path.ts`, `src/main.tsx`, `features/workspace-gate/use-pathname.ts`, `shared/projects/last-editor-project.ts` | Code that reads `window.location.pathname` outside the router must strip the base first. |
| Base-aware hard links | `routes/index.tsx`, `workspace-gate-splash.tsx`, `editor/components/toolbar.tsx`, `project-debug-panel.tsx` | Plain anchors and `location.href` assignments do not go through the router. |
| Service worker scope | `src/main.tsx`, `public/sw.js` | Registered at `<base>sw.js` with that scope; the shell URLs it precaches derive from its own location. |
| `vercel.json` | repo root | `X-Frame-Options: DENY` removed so the host can frame it same-origin; SPA fallback and cache headers under `/video/*`; `/` redirects to `/video/`. |

A root deployment (no `FREECUT_BASE`) behaves exactly as upstream.

## Updating from upstream

```sh
git fetch upstream
git merge upstream/main
```
