import { useScoredParagraph } from '../hooks/useScoredParagraph'
import type { FinalBodyProps } from './FinalBodyProps'
import { ScoredWordButton } from './ScoredWordButton'

/** The accepted AI-final text; only words scoring below the reliable threshold are marked. */
export function FinalBody({ paragraph, corrected, controls }: FinalBodyProps) {
  const { words } = useScoredParagraph(paragraph, corrected, controls.decisions)
  return (
    <p className="source-text">
      {words.map((word, index) => (
        <span key={`${String(index)}-${word.text}`}>
          <ScoredWordButton word={word} onSeek={controls.seek} />{' '}
        </span>
      ))}
    </p>
  )
}
