import type { QualityReportEpisode } from './QualityReportEpisode.ts'

/** The fields of docs/transcript-quality.json that the UI snapshot mirrors. */
export type QualityReport = {
  readonly measuredOn: string
  readonly episodes: Record<string, QualityReportEpisode>
}
