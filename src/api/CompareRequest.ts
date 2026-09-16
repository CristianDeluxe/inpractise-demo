import type { ViewAs } from './ViewAs.ts'

export type CompareRequest = {
  viewAs?: ViewAs
  action: 'compare'
  company?: string
  topic: string
}
