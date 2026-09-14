/**
 * The deadline covers the generation request only: token verification and the
 * ordinary database reads have their own behavior, and the HTTP facade applies
 * a separate budget in server/api/callBackend.ts. The environment override
 * exists so a test can prove the deadline survives a stalled body without
 * waiting twelve seconds for it.
 */
export function completionDeadlineMs(): number {
  const configured = Number(Deno.env.get('GENERATION_DEADLINE_MS'))
  return Number.isFinite(configured) && configured > 0 ? configured : 12_000
}
