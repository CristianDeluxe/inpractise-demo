import type { ViewAs } from '@/api/ViewAs.ts'

/**
 * Partition validators by viewing restrictions as well as the read's organization.
 * A missing backend scope stays missing; a viewing mode alone is not enough to
 * safely issue an ETag.
 */
export function viewingReadScope(
  readScope: string | null,
  viewAs: ViewAs | undefined,
) {
  if (readScope === null) return null
  return viewAs
    ? JSON.stringify([readScope, viewAs.role ?? null, viewAs.premium ?? null])
    : readScope
}
