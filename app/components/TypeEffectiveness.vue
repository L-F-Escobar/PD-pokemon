<script setup lang="ts">
import { typeColors } from '~/utils/typeColors'

const props = defineProps<{
  name: string
}>()

const { effectiveness, loading, error } = useTypeEffectiveness(props.name)
</script>

<template>
  <section class="type-effectiveness">
    <h2>Type Effectiveness</h2>

    <p v-if="loading" class="type-effectiveness__loading">Loading type data...</p>
    <p v-else-if="error" class="type-effectiveness__error">Could not load type effectiveness.</p>

    <template v-else-if="effectiveness">
      <div v-if="effectiveness.weaknesses.length" class="type-effectiveness__group">
        <h3>Weak Against</h3>
        <div class="type-effectiveness__badges">
          <span
            v-for="type in effectiveness.weaknesses"
            :key="type"
            class="type-badge"
            :style="{ backgroundColor: typeColors[type] }"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <div v-if="effectiveness.resistances.length" class="type-effectiveness__group">
        <h3>Resistant To</h3>
        <div class="type-effectiveness__badges">
          <span
            v-for="type in effectiveness.resistances"
            :key="type"
            class="type-badge"
            :style="{ backgroundColor: typeColors[type] }"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <div v-if="effectiveness.immunities.length" class="type-effectiveness__group">
        <h3>Immune To</h3>
        <div class="type-effectiveness__badges">
          <span
            v-for="type in effectiveness.immunities"
            :key="type"
            class="type-badge"
            :style="{ backgroundColor: typeColors[type] }"
          >
            {{ type }}
          </span>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.type-effectiveness {
  width: 100%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-lg);
}

.type-effectiveness h2 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.type-effectiveness__group {
  margin-bottom: var(--spacing-md);
}

.type-effectiveness__group:last-child {
  margin-bottom: 0;
}

.type-effectiveness__group h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.type-effectiveness__badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
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

.type-effectiveness__loading,
.type-effectiveness__error {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
