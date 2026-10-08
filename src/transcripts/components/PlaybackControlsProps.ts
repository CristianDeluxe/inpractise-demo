export type PlaybackControlsProps = {
  readonly rate: number
  readonly onBack: () => void
  readonly onForward: () => void
  readonly onCycleRate: () => void
}
