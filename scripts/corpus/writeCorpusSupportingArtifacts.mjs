import { createRevisionFixtures } from './createRevisionFixtures.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { projectPublicSample } from './projectPublicSample.mjs'
import { writeJson } from './writeJson.mjs'

export async function writeCorpusSupportingArtifacts(root, core) {
  const fixtures = await createRevisionFixtures(root, core)
  await writeJson(
    `${root}/corpus/sample.json`,
    projectPublicSample(
      core.documents.map((document) => normaliseDocument(document)),
    ),
  )
  await writeJson(`${root}/corpus/embeddings.json`, {
    model: 'text-embedding-3-small',
    dimensions: 1536,
    indexMode: 'lexical_only',
    vectors: [],
    reason:
      'No embedding calls were made in this corpus delivery. Importer must honor lexical_only.',
  })
  return fixtures
}
