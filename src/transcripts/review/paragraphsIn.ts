/** The paragraph elements a transcript list currently renders, in document order. */
export function paragraphsIn(list: HTMLElement): HTMLElement[] {
  return Array.from(list.querySelectorAll<HTMLElement>('[data-paragraph-id]'))
}
