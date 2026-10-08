import { createClient } from '@supabase/supabase-js'
import type { Target } from '../db/Target.ts'

/**
 * Operator-only client for publishing lab material. The secret key bypasses
 * row-level security, so it is used for this import path and never in a
 * browser, HTTP, MCP or retrieval path.
 */
export function createLabAdmin(target: Target) {
  return createClient(target.url, target.secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
