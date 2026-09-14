import { parseListData } from '@/contracts/parseListData.ts'
import { documentsInput } from '@/http-api/documentsInput.ts'
import { decodeCursor } from './decodeCursor.ts'

/**
 * Pagination slices a freshly authorized, bounded library, not a stored snapshot.
 * The backend's 50-document ceiling still applies; cursors cannot retrieve beyond
 * it. Stable document-ID ordering prevents input row order from moving the page.
 */
export function paginateDocuments(data: unknown, input: unknown) {
  const { items } = parseListData(data)
  const options = documentsInput.parse(input)
  const after = decodeCursor(options)
  const sorted = items.toSorted((a, b) =>
    a.document_id < b.document_id ? -1 : Number(a.document_id > b.document_id),
  )
  const remaining = sorted.filter((item) => item.document_id > after)
  const page = remaining.slice(0, options.pageSize ?? 20)
  const last = page.at(-1)
  const nextCursor =
    last && remaining.length > page.length
      ? Buffer.from(
          JSON.stringify({
            after: last.document_id,
            company: options.company ?? null,
            kind: options.kind ?? null,
          }),
        ).toString('base64url')
      : null
  return { items: page, nextCursor }
}
