import { parseArgs } from 'node:util'
import { defaultPairsDir } from './defaultPairsDir.ts'
import type { PairsOptions } from './PairsOptions.ts'
import { toPositiveInteger } from './toPositiveInteger.ts'

export function parsePairsArgs(argv: readonly string[]): PairsOptions {
  const { values } = parseArgs({
    args: [...argv],
    options: {
      dir: { type: 'string' },
      'min-occurrences': { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
    },
  })
  return {
    dir: values.dir ?? defaultPairsDir,
    minOccurrences:
      toPositiveInteger(values['min-occurrences'], '--min-occurrences') ?? 2,
    dryRun: values['dry-run'],
  }
}
