import type { CostCellProps } from './CostCellProps'

/** One figure, with the detail that qualifies it on a quieter second line. */
export function CostCell({ primary, secondary, title }: CostCellProps) {
  return (
    <td className="py-3 pr-6 align-top">
      <span className="block whitespace-nowrap text-sm tabular-nums">
        {primary}
      </span>
      {secondary === undefined ? null : (
        <span
          className="mt-0.5 block text-xs text-muted-foreground tabular-nums"
          title={title}
        >
          {secondary}
        </span>
      )}
    </td>
  )
}
