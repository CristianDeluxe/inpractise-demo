import type { EditAudioButtonsProps } from './EditAudioButtonsProps'
import { LoopEditButton } from './LoopEditButton'
import { ReplayEditButton } from './ReplayEditButton'

/** Replay once or loop the words the selected edit rewrites. */
export function EditAudioButtons({
  editId,
  span,
  controls,
}: EditAudioButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <ReplayEditButton
        span={span}
        onReplay={() => {
          controls.replayEdit(editId)
        }}
      />
      <LoopEditButton
        span={span}
        looping={controls.looping}
        onToggle={() => {
          controls.toggleLoop(editId)
        }}
      />
    </div>
  )
}
