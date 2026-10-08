export type SegmentOption<T extends string> = {
  readonly value: T
  readonly label: string
  readonly disabled?: boolean
}
