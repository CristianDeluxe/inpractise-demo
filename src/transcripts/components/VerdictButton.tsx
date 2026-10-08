import { verdictActionText } from './verdictActionText'
import type { VerdictButtonProps } from './VerdictButtonProps'
import { verdictIcon } from './verdictIcon'
import { verdictPressedClass } from './verdictPressedClass'

/** One verdict toggle; pressing it again returns the edit to pending. */
export function VerdictButton({
  target,
  verdict,
  onDecide,
}: VerdictButtonProps) {
  const pressed = verdict === target
  const text = verdictActionText[target]
  const Icon = verdictIcon[target]
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => {
        onDecide(pressed ? null : target)
      }}
      className={`verdict-action aria-pressed:border-transparent ${verdictPressedClass[target]}`}
    >
      <Icon aria-hidden="true" className="size-4" />
      {pressed ? text.done : text.idle}
    </button>
  )
}
