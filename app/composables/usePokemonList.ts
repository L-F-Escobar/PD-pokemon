import type { PokemonListItem } from '~/types/pokemon'

const PAGE_SIZE = 60

// Manages pokemon list state: fetching, client-side search filtering, and load-more pagination.
// Search filters only what's already loaded — does not trigger new API calls.
export function usePokemonList() {
  const pokemon = ref<PokemonListItem[]>([])
  const search = ref('')
  const loading = ref(false)
  const hasMore = ref(true)
  const offset = ref(0)

  const filteredPokemon = computed(() => {
    if (!search.value) return pokemon.value
    const term = search.value.toLowerCase()
    return pokemon.value.filter((p) => p.name.includes(term))
  })

  async function fetchPage() {
    if (loading.value || !hasMore.value) return

    loading.value = true
    try {
      const data = await $fetch<PokemonListItem[]>('/api/pokemon', {
        params: { limit: PAGE_SIZE, offset: offset.value }
      })
      pokemon.value.push(...data)
      offset.value += data.length
      hasMore.value = data.length >= PAGE_SIZE
    } finally {
      loading.value = false
    }
  }

  // Fetch first page on init
  fetchPage()

  return {
    pokemon: filteredPokemon,
    search,
    loading,
    hasMore,
    loadMore: fetchPage
  }
}
