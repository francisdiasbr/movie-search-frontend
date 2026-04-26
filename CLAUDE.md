# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server
npm run build      # tsc + vite build
npm run lint       # ESLint check
npm run lint-fix   # ESLint with auto-fix
```

No test suite exists in this project.

## Environment

Copy `.env.example` to `.env` and set `VITE_BASE_URL` (default: `http://127.0.0.1:5000/api/`). The backend must be running — see [movie-search-backend](https://github.com/francisdiasbr/movie-search-backend).

## Architecture

**Stack**: React 18 + TypeScript, Vite, Redux Toolkit, React Router DOM 7, Styled Components, Sonner (toasts).

### Routing & layout

`app/router.tsx` defines all routes. The dashboard shell lives in `app/dashboard/layout.tsx`, which renders a nav bar and `<Outlet />`. Every dashboard page is a child route under `/dashboard/*`.

### State management

Redux store is in `lib/store.ts`. All slices live under `lib/features/<feature>/`. Each slice uses `createAsyncThunk` for async operations and tracks `status: 'idle' | 'loading' | 'succeeded' | 'failed'` in its state. Typed hooks (`useAppDispatch`, `useAppSelector`) are in `lib/hooks.ts`.

### API layer

`lib/api/service.js` exports a singleton `BaseService` that wraps `fetch`. Use `BaseService.get/post/put/delete(endpoint, body?)`. The base URL comes from `VITE_BASE_URL`. FormData bodies are sent as multipart; everything else is JSON.

### Component conventions

- `app/ui/` — components shared across the whole app (Table, Dialog, MediaCard, LoadingSpinner).
- `app/dashboard/components/` — components shared within the dashboard but not globally (GoBack).
- Feature-specific components live inside their own page folder (e.g., `app/dashboard/favorites/components/`).
- Styled components are always in a `styles.ts` sibling and imported as `* as S`.

### Custom hooks

`app/hooks/` contains hooks used across multiple pages: `useKeywords`, `useToastNotifications`, `useBlogPosts`.

## Import rules

- **No `@` alias imports** — ESLint enforces relative paths only.
- Import order: external modules → parent paths → sibling paths, all alphabetical (enforced by `eslint-plugin-import-helpers`).
