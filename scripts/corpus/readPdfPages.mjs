/**
 * Reads text-content items for a page range of an already-opened unpdf
 * document proxy. One page at a time, since pdf.js keeps per-page state and
 * a wide upfront read of a 200+ page report would hold it all in memory for
 * pages this pipeline never looks at.
 */
export async function readPdfPages(pdf, firstPage, lastPage) {
  const pages = []
  for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber++) {
    const page = await pdf.getPage(pageNumber)
    const content = await page.getTextContent()
    pages.push({
      pageNumber,
      view: page.view,
      items: content.items.filter((item) => 'str' in item && item.str.trim()),
    })
  }
  return pages
}
