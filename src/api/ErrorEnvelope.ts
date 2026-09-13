import type { ServerError } from './ServerError.ts'

export type ErrorEnvelope = { error: ServerError; requestId: string }
