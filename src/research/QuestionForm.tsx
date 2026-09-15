import type { QuestionFormProps } from './QuestionFormProps'
import { QuestionMode } from './QuestionMode'

export function QuestionForm({ research }: QuestionFormProps) {
  return (
    <form
      onSubmit={research.submit}
      className="rounded-lg border border-border bg-card p-5"
    >
      <QuestionMode research={research} />
      <label htmlFor="question" className="mb-2 block text-sm font-medium">
        {research.mode === 'search' ? 'Search query' : 'Your question'}
      </label>
      <textarea
        id="question"
        required
        maxLength={2000}
        rows={4}
        value={research.query}
        onChange={(event) => {
          research.setQuery(event.target.value)
        }}
        className="field"
        placeholder="What does the evidence establish?"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Every question starts a new retrieval. Up to 500 tokens.
        </p>
        <button
          type="submit"
          className="action"
          disabled={!research.query.trim()}
        >
          {research.mode === 'search'
            ? 'Search passages'
            : research.mode === 'investigate'
              ? 'Investigate'
              : 'Ask the corpus'}{' '}
          →
        </button>
      </div>
    </form>
  )
}
