import type { CompareSideName } from './CompareSideName'
import { compareSideLabels } from './compareSideLabels'

export function compareSideLabel(name: CompareSideName): string {
  return compareSideLabels[name]
}
