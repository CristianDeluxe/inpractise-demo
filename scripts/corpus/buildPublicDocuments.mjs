import { buildApprovedDocuments } from './buildApprovedDocuments.mjs'
import { publicManifestMetadata } from './publicManifestMetadata.mjs'

export async function buildPublicDocuments(
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
    buildManifestExtra: publicManifestMetadata,
  })
}
