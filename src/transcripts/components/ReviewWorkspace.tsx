import { WorkspacePage } from '@/workspace/WorkspacePage'
import { displayTitle } from '../episodes/displayTitle'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReviewScreen } from '../hooks/useReviewScreen'
import { buildToolbarProps } from '../review/buildToolbarProps'
import { RailInspector } from './RailInspector'
import { ReadOnlyNotice } from './ReadOnlyNotice'
import { ReliabilityRail } from './ReliabilityRail'
import { ReviewColumns } from './ReviewColumns'
import { ReviewConsole } from './ReviewConsole'
import type { ReviewWorkspaceProps } from './ReviewWorkspaceProps'
import { TranscriptNote } from './TranscriptNote'

export function ReviewWorkspace({ bundle, onSave }: ReviewWorkspaceProps) {
  const { transcript, correction } = bundle
  const { ws, layout, audio, visible, reliability } = useReviewScreen(
    bundle,
    onSave,
  )
  const toolbar = buildToolbarProps(bundle, ws)
  const railHoldsInspector =
    useMediaQuery('(min-width: 1280px)') && ws.view.mode !== 'final'
  return (
    <WorkspacePage
      eyebrow="Production"
      title={displayTitle(transcript.id, transcript.source.title)}
      note={<TranscriptNote transcript={transcript} correction={correction} />}
    >
      {onSave === null ? <ReadOnlyNotice /> : null}
      <div
        style={layout.style}
        className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-10"
      >
        <ReliabilityRail
          transcript={transcript}
          reliability={reliability}
          mode={ws.view.mode}
          onOpenReport={toolbar.onOpenReport}
          inspector={railHoldsInspector ? <RailInspector ws={ws} /> : null}
        />
        <div className="min-w-0 xl:col-start-1 xl:row-start-1">
          <ReviewConsole
            consoleRef={layout.consoleRef}
            audio={audio}
            toolbar={toolbar}
          />
          <ReviewColumns
            paragraphs={visible}
            ws={ws}
            layout={layout}
            inspectorInRail={railHoldsInspector}
          />
        </div>
      </div>
    </WorkspacePage>
  )
}
