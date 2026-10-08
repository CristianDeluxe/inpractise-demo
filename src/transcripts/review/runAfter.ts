/** Starts task once previous has settled, so queued work runs strictly in order. */
export async function runAfter(
  previous: Promise<void>,
  task: () => Promise<void>,
): Promise<void> {
  await previous
  await task()
}
