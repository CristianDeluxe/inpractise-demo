import type { ParagraphEditRowProps } from './ParagraphEditRowProps'
import { TrackedOps } from './TrackedOps'
import { verdictDotClass } from './verdictDotClass'

export function ParagraphEditRow({ edit, controls }: ParagraphEditRowProps) {
  return (
    <li>
      <button
        type="button"
        aria-current={controls.focusedEditId === edit.id ? 'true' : undefined}
        onClick={() => {
          controls.focusEdit(edit.id)
        }}
        className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-secondary aria-[current=true]:bg-accent"
      >
        <span
          aria-hidden="true"
          className={`size-2 shrink-0 rounded-full ${verdictDotClass(controls.decisions.get(edit.id))}`}
        />
        <span className="min-w-0 flex-1 truncate">
          <TrackedOps from={edit.from} to={edit.to} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {edit.category}
        </span>
      </button>
    </li>
  )
}
