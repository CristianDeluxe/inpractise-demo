import type { ConfidenceBand } from '../contracts/ConfidenceBand'
import { bandClass } from './bandClass'

export function wordClassName(band: ConfidenceBand, flagged: boolean) {
  return [
    '-mx-0.5 inline rounded-sm px-0.5 text-left align-baseline transition-colors hover:bg-primary/25',
    bandClass[band],
    flagged
      ? 'underline decoration-dotted decoration-2 underline-offset-4'
      : '',
  ].join(' ')
}
