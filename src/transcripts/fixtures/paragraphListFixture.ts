import type { ParagraphRow } from './ParagraphRow'

/** A transcript list in a detached document whose paragraphs report the given viewport rects. */
export function paragraphListFixture(rows: readonly ParagraphRow[]) {
  const list = document.createElement('div')
  for (const row of rows) {
    const element = document.createElement('section')
    element.dataset['paragraphId'] = row.id
    element.dataset['start'] = String(row.start)
    element.getBoundingClientRect = () =>
      ({
        top: row.top,
        bottom: row.top + row.height,
        height: row.height,
      }) as DOMRect
    list.append(element)
  }
  return list
}
