import { readFileSync } from 'node:fs'
import { z } from 'zod'
import type { GoldCase } from './GoldCase.ts'
import { GoldCaseSchema } from './GoldCaseSchema.ts'

/** A malformed gold file fails here rather than silently scoring nothing. */
export function loadGold(path = 'evals/gold.json'): GoldCase[] {
  const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))
  const file = z.object({ cases: z.array(GoldCaseSchema).min(1) }).parse(parsed)
  const ids = new Set(file.cases.map((item) => item.caseId))
  if (ids.size !== file.cases.length) throw new Error('Duplicate case id')
  for (const item of file.cases)
    if (item.expectedStatus === 'not_found' && item.goldIds.length)
      throw new Error(`${item.caseId}: a refusal case cannot carry gold ids`)
    else if (item.expectedStatus !== 'not_found' && !item.goldIds.length)
      throw new Error(`${item.caseId}: an answered case needs gold ids`)
  return file.cases
}
