import { assertRuntime } from './assertRuntime.mjs'
import { prepareAnnualReportReview } from './prepareAnnualReportReview.mjs'

try {
  const root = await assertRuntime()
  const { failed } = await prepareAnnualReportReview(root)
  if (failed) process.exitCode = 1
} catch {
  console.error('ANNUAL_REPORT_REVIEW_FAILED')
  process.exitCode = 1
}
