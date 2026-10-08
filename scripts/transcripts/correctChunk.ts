import { assembleParagraph } from './assembleParagraph.ts'
import { buildCorrectionPrompt } from './buildCorrectionPrompt.ts'
import type { ChunkContext } from './ChunkContext.ts'
import type { ChunkOutcome } from './ChunkOutcome.ts'
import { correctionInstructions } from './correctionInstructions.ts'
import type { CorrectionOptions } from './CorrectionOptions.ts'
import { CorrectionResponseSchema } from './CorrectionResponseSchema.ts'
import { examplesPerChunk } from './examplesPerChunk.ts'
import type { PreparedParagraph } from './PreparedParagraph.ts'
import { requestCorrection } from './requestCorrection.ts'
import { retrieveExamples } from './retrieveExamples.ts'
import { withRetry } from './withRetry.ts'

/** One model call over a chunk of paragraphs. A provider error throws; it is never a skip. */
export async function correctChunk(
  options: CorrectionOptions,
  context: ChunkContext,
  chunk: readonly PreparedParagraph[],
): Promise<ChunkOutcome> {
  const examples = retrieveExamples(
    chunk.map((paragraph) => paragraph.raw).join(' '),
    context.examples,
    examplesPerChunk,
  )
  const prompt = buildCorrectionPrompt(
    context.source,
    context.glossary,
    examples,
    chunk,
  )
  const result = await withRetry(2, async () => {
    const provided = await requestCorrection(options.provider, {
      model: options.model,
      instructions: correctionInstructions,
      prompt,
    })
    return {
      response: CorrectionResponseSchema.parse(provided.answer),
      usage: provided.usage,
    }
  })
  const assembled = chunk.map((prepared) =>
    assembleParagraph(
      prepared,
      result.response.paragraphs.find(
        (item) => item.paragraphId === prepared.id,
      ),
    ),
  )
  return {
    paragraphs: assembled.map((item) => item.paragraph),
    usage: result.usage,
    dropped: assembled.reduce((sum, item) => sum + item.dropped, 0),
    examplesUsed: examples.length,
    memoryHits: chunk.reduce((sum, item) => sum + item.memoryEdits.length, 0),
  }
}
