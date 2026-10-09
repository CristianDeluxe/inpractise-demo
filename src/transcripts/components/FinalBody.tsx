import { useScoredParagraph } from '../hooks/useScoredParagraph'
import { useSpeakerLabels } from '../hooks/useSpeakerLabels'
import { speakerChangeName } from '../speakers/speakerChangeName'
import type { FinalBodyProps } from './FinalBodyProps'
import { ScoredWordButton } from './ScoredWordButton'
import { SpeakerChange } from './SpeakerChange'

/** The accepted AI-final text; only words scoring below the reliable threshold are marked. */
export function FinalBody({ paragraph, corrected, controls }: FinalBodyProps) {
  const { words } = useScoredParagraph(paragraph, corrected, controls.decisions)
  const labels = useSpeakerLabels()
  return (
    <p className="source-text">
      {words.map((word, index) => {
        const speaker = speakerChangeName(labels, words, index)
        return (
          <span key={`${String(index)}-${word.text}`}>
            {speaker === null ? null : <SpeakerChange name={speaker} />}
            <ScoredWordButton word={word} onSeek={controls.seek} />{' '}
          </span>
        )
      })}
    </p>
  )
}
