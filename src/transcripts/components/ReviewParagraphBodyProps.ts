import type { ReviewParagraphProps } from './ReviewParagraphProps'

export type ReviewParagraphBodyProps = Pick<
  ReviewParagraphProps,
  'paragraph' | 'corrected' | 'mode' | 'controls'
>
