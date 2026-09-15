import { validateCompareRelations } from '../api/validators/validateCompareRelations.ts'
import { validateCompareSide } from '../api/validators/validateCompareSide.ts'
import { compareSchema } from './compareSchema'

/**
 * Shape validation is not enough: each side's claims must resolve inside that
 * side's citations with a quotation that occurs there, and every relation must
 * join two published claims. Keep both checks when changing the schema so a
 * syntactically valid but unsupported verdict cannot reach the UI.
 */
export function parseCompareData(input: unknown) {
  const data = compareSchema.parse(input)
  validateCompareSide(data.sides.interviews)
  validateCompareSide(data.sides.filings)
  validateCompareRelations(data.relations, data.sides)
  return data
}
