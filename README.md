# Pokédex

A Pokémon information site built with Nuxt 4, TypeScript, and the PokéAPI.

## Setup

```bash
git clone https://github.com/L-F-Escobar/PD-pokemon.git
cd PD-pokemon
npm install
npm run dev
```

## Tests

```bash
npx vitest run
```

27 tests across 4 files:
- **formatAbilities** — pure utility edge cases (hyphens, single ability, empty)
- **pokemonFilter** — name search, type filter, favorites filter, and all combinations
- **PokemonCard** — renders name, sprite, correct link
- **PokemonProfile** — height/weight conversion, ability formatting, type badges, stat bars, ID badge

## Architecture

### Server Routes (BFF Pattern)

The client never calls PokéAPI directly. Nuxt server routes act as a backend-for-frontend layer that fetches, normalizes, and strips upstream responses.

- **`/api/pokemon?limit=60&offset=0`** — Calls PokéAPI GraphQL. Returns a lean array of `{id, name, sprite, types}`. GraphQL chosen here to avoid N+1 calls — one query fetches exactly the fields needed for 60 pokémon.
- **`/api/pokemon/[name]`** — Calls PokéAPI REST. Strips the ~100KB response down to essentials (name, height, weight, abilities, types, stats, cries). REST used here since it's a single reliable fetch per page view.
- **`/api/pokemon/[name]/evolution`** — Fetches evolution chain (2 sequential calls: species → evolution chain). Separate endpoint so the main detail route stays fast.
- **`/api/pokemon/[name]/type-effectiveness`** — Fetches and combines damage relations from all of a pokémon's types. Calculates accurate dual-type weaknesses, resistances, and immunities.

### Frontend

- **Pages are thin.** They mount composables and pass data to presentational components.
- **Composables own logic.** `usePokemonList` manages fetching, pagination state (via `useState` for persistence across navigations), and client-side filtering (name, type, favorites). `usePokemonDetail` wraps `useFetch` for SSR support. `useEvolutionChain` and `useTypeEffectiveness` lazy-load secondary data.
- **Components are presentational.** Props in, events out. No data fetching (except lazy-loaded sections that manage their own loading states).

### Theming

CSS custom properties on `:root` with a `[data-theme="dark"]` override. A `useTheme` composable manages the toggle and persists to localStorage. All component styles reference variables — dark mode works automatically when variables swap.

## Features

### Landing Page
- Grid of 60 pokémon with sprites and names
- Search by name with clear button
- Filter by type (custom dropdown with colored type indicators)
- Favorites toggle — heart icon on each card, persisted to localStorage
- Load More button for pagination
- All three filters (name, type, favorites) work together

### Profile Page
- Official artwork with shiny sprite toggle
- Pokémon ID badge (#001, #149, etc.)
- Type badges with canonical colors
- Play cry button (audio)
- Details: height (m), weight (kg), base XP, formatted abilities
- Base stats bar chart (pure CSS)
- Evolution chain with clickable sprites (lazy-loaded)
- Type effectiveness — weaknesses, resistances, immunities with combined dual-type math (lazy-loaded)
- Two-column layout (Details + Base Stats side by side)

### UX
- Dark/light theme with toggle, persisted to localStorage
- Scroll position restoration on back navigation
- Back to Top button
- List state persists across navigations (via `useState`)

## Design Decisions

- **GraphQL for list, REST for detail** — right tool for each job. GraphQL solves the batch efficiency problem; REST is reliable for single fetches.
- **Client-side search** — filters what's loaded in memory. Instant feedback, no API calls on keystroke.
- **Load More button over infinite scroll** — explicit user intent, no edge cases with search filtering affecting scroll position.
- **`useState` over `ref`** — list state persists when navigating to a detail page and back. Users keep their scroll position and loaded pokémon.
- **`router.back()` for back navigation** — enables scroll position restoration via Vue Router's `savedPosition`.
- **Lazy-loaded profile sections** — evolution chain and type effectiveness require extra API calls. Main profile renders instantly; secondary data loads in the background.
- **Custom dropdown over native `<select>`** — full control over dropdown direction and styling. Includes colored type dots and matches the theme system.
- **No styling library** — plain CSS with custom properties. Scoped per component, themed via variables.

## What I'd Add With More Time

- Caching layer in server routes (in-memory LRU) to reduce PokéAPI calls
- E2E tests with Playwright
- CI/CD via GitHub Actions
- Pokémon comparison feature
