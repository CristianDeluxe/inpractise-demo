import { z } from 'zod'
import { captureResearchHandler } from './captureResearchHandler.ts'
import { sendNoteRequest } from './sendNoteRequest.ts'

Deno.test('notebook actions through the handler', async (t) => {
  const handler = await captureResearchHandler()
  await t.step(
    'an identity claim on a save is rejected before Auth',
    async () => {
      const { response, requests } = await sendNoteRequest(handler, {
        action: 'note_save',
        documentId: 'basic',
        revisionId: 'a'.repeat(64),
        passageId: 'P1',
        userId: 'someone-else',
      })
      if (response.status !== 422) throw new Error('Identity claim accepted')
      if (requests.length !== 0)
        throw new Error('A request reached the backend')
    },
  )
  await t.step(
    'a listing is an ordinary envelope for the caller org',
    async () => {
      const { response } = await sendNoteRequest(handler, {
        action: 'note_list',
      })
      if (response.headers.get('x-research-org-id') !== 'org-a')
        throw new Error('Listing lost its organisation scope')
      z.strictObject({
        action: z.literal('note_list'),
        data: z.strictObject({ notes: z.array(z.never()) }),
        buildId: z.string(),
        requestId: z.string(),
      }).parse(await response.json())
    },
  )
})
