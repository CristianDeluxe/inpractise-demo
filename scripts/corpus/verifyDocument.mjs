import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'
import { verifyDocumentIdentity } from './verifyDocumentIdentity.mjs'
import { verifyPassageBounds } from './verifyPassageBounds.mjs'
import { verifyPassageOffsets } from './verifyPassageOffsets.mjs'
import { verifySourceCoverage } from './verifySourceCoverage.mjs'

export async function verifyDocument(root, entry) {
  const bytes = await readFile(
    await resolveCorpusPath(root, entry.normalisedPath),
  )
  assert.equal(sha256(bytes), entry.normalisedSha256, 'NORMALISED_FILE_HASH')
  assert.equal(
    sha256(await readFile(await resolveCorpusPath(root, entry.rawPath))),
    entry.rawSha256,
    'RAW_FILE_HASH',
  )
  const document = await readJson(
    await resolveCorpusPath(root, entry.normalisedPath),
  )
  verifyDocumentIdentity(document, entry)
  let tokens = 0
  for (const [index, passage] of document.passages.entries()) {
    verifyPassageBounds(passage, index)
    verifyPassageOffsets(document, passage)
    tokens += passage.tokenCount
  }
  verifySourceCoverage(document)
  assert.equal(tokens, entry.totalTokens)
  assert.equal(
    canonicalJson(document),
    canonicalJson(normaliseDocument(document, document.sourceTurns)),
    'DETERMINISTIC_REPLAY',
  )
  return document
}
