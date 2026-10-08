/**
 * Separates the two reasons an answer can be absent. Zero candidates means
 * the search returned nothing to read; a positive count means excerpts were
 * found and read, and none of them establishes the claim. Conflating the
 * two is how a retrieval bug gets shipped as a knowledge limit.
 */
export function notFoundExplanation(candidateCount: number) {
  if (candidateCount === 0)
    return 'The search found no excerpt you are authorised to read, so nothing was checked. This is a search result, not a judgement about the interviews.'
  return 'No quote in these two interviews answers this.'
}
