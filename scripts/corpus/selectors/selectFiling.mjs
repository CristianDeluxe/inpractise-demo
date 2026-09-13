export function selectFiling(submissions, selector) {
  const table = submissions.filings?.recent ?? submissions
  if (!Array.isArray(table.form)) throw new Error('SEC_SUBMISSIONS_INVALID')
  const matches = []
  for (let i = 0; i < table.form.length; i++) {
    if (
      table.form[i] !== selector.form ||
      table.reportDate[i] !== selector.reportDate
    )
      continue
    const accession = table.accessionNumber[i]
    const primaryDocument = table.primaryDocument[i]
    const filingDate = table.filingDate[i]
    if (
      !/^\d{10}-\d{2}-\d{6}$/.test(accession) ||
      !/^[\w.-]+\.html?$/.test(primaryDocument) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(filingDate)
    )
      throw new Error('SEC_FILING_METADATA_INVALID')
    matches.push({ accession, primaryDocument, filingDate })
  }
  return matches
}
