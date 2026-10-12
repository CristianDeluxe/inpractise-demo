import { qualityReportPath } from './qualityReportPath.ts'
import { QualityReportSchema } from './QualityReportSchema.ts'
import { readJsonFile } from './readJsonFile.ts'
import type { ReferenceVerdict } from './ReferenceVerdict.ts'

/** Edit id to verdict for one episode; an edit absent from the map was style only. */
export function readReferenceVerdicts(
  id: string,
): ReadonlyMap<string, ReferenceVerdict> {
  const episode = readJsonFile(qualityReportPath, QualityReportSchema).episodes[
    id
  ]
  if (episode === undefined)
    throw new Error(`${qualityReportPath} has no measurement for ${id}`)
  return new Map(episode.rows.map((row) => [row.id, row.verdict]))
}
