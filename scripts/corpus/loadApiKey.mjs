import { readFile } from 'node:fs/promises'
import { parseEnv } from 'node:util'

export async function loadApiKey(root) {
  let values
  try {
    values = parseEnv(await readFile(`${root}/.env.remote`, 'utf8'))
  } catch {
    throw new Error('MISSING_ENV_FILE: .env.remote')
  }
  if (!values.OPENAI_API_KEY)
    throw new Error('MISSING_VARIABLE: OPENAI_API_KEY')
  return values.OPENAI_API_KEY
}
