import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import { verdictLabel } from './verdictLabel'

export function editMarkLabel(
  edit: CorrectionEdit,
  verdict: ReviewVerdict | undefined,
) {
  return `${edit.category} edit, ${verdictLabel(verdict)}: ${edit.from} to ${edit.to}`
}
