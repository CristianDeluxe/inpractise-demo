import type { EditCategory } from '@/transcripts/contracts/EditCategory.ts'

export type GlossaryEdit = {
  readonly from: string
  readonly to: string
  readonly category: EditCategory
}
