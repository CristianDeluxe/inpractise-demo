/** A scripted plan reply: one entry per question, each optionally scoped. */
export function planContentFixture(
  subQuestions: readonly { question: string; company?: string | null }[],
) {
  return JSON.stringify({
    subQuestions: subQuestions.map((entry) => ({
      question: entry.question,
      company: entry.company ?? null,
    })),
  })
}
