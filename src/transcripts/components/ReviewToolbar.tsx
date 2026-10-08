import type { ReviewToolbarProps } from './ReviewToolbarProps'
import { SaveIndicator } from './SaveIndicator'
import { SegmentedControl } from './SegmentedControl'

export function ReviewToolbar(props: ReviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <SegmentedControl
        label="View"
        value={props.mode}
        onChange={props.onModeChange}
        options={[
          { value: 'confidence', label: 'Confidence' },
          { value: 'diff', label: 'Diff', disabled: !props.hasCorrection },
        ]}
      />
      <SegmentedControl
        label="Paragraphs"
        value={props.filter}
        onChange={props.onFilterChange}
        options={[
          {
            value: 'attention',
            label: `Needs attention (${String(props.flaggedCount)})`,
          },
          { value: 'all', label: `All (${String(props.totalCount)})` },
        ]}
      />
      <p role="status" className="text-sm font-medium">
        {String(props.pending)} edits pending
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="quiet-action"
          onClick={props.onPrevious}
        >
          Prev (k)
        </button>
        <button type="button" className="quiet-action" onClick={props.onNext}>
          Next (j)
        </button>
      </div>
      <SaveIndicator state={props.saveState} />
      <button
        type="button"
        className="quiet-action ml-auto"
        onClick={props.onOpenReport}
      >
        Open report
      </button>
    </div>
  )
}
