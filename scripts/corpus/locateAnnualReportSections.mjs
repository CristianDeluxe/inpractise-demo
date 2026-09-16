/**
 * Resolves each requested section pattern to a start page (its title's own
 * page) and an end page (the next title anywhere in the report, exclusive),
 * the same "boundary must be unique" discipline locateNarrativeSections.mjs
 * applies to the SEC Item 1 / 1A headings.
 */
export function locateAnnualReportSections(titles, specs) {
  const sorted = titles.slice().sort((a, b) => a.pageNumber - b.pageNumber)
  return specs.map(({ key, section, pattern }) => {
    const matches = sorted.filter((title) => pattern.test(title.text))
    if (matches.length !== 1)
      throw new Error(`ANNUAL_REPORT_SECTION_AMBIGUOUS_${key.toUpperCase()}`)
    const start = matches[0]
    const next = sorted.find((title) => title.pageNumber > start.pageNumber)
    if (!next)
      throw new Error(`ANNUAL_REPORT_SECTION_UNBOUNDED_${key.toUpperCase()}`)
    return {
      key,
      section,
      startPage: start.pageNumber,
      endPage: next.pageNumber,
    }
  })
}
