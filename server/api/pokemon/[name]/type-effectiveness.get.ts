// Fetches type effectiveness by combining damage relations from all of a pokemon's types.
// Requires one API call per type the pokemon has (1-2 calls).

import { consola } from 'consola'

const logger = consola.withTag('api:pokemon:type-effectiveness')
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
  immunities: string[]
  superEffective: string[]
  notVeryEffective: string[]
  noEffect: string[]
}

export default defineEventHandler(async (event): Promise<TypeEffectiveness> => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pokemon name is required'
    })
  }

  logger.info(`Fetching type effectiveness for: ${name}`)

  try {
    const pokemon = await $fetch<RawPokemon>(`${POKEAPI_BASE}/pokemon/${name}`)
    const typeNames = pokemon.types.map((t) => t.type.name)
    logger.info(`Types for ${name}: ${typeNames.join(', ')}`)

    const typeResponses = await Promise.all(
      typeNames.map((t) => $fetch<RawTypeResponse>(`${POKEAPI_BASE}/type/${t}`))
    )

    const allTypes = [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ]

    // Defensive multipliers (for immunities)
    const defensive: Record<string, number> = {}
    for (const type of allTypes) defensive[type] = 1

    // Offensive multipliers (what this pokemon's attacks do)
    const offensive: Record<string, number> = {}
    for (const type of allTypes) offensive[type] = 1

    for (const typeData of typeResponses) {
      const dr = typeData.damage_relations
      for (const t of dr.double_damage_from) defensive[t.name] = (defensive[t.name] ?? 1) * 2
      for (const t of dr.half_damage_from) defensive[t.name] = (defensive[t.name] ?? 1) * 0.5
      for (const t of dr.no_damage_from) defensive[t.name] = 0
      for (const t of dr.double_damage_to) offensive[t.name] = (offensive[t.name] ?? 1) * 2
      for (const t of dr.half_damage_to) offensive[t.name] = (offensive[t.name] ?? 1) * 0.5
      for (const t of dr.no_damage_to) offensive[t.name] = 0
    }

    const immunities: string[] = []
    const superEffective: string[] = []
    const notVeryEffective: string[] = []
    const noEffect: string[] = []

    for (const [type, mult] of Object.entries(defensive)) {
      if (mult === 0) immunities.push(type)
    }

    for (const [type, mult] of Object.entries(offensive)) {
      if (mult === 0) noEffect.push(type)
      else if (mult >= 2) superEffective.push(type)
      else if (mult <= 0.5) notVeryEffective.push(type)
    }

    logger.info(`Type effectiveness for ${name}: super=${superEffective.length}, notVery=${notVeryEffective.length}, immune=${immunities.length}, noEffect=${noEffect.length}`)

    return { immunities, superEffective, notVeryEffective, noEffect }
  } catch {
    logger.error(`Failed to fetch type effectiveness for: ${name}`)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch type effectiveness'
    })
  }
})
