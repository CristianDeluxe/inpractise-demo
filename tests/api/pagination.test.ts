import { documentsOutput } from '@/http-api/documentsOutput.ts'
import { describe, expect, it } from 'vitest'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { facadeFixture } from './facadeFixture.ts'

describe('authorized library pagination', () => {
  it('walks stable keys and reapplies backend filters on every page', async () => {
    const { handle, transport } = facadeFixture()
    const first = documentsOutput.parse(
      await (
        await handle(
          apiRequestFixture(
            'documents?pageSize=1&company=northstar&kind=synthetic_interview',
          ),
        )
      ).json(),
    )
    expect(first.items.map((item) => item.document_id)).toEqual(['northstar'])
    expect(first.nextCursor).toBeTypeOf('string')
    const second = documentsOutput.parse(
      await (
        await handle(
          apiRequestFixture(
            `documents?pageSize=1&company=northstar&kind=synthetic_interview&cursor=${first.nextCursor ?? ''}`,
          ),
        )
      ).json(),
    )
    expect(second.items.map((item) => item.document_id)).toEqual(['zenith'])
    expect(second.nextCursor).toBeNull()
    expect(transport).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: '{"action":"list","company":"northstar","kind":"synthetic_interview"}',
      }),
    )
    expect(
      (
        await handle(
          apiRequestFixture(`documents?cursor=${first.nextCursor ?? ''}`),
        )
      ).status,
    ).toBe(422)
  })
  it('rejects malformed cursors instead of silently restarting', async () => {
    const { handle } = facadeFixture()
    expect(
      (await handle(apiRequestFixture('documents?cursor=broken'))).status,
    ).toBe(422)
  })
})
