/**
 * The one status mismatch the gate tolerates, recorded by signature rather
 * than as a spare failure slot: ADR 0005 keeps the two-per-document selection
 * cap and therefore keeps F03 refusing. A different case refusing, or F03
 * failing a different way, is a regression and must stop the run.
 */
export const acceptedStatusMiss = {
  caseId: 'F03',
  expectedStatus: 'answered',
  actualStatus: 'not_found',
  diagnosis: 'selection_miss',
} as const
