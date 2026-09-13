import { mkdir, rename, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { canonicalJson } from './canonicalJson.mjs'

export async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(`${path}.partial`, `${canonicalJson(value)}\n`)
  await rename(`${path}.partial`, path)
}
