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

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px var(--color-shadow);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}

.pokemon-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px var(--color-shadow-hover);
  border-color: var(--color-input-focus);
}

.pokemon-card:focus-visible {
  outline: 2px solid var(--color-input-focus);
  outline-offset: 2px;
}

.pokemon-card__image {
  width: 96px;
  height: 96px;
  object-fit: contain;
}

.pokemon-card__name {
  margin-top: var(--spacing-sm);
  font-weight: 600;
  text-transform: capitalize;
}
</style>
