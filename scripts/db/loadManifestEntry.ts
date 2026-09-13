import { readFileSync, realpathSync } from 'node:fs'
import { resolve } from 'node:path'
import { sha256 } from './sha256.ts'

export function loadManifestEntry(documentId: string): Record<string, unknown> {
  const manifest = JSON.parse(
    readFileSync('corpus/manifest.json', 'utf8'),
  ) as Record<string, unknown>
  if (!Array.isArray(manifest['documents']))
    throw new Error('Corpus manifest has no document entries')
  const entry = manifest['documents'].find(
    (item: Record<string, unknown>) => item['documentId'] === documentId,
  ) as Record<string, unknown> | undefined
  if (!entry || entry['status'] !== 'accepted')
    throw new Error(`Accepted manifest entry missing: ${documentId}`)
  for (const [pathKey, hashKey] of [
    ['rawPath', 'rawSha256'],
    ['normalisedPath', 'normalisedSha256'],
  ] as const) {
    if (
      typeof entry[pathKey] !== 'string' ||
      typeof entry[hashKey] !== 'string'
    )
      throw new Error('Manifest path or hash missing')
    const path = realpathSync(entry[pathKey])
    if (!path.startsWith(`${resolve('corpus')}/`))
      throw new Error('Corpus path escapes source directory')
    if (sha256(readFileSync(path)) !== entry[hashKey])
      throw new Error(`Corpus artifact hash mismatch: ${documentId}`)
  }
  return entry
}
