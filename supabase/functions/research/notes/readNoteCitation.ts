import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Citation } from '../citations/Citation.ts'
import type { PassageRef } from '../passages/PassageRef.ts'
import { readPassageCitation } from '../passages/readPassageCitation.ts'
import type { Principal } from '../Principal.ts'

/**
 * A note stores ids, never a quotation, so listing it re-reads the passage as
 * the effective principal. Evidence the caller may no longer open, or may not
 * open in the current viewing mode, comes back as null rather than as a copy
 * made while they still could.
 */
export async function readNoteCitation(
  principal: Principal,
  ref: PassageRef,
): Promise<Citation | null> {
  try {
    return (await readPassageCitation(principal, ref)).citation
  } catch (cause) {
    if (cause instanceof ApiError && cause.code === 'not_found') return null
    throw cause
  }
}
