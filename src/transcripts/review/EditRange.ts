import type { CorrectionEdit } from '../contracts/CorrectionEdit'

export type EditRange = {
  readonly edit: CorrectionEdit
  readonly start: number
  readonly end: number
}
