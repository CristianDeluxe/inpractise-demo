import type { Json } from './Json.ts'

export type RequestUsageRow = {
  request_id: string
  user_id: string
  usage_day: string
  recorded_at: string
  prompt_tokens: number | null
  completion_tokens: number | null
  total_tokens: number | null
  diagnostics: Json | null
}
