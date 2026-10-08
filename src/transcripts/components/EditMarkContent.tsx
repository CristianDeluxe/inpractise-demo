import { addedClass } from './addedClass'
import type { EditMarkContentProps } from './EditMarkContentProps'
import { TrackedOps } from './TrackedOps'

export function EditMarkContent({
  edit,
  verdict,
  variant,
}: EditMarkContentProps) {
  if (verdict === 'accepted') {
    return (
      <span className="underline decoration-success-foreground/45 decoration-2 underline-offset-[5px]">
        {edit.to}
      </span>
    )
  }
  if (verdict === 'rejected') {
    return (
      <span className="underline decoration-muted-foreground/50 decoration-dotted decoration-2 underline-offset-[5px]">
        {edit.from}
      </span>
    )
  }
  if (variant === 'corrected')
    return <ins className={addedClass}>{edit.to}</ins>
  return <TrackedOps from={edit.from} to={edit.to} />
}
