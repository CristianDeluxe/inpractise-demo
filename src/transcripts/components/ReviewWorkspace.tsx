import { WorkspacePage } from '@/workspace/WorkspacePage'
import { displayTitle } from '../episodes/displayTitle'
import { useAnchoredToolbar } from '../hooks/useAnchoredToolbar'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReviewScreen } from '../hooks/useReviewScreen'
import { RailInspector } from './RailInspector'
import { ReadOnlyNotice } from './ReadOnlyNotice'
import { ReliabilityRail } from './ReliabilityRail'
import { ReviewColumns } from './ReviewColumns'
import { ReviewConsole } from './ReviewConsole'
import type { ReviewWorkspaceProps } from './ReviewWorkspaceProps'
import { SpeakerProvider } from './SpeakerProvider'
import { TranscriptNote } from './TranscriptNote'

export function ReviewWorkspace({ bundle, onSave }: ReviewWorkspaceProps) {
  const { transcript, correction } = bundle
  const { ws, layout, audio, visible, reliability } = useReviewScreen(
    bundle,
    onSave,
  )
  const { listRef, toolbar } = useAnchoredToolbar(bundle, ws, layout.consoleRef)
  const wide = useMediaQuery('(min-width: 1280px)')
  const railHoldsInspector = wide && ws.view.mode !== 'final'
  return (
    <WorkspacePage
      eyebrow="Production"
      title={displayTitle(transcript.id, transcript.source.title)}
      note={<TranscriptNote transcript={transcript} correction={correction} />}
    >
      {onSave === null ? <ReadOnlyNotice /> : null}
      <div
        style={layout.style}
        className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10"
      >
        <ReliabilityRail
          transcript={transcript}
          reliability={reliability}
          mode={ws.view.mode}
          wide={wide}
          onOpenReport={toolbar.onOpenReport}
          inspector={railHoldsInspector ? <RailInspector ws={ws} /> : null}
        />
        <div className="min-w-0 xl:col-start-1 xl:row-start-1">
          <ReviewConsole
            consoleRef={layout.consoleRef}
            audio={audio}
            toolbar={toolbar}
          />
          <SpeakerProvider transcript={transcript}>
            <ReviewColumns
              listRef={listRef}
              paragraphs={visible}
              ws={ws}
              layout={layout}
              inspectorInRail={railHoldsInspector}
            />
          </SpeakerProvider>
        </div>
      </div>
    </WorkspacePage>
  )
}
