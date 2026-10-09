import { vi } from 'vitest'
import type { WorkspaceView } from '../hooks/WorkspaceView'
import type { ReviewMode } from '../review/ReviewMode'

/** A view state on the given mode whose setters are spies. */
export function workspaceViewFixture(mode: ReviewMode): WorkspaceView {
  return { mode, setMode: vi.fn(), filter: 'attention', setFilter: vi.fn() }
}
