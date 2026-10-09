import type { EpisodeQuality } from './EpisodeQuality'

/** Snapshot of docs/transcript-quality.json (2026-10-09), keyed by transcript id. A test keeps them equal. */
export const measuredQuality: Readonly<Record<string, EpisodeQuality>> = {
  LQ6lAvNMjPE: {
    rawWer: 0.0336,
    finalWer: 0.0274,
    edits: 387,
    styleOnly: 327,
    confirmed: 29,
    contradicted: 5,
    contested: 14,
  },
  A_z4Jow0c7A: {
    rawWer: 0.0435,
    finalWer: 0.0355,
    edits: 378,
    styleOnly: 258,
    confirmed: 36,
    contradicted: 7,
    contested: 29,
  },
}
