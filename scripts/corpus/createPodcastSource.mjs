import { createPodcastTurns } from './createPodcastTurns.mjs'
import { PODCAST_DISCLOSURE } from './podcastDisclosure.mjs'

/**
 * The source document a podcast record normalises from. Host and guest names
 * travel in moderatorName and operatorName, which every passage speaker is
 * derived from.
 */
export function createPodcastSource(record) {
  return {
    sourceId: record.documentId,
    documentId: record.documentId,
    title: record.documentTitle,
    company: record.company,
    companySlug: record.companySlug,
    origin: 'public',
    kind: 'public_interview',
    disclosure: PODCAST_DISCLOSURE,
    requiredTier: 'basic',
    sourceUrl: record.url,
    interviewDate: record.uploadDate,
    publishedAt: `${record.uploadDate}T00:00:00Z`,
    operatorName: record.guest.name,
    moderatorName: record.host.name,
    turns: createPodcastTurns(record),
  }
}
