import { acquireAnnualReports } from './acquireAnnualReports.mjs'
import { assertRuntime } from './assertRuntime.mjs'

try {
  const root = await assertRuntime()
  const documents = await acquireAnnualReports(root)
  if (
    documents.some((document) => document.status !== 'acquired_pending_review')
  )
    process.exitCode = 1
} catch (error) {
  console.error(
    error.message === 'ACQUISITION_ALREADY_FROZEN'
      ? 'ACQUISITION_ALREADY_FROZEN'
      : 'ACQUISITION_FAILED',
  )
  process.exitCode = 1
}
