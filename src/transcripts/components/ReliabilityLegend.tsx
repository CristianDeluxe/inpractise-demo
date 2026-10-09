import { reliableWordThreshold } from '../reliability/reliableWordThreshold'
import { scoredWordClass } from './scoredWordClass'

export function ReliabilityLegend() {
  return (
    <ul
      aria-label="Legend"
      className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
    >
      <li>
        <span className={scoredWordClass(0)}>marked</span> word below{' '}
        {String(Math.round(reliableWordThreshold * 100))}% reliability: an
        optional spot-check
      </li>
    </ul>
  )
}
