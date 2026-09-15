import type { Principal } from '../Principal.ts'

/**
 * The caller's own note count for the workspace badge, read under their row
 * level security. Best effort by design: identity must not depend on the
 * notebook, so an unavailable count is simply absent from `me`.
 */
export async function countNotes(
  principal: Principal,
): Promise<{ noteCount?: number }> {
  const result = await principal.client
    .from('research_notes')
    .select('note_id', { count: 'exact', head: true })
  return result.error || typeof result.count !== 'number'
    ? {}
    : { noteCount: result.count }
}
