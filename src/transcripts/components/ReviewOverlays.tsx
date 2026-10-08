import { MobileEditSheet } from './MobileEditSheet'
import { PreviewLayer } from './PreviewLayer'
import type { ReviewOverlaysProps } from './ReviewOverlaysProps'

/** What floats over the text: the hover card and, on small screens, the edit sheet. */
export function ReviewOverlays({
  focusedEdit,
  preview,
  edits,
  controls,
}: ReviewOverlaysProps) {
  return (
    <>
      <MobileEditSheet edit={focusedEdit} controls={controls} />
      <PreviewLayer preview={preview} edits={edits} controls={controls} />
    </>
  )
}
