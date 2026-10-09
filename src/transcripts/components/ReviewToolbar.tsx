import { filterOptions } from './filterOptions'
import type { ReviewToolbarProps } from './ReviewToolbarProps'
import { SegmentedControl } from './SegmentedControl'
import { showsParagraphFilter } from './showsParagraphFilter'

export function ReviewToolbar(props: ReviewToolbarProps) {
  return (
    <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-2 md:min-h-9">
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
      <div
        inert={!showsParagraphFilter(props.mode)}
        aria-hidden={!showsParagraphFilter(props.mode)}
        className={`max-w-full lg:ml-auto ${showsParagraphFilter(props.mode) ? '' : 'invisible'}`}
      >
        <SegmentedControl
          label="Paragraphs"
          value={props.filter}
          onChange={props.onFilterChange}
          options={filterOptions(props)}
        />
      </div>
    </div>
  )
}
