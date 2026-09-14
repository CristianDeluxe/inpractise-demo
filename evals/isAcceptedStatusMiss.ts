import { acceptedStatusMiss } from './acceptedStatusMiss.ts'
import type { StatusMismatch } from './StatusMismatch.ts'

/** Every field must match: a case that fails differently is not the accepted one. */
export function isAcceptedStatusMiss(mismatch: StatusMismatch): boolean {
  return (
    mismatch.caseId === acceptedStatusMiss.caseId &&
    mismatch.expectedStatus === acceptedStatusMiss.expectedStatus &&
    mismatch.actualStatus === acceptedStatusMiss.actualStatus &&
    mismatch.diagnosis === acceptedStatusMiss.diagnosis
  )
}
