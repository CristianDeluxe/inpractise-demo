import { canonicalJson } from './canonicalJson.mjs'
import { sha256 } from './sha256.mjs'

import { readCorpusArtifactHashes } from './readCorpusArtifactHashes.mjs'
import { readGenerationRound } from './readGenerationRound.mjs'

export async function createCorpusManifest(root, context) {
  const {
    core,
    authority,
    documents,
    fixtures,
    excluded,
    acquisition,
    generation,
  } = context
  const manifest = {
    schemaVersion: 1,
    dataset: core.dataset,
    mode: documents.length === 6 ? 'synthetic_only' : 'public_and_synthetic',
    indexMode: 'lexical_only',
    notice:
      documents.length === 6
        ? 'Six synthetic test documents; no public filings loaded. Short fixtures.'
        : 'Independent demo. Public SEC narrative and six short synthetic fixtures; no private In Practise research.',
    documentCount: documents.length,
    syntheticDocumentCount: 6,
    publicDocumentCount: documents.length - 6,
    requestedDocumentCount: 10,
    passageCount: documents.reduce((sum, entry) => sum + entry.passageCount, 0),
    vectorCount: 0,
    documents,
    fixtures,
    excluded,
    acquisition,
    generation,
    regeneration: await readGenerationRound(root, core),
    artifacts: await readCorpusArtifactHashes(root, authority),
    corpusFingerprint: sha256(
      canonicalJson(
        documents.map((entry) => ({
          documentId: entry.documentId,
          revisionId: entry.revisionId,
        })),
      ),
    ),
    limitations: [
      'The six accepted synthetic documents retain their frozen cores; new expanded drafts require owner semantic review before import.',
      'No vector embeddings; lexical_only.',
      'Gold core paragraphs and short source paragraphs remain below 100 tokens rather than being padded or merged across speakers.',
      'SEC approval is recorded in corpus/review/approvals.json and binds the accepted revision and file hash to the unchanged reviewed public document.',
    ],
  }
  return manifest
}
