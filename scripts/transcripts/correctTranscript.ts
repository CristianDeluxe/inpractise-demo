import { assembleRun } from './assembleRun.ts'
import { chunkItems } from './chunkItems.ts'
import { chunkSize } from './chunkSize.ts'
import { correctChunk } from './correctChunk.ts'
import type { CorrectionOptions } from './CorrectionOptions.ts'
import type { CorrectionResult } from './CorrectionResult.ts'
import { prepareParagraph } from './prepareParagraph.ts'
import { readExamples } from './readExamples.ts'
import { readGlossary } from './readGlossary.ts'
import { readJsonFile } from './readJsonFile.ts'
import { runWithConcurrency } from './runWithConcurrency.ts'
import { TranscriptDocumentSchema } from './TranscriptDocumentSchema.ts'
import { transcriptPath } from './transcriptPath.ts'
import { writeJsonFile } from './writeJsonFile.ts'

export async function correctTranscript(
  options: CorrectionOptions,
): Promise<CorrectionResult> {
  const document = readJsonFile(
    transcriptPath(options.id, 'transcript.json'),
    TranscriptDocumentSchema,
  )
  const glossary = readGlossary()
  const context = {
    source: document.source,
    glossary,
    examples: readExamples(),
  }
  const startedAt = new Date()
  const prepared = document.paragraphs
    .slice(0, options.limit)
    .map((paragraph) => prepareParagraph(paragraph, glossary))
  const chunks = chunkItems(prepared, chunkSize)
  let finished = 0
  const outcomes = await runWithConcurrency(
    chunks,
    options.concurrency,
    async (chunk) => {
      const outcome = await correctChunk(options, context, chunk)
      finished += 1
      console.log(`chunk ${String(finished)}/${String(chunks.length)} done`)
      return outcome
    },
  )
  const run = assembleRun(options, startedAt, glossary.length, outcomes)
  writeJsonFile(transcriptPath(options.id, 'correction.json'), run)
  return {
    run,
    dropped: outcomes.reduce((sum, outcome) => sum + outcome.dropped, 0),
  }
}
