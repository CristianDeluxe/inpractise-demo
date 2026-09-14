import type { SampleSource } from './SampleSource'

export type SampleDialogProps = {
  source: SampleSource
  restoreFocus: (event: Event) => void
}
