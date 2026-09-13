import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { renderTranscript } from './renderTranscript.mjs'
import { sha256 } from './sha256.mjs'

export async function verifySyntheticDocument(root, entry, document, context) {
  const { core, authority } = context
  const source = core.documents.find((item) => item.sourceId === entry.sourceId)
  assert.ok(source)
  assert.equal(
    canonicalJson(document),
    canonicalJson(normaliseDocument(source)),
    'GOLD_DOCUMENT_PRESERVATION',
  )
  assert.equal(
    await readFile(`${root}/${entry.rawPath}`, 'utf8'),
    renderTranscript(source, source.turns),
  )
  assert.match(document.disclosure, /^Synthetic interview/)
  for (const turn of source.turns)
    assert.equal(
      sha256(turn.text),
      authority.paragraphHashes[`${source.sourceId}/${turn.paragraphId}`],
      'GOLD_FACT_HASH',
    )
}
