import { ProviderAnswerSchema } from './ProviderAnswerSchema.ts'

/**
 * True only when the reply is valid JSON whose sole schema failures are the
 * claim limits: more than four claims, or a claim text over the length cap.
 * Any other failure, including invalid JSON or an out-of-range source label,
 * is a real model error and is never retried.
 */
export function claimLimitsOnly(content: string): boolean {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    return false
  }
  const result = ProviderAnswerSchema.safeParse(parsed)
  if (result.success) return false
  return result.error.issues.every(
    (issue) =>
      issue.code === 'too_big' &&
      issue.path[0] === 'claims' &&
      (issue.path.length === 1 || issue.path[2] === 'text'),
  )
}
