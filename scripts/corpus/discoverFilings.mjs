import { fetchSec } from './fetchSec.mjs'
import { selectFiling } from './selectors/selectFiling.mjs'

export async function discoverFilings(root, selector, state, cache) {
  if (!cache.has(selector.cik)) {
    const fetched = await fetchSec(
      root,
      `https://data.sec.gov/submissions/CIK${selector.cik}.json`,
      state,
    )
    cache.set(selector.cik, {
      recent: JSON.parse(fetched.bytes.toString('utf8')),
      histories: [],
    })
  }
  const company = cache.get(selector.cik)
  const matches = selectFiling(company.recent, selector)
  if (matches.length === 0) {
    for (const file of (company.recent.filings?.files ?? []).slice(0, 2)) {
      let history = company.histories.find((item) => item.name === file.name)
      if (!history) {
        const fetched = await fetchSec(
          root,
          `https://data.sec.gov/submissions/${file.name}`,
          state,
        )
        history = {
          name: file.name,
          table: JSON.parse(fetched.bytes.toString('utf8')),
        }
        company.histories.push(history)
      }
      matches.push(...selectFiling(history.table, selector))
    }
  }
  if (matches.length !== 1) throw new Error('SEC_MATCH_NOT_UNIQUE')
  return {
    ...selector,
    ...matches[0],
    sourceUrl: `https://www.sec.gov/Archives/edgar/data/${Number(selector.cik)}/${matches[0].accession.replaceAll('-', '')}/${matches[0].primaryDocument}`,
  }
}
