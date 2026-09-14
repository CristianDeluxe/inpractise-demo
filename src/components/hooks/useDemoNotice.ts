import { demoNoticeStorageKey } from '@/components/demoNoticeStorageKey'
import { readDismissedNotice } from '@/components/readDismissedNotice'
import { useState } from 'react'

export function useDemoNotice() {
  const [dismissed, setDismissed] = useState(readDismissedNotice)
  const dismiss = () => {
    setDismissed(true)
    try {
      window.localStorage.setItem(demoNoticeStorageKey, 'true')
    } catch {
      // A blocked storage partition only costs the preference, not the dismissal.
    }
  }
  return { dismissed, dismiss }
}
