<template>
  <div>
    <NuxtRouteAnnouncer />
    <header class="site-header">
      <div class="container site-header__inner">
        <NuxtLink to="/" class="site-header__title">Pokémon Explorer</NuxtLink>
        <ThemeToggle />
      </div>
    </header>
    <div class="container">
      <NuxtPage />
    </div>
    <BackToTop />
  </div>
</template>

<style scoped>
.site-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-lg);
  transition: background-color var(--transition), border-color var(--transition);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-header__title {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
