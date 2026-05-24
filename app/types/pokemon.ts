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

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  sprite: string
  abilities: PokemonAbility[]
  types: string[]
}
