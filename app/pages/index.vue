<script setup lang="ts">
const { pokemon, search, typeFilter, showFavoritesOnly, loading, hasMore, loadMore } = usePokemonList()

const isFiltering = computed(() => search.value || typeFilter.value || showFavoritesOnly.value)
</script>

<template>
  <main>
    <SearchFilter v-model:search="search" v-model:type-filter="typeFilter" v-model:show-favorites-only="showFavoritesOnly" />

    <div v-if="pokemon.length" class="pokemon-grid">
      <PokemonCard
        v-for="p in pokemon"
        :key="p.id"
        :pokemon="p"
      />
    </div>

    <p v-else-if="isFiltering" class="empty-state">No Pokémon found.</p>

    <p v-if="loading" class="loading-state">Loading...</p>

    <button
      v-if="hasMore && !isFiltering"
      :disabled="loading"
      class="load-more"
      @click="loadMore"
    >
      Load More
    </button>
  </main>
</template>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.load-more {
  display: block;
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: background-color var(--transition), border-color var(--transition), transform var(--transition);
}

.load-more:hover:not(:disabled) {
  background-color: var(--color-border);
  transform: translateY(-1px);
}

.load-more:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state,
.loading-state {
  text-align: center;
  color: var(--color-text-muted);
  margin-top: var(--spacing-xl);
  font-size: 1.1rem;
}
</style>
