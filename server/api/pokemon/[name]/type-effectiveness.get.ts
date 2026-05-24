// Fetches type effectiveness by combining damage relations from all of a pokemon's types.
// Requires one API call per type the pokemon has (1-2 calls).

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

interface DamageRelations {
  double_damage_from: { name: string }[]
  double_damage_to: { name: string }[]
  half_damage_from: { name: string }[]
  half_damage_to: { name: string }[]
  no_damage_from: { name: string }[]
  no_damage_to: { name: string }[]
}

interface RawTypeResponse {
  damage_relations: DamageRelations
}

interface RawPokemon {
  types: { type: { name: string } }[]
}

interface TypeEffectiveness {
  weaknesses: string[]
  resistances: string[]
  immunities: string[]
}

export default defineEventHandler(async (event): Promise<TypeEffectiveness> => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pokemon name is required'
    })
  }

  try {
    const pokemon = await $fetch<RawPokemon>(`${POKEAPI_BASE}/pokemon/${name}`)
    const typeNames = pokemon.types.map((t) => t.type.name)

    const typeResponses = await Promise.all(
      typeNames.map((t) => $fetch<RawTypeResponse>(`${POKEAPI_BASE}/type/${t}`))
    )

    // Calculate combined multipliers across all types
    const multipliers: Record<string, number> = {}
    const allTypes = [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ]

    for (const type of allTypes) {
      multipliers[type] = 1
    }

    for (const typeData of typeResponses) {
      const dr = typeData.damage_relations
      for (const t of dr.double_damage_from) multipliers[t.name] = (multipliers[t.name] ?? 1) * 2
      for (const t of dr.half_damage_from) multipliers[t.name] = (multipliers[t.name] ?? 1) * 0.5
      for (const t of dr.no_damage_from) multipliers[t.name] = 0
    }

    const weaknesses: string[] = []
    const resistances: string[] = []
    const immunities: string[] = []

    for (const [type, mult] of Object.entries(multipliers)) {
      if (mult === 0) immunities.push(type)
      else if (mult >= 2) weaknesses.push(type)
      else if (mult <= 0.5) resistances.push(type)
    }

    return { weaknesses, resistances, immunities }
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch type effectiveness'
    })
  }
})
