import type { Citation } from '@/api/Citation'
import type { Claim } from '@/api/Claim'

export type ClaimRowProps = { claim: Claim; citations: Citation[] }
