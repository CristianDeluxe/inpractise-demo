import { useMemo, useState } from 'react'
import type { NotebookCount } from '../NotebookCount'

/**
 * Seeded from the `me` response and adjusted locally as notes are saved and
 * deleted. The access gate remounts the provider whenever `me` reloads, so a
 * changed viewing mode or session starts from the server's count again.
 */
export function useNotebookCountProvider(
  initial: number | null,
): NotebookCount {
  const [count, setCount] = useState(initial)
  return useMemo(
    () => ({
      count,
      adjust: (delta: number) => {
        setCount((current) =>
          current === null ? null : Math.max(0, current + delta),
        )
      },
    }),
    [count],
  )
}
