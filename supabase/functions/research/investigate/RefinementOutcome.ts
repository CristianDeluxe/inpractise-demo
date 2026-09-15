/**
 * Why the refinement round did or did not run: every sub-question had
 * evidence, the model declined to reformulate, the token budget could not
 * afford another call, or one reformulation was retrieved.
 */
export type RefinementOutcome = 'none' | 'declined' | 'budget' | 'applied'
