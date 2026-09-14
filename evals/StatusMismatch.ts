/** One case whose answer status was not the expected one, with its diagnosis. */
export type StatusMismatch = {
  caseId: string
  expectedStatus: string
  actualStatus: string
  diagnosis: string
}
