import { bundleFixture } from './bundleFixture'

/** One lab_transcripts row as PostgREST returns it, with every column the lab reads. */
export function labTranscriptRowFixture() {
  const { transcript, correction } = bundleFixture()
  return {
    org_id: 'demo-org',
    transcript_id: transcript.id,
    title: transcript.source.title,
    source: transcript.source,
    stats: transcript.stats,
    duration_seconds: transcript.source.durationSeconds,
    asr_model: transcript.asrModel,
    asr_seconds: transcript.asrSeconds,
    transcript,
    correction,
    correction_model: 'claude-sonnet-5',
    correction_input_tokens: 30_000,
    correction_output_tokens: 40_000,
    edit_count: 3,
    peaks: null,
    audio_object: `demo-org/${transcript.id}.m4a`,
  }
}
