import type { PlannedSubQuestion } from './PlannedSubQuestion.ts'

/** A scripted plan reply: one entry per question, each optionally scoped. */
export function planContentFixture(
  subQuestions: readonly PlannedSubQuestion[],
) {
  return JSON.stringify({
    subQuestions: subQuestions.map((entry) => ({
      question: entry.question,
      company: entry.company ?? null,
    })),
  })
}
