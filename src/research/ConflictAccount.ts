import type { Claim } from '@/api/Claim'

/** The claims of one account while sides are still being grouped. */
export type ConflictAccount = {
  interviewDate: string | null
  claims: Claim[]
}
