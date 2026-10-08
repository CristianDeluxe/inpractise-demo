import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { VerdictActionCopy } from './VerdictActionCopy'

/** What a verdict toggle says before and after it is pressed, and its key. */
export const verdictActionText: Readonly<
  Record<ReviewVerdict, VerdictActionCopy>
> = {
  accepted: { idle: 'Accept', done: 'Accepted', key: 'a' },
  rejected: { idle: 'Reject', done: 'Rejected', key: 'r' },
  deferred: { idle: 'Later', done: 'Flagged', key: 'f' },
}
