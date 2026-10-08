import type { ReviewFilter } from '../review/ReviewFilter'
import type { ReviewToolbarProps } from './ReviewToolbarProps'
import type { SegmentOption } from './SegmentOption'

/** Paragraph filters, each saying what it counts: passages or edits. */
export function filterOptions(
  props: ReviewToolbarProps,
): SegmentOption<ReviewFilter>[] {
  return [
    {
      value: 'attention',
      label: `Needs attention · ${String(props.flaggedCount)} passages`,
    },
    {
      value: 'deferred',
      label: `Flagged · ${String(props.deferredCount)} edits`,
      disabled: props.deferredCount === 0 && props.filter !== 'deferred',
    },
    { value: 'all', label: `All · ${String(props.totalCount)} passages` },
  ]
}
