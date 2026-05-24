<script setup lang="ts">
const { theme, toggle } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
    @click="toggle"
  >
    <span v-if="theme === 'light'">&#9790;</span>
    <span v-else>&#9728;</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  font-size: 1.5rem;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition);
}

.theme-toggle:hover {
  background-color: var(--color-border);
}
</style>
