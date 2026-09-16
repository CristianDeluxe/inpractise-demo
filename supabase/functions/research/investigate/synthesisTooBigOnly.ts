import { SynthesisSchema } from './SynthesisSchema.ts'

/**
 * True only when the reply is valid JSON whose sole schema failures are a
 * value over the length cap. A retry is worth one more call solely for this
 * cause; any other failure, including invalid JSON, is a real model error.
 */
export function synthesisTooBigOnly(content: string): boolean {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    return false
  }
  const result = SynthesisSchema.safeParse(parsed)
  if (result.success) return false
  return result.error.issues.every((issue) => issue.code === 'too_big')
}
