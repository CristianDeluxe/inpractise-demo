import { createHash } from 'node:crypto'
import { z } from 'zod'
import { FacadeError } from './FacadeError.ts'

/** Called only after the backend has accepted this exact bearer token. */
export function principalKey(authorization: string): string {
  try {
    const encoded = authorization.slice(7).split('.')[1]
    if (!encoded) throw new Error('Missing payload')
    const claims = z
      .object({ iss: z.string().min(1), sub: z.string().min(1) })
      .parse(JSON.parse(Buffer.from(encoded, 'base64url').toString()))
    return createHash('sha256')
      .update(JSON.stringify([claims.iss, claims.sub]))
      .digest('hex')
  } catch {
    throw new FacadeError(
      502,
      'invalid_backend_response',
      'Accepted token lacks a principal identity.',
    )
  }
}
