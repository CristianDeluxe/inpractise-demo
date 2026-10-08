import { reportPath } from './reportPath'

/** A named window, so a second click focuses the same report instead of piling up tabs. */
export function openReportWindow(id: string) {
  window.open(reportPath(id), `transcript-report-${id}`)
}
