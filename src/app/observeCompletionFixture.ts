export async function observeCompletionFixture(
  pending: Promise<unknown>,
  completed: () => void,
) {
  await pending
  completed()
}
