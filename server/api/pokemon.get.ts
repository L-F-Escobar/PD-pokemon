// Fetches paginated pokemon list via PokeAPI GraphQL.
// GraphQL chosen over REST here to avoid N+1 calls — one query returns
// exactly the fields needed for 60 pokemon (id, name, types).
import type { PokemonListItem } from '~/types/pokemon'

const GRAPHQL_URL = 'https://graphql.pokeapi.co/v1beta2'
const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const POKEMON_LIST_QUERY = `
  query getPokemonList($limit: Int, $offset: Int) {
    pokemon(
      where: { is_default: { _eq: true } }
      order_by: { id: asc }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      pokemontypes(order_by: { slot: asc }) {
        type {
          name
        }
      }
    }
  }
`

interface GraphQLPokemon {
  id: number
  name: string
  pokemontypes: { type: { name: string } }[]
}

interface GraphQLResponse {
  data?: { pokemon: GraphQLPokemon[] }
  errors?: { message: string }[]
}

export default defineEventHandler(async (event): Promise<PokemonListItem[]> => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 60
  const offset = Number(query.offset) || 0

  const response = await $fetch<GraphQLResponse>(GRAPHQL_URL, {
    method: 'POST',
    body: {
      query: POKEMON_LIST_QUERY,
      variables: { limit, offset }
    }
  })

  if (response.errors) {
    throw createError({
      statusCode: 502,
      statusMessage: `PokeAPI GraphQL error: ${response.errors[0]?.message ?? 'Unknown error'}`
    })
  }

  if (!response.data) {
    throw createError({
      statusCode: 502,
      statusMessage: 'No data returned from PokeAPI GraphQL'
    })
  }

  return response.data.pokemon.map((p) => ({
    id: p.id,
    name: p.name,
    sprite: `${SPRITE_BASE}/${p.id}.png`,
    types: p.pokemontypes.map((t) => t.type.name)
  }))
})
