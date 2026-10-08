import type { BasisTagProps } from './BasisTagProps'

/** Says whether a section's numbers were read from a record or computed from one. */
export function BasisTag({ basis }: BasisTagProps) {
  return (
    <span className="eyebrow ml-3 align-middle text-muted-foreground">
      {basis === 'measured' ? 'Measured' : 'Estimated'}
    </span>
  )
}
