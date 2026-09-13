import assert from 'node:assert/strict'
import { verifyDocument } from './verifyDocument.mjs'

import { verifyPublicDocument } from './verifyPublicDocument.mjs'
import { verifySyntheticDocument } from './verifySyntheticDocument.mjs'

export async function verifyAcceptedDocuments(root, manifest, context) {
  const accepted = []
  for (const entry of manifest.documents) {
    assert.equal(entry.status, 'accepted')
    assert.equal(entry.rights.status, 'approved')
    assert.ok(entry.rights.basis)
    const document = await verifyDocument(root, entry)
    accepted.push(document)
    if (entry.origin === 'synthetic')
      await verifySyntheticDocument(root, entry, document, context)
    else await verifyPublicDocument(root, entry, document)
  }
  return accepted
}
