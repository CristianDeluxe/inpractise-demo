import { isActivationKey } from '../review/isActivationKey'
import { EditMarkContent } from './EditMarkContent'
import type { EditMarkProps } from './EditMarkProps'
import { editMarkLabel } from './editMarkLabel'

/**
 * One proposed change in the running text: hover previews it, click opens it in
 * the inspector. A span with a button role, because a native button is an
 * atomic inline box and would stop a multi-word change from wrapping.
 */
export function EditMark({ edit, variant, controls }: EditMarkProps) {
  const verdict = controls.decisions.get(edit.id)
  const focused = controls.focusedEditId === edit.id
  return (
    <span
      role="button"
      tabIndex={0}
      data-edit-id={edit.id}
      aria-label={editMarkLabel(edit, verdict)}
      aria-current={focused ? 'true' : undefined}
      onMouseEnter={(event) => {
        controls.previewEdit(edit.id, event.currentTarget)
      }}
      onMouseLeave={controls.endPreview}
      onFocus={(event) => {
        controls.previewEdit(edit.id, event.currentTarget)
      }}
      onBlur={controls.endPreview}
      onClick={() => {
        controls.focusEdit(edit.id)
      }}
      onKeyDown={(event) => {
        if (!isActivationKey(event.key)) return
        event.preventDefault()
        controls.focusEdit(edit.id)
      }}
      className={`-mx-0.5 cursor-pointer rounded-sm px-0.5 [box-decoration-break:clone] transition-[background-color,box-shadow] duration-150 hover:bg-primary/10 ${focused ? 'bg-primary/10 shadow-[0_0_0_2px_var(--color-primary)]' : ''}`}
    >
      <EditMarkContent edit={edit} verdict={verdict} variant={variant} />
    </span>
  )
}
