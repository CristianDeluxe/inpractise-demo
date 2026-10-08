import type { CostRow } from './CostRow'
import type { UsageDay } from './UsageDay'

export type CostData = {
  readonly rows: readonly CostRow[]
  readonly embeddingTokens: number
  /** Null when the caller is not a reviewer. */
  readonly usage: readonly UsageDay[] | null
}
