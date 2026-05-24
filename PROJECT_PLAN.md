# Priority Dispatch Pokemon Take-Home — Project Plan

## Context
- **Role:** Senior Full-Stack Engineer at Priority Dispatch (emergency dispatch training services, SLC)
- **Stack required:** TypeScript + Vue 3 + Nuxt 3, backend via Nuxt server routes calling PokéAPI (https://pokeapi.co/)
- **Eval criteria from Holden:** Runs locally, desktop-only, "show us what you want to show us about you"
- **Submission target:** Tuesday morning, May 26
- **My experience with Vue/Nuxt:** First time using either. Strong React/Node/TypeScript background.

## Project Goals (in priority order)
1. **Senior-quality code.** Clean separation of concerns, idiomatic Nuxt 3, strict TypeScript.
2. **Idiomatic use of the framework.** No React-isms in Vue. Use Composition API + `<script setup>`. Use Nuxt's built-in conventions (auto-imports, server routes, composables, file-based routing).
3. **Pristine git history.** Atomic commits, conventional commit messages, story-like progression.
4. **Stellar README.** Clear setup, architecture explanation, decisions documented.
5. **Tests that demonstrate strategy.** Meaningful Vitest coverage on pure logic, API layer, and one component integration test. Quality over quantity.
6. **Two thoughtful bonus features:** favorites list with localStorage, load-more pagination beyond 60.

## Required Spec
1. Landing page: list of 60 Pokemon, each with name + thumbnail
2. Custom search filter on landing page (filters by characters in name)
3. Click Pokemon → route to profile page
4. Profile page: larger image + name, height, weight, abilities
5. Abilities formatted: comma-delimited, each capitalized ("Overgrow, Swarm, Steadfast")
6. No styling libraries (no Tailwind, no Bootstrap) — plain CSS only

## Architecture
```text
/server/api/                        # Server routes — stays at project root
  pokemon.get.ts                    # Returns paginated list (60+ default)
  pokemon/[name].get.ts             # Returns single Pokemon detail

/app/composables/                   # Composables — Nuxt 4 places these under /app
  usePokemonList.ts                 # Fetch + search filter + pagination state
  usePokemonDetail.ts               # Fetch single Pokemon
  useFavorites.ts                   # localStorage-backed favorites

/app/utils/
  formatAbilities.ts                # Pure function: ability[] → "Overgrow, Swarm"
  pokemonApi.ts                     # Server-side fetch helpers

/app/types/
  pokemon.ts                        # TS types for PokéAPI list + detail responses

/app/pages/
  index.vue                         # List page (thin; delegates to composables)
  pokemon/[name].vue                # Profile page (thin; delegates to composables)

/app/components/
  PokemonCard.vue                   # Single grid card
  SearchFilter.vue                  # Search input
  PokemonProfile.vue                # Profile view
  FavoriteToggle.vue                # Heart/star icon

/tests/                             # Tests — stays at project root
  formatAbilities.test.ts           # Pure function unit test
  pokemonApi.test.ts                # Mock fetch, validate parsing
  usePokemonList.test.ts            # Filter logic
  PokemonCard.test.ts               # Component integration
```

## Architectural Principles
- **Pages are thin.** They mount composables and pass data to components.
- **Composables own logic.** Fetching, filtering, state — all live here.
- **Utils are pure.** Easy to test, no side effects.
- **Server routes proxy PokéAPI.** Adds caching, normalization, decoupling from upstream API shape.
- **Components are presentational.** Take props, emit events.
- **TypeScript strict mode.** No `any`. Real types for PokéAPI responses.

## Bonus Features
- **Favorites with localStorage** — heart icon on each card, persists across reloads. Composable: `useFavorites()`.
- **Load more past 60** — infinite scroll or "Load More" button to fetch additional pages from PokéAPI. Shows scalability thinking.

## Tech Stack
- **Framework:** Nuxt 3 (latest)
- **Language:** TypeScript (strict mode)
- **State:** Vue 3 Composition API via composables
- **Testing:** Vitest + @vue/test-utils
- **Styling:** Plain CSS, scoped to components (`<style scoped>`)
- **Linting:** ESLint + @nuxt/eslint
- **Format:** Prettier


# Phase Plan

## Phase 0
- Skim Nuxt 3 Getting Started: https://nuxt.com/docs/getting-started/introduction
- Skim Nuxt 3 server routes: https://nuxt.com/docs/guide/directory-structure/server
- Skim Vue 3 Composition API basics (ref, computed, `<script setup>`): https://vuejs.org/guide/essentials/reactivity-fundamentals.html
- Initialize the project
- First commit: `chore: initial nuxt 3 scaffold with typescript`

## Phase 1
**Goal: Server-side API layer with types, working end-to-end (no UI yet).**
- Configure TypeScript strict mode
- Set up ESLint + Prettier
- Define `types/pokemon.ts` (PokéAPI list response, detail response)
- Build `server/api/pokemon.get.ts` (proxies PokéAPI list endpoint, accepts limit/offset)
- Build `server/api/pokemon/[name].get.ts` (proxies PokéAPI detail endpoint)
- Build `utils/formatAbilities.ts`
- Verify with curl/browser: `/api/pokemon?limit=60` returns list, `/api/pokemon/bulbasaur` returns detail
- Write `tests/formatAbilities.test.ts` first (TDD-style for the easy one)
- Commits: one per major step

## Phase 2
**Goal: Required spec working end-to-end.**
- Build `composables/usePokemonList.ts` (fetches, holds search state, returns filtered list)
- Build `composables/usePokemonDetail.ts`
- Build `pages/index.vue` (thin; uses `usePokemonList`)
- Build `components/PokemonCard.vue`
- Build `components/SearchFilter.vue`
- Build `pages/pokemon/[name].vue` (thin; uses `usePokemonDetail`)
- Build `components/PokemonProfile.vue`
- Verify all required spec items work

## Phase 3
**Goal: Styling pass + accessibility basics.**
- Plain CSS, scoped per component
- Desktop-first layout
- Semantic HTML (proper headings, `<main>`, `<nav>`, etc.)
- Alt text on images
- Focus states on interactive elements
- Loading + empty + error states

## Phase 4
**Goal: Polish + tests + bonus features.**
- Implement `useFavorites` composable + `FavoriteToggle` component
- Implement load-more pagination
- Write remaining Vitest tests (API mock test, composable filter test, component integration test)
- Add error handling for network failures
- Keyboard navigation through grid

## Phase 5
**Goal: README + commit cleanup + final pass.**
- Write README (template below)
- Run from fresh `npm install` to confirm setup works
- Optional: deploy to Vercel for live link in README

## Phase 6
**Goal: Final review + send.**
- Read through code one more time with fresh eyes
- Confirm all spec items met
- Push to GitHub, verify repo is clean
- Email Holden with the link

## Git Commit Convention
Use conventional commits:
- `chore:` setup, config, tooling
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code restructuring, no behavior change
- `test:` test additions/changes
- `docs:` documentation
- `style:` formatting only

Examples:
- `chore: initial nuxt 3 scaffold with typescript`
- `feat: add pokemon list server route`
- `test: cover formatAbilities utility`
- `docs: add README with setup and architecture`


# Pokemon Explorer

A small Pokemon information site built with Nuxt 3, TypeScript, and the PokéAPI.

## Architecture
Brief explanation of:
- Why server routes proxy PokéAPI (decoupling, future caching, normalization)
- Why composables own data-fetching logic (testability, reuse)
- Why pages are thin (separation of concerns)
- Why plain CSS scoped to components (per spec, easier to reason about)

## Testing
```bash
pnpm test
```

Tests cover:
- Pure utilities (formatAbilities)
- Server-side API layer (mocked fetch)
- Composable logic (filter behavior)
- Component integration (search filters list)

## Design Decisions
A few notes on choices I made:
- 

## What I'd Add With More Time
- Caching layer in the server route (Redis or in-memory LRU) to reduce PokéAPI calls
- Pokemon comparison feature
- Type-effectiveness visualization on the profile page
- E2E tests with Playwright
- CI/CD via GitHub Actions

## Things to Avoid (React-isms in Vue)
- Don't write `useState`-style hooks. Use `ref()` and `reactive()`.
- Don't import every component. Nuxt auto-imports from `/components`.
- Don't import composables. Nuxt auto-imports from `/composables`.
- Don't use `useEffect`. Use Vue's `watch`, `watchEffect`, or lifecycle hooks.
- Don't use Options API (`data()`, `methods`). Use Composition API + `<script setup>`.
- Don't reach for Pinia for this scope. Composables are enough.

## When in Doubt
- Check the Nuxt 3 docs first: https://nuxt.com/docs
- Check Vue 3 docs second: https://vuejs.org
- Prefer the "Nuxt way" over the "Vue way" when they differ (e.g., file-based routing, auto-imports).
