<script setup lang="ts">
import { typeColors } from '~/utils/typeColors'

const search = defineModel<string>('search', { default: '' })
const typeFilter = defineModel<string>('typeFilter', { default: '' })
const showFavoritesOnly = defineModel<boolean>('showFavoritesOnly', { default: false })

const types = Object.keys(typeColors)
const dropdownOpen = ref(false)

const dropdownRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (!typeFilter.value) return 'All Types'
  return typeFilter.value.charAt(0).toUpperCase() + typeFilter.value.slice(1)
})

function selectType(type: string) {
  typeFilter.value = type
  dropdownOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="search-bar">
    <div class="search-bar__input-wrapper">
      <input
        v-model="search"
        type="text"
        placeholder="Search Pokémon..."
        class="search-bar__input"
      />
      <button
        v-if="search"
        class="search-bar__clear"
        aria-label="Clear search"
        @click="search = ''"
      >
        &times;
      </button>
    </div>
    <button
      class="search-bar__fav-toggle"
      :class="{ 'search-bar__fav-toggle--active': showFavoritesOnly }"
      :aria-label="showFavoritesOnly ? 'Show all' : 'Show favorites only'"
      @click="showFavoritesOnly = !showFavoritesOnly"
    >
      &hearts; Favorites
    </button>
    <div ref="dropdownRef" class="dropdown">
      <button
        class="dropdown__trigger"
        :class="{ 'dropdown__trigger--active': dropdownOpen }"
        @click="dropdownOpen = !dropdownOpen"
      >
        {{ selectedLabel }}
        <span class="dropdown__chevron" :class="{ 'dropdown__chevron--open': dropdownOpen }">&#9662;</span>
      </button>
      <ul v-if="dropdownOpen" class="dropdown__menu">
        <li>
          <button
            class="dropdown__item"
            :class="{ 'dropdown__item--selected': !typeFilter }"
            @click="selectType('')"
          >
            All Types
          </button>
        </li>
        <li v-for="type in types" :key="type">
          <button
            class="dropdown__item"
            :class="{ 'dropdown__item--selected': typeFilter === type }"
            @click="selectType(type)"
          >
            <span class="dropdown__dot" :style="{ backgroundColor: typeColors[type] }" />
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: var(--spacing-sm);
}

.search-bar__input-wrapper {
  flex: 1;
  position: relative;
}

.search-bar__input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.search-bar__input::placeholder {
  color: var(--color-text-muted);
}

.search-bar__input:focus {
  border-color: var(--color-input-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.search-bar__clear {
  position: absolute;
  right: var(--spacing-xs);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  color: var(--color-text-muted);
  padding: 0.15rem 0.35rem;
  line-height: 1;
  border-radius: 50%;
  transition: color var(--transition), background-color var(--transition);
}

.search-bar__clear:hover {
  color: var(--color-text);
  background-color: var(--color-border);
}

.search-bar__fav-toggle {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: border-color var(--transition), color var(--transition);
}

.search-bar__fav-toggle:hover {
  border-color: var(--color-input-focus);
}

.search-bar__fav-toggle--active {
  color: #ef4444;
  border-color: #ef4444;
}

.dropdown {
  position: relative;
  min-width: 150px;
}

.dropdown__trigger {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.dropdown__trigger--active {
  border-color: var(--color-input-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.dropdown__chevron {
  font-size: 1.1rem;
  transition: transform var(--transition);
}

.dropdown__chevron--open {
  transform: rotate(180deg);
}

.dropdown__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 280px;
  overflow-y: auto;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 16px var(--color-shadow-hover);
  list-style: none;
  z-index: 10;
}

.dropdown__item {
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.9rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-align: left;
  transition: background-color var(--transition);
}

.dropdown__item:hover {
  background-color: var(--color-border);
}

.dropdown__item--selected {
  font-weight: 600;
}

.dropdown__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
