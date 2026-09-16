import { readFile } from 'node:fs/promises'
import { normaliseDocument } from './normaliseDocument.mjs'
import { parseAnnualReportNarrative } from './parseAnnualReportNarrative.mjs'
import { sha256 } from './sha256.mjs'
import { writeJson } from './writeJson.mjs'

/**
 * Parses one acquired annual-report PDF into a candidate normalised
 * document pending owner review, writing it to corpus/review/<id>.json.
 */
export async function reviewOneAnnualReport(root, entry) {
  const bytes = await readFile(`${root}/${entry.rawPath}`)
  if (sha256(bytes) !== entry.rawSha256) throw new Error('RAW_HASH_MISMATCH')
  const parsed = await parseAnnualReportNarrative(bytes)
  const document = {
    ...entry,
    sourceId: entry.documentId,
    title: `${entry.company} ${entry.reportTitle} - selected strategic report narrative`,
    origin: 'public',
    requiredTier: 'basic',
    publishedAt: `${entry.reportDate}T00:00:00Z`,
    disclosure:
      "Annual report - company disclosure, published on the company's own investor relations site. Selected strategic report narrative only; tables, financial statements and artwork are not indexed. Open original report.",
  }
  const normalised = normaliseDocument(document, parsed.turns)
  const normalisedPath = `corpus/review/${entry.documentId}.json`
  await writeJson(`${root}/${normalisedPath}`, normalised)
  return {
    ...entry,
    origin: 'public',
    sourceType: 'public_filing',
    synthetic: false,
    fictional: false,
    disclosure: document.disclosure,
    rights: {
      status: 'review_required',
      basis: entry.rights.basis,
      policyUrl: entry.rights.policyUrl,
      reviewedAt: null,
    },
    status: 'parsed_pending_review',
    normalisedPath,
    normalisedSha256: sha256(await readFile(`${root}/${normalisedPath}`)),
    revisionId: normalised.revisionId,
    passageCount: normalised.passages.length,
    totalTokens: normalised.passages.reduce(
      (sum, passage) => sum + passage.tokenCount,
      0,
    ),
    coverage: parsed.coverage,
    metrics: parsed.metrics,
    creationDate: parsed.creationDate,
  }
}
