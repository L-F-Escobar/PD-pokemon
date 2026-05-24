# Pokédex

A Pokémon information site built with Nuxt 4, TypeScript, and the PokéAPI.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npx vitest run
```

## Architecture

### Server Routes (BFF Pattern)

The client never calls PokéAPI directly. Nuxt server routes act as a backend-for-frontend layer that fetches, normalizes, and strips upstream responses.

- **`/api/pokemon?limit=60&offset=0`** — Calls PokéAPI GraphQL. Returns a lean array of `{id, name, sprite, types}`. GraphQL chosen here to avoid N+1 calls — one query fetches exactly the fields needed for 60 pokémon.
- **`/api/pokemon/[name]`** — Calls PokéAPI REST. Strips the ~100KB response down to `{id, name, height, weight, sprite, abilities, types}`. REST used here since it's a single reliable fetch per page view.

### Frontend

- **Pages are thin.** They mount composables and pass data to presentational components.
- **Composables own logic.** `usePokemonList` manages fetching, pagination state (via `useState` for persistence across navigations), and client-side search filtering. `usePokemonDetail` wraps `useFetch` for SSR support.
- **Components are presentational.** Props in, events out. No data fetching.

### Theming

CSS custom properties on `:root` with a `[data-theme="dark"]` override. A `useTheme` composable manages the toggle and persists to localStorage. All component styles reference variables — dark mode works automatically when variables swap.

## Design Decisions

- **GraphQL for list, REST for detail** — right tool for each job. GraphQL solves the batch efficiency problem; REST is reliable for single fetches.
- **Client-side search** — filters what's loaded in memory. Instant feedback, no API calls on keystroke.
- **Load More button over infinite scroll** — explicit user intent, no edge cases with search filtering affecting scroll position.
- **`useState` over `ref`** — list state persists when navigating to a detail page and back. Users keep their scroll position and loaded pokémon.
- **`router.back()` for back navigation** — enables scroll position restoration via Vue Router's `savedPosition`.
- **No styling library** — plain CSS with custom properties. Scoped per component, themed via variables.

## What I'd Add With More Time

- Caching layer in server routes (in-memory LRU) to reduce PokéAPI calls
- E2E tests with Playwright
- CI/CD via GitHub Actions
- Pokémon comparison feature
- Type-effectiveness visualization on the profile page
- Favorites list with localStorage persistence
