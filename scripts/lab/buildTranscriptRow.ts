import { countProposedEdits } from './countProposedEdits.ts'
import type { EpisodeCorrection } from './EpisodeCorrection.ts'
import type { EpisodeTranscript } from './EpisodeTranscript.ts'
import type { LabTranscriptRow } from './LabTranscriptRow.ts'
import { readEpisodeJson } from './readEpisodeJson.ts'

/** The row for one organisation, built from the episode folder's files. */
export function buildTranscriptRow(
  orgId: string,
  id: string,
): LabTranscriptRow {
  const transcript = readEpisodeJson(id, 'transcript.json') as EpisodeTranscript
  const correction = readEpisodeJson(
    id,
    'correction.json',
  ) as EpisodeCorrection | null
  return {
    org_id: orgId,
    transcript_id: id,
    title: transcript.source.title,
    source: transcript.source,
    stats: transcript.stats,
    duration_seconds: transcript.source.durationSeconds,
    asr_model: transcript.asrModel,
    asr_seconds: transcript.asrSeconds,
    transcript,
    correction,
    correction_model: correction?.model ?? null,
    correction_input_tokens: correction?.usage.inputTokens ?? null,
    correction_output_tokens: correction?.usage.outputTokens ?? null,
    edit_count: countProposedEdits(correction),
    peaks: readEpisodeJson(id, 'peaks.json'),
    audio_object: `${orgId}/${id}.m4a`,
  }
}
