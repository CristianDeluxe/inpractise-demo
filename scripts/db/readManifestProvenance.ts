import { ManifestProvenanceSchema } from './ManifestProvenanceSchema.ts'
import { readNormalizedHash } from './readNormalizedHash.ts'

export function readManifestProvenance(
  manifest: Record<string, unknown>,
  documentId: string,
) {
  const rawHash =
    manifest['rawSha256'] ??
    (manifest['raw'] as Record<string, unknown> | undefined)?.['sha256']
  const normalizedHash = readNormalizedHash(manifest)
  const rights = manifest['rights'] as Record<string, unknown> | undefined
  const rightsBasis = manifest['rightsBasis'] ?? rights?.['basis']
  const parsed = ManifestProvenanceSchema.safeParse({
    rawHash,
    normalizedHash,
    rightsBasis,
  })
  if (!parsed.success)
    throw new Error(`Manifest provenance incomplete: ${documentId}`)
  if (rights?.['status'] !== 'approved')
    throw new Error(`Rights not approved: ${documentId}`)
  return parsed.data
}
