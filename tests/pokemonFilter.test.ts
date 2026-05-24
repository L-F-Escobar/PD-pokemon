import { describe, it, expect } from 'vitest'
import { ref, computed } from 'vue'
import type { PokemonListItem } from '../app/types/pokemon'

// Replicates the filtering logic from usePokemonList to test in isolation
// without needing Nuxt context (useState, $fetch).
function createFilter(items: PokemonListItem[]) {
  const pokemon = ref(items)
  const search = ref('')
  const typeFilter = ref('')

  const filtered = computed(() => {
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

  return { filtered, search, typeFilter }
}

const mockPokemon: PokemonListItem[] = [
  { id: 1, name: 'bulbasaur', sprite: '', types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', sprite: '', types: ['fire'] },
  { id: 6, name: 'charizard', sprite: '', types: ['fire', 'flying'] },
  { id: 7, name: 'squirtle', sprite: '', types: ['water'] },
  { id: 25, name: 'pikachu', sprite: '', types: ['electric'] }
]

describe('pokemon filtering', () => {
  it('returns all pokemon when no filters are active', () => {
    const { filtered } = createFilter(mockPokemon)
    expect(filtered.value).toHaveLength(5)
  })

  it('filters by name substring', () => {
    const { filtered, search } = createFilter(mockPokemon)
    search.value = 'char'
    expect(filtered.value).toHaveLength(2)
    expect(filtered.value.map((p) => p.name)).toEqual(['charmander', 'charizard'])
  })

  it('filters by name case-insensitively', () => {
    const { filtered, search } = createFilter(mockPokemon)
    search.value = 'PIKA'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0]?.name).toBe('pikachu')
  })

  it('filters by type', () => {
    const { filtered, typeFilter } = createFilter(mockPokemon)
    typeFilter.value = 'fire'
    expect(filtered.value).toHaveLength(2)
    expect(filtered.value.map((p) => p.name)).toEqual(['charmander', 'charizard'])
  })

  it('combines name and type filters', () => {
    const { filtered, search, typeFilter } = createFilter(mockPokemon)
    search.value = 'char'
    typeFilter.value = 'flying'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0]?.name).toBe('charizard')
  })

  it('returns empty when no matches', () => {
    const { filtered, search } = createFilter(mockPokemon)
    search.value = 'mewtwo'
    expect(filtered.value).toHaveLength(0)
  })

  it('handles type filter with no matches', () => {
    const { filtered, typeFilter } = createFilter(mockPokemon)
    typeFilter.value = 'dragon'
    expect(filtered.value).toHaveLength(0)
  })
})
