/** Names the orange lane of the waveform; always its own row, so the player never shifts. */
export function SpotCheckAudioKey() {
  return (
    <p className="flex h-5 items-center justify-start gap-2 text-xs text-muted-foreground sm:justify-end">
      <span aria-hidden="true" className="h-1.5 w-4 rounded-full bg-primary" />
      Optional spot-check audio
    </p>
  )
}
