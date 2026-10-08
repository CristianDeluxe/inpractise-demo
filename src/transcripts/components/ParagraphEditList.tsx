import { countPending } from '../review/countPending'
import type { ParagraphEditListProps } from './ParagraphEditListProps'
import { ParagraphEditRow } from './ParagraphEditRow'

/** Every edit in the focused paragraph, so the reviewer can see what else is left in it. */
export function ParagraphEditList({ edits, controls }: ParagraphEditListProps) {
  const pending = countPending(edits, controls.decisions)
  return (
    <section aria-label="Edits in this paragraph" className="lab-card p-2">
      <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-2">
        <h2 className="font-sans text-sm font-semibold tracking-normal">
          In this paragraph
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {pending} pending
        </span>
      </div>
      <ul className="max-h-72 overflow-y-auto">
        {edits.map((edit) => (
          <ParagraphEditRow key={edit.id} edit={edit} controls={controls} />
        ))}
      </ul>
      {pending > 1 ? (
        <button
          type="button"
          className="mx-2 mb-2 mt-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
          onClick={() => {
            controls.decide(
              edits
                .filter((edit) => !controls.decisions.has(edit.id))
                .map((edit) => edit.id),
              'accepted',
            )
          }}
        >
          Accept all {pending} pending in this paragraph
        </button>
      ) : null}
    </section>
  )
}
