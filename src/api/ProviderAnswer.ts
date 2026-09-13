import type { Claim } from './Claim.ts'

export type ProviderAnswer =
  | { status: 'not_found'; claims: []; missingEvidence: string[] }
  | {
      status: 'answered' | 'partial' | 'conflict'
      claims: [Claim, ...Claim[]]
      missingEvidence: string[]
    }
