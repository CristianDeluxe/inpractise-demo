import type { Citation } from '@/api/Citation'
import type { Claim } from '@/api/Claim'

export type ConflictViewProps = {
  claims: readonly Claim[]
  citations: readonly Citation[]
}
