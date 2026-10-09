import { useMemo } from 'react'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { buildSpeakerLabels } from '../speakers/buildSpeakerLabels'

export function useEpisodeSpeakers(transcript: TranscriptDocument) {
  return useMemo(() => buildSpeakerLabels(transcript), [transcript])
}
