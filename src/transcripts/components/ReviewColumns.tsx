import { AudioRefContext } from '../review/AudioRefContext'
import { EditInspector } from './EditInspector'
import type { ReviewColumnsProps } from './ReviewColumnsProps'
import { ReviewList } from './ReviewList'
import { ReviewOverlays } from './ReviewOverlays'

/** The transcript on the left, the inspector on the right, and what floats over both. */
export function ReviewColumns({
  listRef,
  paragraphs,
  ws,
  layout,
  inspectorInRail,
}: ReviewColumnsProps) {
  const { view, derived, controls } = ws
  const reading = view.mode === 'final'
  const inspectorHere = !reading && !inspectorInRail
  return (
    <>
      <div
        className={`mt-4 grid gap-8 ${inspectorHere ? 'lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14' : ''}`}
      >
        <div ref={listRef} className="min-w-0">
          <AudioRefContext.Provider value={ws.audioRef}>
            <ReviewList
              paragraphs={paragraphs}
              correctedById={derived.correctedById}
              mode={view.mode}
              controls={controls}
              activeId={ws.activeId}
              focusedParagraphId={ws.focusedParagraphId}
            />
          </AudioRefContext.Provider>
        </div>
        {inspectorHere ? (
          <EditInspector
            edits={ws.activeEdits}
            spanById={derived.spanById}
            previewId={ws.preview.preview?.editId ?? null}
            controls={controls}
          />
        ) : null}
      </div>
      <ReviewOverlays
        focusedEdit={reading ? undefined : layout.focusedEdit}
        preview={ws.preview}
        edits={ws.activeEdits}
        spanById={derived.spanById}
        controls={controls}
        consoleRef={layout.consoleRef}
      />
    </>
  )
}
