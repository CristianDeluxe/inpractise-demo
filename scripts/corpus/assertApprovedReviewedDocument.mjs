import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { normaliseDocument } from './normaliseDocument.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'

/**
 * Asserts that an accepted document's approval record and reviewed
 * normalised document are consistent and replay to the same document,
 * shared by the SEC and annual-report document-verification scripts.
 */
export async function assertApprovedReviewedDocument(root, entry, document) {
  const approvals = await readJson(`${root}/corpus/review/approvals.json`)
  assert.ok(
    approvals.documents.some(
      (item) =>
        item.documentId === entry.documentId &&
        item.revisionId === entry.reviewedRevisionId &&
        item.normalisedSha256 === entry.reviewedNormalisedSha256 &&
        item.status === 'approved' &&
        item.reviewedBy === 'owner',
    ),
  )
  const reviewed = await readJson(`${root}/${entry.reviewedNormalisedPath}`)
  assert.equal(
    sha256(await readFile(`${root}/${entry.reviewedNormalisedPath}`)),
    entry.reviewedNormalisedSha256,
  )
  assert.equal(reviewed.revisionId, entry.reviewedRevisionId)
  assert.deepEqual(document.passages, reviewed.passages)
  assert.deepEqual(document, normaliseDocument(reviewed, reviewed.sourceTurns))
}
