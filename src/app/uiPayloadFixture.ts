import { citationFixture } from '@/api/citationFixture'
import { comparePayloadFixture } from '@/contracts/comparePayloadFixture'
import { investigationFixture } from '@/contracts/investigationFixture'
import { askPayloadFixture } from './askPayloadFixture'
import { debugPayloadFixture } from './debugPayloadFixture'
import { libraryPayloadFixture } from './libraryPayloadFixture'
import { notebookActionFixture } from './notebookActionFixture'

export function uiPayloadFixture(action: string) {
  const citation = citationFixture()
  const notebookFixture = notebookActionFixture(action)
  if (notebookFixture !== undefined) return notebookFixture
  switch (action) {
    case 'me':
      return {
        orgId: 'demo-org',
        role: 'reviewer',
        premium: true,
        noteCount: 2,
      }
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
    case 'compare':
      return comparePayloadFixture()
    case 'investigate':
      return investigationFixture()
    case 'debug':
      return debugPayloadFixture()
    default:
      throw new Error('Unexpected action')
  }
}
