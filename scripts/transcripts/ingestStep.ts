import { existsSync } from 'node:fs'
import { runCommand } from './runCommand.ts'

/** Runs a command unless its output file already exists. */
export async function ingestStep(
  label: string,
  output: string,
  command: string,
  args: readonly string[],
): Promise<void> {
  if (existsSync(output)) {
    console.log(`skip ${label}: ${output} exists`)
    return
  }
  console.log(`run ${label}`)
  await runCommand(command, args)
}
