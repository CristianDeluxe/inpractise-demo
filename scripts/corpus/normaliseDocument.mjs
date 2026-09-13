import { canonicalJson } from './canonicalJson.mjs'
import { sha256 } from './sha256.mjs'
import { splitPassages } from './splitPassages.mjs'

export function normaliseDocument(document, turns = document.turns) {
  const payload = {
    schemaVersion: 1,
    documentId: document.documentId,
    sourceId: document.sourceId,
    title: document.title,
    company: document.company,
    companySlug: document.companySlug,
    origin: document.origin,
    kind:
      document.origin === 'synthetic' ? 'synthetic_interview' : 'sec_filing',
    fictional: document.origin === 'synthetic',
    synthetic: document.origin === 'synthetic',
    disclosure: document.disclosure,
    requiredTier: document.requiredTier,
    sourceUrl: document.sourceUrl ?? null,
    interviewDate: document.interviewDate ?? null,
    publishedAt: document.publishedAt,
    operatorName: document.operatorName ?? null,
    moderatorName: document.moderatorName ?? null,
    configuration: {
      parser: 'corpus-narrative-v1',
      chunker: 'speaker-codepoint-v1',
      tokenizer: 'js-tiktoken@1.0.21/cl100k_base',
      embeddingModel: 'text-embedding-3-small',
      embeddingDimensions: 1536,
    },
    sourceText: turns.map((turn) => turn.text).join('\n\n'),
    sourceTurns: turns,
    passages: splitPassages(turns, document),
  }
  return { ...payload, revisionId: sha256(`${canonicalJson(payload)}\n`) }
}
