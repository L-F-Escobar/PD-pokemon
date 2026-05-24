import type { PokemonDetail } from '~/types/pokemon'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon'
const ARTWORK_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

interface RawAbility {
  ability: { name: string }
  is_hidden: boolean
}

interface RawType {
  slot: number
  type: { name: string }
}

interface RawPokemon {
  id: number
  name: string
  height: number
  weight: number
  abilities: RawAbility[]
  types: RawType[]
}

export default defineEventHandler(async (event): Promise<PokemonDetail> => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pokemon name is required'
    })
  }

  const raw = await $fetch<RawPokemon>(`${POKEAPI_BASE}/${name}`)

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    sprite: `${ARTWORK_BASE}/${raw.id}.png`,
    abilities: raw.abilities.map((a) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden
    })),
    types: raw.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name)
  }
})
