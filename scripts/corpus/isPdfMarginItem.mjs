import { PDF_MARGIN_POINTS } from './pdfMarginPoints.mjs'

/** True for a text item sitting in the top or bottom margin band of its page. */
export function isPdfMarginItem(item, page) {
  const y = item.transform[5]
  return y > page.view[3] - PDF_MARGIN_POINTS || y < PDF_MARGIN_POINTS
}
