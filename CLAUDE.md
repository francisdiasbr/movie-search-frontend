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

Redux store is in `lib/store.ts`; typed hooks (`useAppDispatch`, `useAppSelector`) are in `lib/hooks.ts`. Slices do **not** live in `lib`: each feature folder under `app/dashboard/<feature>/` holds its own `reducer/<name>Slice.ts`, and `lib/store.ts` imports them from there. Each slice uses `createAsyncThunk` and tracks `status: 'idle' | 'loading' | 'succeeded' | 'failed'`.

### Feature folders (mirrors `gav/siga-front`)

Every route folder under `app/dashboard/` is a feature and owns its own `service/`, plus `reducer/` and `types.ts` when the screen keeps state in redux. Two features may hit the same backend resource (`search` and `favorites` both call `favorites`; `write`, `write-review`, `read` and `reviews` all call `write-review`): each one still gets its own small service, exactly like `holidayRegister` and `holidayActivityReport` in siga-front. Never import another feature's service; a feature that needs another resource calls it from its own service by passing the prefix explicitly (see `FavoritesService.findReviewedTconsts`).

```
app/dashboard/
  favorites/      page, [tconst]/, components/, service/{FavoritesService,MainImagesService}.ts,
                  reducer/{favoritesSlice,movieDetailsSlice,mainImagesSlice}.ts, types.ts
  search/         page, service/SearchService.ts, reducer/searchSlice.ts, types.ts
  reviews/        [tconst]/, service/{ReviewsService,ImagesService}.ts,
                  reducer/{authoralReviewSlice,imagesSlice}.ts, types.ts
  read/           page, useBlogPosts.ts, service/ReadService.ts, reducer/readSlice.ts, types.ts
  write/          page, service/WriteService.ts          # no redux: the page calls the service directly
  write-review/   page, Form/, service/WriteReviewService.ts, reducer/writeReviewSlice.ts, types.ts
  keywords/       page, useKeywords.ts, service/KeywordsService.ts, types.ts   # no redux: useKeywords calls the service
```

Folder names do not define URLs; `app/router.tsx` does. Importing another feature's **slice** or **types** is fine (e.g. `search/service` types its response with `favorites/types`). A screen whose result is only used locally (like `write`) calls its service straight from the page, as siga's `actions.js` files do, instead of adding a slice.

### API layer

Three layers. No URL is ever built outside a service, and features never import `BaseApi` directly.

1. `lib/api/BaseApi.ts` — typed singleton over an axios instance (`get/getBlob/post/put/patch/remove`). Uses `VITE_BASE_URL` as `baseURL`, sends FormData as multipart and everything else as JSON, and a response interceptor converts every failure into `ApiError` (from `lib/api/errors.ts`) with `status`, `body` and the readable backend message. The option `cancelPrevious: true` aborts an in-flight request to the same method + URL.
2. `lib/service/BaseService.ts` — abstract class. Subclasses set `protected prefix = '<resource>'` and inherit `get(id?)`, `search(params)`, `post(body, path?)`, `put(id, body)`, `remove(id)`, `delete(body)`, `getBlob(params)`, plus `this.path(...segments)` to build sub-routes. `lib/service/ImagesBaseService.ts` extends it with the shared contract of `images` and `main-images` (the role `ReportsBaseService` plays in siga-front).
3. `app/dashboard/<feature>/service/<Name>Service.ts` — one class per resource, exported as a singleton, with methods named after the business operation and typed with the feature's `types.ts` (e.g. `favoritesService.searchFavorites(params)`, `keywordsService.suggestMovies(keywords)`).

Response envelopes `ApiResponse<T>` (`{ data }`), `EntriesResponse<T>` (`{ entries }`) and `AsyncStatus` live in `lib/api/types.ts`.

Thunks are built with `createApiThunk(type, fn, fallbackMessage)` from `lib/api/thunk.ts`, which wraps the service call and rejects with `toApiErrorPayload`. Reducers wire them with `addStatusCases(builder, thunk, 'statusKey', onFulfilled?)`, which moves the status field, stores `payload.message` in `state.error` and ignores cancelled requests. A slice never spells out pending/fulfilled/rejected by hand.

### Theme (mirrors `@gav/theme` used by siga-front)

`app/theme/` holds every design token. `base/` has only the contracts (`Colors`, `Fonts`, `Layout`), `movieSearch/` the values, and `index.ts` exports `theme`, `ThemeProvider` and `GlobalStyle`. `App.tsx` wraps the tree in `ThemeProvider` + `GlobalStyle` (which also loads Montserrat/Roboto from `@fontsource`). `styled.d.ts` extends styled-components' `DefaultTheme`, so `${({ theme }) => theme.colors.primary.main}` is typed everywhere.

- `theme.colors`: `primary` (`#A34F88`), `secondary` (`#F49BD1`), `error`, `info`, `success` with `main/light/dark/contrastText`; `neutral.level1..level11` for greys (dark to light); `background.page` and `background.surface`.
- `theme.fonts`: `fontPrimary` (Montserrat, headings/nav) and `fontSecondary` (Roboto, body), plus weights `thin..bold`.
- `theme.spacing`: `spacing(n)` returns `n * 8px`; named steps `xxs(2) xs(4) sm(8) md(16) lg(24) xl(32) xxl(48)`.
- `theme.radius` (`sm/md/lg/pill`), `theme.shadows` (`sm/md/lg`), `theme.breakpoints` (`sm/md/lg`), `theme.zIndex` (`nav/dialog/toast`).

No hex colour, radius, shadow or `px` spacing is written outside `app/theme/`: every `styles.ts` reads from `theme`, and there are no inline `style={{}}` props at all (use `Stack`/`Row` or a styled component). Global element styles (`a`, `button`, `input`, `dialog`, headings) live in `GlobalStyle.ts`, there is no `globals.css`.

### Component conventions

- `app/ui/` — components shared across the whole app (Button, IconButton, Card, PageHeader, ExternalLink, Table, Dialog, MediaCard, LoadingSpinner, and the `Stack`/`Row` flex primitives in `Layout`). Every page starts with `<PageHeader title description actions>`; a `GoBack` goes in its children. `Table` takes typed `Column<Row>[]` with an optional `render(row)` per column plus `rowKey`. `Dialog` exports `DialogField`, `DialogFooter` and `DialogRow` for its forms. `Button` mirrors `@gav/components`' Button: `variant` (`primary | secondary | outline | transparent | danger | success`), `size`, `iconLeft/iconRight` (a react-icons component), `loading`, `fullWidth`. Use it instead of a bare `<button>` whenever the button has a role (save, cancel, back, upload).
- `app/dashboard/components/` — components shared within the dashboard but not globally. `GoBack` is the single back button of the app (`<GoBack to={ROUTES.favorites} />`, or `<GoBack />` for history back): an outline `Button` with a left arrow, as in siga-front.
- Feature-specific components live inside their own page folder (e.g., `app/dashboard/favorites/components/`), next to that feature's `service/`, `reducer/` and `types.ts`.
- Styled components are always in a `styles.ts` sibling and imported as `* as S`.

### Shared utilities (mirrors `src/app/*` in siga-front)

Cross-cutting code lives directly under `app/`, never inside a feature:

- `app/const.ts` — `ROUTES` (every dashboard path, with builders such as `ROUTES.favorite(tconst)` and `ROUTES.writeReview({ tconst, primaryTitle })`) and `TCONST_REGEX`. Never hardcode a `/dashboard/...` string.
- `app/formatter/` — display formatters exported in upper case from the barrel, like siga's `formatter/index.js`: `JOIN_LIST(values)`, `NOT_AVAILABLE(value)`, `PARAGRAPHS(text)`, `YES_NO(bool)`. Add one file per formatter and re-export it from `index.ts`.
- `app/util/` — pure helpers: `url.ts` (`imdbTitleUrl`, `spotifyEmbedUrl`, `pirateBaySearchUrl`), `tconst.ts` (`isValidTconst`), `select.ts` (`toSelectOptions`).
- `lib/api/types.ts` — `AsyncStatus`; use it instead of spelling out the `'idle' | 'loading' | ...` union.

### Custom hooks

`app/hooks/` contains only hooks used across multiple features:

- `useStatusToast({ status, error, successMessage, errorMessage, onSuccess, onFailure, reset })` — reacts once when a thunk status becomes `succeeded` or `failed`: shows the toast, runs the callback and resets the slice. Use it instead of writing a `useEffect` on a status field.
- `useToastNotifications` — thin wrapper over sonner (`showSuccess/showError/showWarning/showInfo`).
- `useAsyncAction(fn)` — returns `{ run, loading }`; wraps a handler with a loading flag and ignores calls while one is running. Use it instead of a local `isLoading` state with try/finally.
- `useDebouncedEffect(fn, deps, delay)` — runs `fn` after the deps settle, skipping the mount render.
- `useFilePicker(onFile, { accept })` — returns `{ input, open }`: render `input` and call `open()` from a button.

Hooks tied to one feature live in that feature's folder (`keywords/useKeywords.ts`, `read/useBlogPosts.ts`), not in `app/hooks/`.
