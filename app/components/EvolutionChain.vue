<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const { stages, loading, error } = useEvolutionChain(props.name)
</script>

<template>
  <section class="evolution-chain">
    <h2>Evolution Chain</h2>

    <p v-if="loading" class="evolution-chain__loading">Loading evolution data...</p>
    <p v-else-if="error" class="evolution-chain__error">Could not load evolution chain.</p>

    <div v-else-if="stages && stages.length > 1" class="evolution-chain__stages">
      <template v-for="(stage, index) in stages" :key="stage.id">
        <NuxtLink :to="`/pokemon/${stage.name}`" class="evolution-chain__stage">
          <img :src="stage.sprite" :alt="stage.name" width="80" height="80" />
          <span>{{ stage.name }}</span>
        </NuxtLink>
        <span v-if="index < stages.length - 1" class="evolution-chain__arrow">&rarr;</span>
      </template>
    </div>

    <p v-else-if="stages" class="evolution-chain__none">This Pokémon does not evolve.</p>
  </section>
</template>

<style scoped>
.evolution-chain {
  width: 100%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-lg);
}

.evolution-chain h2 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.evolution-chain__stages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.evolution-chain__stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  text-transform: capitalize;
  font-weight: 500;
  font-size: 0.9rem;
  transition: transform var(--transition);
}

.evolution-chain__stage:hover {
  transform: scale(1.05);
}

.evolution-chain__stage img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.evolution-chain__arrow {
  font-size: 1.5rem;
  color: var(--color-text-muted);
}

.evolution-chain__loading,
.evolution-chain__error,
.evolution-chain__none {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
