import { annualReportManifestMetadata } from './annualReportManifestMetadata.mjs'
import { buildApprovedDocuments } from './buildApprovedDocuments.mjs'

export async function buildAnnualReportDocuments(
  root,
  reviews,
  approvals,
  syntheticOnly,
) {
  return buildApprovedDocuments({
    root,
    reviews,
    approvals,
    syntheticOnly,
    buildManifestExtra: annualReportManifestMetadata,
  })
}
