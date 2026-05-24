import { describe, it, expect } from 'vitest'
import { formatAbilities } from '../app/utils/formatAbilities'

describe('formatAbilities', () => {
  it('capitalizes and joins ability names', () => {
    const abilities = [
      { name: 'overgrow', is_hidden: false },
      { name: 'chlorophyll', is_hidden: true }
    ]
    expect(formatAbilities(abilities)).toBe('Overgrow, Chlorophyll')
  })

  it('handles hyphenated names', () => {
    const abilities = [
      { name: 'inner-focus', is_hidden: false },
      { name: 'multiscale', is_hidden: true }
    ]
    expect(formatAbilities(abilities)).toBe('Inner Focus, Multiscale')
  })

  it('handles a single ability', () => {
    const abilities = [{ name: 'levitate', is_hidden: false }]
    expect(formatAbilities(abilities)).toBe('Levitate')
  })

  it('returns empty string for empty array', () => {
    expect(formatAbilities([])).toBe('')
  })
})
