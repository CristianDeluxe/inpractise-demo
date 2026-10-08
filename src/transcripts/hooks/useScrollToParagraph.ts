import { useEffect } from 'react'
import { paragraphElementId } from '../review/paragraphElementId'

export function useScrollToParagraph(paragraphId: string | null) {
  useEffect(() => {
    if (paragraphId === null) return
    document
      .getElementById(paragraphElementId(paragraphId))
      ?.scrollIntoView({ block: 'center' })
  }, [paragraphId])
}
