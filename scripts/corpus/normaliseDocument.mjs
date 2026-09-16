import { canonicalJson } from './canonicalJson.mjs'
import { documentKind } from './documentKind.mjs'
import { reportingFields } from './reportingFields.mjs'
import { sha256 } from './sha256.mjs'
import { splitPassages } from './splitPassages.mjs'

export function normaliseDocument(document, turns = document.turns) {
  const kind = documentKind(document)
  const payload = {
    schemaVersion: 1,
    documentId: document.documentId,
    sourceId: document.sourceId,
    title: document.title,
    company: document.company,
    companySlug: document.companySlug,
    origin: document.origin,
    kind,
    fictional: document.origin === 'synthetic',
    synthetic: document.origin === 'synthetic',
    disclosure: document.disclosure,
    requiredTier: document.requiredTier,
    sourceUrl: document.sourceUrl ?? null,
    interviewDate: document.interviewDate ?? null,
    publishedAt: document.publishedAt,
    operatorName: document.operatorName ?? null,
    moderatorName: document.moderatorName ?? null,
    ...reportingFields(document, kind),
    configuration: {
      parser:
        kind === 'annual_report_pdf'
          ? 'corpus-pdf-narrative-v1'
          : 'corpus-narrative-v1',
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
