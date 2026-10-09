import type { ReviewParagraphProps } from './ReviewParagraphProps'

export type FinalBodyProps = Pick<
  ReviewParagraphProps,
  'paragraph' | 'corrected' | 'controls' | 'active'
>
