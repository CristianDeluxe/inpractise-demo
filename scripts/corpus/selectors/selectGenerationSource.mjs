export function selectGenerationSource(round) {
  const attempts = round.records.reduce(
    (sum, record) => sum + record.attempts.length,
    0,
  )
  if (attempts >= round.maxAttempts) return null
  if (
    round.records.some((record) =>
      record.attempts.some((attempt) =>
        [
          'HTTP_401',
          'HTTP_403',
          'HTTP_429',
          'CONTENT_FILTER',
          'started',
        ].includes(attempt.status),
      ),
    )
  )
    return null
  return (
    round.records
      .filter(
        (record) =>
          record.status !== 'generated_pending_review' &&
          record.attempts.length < round.maxAttemptsPerSource,
      )
      .sort((left, right) => left.attempts.length - right.attempts.length)[0]
      ?.sourceId ?? null
  )
}
