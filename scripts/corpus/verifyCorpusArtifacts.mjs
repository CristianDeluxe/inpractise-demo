import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { canonicalJson } from './canonicalJson.mjs'
import { projectPublicSample } from './projectPublicSample.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyCorpusArtifacts(root, context) {
  const { manifest, accepted, core } = context
  assert.equal(
    manifest.passageCount,
    accepted.reduce((sum, document) => sum + document.passages.length, 0),
  )
  assert.equal(
    manifest.documents.filter((entry) => entry.origin === 'synthetic').length,
    6,
  )
  for (const artifact of Object.values(manifest.artifacts))
    assert.equal(
      sha256(await readFile(await resolveCorpusPath(root, artifact.path))),
      artifact.sha256,
    )
  const sample = await readJson(`${root}/corpus/sample.json`)
  assert.equal(
    canonicalJson(sample),
    canonicalJson(projectPublicSample(accepted)),
  )
  assert.deepEqual(
    sample.sources.map((source) => source.documentId),
    ['s1', 's2'],
  )
  const forbidden = [
    core.documents[5].turns[1].text.split(' ').at(-1).replace('.', ''),
    'CEDAR-29',
  ]
  for (const canary of forbidden)
    assert.ok(!canonicalJson(sample).includes(canary), 'PUBLIC_CANARY_LEAK')
  const embeddings = await readJson(`${root}/corpus/embeddings.json`)
  assert.equal(embeddings.dimensions, 1536)
  assert.equal(embeddings.model, 'text-embedding-3-small')
  assert.deepEqual(embeddings.vectors, [])
  assert.equal(embeddings.indexMode, 'lexical_only')
}
