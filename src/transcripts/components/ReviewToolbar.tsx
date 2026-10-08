import { ReviewNavigation } from './ReviewNavigation'
import type { ReviewToolbarProps } from './ReviewToolbarProps'
import { SegmentedControl } from './SegmentedControl'

export function ReviewToolbar(props: ReviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <SegmentedControl
        label="View"
        value={props.mode}
        onChange={props.onModeChange}
        options={[
          {
            value: 'inline',
            label: 'Track changes',
            disabled: !props.hasCorrection,
          },
          {
            value: 'diff',
            label: 'Side by side',
            disabled: !props.hasCorrection,
          },
          { value: 'confidence', label: 'Confidence' },
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
      <ReviewNavigation {...props} />
    </div>
  )
}
