import type { PokemonListItem } from '~/types/pokemon'

const PAGE_SIZE = 60

// Manages pokemon list state: fetching, client-side search filtering, and load-more pagination.
// Search filters only what's already loaded — does not trigger new API calls.
// Uses useState for pokemon/offset/hasMore so state persists across navigations.
export function usePokemonList() {
  const pokemon = useState<PokemonListItem[]>('pokemon-list', () => [])
  const offset = useState<number>('pokemon-offset', () => 0)
  const hasMore = useState<boolean>('pokemon-has-more', () => true)
  const search = ref('')
  const typeFilter = ref('')
  const loading = ref(false)

  const filteredPokemon = computed(() => {
    let result = pokemon.value
    if (search.value) {
      const term = search.value.toLowerCase()
      result = result.filter((p) => p.name.includes(term))
    }
    if (typeFilter.value) {
      result = result.filter((p) => p.types.includes(typeFilter.value))
    }
    return result
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

  // Only fetch first page if we have no data yet
  if (pokemon.value.length === 0) {
    fetchPage()
  }

  return {
    pokemon: filteredPokemon,
    search,
    typeFilter,
    loading,
    hasMore,
    loadMore: fetchPage
  }
}
