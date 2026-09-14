import { readFileSync } from 'node:fs'
import { ReportSchema } from './ReportSchema.ts'

/** Reads one retained report. A malformed file fails here, not in a count. */
export function loadReport(path: string) {
  return ReportSchema.parse(JSON.parse(readFileSync(path, 'utf8')) as unknown)
}
