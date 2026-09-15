/** The first search hit names the passage the read measurement opens. */
export function readTargetOf(search: unknown) {
  const item = (
    search as {
      items?: { documentId: string; revisionId: string; passageId: string }[]
    }
  ).items?.[0]
  if (!item) throw new Error('Search returned no passage to read')
  return {
    documentId: item.documentId,
    revisionId: item.revisionId,
    passageId: item.passageId,
  }
}
