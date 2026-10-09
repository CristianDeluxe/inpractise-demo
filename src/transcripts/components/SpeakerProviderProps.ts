import type { ReactNode } from 'react'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'

export type SpeakerProviderProps = {
  readonly transcript: TranscriptDocument
  readonly children: ReactNode
}
