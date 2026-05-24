import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonCard from '../app/components/PokemonCard.vue'

const mockPokemon = {
  id: 6,
  name: 'charizard',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  types: ['fire', 'flying']
}

describe('PokemonCard', () => {
  it('renders the pokemon name', () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: mockPokemon },
      global: { stubs: { NuxtLink: { template: '<a><slot /></a>' } } }
    })
    expect(wrapper.text()).toContain('charizard')
  })

  it('renders the sprite image with alt text', () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: mockPokemon },
      global: { stubs: { NuxtLink: { template: '<a><slot /></a>' } } }
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(mockPokemon.sprite)
    expect(img.attributes('alt')).toBe('charizard')
  })

  it('links to the correct detail page', () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: mockPokemon },
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>'
          }
        }
      }
    })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('/pokemon/charizard')
  })
})
