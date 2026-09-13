import { realpath } from 'node:fs/promises'
import { resolve, sep } from 'node:path'

export async function resolveCorpusPath(root, path) {
  if (typeof path !== 'string' || !path.startsWith('corpus/'))
    throw new Error('CORPUS_PATH_REQUIRED')
  const resolved = await realpath(resolve(root, path))
  if (!resolved.startsWith(`${await realpath(`${root}/corpus`)}${sep}`))
    throw new Error('CORPUS_PATH_ESCAPE')
  return resolved
}
