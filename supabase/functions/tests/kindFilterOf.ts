/** The kind_filter argument of a stubbed retrieval call, or null when absent. */
export function kindFilterOf(body: string): string | null {
  try {
    const parsed: unknown = JSON.parse(body)
    if (parsed && typeof parsed === 'object' && 'kind_filter' in parsed) {
      const value = (parsed as { kind_filter?: unknown }).kind_filter
      return typeof value === 'string' ? value : null
    }
  } catch {
    return null
  }
  return null
}
