export async function withRetry<T>(
  attempts: number,
  task: () => Promise<T>,
): Promise<T> {
  let failure: unknown
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task()
    } catch (error) {
      failure = error
    }
  }
  throw failure instanceof Error ? failure : new Error('Task failed')
}
