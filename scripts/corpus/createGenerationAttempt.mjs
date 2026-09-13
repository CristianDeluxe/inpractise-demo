export function createGenerationAttempt(attempt) {
  return {
    attempt,
    generatedAt: new Date().toISOString(),
    status: 'started',
    usage: null,
  }
}
