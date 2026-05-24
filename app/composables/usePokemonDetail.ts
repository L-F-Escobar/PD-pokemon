import type { PokemonDetail } from '~/types/pokemon'

// Uses Nuxt's useFetch for SSR support, automatic caching, and reactive state.
export function usePokemonDetail(name: string) {
  const { data, status, error } = useFetch<PokemonDetail>(`/api/pokemon/${name}`)

  return {
    pokemon: data,
    loading: computed(() => status.value === 'pending'),
    error
  }
}
