interface EvolutionStage {
  name: string
  id: number
  sprite: string
}

// Lazy-loads evolution chain data separately from the main profile fetch.
export function useEvolutionChain(name: string) {
  const { data, status, error } = useFetch<EvolutionStage[]>(
    `/api/pokemon/${name}/evolution`,
    { lazy: true }
  )

  return {
    stages: data,
    loading: computed(() => status.value === 'pending'),
    error
  }
}
