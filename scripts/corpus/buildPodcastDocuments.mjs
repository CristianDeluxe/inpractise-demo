import { createPodcastSource } from './createPodcastSource.mjs'
import { podcastManifestMetadata } from './podcastManifestMetadata.mjs'
import { readPodcastRecords } from './readPodcastRecords.mjs'
import { writeDocument } from './writeDocument.mjs'

/**
 * Builds one accepted public_interview document per committed podcast record.
 * The record file itself is the raw source the manifest hashes.
 */
export async function buildPodcastDocuments(root, syntheticOnly) {
  const documents = []
  if (syntheticOnly) return { documents }
  for (const record of await readPodcastRecords(root)) {
    const source = createPodcastSource(record)
    documents.push(
      await writeDocument(root, source, source.turns, {
        extra: podcastManifestMetadata(record),
      }),
    )
  }
  return { documents }
}
