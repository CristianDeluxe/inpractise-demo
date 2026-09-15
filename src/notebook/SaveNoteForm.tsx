import type { SaveNoteFormProps } from './SaveNoteFormProps'

/** The collapsed disclosure's contents: the one-line note field and its submit. */
export function SaveNoteForm({
  citationId,
  status,
  note,
  setNote,
  submit,
}: SaveNoteFormProps) {
  const inputId = `note-${citationId}`
  return (
    <details className="mt-4 text-sm">
      <summary className="cursor-pointer text-primary">
        Save to notebook
      </summary>
      <form
        className="mt-3 flex flex-wrap items-end gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <label className="flex-1 basis-64 text-xs" htmlFor={inputId}>
          One-line note (optional)
          <input
            id={inputId}
            className="field mt-1"
            maxLength={300}
            value={note}
            onChange={(event) => {
              setNote(event.target.value)
            }}
          />
        </label>
        <button
          type="submit"
          className="quiet-action"
          disabled={status === 'saving'}
        >
          {status === 'saving' ? 'Saving' : 'Save citation'}
        </button>
      </form>
      {status === 'failed' ? (
        <p role="alert" className="mt-2 text-destructive">
          This citation could not be saved.
        </p>
      ) : null}
    </details>
  )
}
