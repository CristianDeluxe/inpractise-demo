/**
 * The cache key ignores case, surrounding space and runs of whitespace, which
 * change nothing about what the question asks and would otherwise defeat the
 * cache for a question retyped by hand.
 */
export function normaliseQuery(query: string): string {
  return query.trim().toLowerCase().replaceAll(/\s+/g, ' ')
}
