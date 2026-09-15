import { notebookPayloadFixture } from './notebookPayloadFixture'

/**
 * Fixture responses for the notebook actions, split out of uiPayloadFixture
 * to keep that function's branching under the lint limit.
 */
export function notebookActionFixture(action: string): unknown {
  switch (action) {
    case 'note_list':
      return notebookPayloadFixture()
    case 'note_save':
      return {
        noteId: '00000000-0000-4000-8000-000000000003',
        createdAt: '2026-09-15T11:00:00Z',
      }
    case 'note_delete':
      return { noteId: '00000000-0000-4000-8000-000000000001' }
    default:
      return undefined
  }
}
