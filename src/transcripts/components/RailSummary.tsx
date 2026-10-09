import { ChevronDown } from 'lucide-react'
import { formatReliability } from '../formatters/formatReliability'
import type { RailSummaryProps } from './RailSummaryProps'

/** The collapsed handle of the panel below the wide breakpoint: the figure stays visible. */
export function RailSummary({ reliability }: RailSummaryProps) {
  return (
    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold xl:hidden [&::-webkit-details-marker]:hidden">
      <span>Transcript quality</span>
      <span className="flex items-center gap-2 font-normal tabular-nums text-muted-foreground">
        {reliability === null
          ? null
          : `${formatReliability(reliability.reliability)} reliable`}
        <ChevronDown aria-hidden="true" className="size-4" />
      </span>
    </summary>
  )
}
