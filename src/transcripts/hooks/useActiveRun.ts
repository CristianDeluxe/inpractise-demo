import { useContext, useEffect, useState } from 'react'
import { AudioRefContext } from '../review/AudioRefContext'
import { runIndexAt } from '../review/runIndexAt'

/**
 * Which speaker block of the playing paragraph is being heard; -1 when the
 * paragraph is not playing. Listens to the audio only while it is, and
 * changes state only when the block does.
 */
export function useActiveRun(active: boolean, starts: readonly number[]) {
  const audioRef = useContext(AudioRefContext)
  const [index, setIndex] = useState(-1)
  const key = starts.join(',')
  useEffect(() => {
    const audio = audioRef?.current
    if (!active || !audio) {
      setIndex(-1)
      return
    }
    const bounds = key.split(',').map(Number)
    const update = () => {
      setIndex(runIndexAt(bounds, audio.currentTime))
    }
    update()
    audio.addEventListener('timeupdate', update)
    audio.addEventListener('seeked', update)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('seeked', update)
    }
  }, [active, audioRef, key])
  return index
}
