import { useState } from 'react'

export function useCopyIdentifier(identifier: string) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identifier)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }
  return { copied, copy }
}
