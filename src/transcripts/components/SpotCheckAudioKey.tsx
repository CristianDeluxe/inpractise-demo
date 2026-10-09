/** Names the orange lane of the waveform; sits in the console's last row, so the player never shifts. */
export function SpotCheckAudioKey() {
  return (
    <p className="ml-auto flex h-5 shrink-0 items-center gap-2 text-xs text-muted-foreground">
      <span aria-hidden="true" className="h-1.5 w-4 rounded-full bg-primary" />
      Optional spot-check audio
    </p>
  )
}
