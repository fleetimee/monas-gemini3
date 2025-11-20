# Monas Museum Web
A cinematic Next.js (App Router) experience for the National Monument of Indonesia. Built with Tailwind CSS v4, Framer Motion, Lenis smooth scrolling, Leaflet for mapping, and theme transitions.

## Prerequisites
- Node.js 18.18+ (Next.js 16 requirement)
- npm (uses lockfile)

## Install & Run
```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # ESLint (must be clean)
npm run build     # production build
```

## Project Structure
- `app/` — layouts, global styles (`globals.css`), home page.
- `components/` — `layout/` shell, `home/` sections, `ui/` widgets (theme toggle, booking modal, map), `theme-provider.tsx` wrappers.
- `lib/utils.ts` — small helpers.
- `public/` — static assets (hero/timeline imagery, Leaflet markers in `public/leaflet/`).

## Notable Behaviors
- Theme switching uses `ThemeTransitionProvider` for animated cover/reveal.
- Smooth scroll is optional (Lenis) and currently not enabled globally.
- Booking modal is shared via `BookingModalProvider`; open from Navbar and Visit sections.
- Leaflet map uses local marker assets for CSP/offline safety.

## Accessibility & QA Checklist
- Keyboard: tab to Navbar menu, theme toggle, booking buttons; Escape closes modal.
- Mobile: timeline stacks vertically; verify on ≤640px widths.
- Visual: confirm dark/light theme contrast, hover states, and reduced motion if applicable.
- Map: tiles load and marker renders with local icons; no external icon fetches.

## Dependencies
- `next 16`, `react 19`, `framer-motion`, `lenis`, `leaflet`/`react-leaflet`, `next-themes`, `lucide-react`, `tailwindcss@^4`.
