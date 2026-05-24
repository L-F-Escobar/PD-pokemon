<script setup lang="ts">
import type { PokemonListItem } from '~/types/pokemon'

defineProps<{
  pokemon: PokemonListItem
}>()

const { toggle, isFavorite } = useFavorites()

function onFavoriteClick(event: Event, id: number) {
  event.preventDefault()
  event.stopPropagation()
  toggle(id)
}
</script>

<template>
  <NuxtLink :to="`/pokemon/${pokemon.name}`" class="pokemon-card">
    <button
      class="pokemon-card__fav"
      :class="{ 'pokemon-card__fav--active': isFavorite(pokemon.id) }"
      :aria-label="isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'"
      @click="onFavoriteClick($event, pokemon.id)"
    >
      <span v-if="isFavorite(pokemon.id)">&hearts;</span>
      <span v-else>&hearts;</span>
    </button>
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
  position: relative;
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

.pokemon-card__fav {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  font-size: 1.1rem;
  color: var(--color-text-muted);
  padding: 0.15rem;
  border-radius: 50%;
  line-height: 1;
  transition: color var(--transition), transform var(--transition);
  opacity: 0.4;
}

.pokemon-card:hover .pokemon-card__fav {
  opacity: 1;
}

.pokemon-card__fav--active {
  color: #ef4444;
  opacity: 1;
}

.pokemon-card__fav:hover {
  transform: scale(1.2);
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
