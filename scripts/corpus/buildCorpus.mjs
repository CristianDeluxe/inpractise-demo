import { readFile } from 'node:fs/promises'
import { buildAllDocuments } from './buildAllDocuments.mjs'
import { createCorpusManifest } from './createCorpusManifest.mjs'
import { readApprovals } from './readApprovals.mjs'
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
  const annualReportReviews = await readJson(
    `${root}/corpus/review/annual-reports.json`,
  )
  const approvals = await readApprovals(root)
  const built = await buildAllDocuments(root, {
    core,
    reviews,
    annualReportReviews,
    approvals,
    syntheticOnly,
  })
  const fixtures = await writeCorpusSupportingArtifacts(root, core)
  const manifest = await createCorpusManifest(root, {
    core,
    authority,
    documents: built.documents,
    fixtures,
    excluded: built.excluded,
    acquisition,
    generation: built.generation,
  })
  await writeJson(`${root}/corpus/manifest.json`, manifest)
  console.log(
    `BUILD: ${manifest.documentCount} accepted documents; ${manifest.passageCount} passages; ${built.excluded.length} public candidates excluded; lexical_only.`,
  )
  return manifest
}
