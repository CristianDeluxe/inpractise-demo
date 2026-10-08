import { useMemo, type RefObject } from 'react'
import { audioUrl } from '../api/audioUrl'
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
    src: audioUrl(transcript.id),
    audioRef,
    waveform: bundle.peaks ?? null,
    relisten,
    fallbackDuration: transcript.source.durationSeconds,
  }
}
