import { useState } from 'react'

export function useCopyPassage(readerPath: string) {
  const [status, setStatus] = useState('Copy citation link')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        new URL(readerPath, window.location.origin).href,
      )
      setStatus('Link copied')
    } catch {
      setStatus('Copy failed; use the address bar')
    }
  }
  return { status, copy }
}
