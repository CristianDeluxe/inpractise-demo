export type ReviewKeyHandlers = {
  readonly next: () => void
  readonly previous: () => void
  readonly accept: () => void
  readonly reject: () => void
}
