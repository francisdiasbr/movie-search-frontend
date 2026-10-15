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

Three layers, mirroring `gav/siga-front`. No URL is ever built outside a service.

1. `lib/api/BaseApi.ts` — typed singleton over an axios instance (`get/getBlob/post/put/patch/remove`). Uses `VITE_BASE_URL` as `baseURL`, sends FormData as multipart and everything else as JSON, and a response interceptor converts every failure into `ApiError` (from `lib/api/errors.ts`) with `status`, `body` and the readable backend message. The option `cancelPrevious: true` aborts an in-flight request to the same method + URL. Features never import it directly.
2. `lib/service/BaseService.ts` — abstract class. Subclasses set `protected prefix = '<resource>'` and inherit `get(id?)`, `search(params)`, `post(body, path?)`, `put(id, body)`, `remove(id)`, `delete(body)`, `getBlob(params)`, plus the helper `this.path(...segments)` to build sub-routes.
3. `lib/features/<feature>/service.ts` — one service per feature, exported as a singleton, with methods named after the business operation and typed with the feature's `types.ts` (e.g. `favoritesService.searchFavorites(params)`, `keywordsService.suggestMovies(keywords)`).

Response envelopes `ApiResponse<T>` (`{ data }`) and `EntriesResponse<T>` (`{ entries }`) live in `lib/api/types.ts`.

Thunks follow one shape: call the service, return the payload, and on error `return rejectWithValue(toApiErrorPayload(error, '<fallback message in pt-BR>'))` with `{ rejectValue: ApiErrorPayload }` in the thunk generics. Reducers store only `action.payload?.message` in `state.error`.

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
