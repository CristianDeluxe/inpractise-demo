import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'

export function editMarkLabel(
  edit: CorrectionEdit,
  verdict: ReviewVerdict | undefined,
) {
  const state = verdict ?? 'pending'
  return `${edit.category} edit, ${state}: ${edit.from} to ${edit.to}`
}
