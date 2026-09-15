import { SendHorizontal } from 'lucide-react'
import type { AskComposerProps } from './AskComposerProps'

export function AskComposer({
  query,
  pending,
  onChange,
  onSubmit,
}: AskComposerProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-border p-4">
      <div className="flex items-end gap-2">
        <label htmlFor="ask-chat-query" className="sr-only">
          Your question
        </label>
        <textarea
          id="ask-chat-query"
          rows={2}
          value={query}
          onChange={(event) => {
            onChange(event.target.value)
          }}
          placeholder="Ask a question about the corpus"
          className="field min-h-[3.5rem] resize-none rounded-2xl"
        />
        <button
          type="submit"
          disabled={pending || query.trim().length === 0}
          aria-label="Ask the corpus"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,scale] duration-150 motion-safe:active:scale-[0.96] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        >
          <SendHorizontal size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Each question is asked on its own. Nothing carries over from the one
        before it.
      </p>
    </form>
  )
}
