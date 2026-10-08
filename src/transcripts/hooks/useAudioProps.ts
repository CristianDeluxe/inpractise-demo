import { useMemo, type RefObject } from 'react'
import type { TranscriptBundle } from '../api/TranscriptBundle'
import type { AudioPlayerProps } from '../components/AudioPlayerProps'
import { relistenIntervals } from '../review/relistenIntervals'

/** Player inputs with a stable relisten list, so the waveform redraws only when time moves. */
export function useAudioProps(
  bundle: TranscriptBundle,
  audioRef: RefObject<HTMLAudioElement | null>,
): AudioPlayerProps {
  const { transcript } = bundle
  const relisten = useMemo(() => relistenIntervals(transcript), [transcript])
  return {
    src: bundle.audioUrl ?? null,
    audioRef,
    waveform: bundle.peaks ?? null,
    relisten,
    fallbackDuration: transcript.source.durationSeconds,
  }
}
