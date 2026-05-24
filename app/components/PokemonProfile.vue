<script setup lang="ts">
import type { PokemonDetail } from '~/types/pokemon'
import { formatAbilities } from '~/utils/formatAbilities'
import { typeColors } from '~/utils/typeColors'

const MAX_STAT = 255

const props = defineProps<{
  pokemon: PokemonDetail
}>()

const ARTWORK_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

const formattedAbilities = computed(() => formatAbilities(props.pokemon.abilities))
const heightInMeters = computed(() => (props.pokemon.height / 10).toFixed(1))
const weightInKg = computed(() => (props.pokemon.weight / 10).toFixed(1))
const formattedId = computed(() => `#${String(props.pokemon.id).padStart(3, '0')}`)

const showShiny = ref(false)
const currentSprite = computed(() =>
  showShiny.value
    ? `${ARTWORK_BASE}/shiny/${props.pokemon.id}.png`
    : props.pokemon.sprite
)

const statLabels: Record<string, string> = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  'speed': 'SPD'
}

function playCry() {
  const audio = new Audio(props.pokemon.cries.latest)
  audio.play()
}
</script>

<template>
  <article class="pokemon-profile">
    <div class="pokemon-profile__image-wrapper">
      <img
        :src="currentSprite"
        :alt="showShiny ? `${pokemon.name} (shiny)` : pokemon.name"
        class="pokemon-profile__image"
        width="400"
        height="400"
      />
      <button
        class="pokemon-profile__shiny-toggle"
        :class="{ 'pokemon-profile__shiny-toggle--active': showShiny }"
        :aria-label="showShiny ? 'Show normal' : 'Show shiny'"
        @click="showShiny = !showShiny"
      >
        &#10024;
      </button>
    </div>
    <h1 class="pokemon-profile__name">
      {{ pokemon.name }}
      <span class="pokemon-profile__id">{{ formattedId }}</span>
    </h1>
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
    <button class="pokemon-profile__cry" aria-label="Play cry" @click="playCry">
      &#9654; Cry
    </button>

    <div class="pokemon-profile__details">
      <div class="pokemon-profile__info">
        <h2>Details</h2>
        <dl class="pokemon-profile__info-grid">
          <dt>Height</dt>
          <dd>{{ heightInMeters }} m</dd>
          <dt>Weight</dt>
          <dd>{{ weightInKg }} kg</dd>
          <dt>Base XP</dt>
          <dd>{{ pokemon.base_experience }}</dd>
          <dt>Abilities</dt>
          <dd>{{ formattedAbilities }}</dd>
        </dl>
      </div>

      <div class="pokemon-profile__base-stats">
        <h2>Base Stats</h2>
        <div v-for="stat in pokemon.stats" :key="stat.name" class="stat-row">
          <span class="stat-row__label">{{ statLabels[stat.name] || stat.name }}</span>
          <span class="stat-row__value">{{ stat.base_stat }}</span>
          <div class="stat-row__bar">
            <div
              class="stat-row__fill"
              :style="{ width: `${(stat.base_stat / MAX_STAT) * 100}%` }"
            />
          </div>
        </div>
      </div>

      <EvolutionChain :name="pokemon.name" />
      <TypeEffectiveness :name="pokemon.name" />
    </div>
  </article>
</template>

<style scoped>
.pokemon-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg) 0;
}

.pokemon-profile__image-wrapper {
  position: relative;
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

.pokemon-profile__shiny-toggle {
  position: absolute;
  bottom: var(--spacing-sm);
  right: var(--spacing-sm);
  font-size: 0.85rem;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: background-color var(--transition), transform var(--transition);
}

.pokemon-profile__shiny-toggle:hover {
  transform: scale(1.1);
  background-color: var(--color-border);
}

.pokemon-profile__shiny-toggle--active {
  border-color: #f59e0b;
  box-shadow: 0 0 0 2px #fbbf24;
}

.pokemon-profile__name {
  margin-top: var(--spacing-lg);
  font-size: 2rem;
  text-transform: capitalize;
}

.pokemon-profile__id {
  font-weight: 400;
  color: var(--color-text-muted);
  font-size: 1.25rem;
  margin-left: var(--spacing-xs);
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

.pokemon-profile__cry {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  transition: background-color var(--transition), transform var(--transition);
}

.pokemon-profile__cry:hover {
  background-color: var(--color-border);
  transform: scale(1.05);
}

.pokemon-profile__details {
  margin-top: var(--spacing-lg);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.pokemon-profile__info {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-lg);
}

.pokemon-profile__info h2 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
}

.pokemon-profile__info-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xs) var(--spacing-lg);
}

.pokemon-profile__info-grid dt {
  font-weight: 600;
  color: var(--color-text-muted);
}

.pokemon-profile__info-grid dd {
  text-transform: capitalize;
}

.pokemon-profile__base-stats {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-lg);
}

.pokemon-profile__details :deep(.evolution-chain),
.pokemon-profile__details :deep(.type-effectiveness) {
  grid-column: 1 / -1;
}

.pokemon-profile__base-stats h2 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
}

.stat-row {
  display: grid;
  grid-template-columns: 60px 35px 1fr;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.stat-row__label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.stat-row__value {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: right;
}

.stat-row__bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
}

.stat-row__fill {
  height: 100%;
  background-color: var(--color-input-focus);
  border-radius: 4px;
  transition: width 0.4s ease;
}
</style>
