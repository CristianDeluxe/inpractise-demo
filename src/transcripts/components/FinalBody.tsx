import { useActiveRun } from '../hooks/useActiveRun'
import { useScoredParagraph } from '../hooks/useScoredParagraph'
import { useSpeakerLabels } from '../hooks/useSpeakerLabels'
import { turnStarts } from '../review/turnStarts'
import { speakerRuns } from '../speakers/speakerRuns'
import type { FinalBodyProps } from './FinalBodyProps'
import { ScoredWords } from './ScoredWords'
import { TurnRow } from './TurnRow'

/** The accepted AI-final text, one row per speaker turn; only words scoring below the reliable threshold are marked. */
export function FinalBody({
  paragraph,
  corrected,
  controls,
  active,
}: FinalBodyProps) {
  const { words } = useScoredParagraph(paragraph, corrected, controls.decisions)
  const runs = speakerRuns(useSpeakerLabels(), words)
  const starts = turnStarts(paragraph.start, runs)
  const playing = useActiveRun(active, starts)
  return (
    <div>
      {runs.map((run, index) => (
        <TurnRow
          key={`${String(index)}-${String(starts[index])}`}
          start={starts[index] ?? paragraph.start}
          note={null}
          active={playing === index}
          onSeek={controls.seek}
        >
          <ScoredWords words={run.words} onSeek={controls.seek} />
        </TurnRow>
      ))}
    </div>
  )
}
