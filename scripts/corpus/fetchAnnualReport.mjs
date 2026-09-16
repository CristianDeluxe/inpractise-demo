import { writeFile } from 'node:fs/promises'
import { assertHttpsUrl } from './assertHttpsUrl.mjs'
import { readBoundedBody } from './readBoundedBody.mjs'
import { sha256 } from './sha256.mjs'

/**
 * One identified request, no redirects followed, a bounded body, and a PDF
 * check on both the declared type and the leading bytes before anything is
 * written under corpus/raw. The request record keeps the actual response
 * headers rather than a summary of them.
 */
export async function fetchAnnualReport(root, url, state) {
  const target = assertHttpsUrl(url)
  const record = {
    url: target,
    requestedAt: new Date().toISOString(),
    attempt: 1,
    status: null,
  }
  state.requests.push(record)
  const response = await fetch(target, {
    redirect: 'manual',
    headers: { 'User-Agent': state.userAgent, Accept: 'application/pdf' },
    signal: AbortSignal.timeout(60000),
  })
  record.status = response.status
  record.contentType = response.headers.get('content-type')
  record.contentLength = Number(response.headers.get('content-length')) || null
  record.lastModified = response.headers.get('last-modified')
  if (!response.ok) {
    await response.body?.cancel()
    throw new Error(`ANNUAL_REPORT_HTTP_${response.status}`)
  }
  if (!/^application\/pdf\b/iu.test(record.contentType ?? '')) {
    await response.body?.cancel()
    throw new Error('ANNUAL_REPORT_NOT_PDF')
  }
  const bytes = await readBoundedBody(response, state.maxBytes)
  if (!bytes.subarray(0, 5).equals(Buffer.from('%PDF-')))
    throw new Error('ANNUAL_REPORT_NOT_PDF')
  record.retrievedAt = new Date().toISOString()
  record.sha256 = sha256(bytes)
  record.path = `corpus/raw/${record.sha256}.pdf`
  await writeFile(`${root}/${record.path}`, bytes)
  return record
}
