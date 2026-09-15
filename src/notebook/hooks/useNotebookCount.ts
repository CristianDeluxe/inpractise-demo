import { useContext } from 'react'
import { NotebookCountContext } from '../NotebookCountContext'

export function useNotebookCount() {
  return useContext(NotebookCountContext)
}
