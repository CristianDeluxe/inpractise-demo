import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { MarkVariant } from './MarkVariant'

export type EditMarkContentProps = {
  readonly edit: CorrectionEdit
  readonly verdict: ReviewVerdict | undefined
  readonly variant: MarkVariant
}
