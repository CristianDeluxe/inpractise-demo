import type { Claim } from '@/api/Claim'

export type ConflictSide = {
  attribution: string
  interviewDate: string | null
  claims: readonly Claim[]
}
