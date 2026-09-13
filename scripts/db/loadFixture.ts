import { readFileSync } from 'node:fs'
import { CorpusDocumentSchema } from './CorpusDocumentSchema.ts'
import { canonicalJson } from './canonicalJson.ts'
import { sha256 } from './sha256.ts'

export function loadFixture(name: 's5-v2' | 's6-org-b') {
  const path = `corpus/fixtures/normalised/${name}.json`
  const raw = JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>
  const { revisionId, ...payload } = raw
  if (sha256(`${canonicalJson(payload)}\n`) !== revisionId)
    throw new Error('Fixture revision hash mismatch')
  const document = CorpusDocumentSchema.parse(raw)
  const manifest = JSON.parse(readFileSync('corpus/manifest.json', 'utf8')) as {
    fixtures: Record<string, unknown>[]
    documents: Record<string, unknown>[]
  }
  const fixture = manifest.fixtures.find(
    (entry) => entry['normalisedPath'] === path,
  )
  const base = manifest.documents.find(
    (entry) => entry['documentId'] === document.documentId,
  )
  if (!fixture || !base) throw new Error('Fixture manifest entry missing')
  if (
    typeof fixture['rawPath'] !== 'string' ||
    sha256(readFileSync(fixture['rawPath'])) !== fixture['rawSha256'] ||
    sha256(readFileSync(path)) !== fixture['normalisedSha256']
  )
    throw new Error('Fixture provenance hash mismatch')
  return { document, manifest: { ...base, ...fixture } }
}
