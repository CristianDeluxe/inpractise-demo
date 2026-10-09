import { EditInspector } from './EditInspector'
import type { RailInspectorProps } from './RailInspectorProps'

export function RailInspector({ ws }: RailInspectorProps) {
  return (
    <EditInspector
      inRail
      edits={ws.activeEdits}
      spanById={ws.derived.spanById}
      previewId={ws.preview.preview?.editId ?? null}
      controls={ws.controls}
    />
  )
}
