import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { episodeDirectory } from '../episodes/episodeDirectory'
import type { SpeakerLabels } from './SpeakerLabels'

export function buildSpeakerLabels(
  transcript: TranscriptDocument,
): SpeakerLabels | null {
  const episode = episodeDirectory[transcript.id]
  if (transcript.speakers === undefined || episode === undefined) return null
  return {
    turns: transcript.speakers.turns,
    names: { host: episode.host, guest: episode.guest },
  }
}
