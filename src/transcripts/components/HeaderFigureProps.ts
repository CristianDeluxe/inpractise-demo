export type HeaderFigureProps = {
  readonly label: string
  readonly value: string
  readonly detail: string
  readonly emphasis?: boolean
  /** ISO 8601 duration, when the value is a length of time. */
  readonly duration?: string
}
