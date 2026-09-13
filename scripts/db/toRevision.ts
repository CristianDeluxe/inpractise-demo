import { z } from 'zod'
import type { CorpusDocument } from './CorpusDocument.ts'
import { canonicalJson } from './canonicalJson.ts'
import { passageHash } from './passageHash.ts'
import { readManifestProvenance } from './readManifestProvenance.ts'

export function toRevision(
  document: CorpusDocument,
  orgId: string,
  manifest: Record<string, unknown>,
  indexMode: 'hybrid' | 'lexical_only' = 'hybrid',
) {
  const { revisionId, ...payload } = document
  const { rawHash, normalizedHash, rightsBasis } = readManifestProvenance(
    manifest,
    document.documentId,
  )
  return {
    org_id: orgId,
    document_id: document.documentId,
    revision_id: revisionId,
    title: document.title,
    company: document.companySlug,
    kind: document.kind,
    origin: document.origin,
    source_url: document.sourceUrl,
    interview_date: document.interviewDate,
    report_date: z
      .string()
      .nullable()
      .parse(manifest['reportDate'] ?? null),
    published_at: document.publishedAt,
    raw_sha256: rawHash,
    normalized_sha256: normalizedHash,
    passage_sha256: passageHash(document),
    canonical_content: `${canonicalJson(payload)}\n`,
    parser_version: document.configuration.parser,
    chunker_version: document.configuration.chunker,
    embedding_model: 'text-embedding-3-small',
    index_mode: indexMode,
    coverage: z.json().parse(manifest['coverage'] ?? {}),
    rights_basis: rightsBasis,
    rights_status: 'approved',
  }
}
