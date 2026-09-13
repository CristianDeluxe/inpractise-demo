import { ApiError } from '../_shared/http/ApiError.ts'

/** Reports the missing variable by NAME; a value never reaches a log or a response. */
export function requireEnv(name: string): string {
  const value = Deno.env.get(name)
  if (!value) throw new ApiError('dependency_failure', `Missing ${name}`)
  return value
}
