import { spawn } from 'node:child_process'

/** Runs a command with `input` on stdin and resolves with stdout. */
export async function runWithInput(
  command: string,
  args: readonly string[],
  input: string,
): Promise<string> {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, [...args], {
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    const out: Buffer[] = []
    const err: Buffer[] = []
    child.stdout.on('data', (chunk: Buffer) => out.push(chunk))
    child.stderr.on('data', (chunk: Buffer) => err.push(chunk))
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve(Buffer.concat(out).toString('utf8'))
      else
        reject(
          new Error(
            `${command} exited ${String(code)}: ${Buffer.concat(err).toString('utf8').slice(0, 500)}`,
          ),
        )
    })
    child.stdin.end(input)
  })
}
