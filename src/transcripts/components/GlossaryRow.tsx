import { episodeSourceLabel } from '../episodes/episodeSourceLabel'
import { Badge } from './Badge'
import { basisLabel } from './basisLabel'
import type { GlossaryRowProps } from './GlossaryRowProps'

export function GlossaryRow({ entry }: GlossaryRowProps) {
  return (
    <tr>
      <td className="py-2.5 pr-4 font-mono text-destructive line-through decoration-destructive/40">
        {entry.from}
      </td>
      <td className="py-2.5 pr-4 font-mono font-semibold">{entry.to}</td>
      <td className="py-2.5 pr-4">
        <Badge tone="neutral">{entry.category}</Badge>
      </td>
      <td className="py-2.5 pr-4 text-right tabular-nums">
        {String(entry.occurrences)}
      </td>
      <td className="py-2.5 pr-4 text-muted-foreground">
        {entry.sources.map(episodeSourceLabel).join(', ')}
      </td>
      <td className="py-2.5">
        <Badge tone={entry.basis === 'references' ? 'accent' : 'success'}>
          {basisLabel(entry.basis)}
        </Badge>
      </td>
    </tr>
  )
}
