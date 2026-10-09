import { nearestByStart } from './nearestByStart'
import { paragraphsIn } from './paragraphsIn'
import type { ViewAnchor } from './ViewAnchor'

/**
 * Scrolls the window so the anchor paragraph, or the rendered one nearest to it
 * in time, sits at the offset it had before. An empty list is left alone.
 */
export function restoreViewAnchor(
  list: HTMLElement | null,
  anchor: ViewAnchor,
  line: number,
) {
  if (list === null) return
  const rendered = paragraphsIn(list)
  const target =
    rendered.find((element) => element.dataset['paragraphId'] === anchor.id) ??
    nearestByStart(rendered, anchor.start)
  if (target === undefined) return
  const delta = target.getBoundingClientRect().top - line - anchor.offset
  if (delta !== 0) window.scrollBy({ top: delta, behavior: 'instant' })
}
