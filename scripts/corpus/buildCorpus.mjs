import { readFile } from 'node:fs/promises'
import { buildPublicDocuments } from './buildPublicDocuments.mjs'
import { buildSyntheticDocuments } from './buildSyntheticDocuments.mjs'
import { createCorpusManifest } from './createCorpusManifest.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'
import { writeCorpusSupportingArtifacts } from './writeCorpusSupportingArtifacts.mjs'
import { writeJson } from './writeJson.mjs'

export async function buildCorpus(root, syntheticOnly) {
  const core = await readJson(`${root}/corpus/core.json`)
  const authority = await readJson(`${root}/corpus/authority.json`)
  if (
    sha256(await readFile(`${root}/corpus/core.json`)) !== authority.coreSha256
  )
    throw new Error('CORE_HASH_MISMATCH')
  const acquisition = await readJson(`${root}/corpus/acquisition.json`)
  const reviews = await readJson(`${root}/corpus/review/sec.json`)
  let approvals = { documents: [] }
  try {
    approvals = await readJson(`${root}/corpus/review/approvals.json`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  const synthetic = await buildSyntheticDocuments(root, core)
  const publicDocuments = await buildPublicDocuments(
    root,
    reviews,
    approvals,
    syntheticOnly,
  )
  const documents = [...synthetic.documents, ...publicDocuments.documents]
  const fixtures = await writeCorpusSupportingArtifacts(root, core)
  const excluded = publicDocuments.excluded
  const manifest = await createCorpusManifest(root, {
    core,
    authority,
    documents,
    fixtures,
    excluded,
    acquisition,
    generation: synthetic.generation,
  })
  await writeJson(`${root}/corpus/manifest.json`, manifest)
  console.log(
    `BUILD: ${manifest.documentCount} accepted documents; ${manifest.passageCount} passages; ${excluded.length} public candidates excluded; lexical_only.`,
  )
  return manifest
}
