import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonProfile from '../app/components/PokemonProfile.vue'

const mockPokemon = {
  id: 6,
  name: 'charizard',
  height: 17,
  weight: 905,
  base_experience: 240,
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  abilities: [
    { name: 'blaze', is_hidden: false },
    { name: 'solar-power', is_hidden: true }
  ],
  types: ['fire', 'flying'],
  stats: [
    { name: 'hp', base_stat: 78 },
    { name: 'attack', base_stat: 84 },
    { name: 'defense', base_stat: 78 },
    { name: 'special-attack', base_stat: 109 },
    { name: 'special-defense', base_stat: 85 },
    { name: 'speed', base_stat: 100 }
  ],
  cries: {
    latest: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/6.ogg',
    legacy: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/6.ogg'
  }
}

describe('PokemonProfile', () => {
  const stubs = {
    NuxtLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
    EvolutionChain: { template: '<div />' },
    TypeEffectiveness: { template: '<div />' }
  }

  it('renders the pokemon name and ID', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('charizard')
    expect(wrapper.text()).toContain('#006')
  })

  it('converts height to meters', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('1.7 m')
  })

  it('converts weight to kilograms', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('90.5 kg')
  })

  it('formats abilities with capitalization', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('Blaze, Solar Power')
  })

  it('renders type badges', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    const badges = wrapper.findAll('.type-badge')
    expect(badges).toHaveLength(2)
    expect(badges[0]?.text()).toBe('fire')
    expect(badges[1]?.text()).toBe('flying')
  })

  it('renders all six stat bars', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    const statRows = wrapper.findAll('.stat-row')
    expect(statRows).toHaveLength(6)
  })

  it('displays base experience', () => {
    const wrapper = mount(PokemonProfile, {
      props: { pokemon: mockPokemon },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('240')
  })
})
