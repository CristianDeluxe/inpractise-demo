/**
 * Shows a server-owned publication timestamp as its calendar date. The hour and
 * the zone offset carry nothing a reader of a filing or an interview acts on,
 * and a locale conversion here would move the date itself. A value that is not
 * an ISO timestamp is returned untouched rather than trimmed to ten characters.
 */
export function formatPublishedDate(publishedAt: string): string {
  return /^\d{4}-\d{2}-\d{2}T/.test(publishedAt)
    ? publishedAt.slice(0, 10)
    : publishedAt
}
