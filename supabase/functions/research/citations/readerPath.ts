/** Server-constructed, always relative: a model or a source URL can never become a link. */
export function readerPath(
  documentId: string,
  revisionId: string,
  passageId: string,
): string {
  return `/read/${encodeURIComponent(documentId)}/${encodeURIComponent(revisionId)}/${encodeURIComponent(passageId)}`
}
