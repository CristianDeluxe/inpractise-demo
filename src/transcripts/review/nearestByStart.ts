/** The element whose `data-start` is closest to the given time; the earlier one wins a tie. */
export function nearestByStart(
  elements: readonly HTMLElement[],
  start: number,
): HTMLElement | undefined {
  let nearest: HTMLElement | undefined
  let distance = Number.POSITIVE_INFINITY
  for (const element of elements) {
    const gap = Math.abs(Number(element.dataset['start']) - start)
    if (gap < distance) {
      nearest = element
      distance = gap
    }
  }
  return nearest
}
