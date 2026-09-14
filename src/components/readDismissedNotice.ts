import { demoNoticeStorageKey } from '@/components/demoNoticeStorageKey'

export function readDismissedNotice(): boolean {
  try {
    return window.localStorage.getItem(demoNoticeStorageKey) === 'true'
  } catch {
    return false
  }
}
