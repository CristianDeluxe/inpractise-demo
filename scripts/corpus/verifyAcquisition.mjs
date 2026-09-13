import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertSecUrl } from './assertSecUrl.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'

import { verifyAcquiredFiling } from './verifyAcquiredFiling.mjs'

export async function verifyAcquisition(root, manifest) {
  const acquisition = await readJson(`${root}/corpus/acquisition.json`)
  assert.equal(canonicalJson(manifest.acquisition), canonicalJson(acquisition))
  assert.equal(acquisition.documents.length, 4)
  const selectors = (await readJson(`${root}/corpus/sources.json`)).selectors
  assert.deepEqual(
    acquisition.documents.map((entry) => entry.documentId),
    selectors.map((entry) => entry.documentId),
  )
  for (const request of acquisition.requests) {
    assertSecUrl(request.url)
    assert.ok(Number.isFinite(Date.parse(request.requestedAt)))
    if (request.path)
      assert.equal(
        sha256(await readFile(await resolveCorpusPath(root, request.path))),
        request.sha256,
        'ACQUISITION_BYTES',
      )
  }
  for (const acquired of acquisition.documents) {
    if (acquired.status !== 'acquired_pending_review') continue
    const selector = selectors.find(
      (entry) => entry.documentId === acquired.documentId,
    )
    await verifyAcquiredFiling(root, acquisition, acquired, selector)
  }
}
