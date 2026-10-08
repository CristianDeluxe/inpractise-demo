import type { LibraryDocument } from './LibraryDocument'

/** Keeps the interviews of one company (or all) whose title contains the text. */
export function filterInterviews(
  items: readonly LibraryDocument[],
  company: string,
  titleText: string,
): LibraryDocument[] {
  const needle = titleText.trim().toLowerCase()
  return items.filter(
    (document) =>
      (!company || document.company === company) &&
      (!needle || document.title.toLowerCase().includes(needle)),
  )
}
