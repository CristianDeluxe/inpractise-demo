import type { AskResult } from './AskResult.ts'

/** A premium canary that reaches an unauthorised reader is the one failure the
 *  judge must never be asked to weigh: it is checked literally. */
export function checkForbiddenStrings(
  result: AskResult,
  forbidden: readonly string[],
): string[] {
  const rendered = JSON.stringify(result)
  return forbidden.filter((needle) => rendered.includes(needle))
}
