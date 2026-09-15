import type { CompareSideName } from './CompareSideName.ts'
import type { SidesRetrieval } from './SidesRetrieval.ts'

/** The sides that supplied no readable passage, in a fixed order. */
export function uncoveredSides(sides: SidesRetrieval): CompareSideName[] {
  const names: CompareSideName[] = ['interviews', 'filings']
  return names.filter((name) => sides[name].sources.length === 0)
}
