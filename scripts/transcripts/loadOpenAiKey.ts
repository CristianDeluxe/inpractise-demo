import { existsSync, readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'
import { envFileNames } from './envFileNames.ts'

/** Environment first, then the ignored .env files. Reports the variable name only. */
export function loadOpenAiKey(): string {
  const fromEnvironment = process.env['OPENAI_API_KEY']
  if (fromEnvironment) return fromEnvironment
  for (const file of envFileNames) {
    if (!existsSync(file)) continue
    const value = parseEnv(readFileSync(file, 'utf8'))['OPENAI_API_KEY']
    if (value) return value
  }
  throw new Error('Missing variables: OPENAI_API_KEY')
}
