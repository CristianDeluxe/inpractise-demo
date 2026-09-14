import { readFileSync } from 'node:fs'
import { CorpusManifestSchema } from './CorpusManifestSchema.ts'

/** Only the three document fields the landing figures are derived from. */
export function corpusManifestDocuments() {
  return CorpusManifestSchema.parse(
    JSON.parse(readFileSync('corpus/manifest.json', 'utf8')),
  ).documents
}
