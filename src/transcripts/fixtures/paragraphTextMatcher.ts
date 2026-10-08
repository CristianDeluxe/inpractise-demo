/** Matches a paragraph by its full text even when pending edits split it into spans. */
export function paragraphTextMatcher(text: string) {
  return (_content: string, element: Element | null) =>
    element?.tagName === 'P' && element.textContent === text
}
