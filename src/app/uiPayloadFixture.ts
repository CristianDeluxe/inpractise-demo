import { citationFixture } from '@/api/citationFixture'
import { askPayloadFixture } from './askPayloadFixture'
import { debugPayloadFixture } from './debugPayloadFixture'
import { libraryPayloadFixture } from './libraryPayloadFixture'
import { notebookPayloadFixture } from './notebookPayloadFixture'

export function uiPayloadFixture(action: string) {
  const citation = citationFixture()
  switch (action) {
    case 'me':
      return {
        orgId: 'demo-org',
        role: 'reviewer',
        premium: true,
        noteCount: 2,
      }
    case 'note_list':
      return notebookPayloadFixture()
    case 'note_save':
      return {
        noteId: '00000000-0000-4000-8000-000000000003',
        createdAt: '2026-09-15T11:00:00Z',
      }
    case 'note_delete':
      return { noteId: '00000000-0000-4000-8000-000000000001' }
    case 'list':
      return libraryPayloadFixture()
    case 'read':
      return {
        citation,
        section: 'Interview',
        isCurrentRevision: false,
        neighbourIds: ['P3'],
      }
    case 'search':
      return { items: [citation], mode: 'lexical_only', truncated: true }
    case 'ask':
      return askPayloadFixture(citation)
    case 'debug':
      return debugPayloadFixture()
    default:
      throw new Error('Unexpected action')
  }
}
