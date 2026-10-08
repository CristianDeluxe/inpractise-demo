import type { ReviewToolbarProps } from './ReviewToolbarProps'

export type ReviewNavigationProps = Pick<
  ReviewToolbarProps,
  | 'pending'
  | 'saveState'
  | 'canUndo'
  | 'onUndo'
  | 'onPrevious'
  | 'onNext'
  | 'onOpenReport'
>
