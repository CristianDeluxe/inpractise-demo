import { useRef, type CSSProperties } from 'react'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { useElementHeight } from './useElementHeight'

/** Where the sticky console ends, so the inspector can stick right under it. */
export function useWorkspaceLayout(
  edits: readonly CorrectionEdit[],
  focusedEditId: string | null,
) {
  const consoleRef = useRef<HTMLDivElement>(null)
  const consoleHeight = useElementHeight(consoleRef)
  const style = {
    '--lab-console-bottom': `calc(1rem + ${String(consoleHeight)}px)`,
  } as CSSProperties
  const focusedEdit = edits.find((edit) => edit.id === focusedEditId)
  return { consoleRef, style, focusedEdit }
}
