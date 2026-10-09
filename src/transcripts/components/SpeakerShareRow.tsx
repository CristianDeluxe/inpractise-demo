import { formatDuration } from '../formatters/formatDuration'
import { speakerBarClass } from '../speakers/speakerBarClass'
import { speakerTextClass } from '../speakers/speakerTextClass'
import type { SpeakerShareRowProps } from './SpeakerShareRowProps'

/** One speaker's share of the episode as a figure and a bar, with turns and longest stretch below. */
export function SpeakerShareRow({ share }: SpeakerShareRowProps) {
  const percent = Math.round(share.share * 100)
  return (
    <li className="space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`font-medium ${speakerTextClass(share.role)}`}>
          {share.name}
        </span>
        <span className="font-medium tabular-nums">{percent}%</span>
      </div>
      <div
        aria-hidden="true"
        className="h-1.5 overflow-hidden rounded-full bg-secondary"
      >
        <div
          className={`h-full rounded-full ${speakerBarClass(share.role)}`}
          style={{ width: `${String(percent)}%` }}
        />
      </div>
      <p className="text-xs tabular-nums text-muted-foreground">
        {formatDuration(share.seconds)} · {share.turns} turns · longest{' '}
        {formatDuration(share.longestSeconds)}
      </p>
    </li>
  )
}
