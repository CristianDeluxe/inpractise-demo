import type { CompareResult } from '../research/compare/CompareResult.ts'
import type { CompareStage } from '../research/compare/CompareStage.ts'

/** No stage may carry a claim, a quotation or a citation id the result publishes. */
export function assertNoCompareDisclosure(
  stages: readonly CompareStage[],
  result: CompareResult,
) {
  const guarded = [result.sides.interviews, result.sides.filings].flatMap(
    (side) => [
      ...side.claims.flatMap((claim) => [claim.text, claim.quote]),
      ...side.citations.flatMap((citation) => [
        citation.quote,
        citation.citationId,
      ]),
    ],
  )
  if (!guarded.length) throw new Error('The fixture published no evidence')
  for (const stage of stages) {
    const serialised = JSON.stringify(stage)
    if (guarded.some((value) => serialised.includes(value)))
      throw new Error(`Stage ${stage.phase} disclosed evidence`)
  }
}
