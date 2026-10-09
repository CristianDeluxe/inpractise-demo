import type { EpisodeQuality } from '@/transcripts/quality/EpisodeQuality.ts'
import type { QualityReportEpisode } from './QualityReportEpisode.ts'

export function qualityFromReport(
  episodes: Record<string, QualityReportEpisode>,
): Record<string, EpisodeQuality> {
  return Object.fromEntries(
    Object.entries(episodes).map(([id, episode]) => [
      id,
      {
        rawWer: episode.agreement.whisper.raw.wer,
        finalWer: episode.agreement.whisper.final.wer,
        edits: episode.edits,
        styleOnly: episode.styleOnly,
        confirmed: episode.contentEdits.applied.confirmed ?? 0,
        contradicted: episode.contentEdits.applied.contradicted ?? 0,
        contested: episode.contentEdits.applied.contested ?? 0,
      },
    ]),
  )
}
