import { useState } from 'react'

/** Remembers which item the reader closed, so a new one opens again. */
export function useDismissedId() {
  const [dismissedId, setDismissedId] = useState<string | null>(null)
  return { dismissedId, dismiss: setDismissedId }
}
