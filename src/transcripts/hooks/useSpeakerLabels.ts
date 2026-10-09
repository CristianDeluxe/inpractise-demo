import { useContext } from 'react'
import { SpeakerContext } from '../speakers/SpeakerContext'

export function useSpeakerLabels() {
  return useContext(SpeakerContext)
}
