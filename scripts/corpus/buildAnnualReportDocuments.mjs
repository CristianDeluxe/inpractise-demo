import { annualReportManifestMetadata } from './annualReportManifestMetadata.mjs'
import { readJson } from './readJson.mjs'
import { writeDocument } from './writeDocument.mjs'

export async function buildAnnualReportDocuments(
  root,
  reviews,
  approvals,
  syntheticOnly,
) {
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
        extra: annualReportManifestMetadata(candidate, approval),
      }),
    )
  }
  return { documents, excluded }
}
