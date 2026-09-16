import { readJson } from './readJson.mjs'
import { writeDocument } from './writeDocument.mjs'

/**
 * Builds the accepted-document manifest entries for one review batch,
 * shared by the SEC and annual-report build scripts; only the manifest
 * metadata attached to each accepted document differs between them.
 */
export async function buildApprovedDocuments({
  root,
  reviews,
  approvals,
  syntheticOnly,
  buildManifestExtra,
}) {
  const documents = []
  const excluded = []
  for (const candidate of reviews.documents) {
    const approval = approvals.documents.find(
      (entry) =>
        entry.documentId === candidate.documentId &&
        entry.revisionId === candidate.revisionId &&
        entry.status === 'approved' &&
        entry.reviewedBy === 'owner' &&
        Number.isFinite(Date.parse(entry.reviewedAt)),
    )
    if (
      syntheticOnly ||
      !approval ||
      candidate.status !== 'parsed_pending_review'
    ) {
      excluded.push({
        ...candidate,
        exclusionReason: syntheticOnly
          ? 'explicit_synthetic_only_mode'
          : 'pending_owner_boundary_review',
      })
      continue
    }
    const document = await readJson(`${root}/${candidate.normalisedPath}`)
    if (document.revisionId !== approval.revisionId)
      throw new Error('REVIEW_REVISION_MISMATCH')
    documents.push(
      await writeDocument(root, document, document.sourceTurns, {
        extra: buildManifestExtra(candidate, approval),
      }),
    )
  }
  return { documents, excluded }
}
