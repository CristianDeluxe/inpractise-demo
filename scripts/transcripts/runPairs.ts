import { analyzePair } from './analyzePair.ts'
import { appendExamples } from './appendExamples.ts'
import { learnPairGlossary } from './learnPairGlossary.ts'
import { pairExamples } from './pairExamples.ts'
import type { PairsOptions } from './PairsOptions.ts'
import type { PairsReport } from './PairsReport.ts'
import { readExamples } from './readExamples.ts'
import { readGlossary } from './readGlossary.ts'
import { readPairs } from './readPairs.ts'
import { tallyHunks } from './tallyHunks.ts'
import { writeGlossary } from './writeGlossary.ts'

/** Trains the memory from raw/final pairs; with dryRun it computes the same report and writes nothing. */
export function runPairs(options: PairsOptions): PairsReport {
  const pairs = readPairs(options.dir)
  const analyses = pairs.map((pair) => analyzePair(pair))
  const tallies = tallyHunks(analyses)
  const before = readGlossary()
  const glossary = learnPairGlossary(
    before,
    tallies,
    options.minOccurrences,
    new Date().toISOString(),
  )
  const existing = readExamples()
  const examples = pairs.flatMap((pair) => pairExamples(pair, existing))
  if (!options.dryRun) {
    writeGlossary(glossary)
    appendExamples(examples)
  }
  return {
    analyses,
    tallies,
    entriesWritten: tallies.filter(
      (tally) => tally.count >= options.minOccurrences,
    ).length,
    examplesWritten: examples.length,
    dryRun: options.dryRun,
  }
}
