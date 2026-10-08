import type { ReviewVerdict } from '../contracts/ReviewVerdict'

/** editId -> verdict. An edit with no entry is still pending. */
export type DecisionMap = ReadonlyMap<string, ReviewVerdict>
