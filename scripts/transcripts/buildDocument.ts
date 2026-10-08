import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument.ts'
import type { BuildInput } from './BuildInput.ts'
import { buildParagraphs } from './buildParagraphs.ts'
import { buildSource } from './buildSource.ts'
import { buildStats } from './buildStats.ts'
import { flagWords } from './flagWords.ts'
import { mergeSentences } from './mergeSentences.ts'
import { splitParagraphs } from './splitParagraphs.ts'

export function buildDocument(input: BuildInput): TranscriptDocument {
  const merged = mergeSentences(input.sentences)
  const words = flagWords(merged, input.glossary)
  return {
    id: input.info.id,
    source: buildSource(input.info),
    asrModel: input.asr.model,
    transcribedAt: input.transcribedAt,
    asrSeconds: input.asr.seconds,
    paragraphs: buildParagraphs(words, splitParagraphs(merged)),
    stats: buildStats(words),
  }
}
