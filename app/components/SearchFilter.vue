<script setup lang="ts">
const model = defineModel<string>({ default: '' })
</script>

<template>
  <input
    v-model="model"
    type="text"
    placeholder="Search Pokémon..."
    class="search-filter"
  />
</template>
