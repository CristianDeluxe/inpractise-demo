import assert from 'node:assert/strict'
import { canonicalJson } from './canonicalJson.mjs'
import { createPodcastSource } from './createPodcastSource.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { PODCAST_DISCLOSURE } from './podcastDisclosure.mjs'
import { PODCAST_RIGHTS_BASIS } from './podcastRightsBasis.mjs'
import { readJson } from './readJson.mjs'

export async function verifyPodcastDocument(root, entry, document) {
  assert.equal(entry.origin, 'public')
  assert.equal(entry.kind, 'public_interview')
  assert.equal(entry.synthetic, false)
  assert.equal(entry.fictional, false)
  assert.ok(entry.sourceUrl.startsWith('https://www.youtube.com/'))
  assert.equal(entry.disclosure, PODCAST_DISCLOSURE)
  assert.equal(entry.rights.basis, PODCAST_RIGHTS_BASIS)
  assert.equal(entry.reviewStatus, 'approved')
  assert.equal(entry.rawPath, `corpus/podcasts/${entry.youtubeId}.json`)
  const record = await readJson(`${root}/${entry.rawPath}`)
  assert.equal(record.youtubeId, entry.youtubeId)
  assert.equal(record.url, entry.sourceUrl)
  const source = createPodcastSource(record)
  assert.equal(
    canonicalJson(document),
    canonicalJson(normaliseDocument(source, source.turns)),
    'PODCAST_REPLAY',
  )
}
