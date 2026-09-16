import assert from 'node:assert/strict'
import { canonicalJson } from './canonicalJson.mjs'
import { readExpectedCounts } from './readExpectedCounts.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyManifest(root, manifest) {
  const counts = await readExpectedCounts(root)
  assert.equal(manifest.schemaVersion, 1)
  assert.equal(manifest.documentCount, manifest.documents.length)
  assert.equal(manifest.syntheticDocumentCount, counts.syntheticDocumentCount)
  assert.equal(
    manifest.publicDocumentCount,
    manifest.documents.filter((entry) => entry.origin === 'public').length,
  )
  assert.equal(manifest.requestedDocumentCount, counts.requestedDocumentCount)
  assert.equal(manifest.indexMode, 'lexical_only')
  assert.equal(manifest.vectorCount, 0)
  assert.equal(
    manifest.mode,
    manifest.publicDocumentCount ? 'public_and_synthetic' : 'synthetic_only',
  )
  assert.equal(
    new Set(manifest.documents.map((entry) => entry.documentId)).size,
    manifest.documents.length,
  )
  assert.equal(
    manifest.corpusFingerprint,
    sha256(
      canonicalJson(
        manifest.documents.map((entry) => ({
          documentId: entry.documentId,
          revisionId: entry.revisionId,
        })),
      ),
    ),
  )
}
