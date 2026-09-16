import assert from 'node:assert/strict'
import { canonicalJson } from './canonicalJson.mjs'
import { sha256 } from './sha256.mjs'
import { verifyKindFields } from './verifyKindFields.mjs'

export function verifyDocumentIdentity(document, entry) {
  const { revisionId, ...payload } = document
  assert.match(revisionId, /^[a-f0-9]{64}$/)
  assert.equal(
    revisionId,
    sha256(`${canonicalJson(payload)}\n`),
    'REVISION_HASH',
  )
  assert.equal(revisionId, entry.revisionId)
  assert.equal(document.documentId, entry.documentId)
  assert.equal(document.origin, entry.origin)
  assert.ok(['synthetic', 'public'].includes(document.origin))
  assert.equal(document.kind, entry.kind)
  verifyKindFields(document)
  assert.equal(Object.hasOwn(entry, 'sourceKind'), false)
  assert.equal(document.synthetic, document.origin === 'synthetic')
  assert.equal(document.fictional, document.synthetic)
  assert.equal(document.disclosure, entry.disclosure)
  assert.equal(document.sourceUrl, entry.sourceUrl)
  assert.equal(document.requiredTier, entry.requiredTier)
  assert.equal(entry.vectorCount, 0)
  assert.equal(entry.indexMode, 'lexical_only')
  assert.ok(document.sourceTurns.length > 0)
  assert.equal(
    new Set(document.sourceTurns.map((turn) => turn.paragraphId)).size,
    document.sourceTurns.length,
  )
  assert.equal(document.passages.length, entry.passageCount)
  assert.equal(
    document.sourceText,
    document.sourceTurns.map((turn) => turn.text).join('\n\n'),
  )
  assert.equal(
    new Set(document.passages.map((passage) => passage.passageId)).size,
    document.passages.length,
  )
}
