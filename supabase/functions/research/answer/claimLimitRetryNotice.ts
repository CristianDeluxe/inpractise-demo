/**
 * Appended once to a transcript whose reply broke only the claim limits: too
 * many claims, or a claim over the length cap. Both limits are restated,
 * because the fix for one must not break the other.
 */
export const claimLimitRetryNotice =
  '\n\nThe previous reply was rejected because it broke the claim limits. ' +
  'Reply with at most 4 claims, each a single sentence of 500 characters ' +
  'or fewer. Merge related points into one claim rather than adding claims, ' +
  'and drop the least important point if they still do not fit.'
