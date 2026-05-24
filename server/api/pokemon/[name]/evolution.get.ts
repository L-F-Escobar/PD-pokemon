// Fetches evolution chain for a pokemon. Requires 2 sequential calls:
// 1. pokemon-species/{name} → get evolution_chain URL
// 2. evolution-chain/{id} → get the chain data
// This is a separate endpoint so the main detail route stays fast.

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'
const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

interface EvolutionStage {
  name: string
  id: number
  sprite: string
}

interface ChainLink {
  species: { name: string; url: string }
  evolves_to: ChainLink[]
}

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/')
  return Number(parts[parts.length - 1])
}

function flattenChain(link: ChainLink): EvolutionStage[] {
  const stages: EvolutionStage[] = []
  let current: ChainLink | undefined = link

  while (current) {
    const id = extractIdFromUrl(current.species.url)
    stages.push({
      name: current.species.name,
      id,
      sprite: `${SPRITE_BASE}/${id}.png`
    })
    current = current.evolves_to[0]
  }

  return stages
}

export default defineEventHandler(async (event): Promise<EvolutionStage[]> => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pokemon name is required'
    })
  }

  try {
    const species = await $fetch<{ evolution_chain: { url: string } }>(
      `${POKEAPI_BASE}/pokemon-species/${name}`
    )

    const chain = await $fetch<{ chain: ChainLink }>(species.evolution_chain.url)

    return flattenChain(chain.chain)
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch evolution chain'
    })
  }
})
