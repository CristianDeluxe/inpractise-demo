import { readdir } from 'node:fs/promises'
import { readJson } from './readJson.mjs'

/**
 * Reads every committed corpus/podcasts record in file-name order. A missing
 * directory means no podcasts, so older checkouts keep building.
 */
export async function readPodcastRecords(root) {
  let files = []
  try {
    files = await readdir(`${root}/corpus/podcasts`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  const records = []
  for (const file of files.filter((name) => name.endsWith('.json')).sort())
    records.push(await readJson(`${root}/corpus/podcasts/${file}`))
  return records
}
