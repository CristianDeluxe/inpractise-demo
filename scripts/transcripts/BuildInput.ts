import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { AsrMeta } from './AsrMeta.ts'
import type { RawSentence } from './RawSentence.ts'
import type { VideoInfo } from './VideoInfo.ts'

export type BuildInput = {
  readonly sentences: readonly RawSentence[]
  readonly info: VideoInfo
  readonly asr: AsrMeta
  readonly glossary: readonly MemoryEntry[]
  readonly transcribedAt: string
}
