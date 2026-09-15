import type { ViewAs } from '../research/ViewAs.ts'

/**
 * One scripted investigation: provider completions answered in order (plan,
 * then refinement when one is requested, then synthesis), the sub-question
 * texts whose retrieval must return nothing, the usage every completion
 * reports, and the environment and viewing mode the loop runs under.
 */
export type InvestigateScenarioOptions = {
  completions: readonly string[]
  emptyQueries?: readonly string[]
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  environment?: Record<string, string>
  company?: string
  viewAs?: ViewAs
}
