import { PODCAST_HOST } from './podcastHost.mjs'

/**
 * Builds the committed corpus/podcasts record from one episode's transcript
 * and diarization. Turn text is copied verbatim; only the timing keys are
 * renamed.
 */
export function createPodcastRecord(identity, transcript, speakers) {
  const { source } = transcript
  return {
    youtubeId: source.youtubeId,
    documentId: identity.documentId,
    documentTitle: `${identity.company} CEO ${identity.guest.name} on In Good Company`,
    url: source.url,
    title: source.title,
    channel: source.channel,
    uploadDate: source.uploadDate,
    durationSeconds: source.durationSeconds,
    asrModel: transcript.asrModel,
    diarization: speakers.method,
    company: identity.company,
    companySlug: identity.companySlug,
    host: PODCAST_HOST,
    guest: identity.guest,
    turns: speakers.turns.map((turn) => ({
      role: turn.role,
      startSeconds: turn.start,
      endSeconds: turn.end,
      text: turn.text,
    })),
  }
}
