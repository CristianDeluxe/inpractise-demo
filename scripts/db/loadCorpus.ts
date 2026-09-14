import { existsSync, readFileSync, readdirSync } from 'node:fs'
import type { CorpusDocument } from './CorpusDocument.ts'
import { CorpusDocumentSchema } from './CorpusDocumentSchema.ts'
import { canonicalJson } from './canonicalJson.ts'
import { loadManifestEntry } from './loadManifestEntry.ts'
import { sha256 } from './sha256.ts'
import { validatePassageTokens } from './validators/validatePassageTokens.ts'

/**
 * Validate revision identity against the original JSON payload before importing.
 * Hashing only parsed fields could omit metadata from the identity check. Accepted
 * manifest provenance, explicit rights approval and recomputed token budgets are
 * also required; a well-formed document alone is not publishable evidence.
 */
export function loadCorpus(): CorpusDocument[] {
  const directory = existsSync('corpus/normalised')
    ? 'corpus/normalised'
    : existsSync('corpus/normalized')
      ? 'corpus/normalized'
      : null
  if (!directory)
    throw new Error(
      'Corpus unavailable: create corpus/normalised/*.json before importing',
    )
  const files = readdirSync(directory)
    .filter((file) => file.endsWith('.json'))
    .sort()
  if (!files.length)
    throw new Error('Corpus unavailable: no normalized JSON documents')
  return files.map((file) => {
    const raw = JSON.parse(
      readFileSync(`${directory}/${file}`, 'utf8'),
    ) as Record<string, unknown>
    const parsed = CorpusDocumentSchema.safeParse(raw)
    if (!parsed.success) throw new Error(`Invalid normalized document: ${file}`)
    const { revisionId, ...payload } = raw
    if (sha256(`${canonicalJson(payload)}\n`) !== revisionId)
      throw new Error(`Revision hash mismatch: ${file}`)
    if (
      new Set(parsed.data.passages.map((p) => p.passageId)).size !==
        parsed.data.passages.length ||
      new Set(parsed.data.passages.map((p) => p.ordinal)).size !==
        parsed.data.passages.length
    )
      throw new Error(`Duplicate passage identity: ${file}`)
    const manifest = loadManifestEntry(parsed.data.documentId)
    if (
      manifest['revisionId'] !== parsed.data.revisionId ||
      (manifest['rights'] as Record<string, unknown> | undefined)?.[
        'status'
      ] !== 'approved'
    )
      throw new Error(`Corpus publication approval mismatch: ${file}`)
    validatePassageTokens(parsed.data)
    return parsed.data
  })
}
