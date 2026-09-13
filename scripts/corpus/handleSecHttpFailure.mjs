export async function handleSecHttpFailure(response, context) {
  const { record, state, attempt } = context
  await response.body?.cancel()
  if (response.status >= 500 && attempt < 3) {
    const delay = record.retryAfter
      ? /^\d+$/.test(record.retryAfter)
        ? Number(record.retryAfter) * 1000
        : Date.parse(record.retryAfter) - Date.now()
      : 1000 * attempt
    if (
      !Number.isFinite(delay) ||
      Date.now() + Math.max(delay, 0) >= state.deadline
    )
      throw new Error('SEC_RETRY_DEADLINE')
    state.nextRequestAt = Date.now() + Math.max(delay, 600)
    return
  }
  throw new Error(`SEC_HTTP_${response.status}`)
}
