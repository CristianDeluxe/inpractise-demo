import type { QuestionFormProps } from './QuestionFormProps'
import { suggestedQuestions } from './suggestedQuestions'

export function QuestionSuggestions({ research }: QuestionFormProps) {
  return (
    <div className="my-5">
      <p className="mb-2 text-xs text-muted-foreground">
        Draft suggestions — select, then submit
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            className="quiet-action text-left text-xs"
            onClick={() => {
              research.setQuery(question)
            }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
