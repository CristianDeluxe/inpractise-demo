import type { SegmentOption } from './SegmentOption'

export type SegmentedControlProps<T extends string> = {
  readonly label: string
  readonly value: T
  readonly options: readonly SegmentOption<T>[]
  readonly onChange: (value: T) => void
}
