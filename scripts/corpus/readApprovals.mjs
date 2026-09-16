import { readJson } from './readJson.mjs'

/**
 * The owner approval record is optional before any public candidate has been
 * reviewed, so a missing file means "nothing approved yet" rather than a
 * build failure.
 */
export async function readApprovals(root) {
  try {
    return await readJson(`${root}/corpus/review/approvals.json`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    return { documents: [] }
  }
}
