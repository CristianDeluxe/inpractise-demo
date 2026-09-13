import { readJson } from './readJson.mjs'
import { syntheticManifestMetadata } from './syntheticManifestMetadata.mjs'
import { writeDocument } from './writeDocument.mjs'

export async function buildSyntheticDocuments(root, core) {
  const documents = []
  const generation = []
  for (const source of core.documents) {
    let record = null
    if (source.sourceId !== 'S6') {
      try {
        record = await readJson(
          `${root}/corpus/generated/${source.documentId}.generation.json`,
        )
      } catch (error) {
        if (error.code !== 'ENOENT') throw error
      }
      generation.push(
        record ?? {
          sourceId: source.sourceId,
          status: 'not_attempted',
          attempts: [],
        },
      )
    }
    documents.push(
      await writeDocument(root, source, source.turns, {
        extra: syntheticManifestMetadata(source, record),
      }),
    )
  }
  return { documents, generation }
}
