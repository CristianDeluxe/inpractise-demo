import { requestChatCompletion } from '../answer/requestChatCompletion.ts'
import type { MergedEvidence } from './MergedEvidence.ts'
import { parseSynthesis } from './parseSynthesis.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { Synthesis } from './Synthesis.ts'
import { synthesisPrompt } from './synthesisPrompt.ts'
import { synthesisTranscript } from './synthesisTranscript.ts'
import type { TokenBudget } from './TokenBudget.ts'

/**
 * Step four: one grounded synthesis over the merged context. Usage reaches
 * the caller's ledger through `onUsage` once the budget has added it, before
 * the content is inspected, so a paid but malformed answer keeps its cost.
 */
export async function requestSynthesis(
  input: {
    question: string
    plan: readonly SubQuestion[]
    merged: MergedEvidence
  },
  budget: TokenBudget,
  onUsage: (totals: unknown) => Promise<void>,
): Promise<Synthesis> {
  budget.assertAvailable()
  const content = await requestChatCompletion(
    {
      system: synthesisPrompt,
      user: synthesisTranscript(input.question, input.plan, input.merged),
      maxTokens: 900,
      json: true,
      failureMessage: 'Synthesis failed',
    },
    async (usage) => onUsage(budget.consume(usage)),
  )
  return parseSynthesis(content, input.plan, input.merged.sources.length)
}
