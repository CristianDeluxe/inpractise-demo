import { useNotebookCountProvider } from './hooks/useNotebookCountProvider'
import { NotebookCountContext } from './NotebookCountContext'
import type { NotebookCountProviderProps } from './NotebookCountProviderProps'

export function NotebookCountProvider({
  initial,
  children,
}: NotebookCountProviderProps) {
  const value = useNotebookCountProvider(initial)
  return <NotebookCountContext value={value}>{children}</NotebookCountContext>
}
