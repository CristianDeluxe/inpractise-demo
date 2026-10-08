import { FocusedEditBar } from './FocusedEditBar'
import { MobileEditSheet } from './MobileEditSheet'
import { PreviewLayer } from './PreviewLayer'
import type { ReviewOverlaysProps } from './ReviewOverlaysProps'

/** What floats over the text: the margin decision bar, the hover card below the inspector breakpoint, and the phone sheet. */
export function ReviewOverlays({
  focusedEdit,
  preview,
  edits,
  spanById,
  controls,
  consoleRef,
}: ReviewOverlaysProps) {
  return (
    <>
      <FocusedEditBar
        edit={focusedEdit}
        controls={controls}
        consoleRef={consoleRef}
      />
      <MobileEditSheet
        edit={focusedEdit}
        edits={edits}
        span={focusedEdit ? spanById.get(focusedEdit.id) : undefined}
        controls={controls}
      />
      <PreviewLayer preview={preview} edits={edits} controls={controls} />
    </>
  )
}
