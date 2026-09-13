import assert from 'node:assert/strict'
import { readJson } from './readJson.mjs'
import { selectFiling } from './selectors/selectFiling.mjs'

export async function verifyAcquiredFiling(
  root,
  acquisition,
  acquired,
  selector,
) {
  const matches = []
  for (const request of acquisition.requests.filter(
    (entry) => entry.path && entry.url.includes(`/CIK${selector.cik}`),
  ))
    matches.push(
      ...selectFiling(await readJson(`${root}/${request.path}`), selector),
    )
  assert.equal(matches.length, 1, 'FILING_SELECTION_PROVENANCE')
  assert.equal(matches[0].accession, acquired.accession)
  assert.equal(matches[0].filingDate, acquired.filingDate)
  assert.equal(
    acquired.sourceUrl,
    `https://www.sec.gov/Archives/edgar/data/${Number(selector.cik)}/${matches[0].accession.replaceAll('-', '')}/${matches[0].primaryDocument}`,
  )
  assert.equal(acquired.reportDate, selector.reportDate)
  assert.equal(acquired.form, '10-K')
  assert.ok(
    acquisition.requests.some(
      (request) =>
        request.url === acquired.sourceUrl &&
        request.path === acquired.rawPath &&
        request.sha256 === acquired.rawSha256,
    ),
  )
}
