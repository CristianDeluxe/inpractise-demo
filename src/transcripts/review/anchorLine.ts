import { anchorLineFallback } from './anchorLineFallback'

/** The viewport line below which the text is readable: the sticky toolbar's bottom edge. */
export function anchorLine(toolbar: HTMLElement | null): number {
  return toolbar ? toolbar.getBoundingClientRect().bottom : anchorLineFallback
}
