import { canonicalJson } from './canonicalJson.mjs'
import { sha256 } from './sha256.mjs'

export function computeCorpusFingerprint(documents) {
  return sha256(
    canonicalJson(
      documents.map((entry) => ({
        documentId: entry.documentId,
        revisionId: entry.revisionId,
      })),
    ),
  )
}
