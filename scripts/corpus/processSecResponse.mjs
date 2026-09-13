import { writeFile } from 'node:fs/promises'
import { assertSecUrl } from './assertSecUrl.mjs'
import { readBoundedBody } from './readBoundedBody.mjs'
import { sha256 } from './sha256.mjs'

import { handleSecHttpFailure } from './handleSecHttpFailure.mjs'

export async function processSecResponse(root, response, context) {
  const { target, state, record, attempt } = context
  record.status = response.status
  record.retryAfter = response.headers.get('retry-after')
  if ([403, 429].includes(response.status)) {
    state.blocked = true
    await response.body?.cancel()
    throw new Error(`SEC_HTTP_${response.status}`)
  }
  if (response.status >= 300 && response.status < 400) {
    const redirect = assertSecUrl(
      new URL(response.headers.get('location'), target).href,
    )
    await response.body?.cancel()
    if (attempt === 3) throw new Error('SEC_REDIRECT_LIMIT')
    return { redirect }
  }
  if (!response.ok) {
    await handleSecHttpFailure(response, context)
    return { retry: true }
  }
  const bytes = await readBoundedBody(response, 10000000)
  record.retrievedAt = new Date().toISOString()
  record.sha256 = sha256(bytes)
  record.path = `corpus/raw/${record.sha256}.${target.endsWith('.json') ? 'json' : 'html'}`
  await writeFile(`${root}/${record.path}`, bytes)
  return { result: { bytes, record } }
}
