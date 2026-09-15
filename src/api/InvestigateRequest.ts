import type { ViewAs } from './ViewAs.ts'

export type InvestigateRequest = {
  viewAs?: ViewAs
  action: 'investigate'
  question: string
  company?: string
}
