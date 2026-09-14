import type { Json } from './Json.ts'

export type RecordRequestDiagnosticsFunction = {
  Args: { request: string; payload: Json }
  Returns: undefined
}
