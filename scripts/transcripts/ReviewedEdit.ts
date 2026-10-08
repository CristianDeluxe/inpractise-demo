import type { EditCategory } from '@/transcripts/contracts/EditCategory.ts'
import type { ReviewVerdict } from '@/transcripts/contracts/ReviewVerdict.ts'

export type ReviewedEdit = {
  readonly id: string
  readonly paragraphId: string
  readonly from: string
  readonly to: string
  readonly category: EditCategory
  readonly verdict: ReviewVerdict | 'pending'
}
