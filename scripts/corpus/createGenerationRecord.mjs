import { canonicalJson } from './canonicalJson.mjs'
import { sha256 } from './sha256.mjs'

export function createGenerationRecord(core, prompt) {
  return {
    sourceId: core.sourceId,
    synthetic: true,
    disclosure: core.disclosure,
    provider: 'OpenAI',
    model: 'gpt-4.1-mini-2025-04-14',
    promptSha256: sha256(prompt),
    coreSha256: sha256(canonicalJson(core)),
    attempts: [],
    status: 'failed',
    reviewStatus: 'pending_owner',
  }
}
