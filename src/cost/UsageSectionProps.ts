import type { UsageDay } from './UsageDay'

export type UsageSectionProps = {
  /** Null when the caller is not a reviewer. */
  readonly usage: readonly UsageDay[] | null
}
