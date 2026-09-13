import { expect } from 'vitest'

export async function expectCancellation(
  pending: Promise<unknown>,
): Promise<void> {
  await expect(pending).rejects.toMatchObject({ code: 'cancelled' })
}
