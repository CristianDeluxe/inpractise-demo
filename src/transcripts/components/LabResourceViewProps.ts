import type { ReactNode } from 'react'
import type { LabResource } from '../hooks/LabResource'

export type LabResourceViewProps<T> = {
  readonly resource: LabResource<T>
  readonly noun: string
  readonly children: (data: T) => ReactNode
}
