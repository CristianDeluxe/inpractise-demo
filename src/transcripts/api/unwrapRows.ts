import type { SupabaseResult } from './SupabaseResult'

/** Returns the rows of a Supabase response, or throws its error message. */
export function unwrapRows<T>(result: SupabaseResult<T>): T {
  if (result.error) throw new Error(result.error.message)
  if (result.data === null) throw new Error('The query returned nothing.')
  return result.data
}
