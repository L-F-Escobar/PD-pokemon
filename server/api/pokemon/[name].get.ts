// Fetches single pokemon detail via PokeAPI REST.
// REST used here since it's a single fetch per page view — reliable and no rate limit concern.
// Response is stripped down from ~100KB to only the fields the client needs.
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

interface RawStat {
  base_stat: number
  stat: { name: string }
}

interface RawCries {
  latest: string
  legacy: string
}

interface RawPokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: RawAbility[]
  types: RawType[]
  stats: RawStat[]
  cries: RawCries
}

export default defineEventHandler(async (event): Promise<PokemonDetail> => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pokemon name is required'
    })
  }

  let raw: RawPokemon

  try {
    raw = await $fetch<RawPokemon>(`${POKEAPI_BASE}/${name}`)
  } catch (error: unknown) {
    const statusCode = (error as { statusCode?: number }).statusCode
    if (statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: `Pokemon "${name}" not found`
      })
    }
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch from PokeAPI'
    })
  }

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    base_experience: raw.base_experience,
    sprite: `${ARTWORK_BASE}/${raw.id}.png`,
    abilities: raw.abilities.map((a) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden
    })),
    types: raw.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name),
    stats: raw.stats.map((s) => ({
      name: s.stat.name,
      base_stat: s.base_stat
    })),
    cries: raw.cries
  }
})
