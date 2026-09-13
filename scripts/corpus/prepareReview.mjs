import { readFile, writeFile } from 'node:fs/promises'
import { appendReviewLines } from './appendReviewLines.mjs'
import { assertRuntime } from './assertRuntime.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { parseSecNarrative } from './parseSecNarrative.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'
import { writeJson } from './writeJson.mjs'

try {
  const root = await assertRuntime()
  const acquisition = await readJson(`${root}/corpus/acquisition.json`)
  const report = { documents: [] }
  const lines = [
    '# SEC narrative boundary review',
    '',
    'These are acquired public filings and parsed candidates, not owner-approved corpus entries. Review the first and last paragraph of each section against the linked filing. No approval is inferred from parsing or this report.',
    '',
  ]
  for (const entry of acquisition.documents) {
    if (entry.status !== 'acquired_pending_review') continue
    try {
      const bytes = await readFile(`${root}/${entry.rawPath}`)
      if (sha256(bytes) !== entry.rawSha256)
        throw new Error('RAW_HASH_MISMATCH')
      const parsed = parseSecNarrative(bytes.toString('utf8'))
      const document = {
        ...entry,
        sourceId: entry.documentId,
        title: `${entry.company} ${entry.reportDate.slice(0, 4)} Form 10-K — selected narrative`,
        companySlug: entry.company.toLowerCase(),
        origin: 'public',
        requiredTier: 'basic',
        publishedAt: `${entry.filingDate}T00:00:00Z`,
        disclosure:
          'SEC filing — company disclosure. Selected narrative sections only; tables and financial statements are not indexed. Open original filing.',
      }
      const normalised = normaliseDocument(document, parsed.turns)
      const normalisedPath = `corpus/review/${entry.documentId}.json`
      await writeJson(`${root}/${normalisedPath}`, normalised)
      const result = {
        ...entry,
        origin: 'public',
        sourceType: 'public_filing',
        synthetic: false,
        fictional: false,
        disclosure: document.disclosure,
        rights: {
          status: 'review_required',
          basis:
            'SEC permits EDGAR filing text reuse; selected narrative boundaries await explicit owner review.',
          policyUrl:
            'https://www.sec.gov/about/webmaster-frequently-asked-questions',
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
      }
      report.documents.push(result)
      appendReviewLines(lines, entry, result)
      console.log(
        `${entry.documentId}: parsed ${result.passageCount} passages (${result.totalTokens} tokens), pending owner review`,
      )
    } catch (error) {
      report.documents.push({
        ...entry,
        status: 'parse_failed',
        error: error.message,
      })
      lines.push(
        `## ${entry.documentId}`,
        '',
        `Parsing failed: ${error.message}`,
        '',
      )
      process.exitCode = 1
    }
  }
  if (
    report.documents.reduce((sum, entry) => sum + (entry.totalTokens ?? 0), 0) >
    80000
  )
    throw new Error('SEC_CORPUS_TOKEN_BUDGET')
  await writeJson(`${root}/corpus/review/sec.json`, report)
  await writeFile(`${root}/corpus/review/SEC_REVIEW.md`, lines.join('\n'))
} catch {
  console.error('PREPARE_REVIEW_FAILED')
  process.exitCode = 1
}
