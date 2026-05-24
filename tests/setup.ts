import { ref, computed } from 'vue'
import { vi } from 'vitest'

// Provide Vue's auto-imported globals that Nuxt normally handles
globalThis.ref = ref
globalThis.computed = computed

// Stub Nuxt composables not available outside Nuxt context
globalThis.useEvolutionChain = vi.fn(() => ({
  stages: ref(null),
  loading: ref(false),
  error: ref(null)
}))

globalThis.useTypeEffectiveness = vi.fn(() => ({
  effectiveness: ref(null),
  loading: ref(false),
  error: ref(null)
}))

globalThis.useFavorites = vi.fn(() => ({
  favorites: ref([]),
  showFavoritesOnly: ref(false),
  toggle: vi.fn(),
  isFavorite: vi.fn(() => false)
}))
