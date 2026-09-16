import assert from 'node:assert/strict'
import { documentKind } from './documentKind.mjs'

/**
 * The kind consistency check factored out of verifyDocumentIdentity.mjs:
 * synthetic keeps synthetic_interview, and public now resolves to either
 * sec_filing or annual_report_pdf via the same rule normaliseDocument.mjs
 * uses, so the two can never drift apart.
 */
export function verifyKindFields(document) {
  assert.ok(
    ['synthetic_interview', 'sec_filing', 'annual_report_pdf'].includes(
      document.kind,
    ),
  )
  assert.equal(document.kind, documentKind(document))
}
