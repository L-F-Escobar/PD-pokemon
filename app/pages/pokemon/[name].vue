<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const name = route.params.name as string
const { pokemon, loading, error } = usePokemonDetail(name)
</script>

<template>
  <main>
    <button class="back-link" @click="router.back()">&larr; Back</button>

    <p v-if="loading" class="loading-state">Loading...</p>
    <p v-else-if="error" class="error-state">{{ error.message }}</p>
    <PokemonProfile v-else-if="pokemon" :pokemon="pokemon" />
  </main>
</template>

<style scoped>
.back-link {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-text-muted);
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: color var(--transition), background-color var(--transition);
}

.back-link:hover {
  color: var(--color-text);
  background-color: var(--color-surface);
}

.loading-state,
.error-state {
  text-align: center;
  color: var(--color-text-muted);
  margin-top: var(--spacing-xl);
  font-size: 1.1rem;
}
</style>
