import { EditInspector } from './EditInspector'
import type { ReviewColumnsProps } from './ReviewColumnsProps'
import { ReviewList } from './ReviewList'
import { ReviewOverlays } from './ReviewOverlays'

/** The transcript on the left, the inspector on the right, and what floats over both. */
export function ReviewColumns({ paragraphs, ws, layout }: ReviewColumnsProps) {
  const { view, derived, controls } = ws
  return (
    <>
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] xl:gap-10">
        <ReviewList
          paragraphs={paragraphs}
          correctedById={derived.correctedById}
          mode={view.mode}
          controls={controls}
          activeId={ws.activeId}
          focusedParagraphId={ws.focusedParagraphId}
        />
        <EditInspector
          edits={derived.edits}
          spanById={derived.spanById}
          previewId={ws.preview.preview?.editId ?? null}
          controls={controls}
        />
      </div>
      <ReviewOverlays
        focusedEdit={layout.focusedEdit}
        preview={ws.preview}
        edits={derived.edits}
        spanById={derived.spanById}
        controls={controls}
      />
    </>
  )
}
