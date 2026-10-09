import { createContext } from 'react'
import type { SpeakerLabels } from './SpeakerLabels'

/** Null when the episode was not diarized or its speakers are not named. */
export const SpeakerContext = createContext<SpeakerLabels | null>(null)
