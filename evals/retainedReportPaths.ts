import { readdirSync } from 'node:fs'

/** The retained measurements, discovered rather than listed, so a new run is replayed too. */
export function retainedReportPaths(directory = 'evals'): string[] {
  return readdirSync(directory)
    .filter((name) => /^report-run-\d+\.json$/.test(name))
    .sort()
    .map((name) => `${directory}/${name}`)
}
