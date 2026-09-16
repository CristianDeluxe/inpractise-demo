import { PDF_BLOCK_COLUMN_WIDTH } from './pdfBlockColumnWidth.mjs'
import { PDF_BLOCK_LINE_GAP } from './pdfBlockLineGap.mjs'

/**
 * Groups surviving (non-furniture) text items on one page into paragraph
 * blocks: bucketed into left-to-right reading columns by x, then merged
 * top-to-bottom within a column while the vertical gap between consecutive
 * lines stays within one line height. A wider gap starts a new block, the
 * same rule a human reader uses to see a paragraph break.
 */
export function groupPdfBlocks(items, pageNumber) {
  const columns = new Map()
  for (const item of items) {
    const columnKey = Math.round(item.transform[4] / PDF_BLOCK_COLUMN_WIDTH)
    if (!columns.has(columnKey)) columns.set(columnKey, [])
    columns.get(columnKey).push(item)
  }
  const blocks = []
  for (const columnKey of [...columns.keys()].sort((a, b) => a - b)) {
    const lines = columns
      .get(columnKey)
      .slice()
      .sort((a, b) => b.transform[5] - a.transform[5])
    let current = null
    for (const line of lines) {
      const y = line.transform[5]
      if (current && current.lastY - y <= PDF_BLOCK_LINE_GAP) {
        current.text += line.hasEOL ? `${line.str} ` : line.str
        current.lastY = y
        current.lines += 1
      } else {
        if (current) blocks.push(current)
        current = {
          page: pageNumber,
          column: columnKey,
          text: line.str,
          lastY: y,
          lines: 1,
        }
      }
    }
    if (current) blocks.push(current)
  }
  return blocks
    .map((block) => ({
      ...block,
      text: block.text.replace(/\s+/gu, ' ').trim(),
    }))
    .filter((block) => block.text.length >= 40)
}
