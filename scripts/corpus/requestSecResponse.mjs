export async function requestSecResponse(target, state) {
  return await fetch(target, {
    redirect: 'manual',
    headers: {
      'User-Agent': state.userAgent,
      Accept: 'application/json,text/html',
    },
    signal: AbortSignal.timeout(
      Math.min(10000, Math.max(1, state.deadline - Date.now())),
    ),
  })
}
