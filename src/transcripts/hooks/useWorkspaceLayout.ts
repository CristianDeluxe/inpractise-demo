import { useRef, type CSSProperties } from 'react'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { consoleStickyTopPx } from '../review/consoleStickyTopPx'
import { useElementHeight } from './useElementHeight'

/** Where the sticky console ends, so the inspector can stick right under it. */
export function useWorkspaceLayout(
  edits: readonly CorrectionEdit[],
  focusedEditId: string | null,
) {
  const consoleRef = useRef<HTMLDivElement>(null)
  const consoleHeight = useElementHeight(consoleRef)
  const style = {
    '--lab-console-bottom': `${String(consoleStickyTopPx + consoleHeight)}px`,
  } as CSSProperties
  const focusedEdit = edits.find((edit) => edit.id === focusedEditId)
  const consoleBottom = consoleStickyTopPx + consoleHeight
  return { consoleRef, style, focusedEdit, consoleBottom }
}
