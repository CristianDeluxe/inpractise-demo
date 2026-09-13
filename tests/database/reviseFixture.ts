import type { CorpusDocument } from '../../scripts/db/CorpusDocument.ts'
import { canonicalJson } from '../../scripts/db/canonicalJson.ts'
import { sha256 } from '../../scripts/db/sha256.ts'
import { requireValue } from '../assertions/requireValue.ts'

export function reviseFixture(
  source: CorpusDocument,
  documentId: string,
  text?: string,
): CorpusDocument {
  const { revisionId: _discarded, ...payload } = structuredClone(source)
  payload.documentId = documentId
  if (text) requireValue(payload.passages[1]).text = text
  return { ...payload, revisionId: sha256(`${canonicalJson(payload)}\n`) }
}
