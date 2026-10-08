import type { EditCategory } from './EditCategory'
import type { EditOrigin } from './EditOrigin'

/** One substitution inside a paragraph. from is verbatim raw text; to is its replacement. */
export type CorrectionEdit = {
  readonly id: string
  readonly paragraphId: string
  readonly from: string
  readonly to: string
  readonly category: EditCategory
  readonly origin: EditOrigin
  readonly reason: string
  readonly confidence: number
}
