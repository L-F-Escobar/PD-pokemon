<script setup lang="ts">
import type { PokemonDetail } from '~/types/pokemon'
import { formatAbilities } from '~/utils/formatAbilities'

const props = defineProps<{
  pokemon: PokemonDetail
}>()

const formattedAbilities = computed(() => formatAbilities(props.pokemon.abilities))
const heightInMeters = computed(() => (props.pokemon.height / 10).toFixed(1))
const weightInKg = computed(() => (props.pokemon.weight / 10).toFixed(1))
</script>

<template>
  <article class="pokemon-profile">
    <img
      :src="pokemon.sprite"
      :alt="pokemon.name"
      class="pokemon-profile__image"
      width="400"
      height="400"
    />
    <h1 class="pokemon-profile__name">{{ pokemon.name }}</h1>
    <dl class="pokemon-profile__stats">
      <dt>Height</dt>
      <dd>{{ heightInMeters }} m</dd>
      <dt>Weight</dt>
      <dd>{{ weightInKg }} kg</dd>
      <dt>Abilities</dt>
      <dd>{{ formattedAbilities }}</dd>
    </dl>
  </article>
</template>
