# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a Next.js app (TypeScript) bootstrapped with `create-next-app`.
- Main app code is in `src/app/`.
- Static assets are in `public/`.
- Configuration files: `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`.

## Developer Workflows
- **Start dev server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Edit main page:** `src/app/page.tsx` (auto-updates on save)
- **Global styles:** `src/app/globals.css`
- **Favicon:** `src/app/favicon.ico`
- **Font optimization:** Uses `next/font` for [Geist](https://vercel.com/font).

## Patterns & Conventions
- Uses Next.js App Router (see `src/app/layout.tsx` for root layout).
- Pages/components are colocated in `src/app/`.
- TypeScript is enforced via `tsconfig.json`.
- ESLint config is in `eslint.config.mjs` (check for custom rules).
- PostCSS config is in `postcss.config.mjs`.
- No custom API routes or backend logic present by default.

## External Integrations
- No custom integrations detected; default Next.js setup.
- Deployment: Vercel recommended (see README).

## Example: Adding a New Page
1. Create a new folder in `src/app/` (e.g., `about/`).
2. Add a `page.tsx` file inside it.
3. Access at `/about` in the browser.

## Key Files
- `src/app/page.tsx`: Main landing page
- `src/app/layout.tsx`: App-wide layout
- `src/app/globals.css`: Global styles
- `public/`: Static assets
- `next.config.ts`: Next.js config

## Tips for AI Agents
- Follow Next.js file-based routing conventions.
- Use TypeScript for all new code.
- Reference `README.md` for dev and deployment commands.
- Check config files for project-specific settings before changing build or lint workflows.

---
_If any conventions or workflows are unclear, ask the user for clarification or examples from their codebase._
