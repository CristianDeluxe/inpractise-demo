import type { ConfidenceBand } from '../contracts/ConfidenceBand'
import { bandClass } from './bandClass'
import { underlineClass } from './underlineClass'

export function wordClassName(band: ConfidenceBand, flagged: boolean) {
  return [
    '-mx-0.5 inline rounded-sm px-0.5 text-left align-baseline decoration-1 underline-offset-4 transition-colors hover:bg-primary/20 hover:decoration-2 focus-visible:bg-primary/20 focus-visible:decoration-2',
    bandClass[band],
    underlineClass(band, flagged),
  ].join(' ')
}
