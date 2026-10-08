import type { AudioPlayerProps } from './AudioPlayerProps'

export function AudioPlayer({ src, audioRef }: AudioPlayerProps) {
  return (
    <audio
      ref={audioRef}
      src={src}
      controls
      preload="metadata"
      aria-label="Episode audio"
      className="h-9 w-full"
    >
      <track kind="captions" />
    </audio>
  )
}
