import type { AskHistoryTurn } from './AskHistoryTurn.ts'

/** The rewrite prompt's user message: the earlier turns, then the question. */
export function condenseTranscript(
  query: string,
  history: readonly AskHistoryTurn[],
): string {
  const turns = history
    .map(
      (turn, index) =>
        `<<<TURN ${String(index + 1)}>>>\nQuestion: ${turn.question}\nAnswer: ${turn.answer}\n<<<END TURN ${String(index + 1)}>>>`,
    )
    .join('\n\n')
  return `${turns}\n\nLatest question: ${query}\n\nRewrite the latest question so it stands on its own.`
}
