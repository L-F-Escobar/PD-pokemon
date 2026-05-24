<script setup lang="ts">
const visible = ref(false)

function checkScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      class="back-to-top"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      &uarr;
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px var(--color-shadow);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition), transform var(--transition), box-shadow var(--transition);
}

.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--color-shadow-hover);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
