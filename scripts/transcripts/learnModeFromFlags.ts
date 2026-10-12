import type { LearnMode } from './LearnMode.ts'

export function learnModeFromFlags(argv: readonly string[]): LearnMode {
  if (argv.includes('--confirmed-by-references')) return 'references'
  return argv.includes('--accept-pending') ? 'accept-pending' : 'accepted'
}
