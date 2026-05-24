interface TypeEffectiveness {
  weaknesses: string[]
  resistances: string[]
  immunities: string[]
}

// Lazy-loads combined type effectiveness data separately from the main profile fetch.
export function useTypeEffectiveness(name: string) {
  const { data, status, error } = useFetch<TypeEffectiveness>(
    `/api/pokemon/${name}/type-effectiveness`,
    { lazy: true }
  )

  return {
    effectiveness: data,
    loading: computed(() => status.value === 'pending'),
    error
  }
}
