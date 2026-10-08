import type { BarVerdictButtonProps } from './BarVerdictButtonProps'
import { verdictActionText } from './verdictActionText'
import { verdictIcon } from './verdictIcon'
import { verdictPressedClass } from './verdictPressedClass'

/** One icon toggle in the margin bar; pressing it again clears the verdict. */
export function BarVerdictButton({
  editId,
  target,
  controls,
}: BarVerdictButtonProps) {
  const verdict = controls.decisions.get(editId)
  const text = verdictActionText[target]
  const Icon = verdictIcon[target]
  const label = `${text.idle} (${text.key})`
  return (
    <button
      type="button"
      aria-pressed={verdict === target}
      aria-label={label}
      title={label}
      onClick={() => {
        controls.decide([editId], verdict === target ? null : target)
      }}
      className={`inline-grid size-8 place-items-center rounded-full border border-transparent transition-colors hover:bg-secondary ${verdictPressedClass[target]}`}
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  )
}
