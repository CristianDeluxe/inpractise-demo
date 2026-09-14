/**
 * Separates the two reasons an answer can be absent. Zero candidates means
 * retrieval returned nothing to read; a positive count means passages were
 * retrieved and read, and none of them establishes the claim. Conflating the
 * two is how a retrieval bug gets shipped as a knowledge limit.
 */
export function notFoundExplanation(candidateCount: number) {
  if (candidateCount === 0)
    return 'Search returned no passages you are authorised to read, so nothing was sent to the model. This is a retrieval result, not a judgement about the corpus.'
  return `The ${String(candidateCount)} passages retrieved for this question were read and none of them establishes an answer. Nothing outside the corpus was used.`
}
