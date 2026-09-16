import { readJson } from './readJson.mjs'
import { SYNTHETIC_DOCUMENT_COUNT } from './syntheticDocumentCount.mjs'

/**
 * The corpus's expected document counts, derived from the selector files
 * rather than hard-coded, so adding a new public intake (a new selector
 * file) changes what "complete" means without touching the manifest or its
 * verifier by hand.
 */
export async function readExpectedCounts(root) {
  const sec = await readJson(`${root}/corpus/sources.json`)
  const annualReports = await readJson(
    `${root}/corpus/sources-annual-reports.json`,
  )
  const publicSelectorCount =
    sec.selectors.length + annualReports.selectors.length
  return {
    syntheticDocumentCount: SYNTHETIC_DOCUMENT_COUNT,
    publicSelectorCount,
    requestedDocumentCount: SYNTHETIC_DOCUMENT_COUNT + publicSelectorCount,
  }
}
