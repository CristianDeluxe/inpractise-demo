import { ConfidenceWords } from './ConfidenceWords'
import type { DiffRowViewProps } from './DiffRowViewProps'
import { TrackedText } from './TrackedText'

/** One sentence: raw words left, corrected text right; highlighted while it holds the focused edit. */
export function DiffRowView({
  row,
  struck,
  focused,
  controls,
}: DiffRowViewProps) {
  const { firstWord, words } = row
  return (
    <div
      className={`grid gap-1 rounded-md py-1 md:grid-cols-2 md:gap-8 ${focused ? 'bg-secondary/60' : ''}`}
    >
      <ConfidenceWords
        words={words}
        onSeek={controls.seek}
        struck={struck.slice(firstWord, firstWord + words.length)}
        showFlags={false}
      />
      <TrackedText
        segments={row.segments}
        words={words}
        variant="corrected"
        controls={controls}
      />
    </div>
  )
}
