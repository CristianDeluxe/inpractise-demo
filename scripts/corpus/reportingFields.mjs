/**
 * The extra provenance fields an annual-report PDF carries that a SEC
 * filing or synthetic interview does not. Returned as a spreadable object
 * so the ten existing canonical payloads never gain these keys and their
 * revision ids stay byte-identical.
 */
export function reportingFields(document, kind) {
  if (kind !== 'annual_report_pdf') return {}
  return {
    jurisdiction: document.jurisdiction,
    reportingPeriod: document.reportingPeriod,
  }
}
