import { buildAnnualReportDocuments } from './buildAnnualReportDocuments.mjs'
import { buildPublicDocuments } from './buildPublicDocuments.mjs'
import { buildSyntheticDocuments } from './buildSyntheticDocuments.mjs'

/**
 * Builds every accepted document group (synthetic, SEC filings, annual
 * reports) and merges them into one document list and one excluded-candidate
 * list, so buildCorpus.mjs only orchestrates reading, building and writing.
 */
export async function buildAllDocuments(root, context) {
  const { core, reviews, annualReportReviews, approvals, syntheticOnly } =
    context
  const synthetic = await buildSyntheticDocuments(root, core)
  const publicDocuments = await buildPublicDocuments(
    root,
    reviews,
    approvals,
    syntheticOnly,
  )
  const annualReportDocuments = await buildAnnualReportDocuments(
    root,
    annualReportReviews,
    approvals,
    syntheticOnly,
  )
  return {
    documents: [
      ...synthetic.documents,
      ...publicDocuments.documents,
      ...annualReportDocuments.documents,
    ],
    excluded: [...publicDocuments.excluded, ...annualReportDocuments.excluded],
    generation: synthetic.generation,
  }
}
