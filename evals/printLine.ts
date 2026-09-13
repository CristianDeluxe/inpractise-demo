/** The evaluation prints a progress line per case; stdout is the report channel. */
export function printLine(line: string): void {
  process.stdout.write(`${line}\n`)
}
