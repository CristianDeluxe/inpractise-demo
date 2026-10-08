export type ReviewKeyHandlers = {
  readonly next: () => void
  readonly previous: () => void
  readonly accept: () => void
  readonly reject: () => void
  readonly nextPending: () => void
  readonly replay: () => void
  readonly togglePlay: () => void
  readonly back: () => void
  readonly forward: () => void
}
