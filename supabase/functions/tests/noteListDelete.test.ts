import { ApiError } from '../_shared/http/ApiError.ts'
import { handleNoteDelete } from '../research/actions/handleNoteDelete.ts'
import { handleNoteList } from '../research/actions/handleNoteList.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { assertCallerScopedListing } from './assertCallerScopedListing.ts'
import { assertRestrictedNotes } from './assertRestrictedNotes.ts'
import { noteIdsFixture } from './noteIdsFixture.ts'
import { noteRowFixture } from './noteRowFixture.ts'
import { notesTransportFixture } from './notesTransportFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'

Deno.test(
  'listing reads under the caller token without a user filter and re-reads each passage as the effective principal',
  async () => {
    // Cross-user denial itself is a row level security outcome, proven over
    // real SQL in tests/local/researchNotes.test.ts; here the handler must be
    // shown to rely on it rather than on a caller-supplied identity.
    const { fetcher, requests } = notesTransportFixture([
      noteRowFixture('basic', noteIdsFixture.own),
      noteRowFixture('premium', noteIdsFixture.foreign),
    ])
    const principal = effectivePrincipal(viewAsPrincipalFixture(fetcher), {
      premium: false,
    })
    const { notes } = await handleNoteList(principal)
    assertCallerScopedListing(requests)
    assertRestrictedNotes(notes, noteIdsFixture.foreign)
  },
)

Deno.test('deleting a note the policy hides is a plain not_found', async () => {
  const { fetcher, requests } = notesTransportFixture([], false)
  try {
    await handleNoteDelete(
      viewAsPrincipalFixture(fetcher),
      noteIdsFixture.foreign,
    )
    throw new Error('Hidden note was deleted')
  } catch (cause) {
    if (!(cause instanceof ApiError) || cause.code !== 'not_found') throw cause
  }
  const removal = requests.find((request) => request.method === 'DELETE')
  if (!removal) throw new Error('No delete was sent')
  if (
    new URL(removal.url).searchParams.get('note_id') !==
    `eq.${noteIdsFixture.foreign}`
  )
    throw new Error('Delete was not bound to the requested note')
})

Deno.test('deleting an own note returns its id', async () => {
  const { fetcher } = notesTransportFixture([], true)
  const result = await handleNoteDelete(
    viewAsPrincipalFixture(fetcher),
    noteIdsFixture.own,
  )
  if (result.noteId !== noteIdsFixture.own)
    throw new Error('Deleted id was not returned')
})
