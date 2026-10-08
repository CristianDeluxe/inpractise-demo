import { transcriptIdPattern } from './transcriptIdPattern.ts'

export function isTranscriptId(value: string) {
  return transcriptIdPattern.test(value)
}
