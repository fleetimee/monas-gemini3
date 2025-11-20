# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry (layouts, global styles in `globals.css`, main page at `page.tsx`).
- `components/`: Reusable React components; `layout/` for shell pieces, `home/` for page sections, `ui/` for widgets like `ThemeToggle` and `BookingModal`.
- `lib/utils.ts`: Small shared helpers (class merging, etc.).
- `public/`: Static assets (timeline images, hero imagery). Place new static files here and reference via `/path`.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server at http://localhost:3000 with hot reload.
- `npm run build`: Production build. Fix warnings before opening a PR.
- `npm run start`: Serve the production build locally; use to verify before deploying.
- `npm run lint`: ESLint (config in `eslint.config.mjs`); must be clean prior to merge.

## Coding Style & Naming Conventions
- Language: TypeScript + React Server/Client Components. Use `"use client"` only where hooks/DOM APIs are required.
- Components/files: PascalCase for React components (`Navbar.tsx`), camelCase for utilities, kebab-case for assets.
- Styling: Tailwind CSS v4; prefer utility classes over custom CSS. Keep responsive and motion classes close to the JSX they affect.
- Imports: Use path alias `@/` (configured in `tsconfig.json`) instead of deep relative paths when crossing directories.
- Formatting: 2-space indentation, trailing commas where valid; let your editor follow ESLint/TypeScript defaults.

## Testing Guidelines
- No automated suite is present yet; add tests alongside files (`Component.spec.tsx`) or under `__tests__/` when introducing logic.
- Favor React Testing Library for UI behavior and Playwright for critical flows. Keep fixtures lean and snapshots small.
- Before shipping UI changes, exercise key interactions locally (nav toggle, booking modal, map) and note results in the PR description.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). Past commits use this pattern—keep scopes short and imperative.
- PRs should include: summary of changes, screenshots/recordings for UI updates, steps to validate (commands run), and linked issue/ticket when available.
- Ensure `npm run lint` and `npm run build` pass before requesting review; highlight any known gaps or follow-up tasks.

## Security & Configuration Tips
- Keep secrets in `.env.local`; only expose client-safe values via `NEXT_PUBLIC_*`. Do not commit env files.
- Static assets and map data belong in `public/`; avoid remote hotlinks unless they permit reuse.
- Review bundle impact of new dependencies; prefer lightweight packages and native browser APIs where possible.
