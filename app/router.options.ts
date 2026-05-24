// Restores scroll position on back navigation (router.back()), scrolls to top on forward navigation.
// Detail page uses router.back() instead of NuxtLink to "/" so savedPosition is available.
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
}
