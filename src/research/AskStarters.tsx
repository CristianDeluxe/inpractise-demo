import type { AskStartersProps } from './AskStartersProps'
import { suggestedQuestions } from './suggestedQuestions'

export function AskStarters({ onSelect }: AskStartersProps) {
  return (
    <div className="px-1 py-6">
      <p className="text-sm">
        Ask one question about the corpus you are authorized to read.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Every answer cites the passage it used, and says so when the corpus
        establishes nothing.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => {
              onSelect(question)
            }}
            className="rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm transition-colors hover:border-primary"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
