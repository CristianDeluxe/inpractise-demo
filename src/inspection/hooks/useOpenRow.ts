import { useCallback, useState } from 'react'
import type { OpenRow } from '../OpenRow'

/** Whether one ledger row is expanded, and the handler that flips it. */
export function useOpenRow(): OpenRow {
  const [isOpen, setOpen] = useState(false)
  const handleToggle = useCallback(() => {
    setOpen((value) => !value)
  }, [])
  return { isOpen, handleToggle }
}
