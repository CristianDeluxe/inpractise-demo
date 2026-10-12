import { appendExamples } from './appendExamples.ts'
import { attachVerdicts } from './attachVerdicts.ts'
import { CorrectionRunSchema } from './CorrectionRunSchema.ts'
import { learnedEditsFor } from './learnedEditsFor.ts'
import { learnExamples } from './learnExamples.ts'
import { learnGlossary } from './learnGlossary.ts'
import type { LearnMode } from './LearnMode.ts'
import type { LearnResult } from './LearnResult.ts'
import { paragraphText } from './paragraphText.ts'
import { readExamples } from './readExamples.ts'
import { readGlossary } from './readGlossary.ts'
import { readJsonFile } from './readJsonFile.ts'
import { readReview } from './readReview.ts'
import { TranscriptDocumentSchema } from './TranscriptDocumentSchema.ts'
import { transcriptPath } from './transcriptPath.ts'
import { writeGlossary } from './writeGlossary.ts'

/** Turns reviewed, or reference-confirmed, corrections into glossary entries and few-shot examples. */
export function learnTranscript(id: string, mode: LearnMode): LearnResult {
  const run = readJsonFile(
    transcriptPath(id, 'correction.json'),
    CorrectionRunSchema,
  )
  const document = readJsonFile(
    transcriptPath(id, 'transcript.json'),
    TranscriptDocumentSchema,
  )
  const edits = attachVerdicts(run, readReview(id))
  const selection = learnedEditsFor(id, edits, mode)
  const before = readGlossary()
  const glossary = learnGlossary(before, selection.glossary, {
    transcriptId: id,
    seenAt: new Date().toISOString(),
    basis: selection.basis,
  })
  const known = new Set(before.map((entry) => entry.from))
  const touched = glossary.filter(
    (entry, index) => entry !== before[index] && entry.sources.includes(id),
  )
  const examples = learnExamples({
    transcriptId: id,
    run,
    rawByParagraph: new Map(
      document.paragraphs.map((paragraph) => [
        paragraph.id,
        paragraphText(paragraph),
      ]),
    ),
    edits,
    counted: selection.examples,
    existing: readExamples(),
  })
  writeGlossary(glossary)
  appendExamples(examples)
  return {
    counted: selection.glossary.length,
    glossaryEntries: glossary.length,
    newEntries: touched.filter((entry) => !known.has(entry.from)).length,
    updatedEntries: touched.filter((entry) => known.has(entry.from)).length,
    newExamples: examples.length,
    learned: touched,
  }
}
