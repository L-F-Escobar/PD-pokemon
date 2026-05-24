export interface PokemonListItem {
  id: number
  name: string
  sprite: string
  types: string[]
}

export interface PokemonAbility {
  name: string
  is_hidden: boolean
}

export interface PokemonStat {
  name: string
  base_stat: number
}

export interface PokemonCries {
  latest: string
  legacy: string
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprite: string
  abilities: PokemonAbility[]
  types: string[]
  stats: PokemonStat[]
  cries: PokemonCries
}
