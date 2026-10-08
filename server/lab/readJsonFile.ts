import { readFile } from 'node:fs/promises'

/** Parsed JSON, or null when the file is missing or unreadable. */
export async function readJsonFile(path: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path, 'utf8')) as unknown
  } catch {
    return null
  }
}
