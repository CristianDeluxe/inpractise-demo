import type { ReviewParagraphProps } from './ReviewParagraphProps'

export type ReviewParagraphBodyProps = Pick<
  ReviewParagraphProps,
  'paragraph' | 'corrected' | 'mode' | 'controls' | 'active'
> & {
  /** Review note shown under the first turn's speaker. */
  readonly note: string | null
}
