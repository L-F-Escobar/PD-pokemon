import type { PokemonAbility } from '~/types/pokemon'

export function formatAbilities(abilities: PokemonAbility[]): string {
  return abilities
    .map((a) =>
      a.name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(', ')
}
