import { PDF_TITLE_GEOMETRY } from './pdfTitleGeometry.mjs'

/**
 * A section title in this report layout is the one item on its page set in
 * display type (>=20pt) hard against the left margin near the top - the
 * same slot "Business model", "Principal risks" and "Going concern and
 * viability statements" each occupy on their own opening page.
 */
export function locatePdfTitles(pages) {
  const { minSize, maxX, topMargin } = PDF_TITLE_GEOMETRY
  const titles = []
  for (const page of pages)
    for (const item of page.items) {
      if (
        item.transform[0] >= minSize &&
        item.transform[4] <= maxX &&
        item.transform[5] >= page.view[3] - topMargin
      )
        titles.push({ pageNumber: page.pageNumber, text: item.str.trim() })
    }
  return titles
}
