import { computeCorpusFingerprint } from './computeCorpusFingerprint.mjs'
import { corpusLimitations } from './corpusLimitations.mjs'
import { readCorpusArtifactHashes } from './readCorpusArtifactHashes.mjs'
import { readExpectedCounts } from './readExpectedCounts.mjs'
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
  const counts = await readExpectedCounts(root)
  return {
    schemaVersion: 1,
    dataset: core.dataset,
    mode: documents.length === 6 ? 'synthetic_only' : 'public_and_synthetic',
    indexMode: 'lexical_only',
    notice:
      documents.length === 6
        ? 'Six synthetic test documents; no public filings loaded. Short fixtures.'
        : 'Independent demo. Public SEC narrative, one public UK annual report and six short synthetic fixtures; no private In Practise research.',
    documentCount: documents.length,
    syntheticDocumentCount: counts.syntheticDocumentCount,
    publicDocumentCount: documents.length - counts.syntheticDocumentCount,
    requestedDocumentCount: counts.requestedDocumentCount,
    passageCount: documents.reduce((sum, entry) => sum + entry.passageCount, 0),
    vectorCount: 0,
    documents,
    fixtures,
    excluded,
    acquisition,
    generation,
    regeneration: await readGenerationRound(root, core),
    artifacts: await readCorpusArtifactHashes(root, authority),
    corpusFingerprint: computeCorpusFingerprint(documents),
    limitations: corpusLimitations,
  }
}
