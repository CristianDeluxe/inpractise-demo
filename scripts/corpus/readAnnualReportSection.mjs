import { groupPdfBlocks } from './groupPdfBlocks.mjs'
import { isPdfItemFurniture } from './isPdfItemFurniture.mjs'

/**
 * Reads one located section (business model or principal risks) into the
 * same turn shape the SEC pipeline produces: one paragraphId per surviving
 * block, in reading order, plus a coverage record an owner can check the
 * first and last paragraph of without opening the PDF.
 */
export function readAnnualReportSection(pages, boundary) {
  const { key, section, startPage, endPage } = boundary
  const scoped = pages.filter(
    (page) => page.pageNumber >= startPage && page.pageNumber < endPage,
  )
  const blocks = scoped.flatMap((page) =>
    groupPdfBlocks(
      page.items.filter((item) => !isPdfItemFurniture(item, page)),
      page.pageNumber,
    ),
  )
  if (blocks.length < 2)
    throw new Error(`ANNUAL_REPORT_SECTION_EMPTY_${key.toUpperCase()}`)
  const turns = blocks.map((block, index) => ({
    paragraphId: `${key}-${String(index + 1).padStart(4, '0')}`,
    section,
    speaker: 'Company disclosure',
    speakerRole: 'Company disclosure',
    text: block.text,
    sourcePage: { page: block.page, column: block.column, lines: block.lines },
  }))
  const coverage = {
    section,
    startPage,
    endPage: endPage - 1,
    firstParagraph: turns[0].text,
    lastParagraph: turns.at(-1).text,
    paragraphs: turns.length,
  }
  return { turns, coverage }
}
