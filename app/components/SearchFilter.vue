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

<style scoped>
.search-filter {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.search-filter::placeholder {
  color: var(--color-text-muted);
}

.search-filter:focus {
  border-color: var(--color-input-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
</style>
