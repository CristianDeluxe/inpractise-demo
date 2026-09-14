import { useRef, useState, type MouseEvent } from 'react'

export function useSampleDialog() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const openSource = (event: MouseEvent<HTMLButtonElement>) => {
    trigger.current = event.currentTarget
    setOpen(true)
  }
  const restoreFocus = (event: Event) => {
    event.preventDefault()
    trigger.current?.focus()
  }
  return { open, setOpen, openSource, restoreFocus }
}
