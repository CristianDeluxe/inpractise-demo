/** A ledger number, or the word a reviewer should read when it was not recorded. */
export function formatCount(value: number | null): string {
  return value === null ? 'unknown' : String(value)
}
