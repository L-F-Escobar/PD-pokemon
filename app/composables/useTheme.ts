type Theme = 'light' | 'dark'

const STORAGE_KEY = 'pokemon-theme'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  function applyTheme(value: Theme) {
    document.documentElement.setAttribute('data-theme', value)
  }

  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, theme.value)
    applyTheme(theme.value)
  }

  // Initialize from localStorage on client
  if (import.meta.client) {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored) {
      theme.value = stored
    }
    applyTheme(theme.value)
  }

  return {
    theme,
    toggle
  }
}
