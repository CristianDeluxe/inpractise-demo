import type { CorpusDocument } from '../../scripts/db/CorpusDocument.ts'
import { canonicalJson } from '../../scripts/db/canonicalJson.ts'
import { sha256 } from '../../scripts/db/sha256.ts'

export function fixtureManifest(
  document: CorpusDocument,
  manifest: Record<string, unknown>,
) {
  return {
    ...manifest,
    normalisedSha256: sha256(`${canonicalJson(document)}\n`),
  }
}
