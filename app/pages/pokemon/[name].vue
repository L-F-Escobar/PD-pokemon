<script setup lang="ts">
const route = useRoute()
const name = route.params.name as string
const { pokemon, loading, error } = usePokemonDetail(name)
</script>

<template>
  <main>
    <NuxtLink to="/" class="back-link">&larr; Back</NuxtLink>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>
    <PokemonProfile v-else-if="pokemon" :pokemon="pokemon" />
  </main>
</template>
