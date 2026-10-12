import type { WorkspaceView } from '../hooks/WorkspaceView'

/**
 * Wraps undo so the reverted edit stays reachable: leaving the Flagged filter,
 * which hides an edit once it is no longer deferred, before it is refocused.
 */
export function undoRevealing(
  undo: () => string | null,
  view: Pick<WorkspaceView, 'filter' | 'setFilter'>,
): () => string | null {
  return () => {
    const editId = undo()
    if (editId !== null && view.filter === 'deferred') view.setFilter('all')
    return editId
  }
}
