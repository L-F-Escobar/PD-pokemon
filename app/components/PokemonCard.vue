<script setup lang="ts">
import type { PokemonListItem } from '~/types/pokemon'

defineProps<{
  pokemon: PokemonListItem
}>()
</script>

<template>
  <NuxtLink :to="`/pokemon/${pokemon.name}`" class="pokemon-card">
    <img
      :src="pokemon.sprite"
      :alt="pokemon.name"
      class="pokemon-card__image"
      width="96"
      height="96"
    />
    <span class="pokemon-card__name">{{ pokemon.name }}</span>
  </NuxtLink>
</template>
