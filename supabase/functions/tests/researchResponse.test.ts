import { researchResponse } from '../research/researchResponse.ts'

Deno.test(
  'research success carries read-owned scope without changing the envelope',
  async () => {
    const response = researchResponse(
      { action: 'read', data: {}, buildId: 'test', requestId: 'test-id' },
      'org-from-principal',
    )
    if (response.headers.get('x-research-org-id') !== 'org-from-principal')
      throw new Error('Missing authoritative scope')
    if (response.status !== 200) throw new Error('Changed success status')
    if (
      (await response.text()) !==
      '{"action":"read","data":{},"buildId":"test","requestId":"test-id"}'
    )
      throw new Error('Changed envelope')
  },
)
