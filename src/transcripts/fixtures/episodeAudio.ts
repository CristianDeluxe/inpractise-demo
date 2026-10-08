import { screen } from '@testing-library/react'

export function episodeAudio() {
  return screen.getByLabelText<HTMLAudioElement>('Episode audio')
}
