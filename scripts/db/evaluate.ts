import { mkdirSync, writeFileSync } from 'node:fs'
import { retrieveCandidates } from '../../supabase/functions/_shared/search/retrieveCandidates.ts'
import { classifyFailure } from './classifyFailure.ts'
import { loadRetrievalGold } from './loadRetrievalGold.ts'
import { loadTarget } from './loadTarget.ts'
import { readEmbedding } from './readEmbedding.ts'
import { retrievalOutputPath } from './retrievalOutputPath.ts'
import { signInPersona } from './signInPersona.ts'

export async function evaluateRetrieval() {
  const target = loadTarget()
  const { client } = await signInPersona(target, 'basic')
  const { document, gold } = loadRetrievalGold()
  const hybrid = process.argv.includes('hybrid')
  const embedding = hybrid ? readEmbedding(gold.text) : null
  if (hybrid && !embedding) throw new Error('Recorded vector unavailable')
  const result = await retrieveCandidates(client, {
    query: 'rebuilding integrations retraining',
    embedding: embedding?.vector ?? null,
    company: document.companySlug,
  })
  const goldIds = [`s1:${document.revisionId}:P2`]
  const candidateIds = process.argv.includes('--drop-gold')
    ? result.diagnostics.candidateAt10.filter((id) => !goldIds.includes(id))
    : result.diagnostics.candidateAt10
  const diagnostic = {
    goldIds,
    candidateIds,
    contextIds: result.diagnostics.selectedIds.filter((id) =>
      candidateIds.includes(id),
    ),
  }
  const report = {
    caseId: 'G01',
    target: 'remote',
    queryMode: hybrid ? 'recorded-gold-vector-control' : 'lexical',
    ...diagnostic,
    diagnosis: classifyFailure(diagnostic),
    candidates: result.candidates.map(
      ({ text: _text, ...candidate }) => candidate,
    ),
  }
  const out = retrievalOutputPath(process.argv)
  mkdirSync('supabase/.temp', { recursive: true })
  writeFileSync(out, JSON.stringify(report, null, 2))
  console.log(
    JSON.stringify({
      caseId: report.caseId,
      diagnosis: report.diagnosis,
      output: out,
    }),
  )
  if (report.diagnosis !== 'pass') process.exitCode = 1
}

await evaluateRetrieval()
