import type { SpeakerTimeline } from '@/transcripts/contracts/SpeakerTimeline.ts'
import { readEpisodeJson } from './readEpisodeJson.ts'
import type { SpeakersFile } from './SpeakersFile.ts'

/** The episode's diarization without the raw turn text, or undefined when it was not diarized. */
export function speakerTimeline(id: string): SpeakerTimeline | undefined {
  const file = readEpisodeJson(id, 'speakers.json') as SpeakersFile | null
  if (file === null) return undefined
  return {
    method: file.method,
    turns: file.turns.map(({ role, start, end }) => ({ role, start, end })),
  }
}
