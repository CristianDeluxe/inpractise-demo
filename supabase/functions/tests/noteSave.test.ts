import { ApiError } from '../_shared/http/ApiError.ts'
import { handleNoteSave } from '../research/actions/handleNoteSave.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { noteSaveInputFixture } from './noteSaveInputFixture.ts'
import { notesTransportFixture } from './notesTransportFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'

Deno.test(
  'saving a premium passage as a basic member fails closed before any write',
  async () => {
    const { fetcher, requests } = notesTransportFixture()
    const principal = effectivePrincipal(viewAsPrincipalFixture(fetcher), {
      premium: false,
    })
    try {
      await handleNoteSave(principal, noteSaveInputFixture('premium'))
      throw new Error('Premium passage was saved')
    } catch (cause) {
      if (!(cause instanceof ApiError) || cause.code !== 'not_found')
        throw cause
    }
    if (requests.some((request) => request.method === 'POST'))
      throw new Error('A write reached the notebook table')
  },
)

Deno.test(
  'saving sends the caller token, the caller organisation and no identity',
  async () => {
    const { fetcher, requests } = notesTransportFixture()
    const principal = viewAsPrincipalFixture(fetcher)
    const saved = await handleNoteSave(principal, noteSaveInputFixture('basic'))
    const write = requests.find((request) => request.method === 'POST')
    if (!write) throw new Error('No write was sent')
    if (write.headers.get('authorization') !== 'Bearer test-caller-token')
      throw new Error('Write did not carry the caller token')
    const body = JSON.parse(await write.text()) as Record<string, unknown>
    if (
      Object.keys(body).sort().join(',') !==
      'document_id,note,org_id,passage_id,question,revision_id'
    )
      throw new Error(
        `Write carried unexpected fields: ${Object.keys(body).join(',')}`,
      )
    if (body['org_id'] !== 'org-a' || body['document_id'] !== 'basic')
      throw new Error('Write scoped to the wrong organisation or document')
    if (
      saved.noteId !== '00000000-0000-0000-0000-00000000000a' ||
      saved.createdAt !== '2026-09-15T10:00:00Z'
    )
      throw new Error('Saved note identity was not returned')
  },
)
