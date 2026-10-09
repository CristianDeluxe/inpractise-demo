import type { SpeakerTurn } from '../contracts/SpeakerTurn'

export const speakerTurnsFixture: readonly SpeakerTurn[] = [
  { role: 'host', start: 1, end: 28 },
  { role: 'guest', start: 28, end: 40 },
  { role: 'host', start: 40, end: 60 },
]
