import { filterOptions } from './filterOptions'
import { ReviewNavigation } from './ReviewNavigation'
import type { ReviewToolbarProps } from './ReviewToolbarProps'
import { SegmentedControl } from './SegmentedControl'
import { showsParagraphFilter } from './showsParagraphFilter'

export function ReviewToolbar(props: ReviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <SegmentedControl
        label="View"
        value={props.mode}
        onChange={props.onModeChange}
        options={[
          {
            value: 'final',
            label: 'AI final',
            disabled: !props.hasCorrection,
          },
          {
            value: 'spotcheck',
            label: 'Spot-check',
            disabled: !props.hasCorrection,
          },
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
      {showsParagraphFilter(props.mode) ? (
        <SegmentedControl
          label="Paragraphs"
          value={props.filter}
          onChange={props.onFilterChange}
          options={filterOptions(props)}
        />
      ) : null}
      {props.mode === 'final' ? null : <ReviewNavigation {...props} />}
    </div>
  )
}
