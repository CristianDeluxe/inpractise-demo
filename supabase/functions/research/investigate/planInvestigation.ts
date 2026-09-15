import { requestChatCompletion } from '../answer/requestChatCompletion.ts'
import type { Principal } from '../Principal.ts'
import { budgetUsageSink } from './budgetUsageSink.ts'
import { parsePlan } from './parsePlan.ts'
import { planPrompt } from './planPrompt.ts'
import { readVisibleCompanies } from './readVisibleCompanies.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { TokenBudget } from './TokenBudget.ts'

/**
 * Step one. The model sees the question and the company slugs this caller may
 * list, nothing from the corpus; the plan it returns is validated against that
 * same list before any retrieval runs. A scoped request narrows the list to
 * its one company.
 */
export async function planInvestigation(
  principal: Principal,
  question: string,
  company: string | undefined,
  budget: TokenBudget,
): Promise<SubQuestion[]> {
  const visible = await readVisibleCompanies(principal)
  const allowed = company === undefined ? visible : [company]
  budget.assertAvailable()
  const content = await requestChatCompletion(
    {
      system: planPrompt,
      user:
        `Company slugs: ${allowed.length ? allowed.join(', ') : '(none)'}\n\n` +
        `Question: ${question}\n\nBreak the question into sub-questions.`,
      maxTokens: 400,
      json: true,
      failureMessage: 'Planning failed',
    },
    budgetUsageSink(budget),
  )
  return parsePlan(content, allowed, company)
}
