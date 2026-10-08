import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

export async function runCommand(
  command: string,
  args: readonly string[],
): Promise<string> {
  const { stdout } = await promisify(execFile)(command, [...args], {
    maxBuffer: 64 * 1024 * 1024,
  })
  return stdout
}
