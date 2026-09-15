import type { CompareFormProps } from './CompareFormProps'

export function CompareForm({ compare }: CompareFormProps) {
  const disabled = !compare.topic.trim() || !compare.company
  return (
    <form
      onSubmit={compare.submit}
      className="rounded-lg border border-border bg-card p-5"
    >
      <label htmlFor="topic" className="mb-2 block text-sm font-medium">
        Topic to cross-reference
      </label>
      <textarea
        id="topic"
        required
        maxLength={2000}
        rows={3}
        value={compare.topic}
        onChange={(event) => {
          compare.setTopic(event.target.value)
        }}
        className="field"
        placeholder="What does leadership say, and what does the filing say?"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          {compare.company
            ? "Compares this company's interviews against its filings."
            : 'Choose a company above first.'}
        </p>
        <button type="submit" className="action" disabled={disabled}>
          Compare →
        </button>
      </div>
    </form>
  )
}
