import { access } from 'node:fs/promises'
import { fetchAnnualReport } from './fetchAnnualReport.mjs'
import { readJson } from './readJson.mjs'
import { writeJson } from './writeJson.mjs'

/**
 * The annual-report intake has its own selector and acquisition files, so
 * the frozen SEC acquisition record is never appended to. Like the SEC
 * intake, an existing record is final: a second run refuses rather than
 * re-fetching.
 */
export async function acquireAnnualReports(root) {
  const target = `${root}/corpus/acquisition-annual-reports.json`
  try {
    await access(target)
    throw new Error('ACQUISITION_ALREADY_FROZEN')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  const sources = await readJson(`${root}/corpus/sources-annual-reports.json`)
  const state = {
    userAgent: sources.userAgent,
    maxBytes: sources.maxBytes,
    startedAt: new Date().toISOString(),
    requests: [],
    documents: [],
  }
  for (const selector of sources.selectors) {
    const document = { ...selector, status: 'failed' }
    state.documents.push(document)
    try {
      const record = await fetchAnnualReport(root, selector.sourceUrl, state)
      Object.assign(document, {
        status: 'acquired_pending_review',
        rawPath: record.path,
        rawSha256: record.sha256,
        retrievedAt: record.retrievedAt,
        contentType: record.contentType,
      })
    } catch (error) {
      document.error = /^ANNUAL_REPORT_|^RESPONSE_/u.test(error.message)
        ? error.message
        : 'ACQUISITION_FAILED'
    }
    console.log(
      `${document.documentId}: ${document.status}${document.error ? ` (${document.error})` : ''}`,
    )
  }
  await writeJson(target, {
    startedAt: state.startedAt,
    completedAt: new Date().toISOString(),
    requests: state.requests,
    documents: state.documents,
  })
  return state.documents
}
