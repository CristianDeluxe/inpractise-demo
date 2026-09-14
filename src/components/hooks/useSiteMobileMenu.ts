import { useState } from 'react'

export function useSiteMobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
  }
  return { open, setOpen, close }
}
