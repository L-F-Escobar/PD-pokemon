const STORAGE_KEY = 'pokemon-favorites'

// Manages favorited pokemon IDs with localStorage persistence.
export function useFavorites() {
  const favorites = useState<number[]>('favorites', () => [])
  const showFavoritesOnly = ref(false)

  // Initialize from localStorage on client
  if (import.meta.client) {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  }

  function save() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
    }
  }

  function toggle(id: number) {
    const index = favorites.value.indexOf(id)
    if (index === -1) {
      favorites.value.push(id)
    } else {
      favorites.value.splice(index, 1)
    }
    save()
  }

  function isFavorite(id: number): boolean {
    return favorites.value.includes(id)
  }

  return {
    favorites,
    showFavoritesOnly,
    toggle,
    isFavorite
  }
}
