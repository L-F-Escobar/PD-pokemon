<script setup lang="ts">
const { pokemon, search, loading, hasMore, loadMore } = usePokemonList()
</script>

<template>
  <main>
    <h1>Pokémon Explorer</h1>
    <SearchFilter v-model="search" />

    <div v-if="pokemon.length" class="pokemon-grid">
      <PokemonCard
        v-for="p in pokemon"
        :key="p.id"
        :pokemon="p"
      />
    </div>

    <p v-else-if="search">No Pokémon found.</p>

    <p v-if="loading">Loading...</p>

    <button
      v-if="hasMore && !search"
      :disabled="loading"
      class="load-more"
      @click="loadMore"
    >
      Load More
    </button>
  </main>
</template>
