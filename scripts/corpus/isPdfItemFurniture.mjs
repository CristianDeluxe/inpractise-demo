import { isPdfFooterText } from './isPdfFooterText.mjs'
import { isPdfLabelItem } from './isPdfLabelItem.mjs'
import { isPdfMarginItem } from './isPdfMarginItem.mjs'

/**
 * A single PDF text item is furniture, not narrative, when it is a running
 * header or footer, a rotated side label, a bare page number, a legend or
 * stat callout at display size, or a short all-caps label rather than a
 * sentence. Mirrors the SEC HTML pipeline's page-furniture exclusion, but
 * decided from position and font size since a PDF carries no DOM structure.
 */
export function isPdfItemFurniture(item, page) {
  const text = item.str.trim()
  if (!text) return true
  if (item.transform[0] === 0) return true
  if (isPdfMarginItem(item, page)) return true
  if (isPdfFooterText(text)) return true
  return isPdfLabelItem(item, text)
}
