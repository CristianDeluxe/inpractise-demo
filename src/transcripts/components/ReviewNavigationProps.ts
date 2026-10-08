import type { ReviewToolbarProps } from './ReviewToolbarProps'

export type ReviewNavigationProps = Pick<
  ReviewToolbarProps,
  'pending' | 'saveState' | 'onPrevious' | 'onNext' | 'onOpenReport'
>
