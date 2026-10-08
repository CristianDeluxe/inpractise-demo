import { useEffect, useState, type RefObject } from 'react'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { paragraphIdAt } from '../review/paragraphIdAt'

/** Id of the paragraph being played; state changes only when the paragraph does. */
export function useActiveParagraph(
  audioRef: RefObject<HTMLAudioElement | null>,
  paragraphs: readonly TranscriptParagraph[],
) {
  const [activeId, setActiveId] = useState<string | null>(null)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => {
      setActiveId(paragraphIdAt(paragraphs, audio.currentTime))
    }
    audio.addEventListener('timeupdate', update)
    audio.addEventListener('seeked', update)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('seeked', update)
    }
  }, [audioRef, paragraphs])
  return activeId
}
