<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo notes

## Commands (bun; see `packageManager` in package.json)
- Install: `bun install`
- Next.js dev: `bun run dev` (port 3000)
- Next.js build (runs typecheck): `bun run build`
- Next.js start: `bun run start`
- Lint: `bun run lint` (`biome check`)
- Format: `bun run format` (`biome format --write`)
- Hono backend dev: `bun run hono` (`bun run --hot src/index.ts`); defaults to port 3000, override with `PORT=...`
- Typecheck only: `bunx tsc --noEmit` (Next may rewrite tsconfig on build)

## Structure
- Next.js Pages Router app lives under `src/pages` (`_app.tsx`, `_document.tsx`, `index.tsx`, `api/hello.ts`).
- Hono backend entrypoint: `src/index.ts`.
- Path aliases: `@/*`, `@/styles/*`, `@/components/*` -> `src/*`.
- Styling: Tailwind v4 via `@import "tailwindcss"` in `src/styles/globals.css`; CSS handled by the turbopack rule in `next.config.ts`.
- React Compiler enabled (`reactCompiler: true` in `next.config.ts`).

## Quirks
- Both dev servers default to port 3000; run one at a time or set `PORT` for the Hono server.
- Hono JSX is not the default: `tsconfig.json` uses React JSX (`jsx: react-jsx`). Use a per-file `/** @jsxImportSource hono/jsx */` pragma for Hono JSX components.
- No test framework or test scripts are configured.
- `lint:eslint` has no ESLint config in the repo; use Biome (`bun run lint`).
- `.env*` is gitignored; no environment variables are documented.
