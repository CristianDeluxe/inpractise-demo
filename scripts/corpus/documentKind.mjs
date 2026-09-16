/**
 * The manifest kind for a document. Synthetic and SEC documents keep the
 * original origin-derived defaults untouched; an annual-report PDF carries
 * its kind explicitly on the source record instead, since origin alone
 * (public) no longer determines it uniquely.
 */
export function documentKind(document) {
  if (document.origin === 'synthetic') return 'synthetic_interview'
  return document.kind === 'annual_report_pdf'
    ? 'annual_report_pdf'
    : 'sec_filing'
}
