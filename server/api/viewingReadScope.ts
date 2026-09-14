import type { ViewAs } from '@/api/ViewAs.ts'

export function viewingReadScope(
  readScope: string | null,
  viewAs: ViewAs | undefined,
) {
  if (readScope === null) return null
  return viewAs
    ? JSON.stringify([readScope, viewAs.role ?? null, viewAs.premium ?? null])
    : readScope
}
