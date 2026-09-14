import type { KeyboardEvent } from 'react'

export function handleLibraryTabKey(event: KeyboardEvent<HTMLDivElement>) {
  const tabs = [
    ...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  ]
  const index = tabs.indexOf(event.target as HTMLButtonElement)
  let next: number
  switch (event.key) {
    case 'ArrowRight':
      next = (index + 1) % tabs.length
      break
    case 'ArrowLeft':
      next = (index + tabs.length - 1) % tabs.length
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = tabs.length - 1
      break
    default:
      return
  }
  event.preventDefault()
  tabs[next]?.focus()
}
