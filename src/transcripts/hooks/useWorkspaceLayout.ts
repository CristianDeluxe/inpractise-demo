import { useMemo, useRef, type CSSProperties } from 'react'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { paragraphStarts } from '../review/paragraphStarts'
import { useElementHeight } from './useElementHeight'

/** Where the sticky console ends, so the inspector can stick right under it. */
export function useWorkspaceLayout(
  paragraphs: readonly TranscriptParagraph[],
  edits: readonly CorrectionEdit[],
  focusedEditId: string | null,
) {
  const consoleRef = useRef<HTMLDivElement>(null)
  const consoleHeight = useElementHeight(consoleRef)
  const startById = useMemo(() => paragraphStarts(paragraphs), [paragraphs])
  const style = {
    '--lab-console-bottom': `calc(5.6rem + ${String(consoleHeight)}px)`,
  } as CSSProperties
  const focusedEdit = edits.find((edit) => edit.id === focusedEditId)
  return { consoleRef, startById, style, focusedEdit }
}
