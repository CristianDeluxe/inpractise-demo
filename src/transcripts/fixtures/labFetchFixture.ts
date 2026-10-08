import { vi } from 'vitest'
import { answerLabRequest } from './answerLabRequest'
import type { LabTables } from './LabTables'
import type { LabWrite } from './LabWrite'
import { recordUrl } from './recordUrl'

/**
 * The fetch behind the data client in UI tests. `tables` is read at request
 * time, so a test may change it between polls.
 */
export function labFetchFixture(tables: LabTables = {}, denyWrites = false) {
  const writes: LabWrite[] = []
  const urls: string[] = []
  const fetcher = vi.fn<typeof fetch>(async (input, init) =>
    Promise.resolve(
      answerLabRequest(tables, writes, denyWrites, {
        url: recordUrl(urls, input),
        method: init?.method ?? 'GET',
        body: init?.body,
        keepalive: init?.keepalive === true,
      }),
    ),
  )
  return { fetcher, writes, urls }
}
