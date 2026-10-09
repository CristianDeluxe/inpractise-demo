import { useEpisodeSpeakers } from '../hooks/useEpisodeSpeakers'
import { SpeakerContext } from '../speakers/SpeakerContext'
import type { SpeakerProviderProps } from './SpeakerProviderProps'

/** Makes the episode's speaker turns and names available to every paragraph. */
export function SpeakerProvider({
  transcript,
  children,
}: SpeakerProviderProps) {
  const labels = useEpisodeSpeakers(transcript)
  return (
    <SpeakerContext.Provider value={labels}>{children}</SpeakerContext.Provider>
  )
}
