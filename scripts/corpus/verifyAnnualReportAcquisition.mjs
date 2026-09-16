import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertHttpsUrl } from './assertHttpsUrl.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyAnnualReportAcquisition(root, manifest) {
  const acquisition = await readJson(
    `${root}/corpus/acquisition-annual-reports.json`,
  )
  const selectors = (
    await readJson(`${root}/corpus/sources-annual-reports.json`)
  ).selectors
  assert.deepEqual(
    acquisition.documents.map((entry) => entry.documentId),
    selectors.map((entry) => entry.documentId),
  )
  for (const request of acquisition.requests) {
    assertHttpsUrl(request.url)
    assert.ok(Number.isFinite(Date.parse(request.requestedAt)))
    if (request.path)
      assert.equal(
        sha256(await readFile(await resolveCorpusPath(root, request.path))),
        request.sha256,
        'ANNUAL_REPORT_ACQUISITION_BYTES',
      )
  }
  for (const acquired of acquisition.documents) {
    if (acquired.status !== 'acquired_pending_review') continue
    const selector = selectors.find(
      (entry) => entry.documentId === acquired.documentId,
    )
    assert.equal(acquired.sourceUrl, selector.sourceUrl)
    assert.equal(
      sha256(await readFile(await resolveCorpusPath(root, acquired.rawPath))),
      acquired.rawSha256,
    )
    const accepted = manifest.documents.find(
      (entry) => entry.documentId === acquired.documentId,
    )
    if (accepted) assert.equal(accepted.rawSha256, acquired.rawSha256)
  }
}
