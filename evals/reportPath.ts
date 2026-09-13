/** Every live repetition is kept: a run never overwrites an earlier one. */
export function reportPath(argv: readonly string[]): string {
  const index = argv.indexOf('--out')
  const explicit = index === -1 ? undefined : argv[index + 1]
  if (index !== -1 && !explicit) throw new Error('Usage: --out <report.json>')
  return explicit ?? 'evals/report.json'
}
