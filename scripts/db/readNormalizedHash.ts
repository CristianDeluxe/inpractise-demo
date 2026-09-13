import { z } from 'zod'

export function readNormalizedHash(manifest: Record<string, unknown>): unknown {
  const nested = z
    .object({ sha256: z.string() })
    .optional()
    .parse(manifest['normalized'])
  return (
    manifest['normalizedSha256'] ??
    manifest['normalisedSha256'] ??
    nested?.sha256
  )
}
