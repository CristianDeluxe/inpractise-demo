import { createContext } from 'react'
import type { NotebookCount } from './NotebookCount'

/** Safe outside the workspace shell: no badge, and adjustments go nowhere. */
export const NotebookCountContext = createContext<NotebookCount>({
  count: null,
  adjust: () => {},
})
