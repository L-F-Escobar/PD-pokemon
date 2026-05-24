<script setup lang="ts">
import type { PokemonDetail } from '~/types/pokemon'
import { formatAbilities } from '~/utils/formatAbilities'
import { typeColors } from '~/utils/typeColors'

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
    <div class="pokemon-profile__types">
      <span
        v-for="type in pokemon.types"
        :key="type"
        class="type-badge"
        :style="{ backgroundColor: typeColors[type] }"
      >
        {{ type }}
      </span>
    </div>
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

<style scoped>
.pokemon-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg) 0;
}

.pokemon-profile__image {
  width: 300px;
  height: 300px;
  object-fit: contain;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-md);
}

.pokemon-profile__name {
  margin-top: var(--spacing-lg);
  font-size: 2rem;
  text-transform: capitalize;
}

.pokemon-profile__types {
  display: flex;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pokemon-profile__stats {
  margin-top: var(--spacing-lg);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xs) var(--spacing-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-lg);
  width: 100%;
  max-width: 400px;
}

.pokemon-profile__stats dt {
  font-weight: 600;
  color: var(--color-text-muted);
}

.pokemon-profile__stats dd {
  text-transform: capitalize;
}
</style>
