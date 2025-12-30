# Repository Guidelines

## Project Structure & Module Organization
- `src/app` houses Next.js App Router routes (`page.tsx`, `layout.tsx`) and route segments.
- `src/components` contains shared UI components (client/server as needed).
- `src/content` stores Markdown articles and long-form copy.
- `src/data` holds JSON/TS content data used across pages.
- `src/lib` provides utilities (for example, YouTube integration).
- `src/hooks` contains custom React hooks.
- `src/fonts` keeps local font files.
- `public` is for static assets (images, icons).

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server with Turbopack.
- `npm run build`: create the production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run Next.js ESLint checks.

## Coding Style & Naming Conventions
- TypeScript + React with strict compiler settings.
- Two-space indentation; prefer functional components.
- Component files use kebab-case (for example, `contact-form.tsx`); component names are PascalCase.
- Hooks follow the `useX` naming pattern and live in `src/hooks`.
- Use Tailwind CSS utilities; keep class lists readable and grouped by purpose.
- Import via the `@/` alias for `src` paths (for example, `@/components/...`).

## Testing Guidelines
- No automated test framework is configured; linting is the current quality gate.
- If you introduce tests, add an npm script and co-locate files (for example, `feature.test.tsx`).

## Commit & Pull Request Guidelines
- Commit messages are short and descriptive, usually imperative (for example, `fix typo`, `update pricing and schedule`); there is no strict conventional-commit format.
- PRs should include a concise summary, manual testing notes, and screenshots or screen recordings for UI changes. Link related issues when applicable.

## Configuration & Secrets
- YouTube integration reads `YOUTUBE_API_KEY` and `YOUTUBE_CHANNEL_ID` (see `src/lib/youtube.ts`); set these in `.env.local` for local development.
- Do not commit secrets; use deployment environment variables instead.
