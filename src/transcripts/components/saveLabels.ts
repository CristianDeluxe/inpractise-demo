import type { SaveState } from '../hooks/SaveState'

export const saveLabels: Record<SaveState, string> = {
  idle: '',
  saving: 'Saving...',
  saved: 'Saved',
  error: 'Save failed, will retry',
  readonly: 'Read-only',
}
