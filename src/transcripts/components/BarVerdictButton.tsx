import type { BarVerdictButtonProps } from './BarVerdictButtonProps'

/** One verdict toggle in the decision bar; pressing it again clears the verdict. */
export function BarVerdictButton({
  editId,
  target,
  controls,
  children,
}: BarVerdictButtonProps) {
  const verdict = controls.decisions.get(editId)
  const pressedClass =
    target === 'accepted'
      ? 'aria-pressed:bg-success-foreground aria-pressed:text-success'
      : 'aria-pressed:bg-destructive aria-pressed:text-destructive-foreground'
  return (
    <button
      type="button"
      aria-pressed={verdict === target}
      onClick={() => {
        controls.decide([editId], verdict === target ? null : target)
      }}
      className={`inline-flex min-h-8 flex-1 items-center justify-center gap-1 rounded-full font-medium transition-colors hover:bg-secondary ${pressedClass}`}
    >
      {children}
    </button>
  )
}
