import { assertYoutubeId } from './assertYoutubeId.ts'
import { learnModeFromFlags } from './learnModeFromFlags.ts'
import { learnTranscript } from './learnTranscript.ts'

export function runLearnCommand(argv: readonly string[]): void {
  const result = learnTranscript(
    assertYoutubeId(argv.find((arg) => !arg.startsWith('--'))),
    learnModeFromFlags(argv),
  )
  console.log(
    `counted edits: ${String(result.counted)}; glossary entries: ${String(result.glossaryEntries)} ` +
      `(+${String(result.newEntries)} new, ${String(result.updatedEntries)} updated); new examples: ${String(result.newExamples)}`,
  )
  for (const entry of result.learned)
    console.log(
      `  "${entry.from}" -> "${entry.to}" (${entry.category}, x${String(entry.occurrences)}, ${entry.basis})`,
    )
}
