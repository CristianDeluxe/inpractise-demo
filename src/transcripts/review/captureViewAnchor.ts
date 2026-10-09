import { paragraphsIn } from './paragraphsIn'
import type { ViewAnchor } from './ViewAnchor'

/** The first paragraph that ends below the toolbar, or null when none is rendered or visible. */
export function captureViewAnchor(
  list: HTMLElement | null,
  line: number,
): ViewAnchor | null {
  if (list === null) return null
  for (const element of paragraphsIn(list)) {
    const rect = element.getBoundingClientRect()
    if (rect.bottom <= line) continue
    return {
      id: element.dataset['paragraphId'] ?? '',
      start: Number(element.dataset['start']),
      offset: rect.top - line,
    }
  }
  return null
}
