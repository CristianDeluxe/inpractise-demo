import { ApiError } from '../_shared/http/ApiError.ts'
import type { LibraryItemRow } from './LibraryItemRow.ts'

export function flattenLibraryItem<T extends LibraryItemRow>({
  passages,
  documents: _documents,
  ...item
}: T) {
  const count = passages[0]?.count
  if (
    passages.length !== 1 ||
    count === undefined ||
    !Number.isSafeInteger(count) ||
    count < 0
  )
    throw new ApiError(
      'dependency_failure',
      'Library count missing or invalid',
      true,
    )
  return { ...item, passage_count: count }
}
