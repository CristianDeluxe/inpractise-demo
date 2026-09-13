import { createAdmin } from './createAdmin.ts'
import { importDocument } from './importDocument.ts'
import { loadCorpus } from './loadCorpus.ts'
import { loadFixture } from './loadFixture.ts'
import { loadManifestEntry } from './loadManifestEntry.ts'
import { loadTarget } from './loadTarget.ts'
import { seedOrganisations } from './seedOrganisations.ts'

export async function importCorpus() {
  const target = loadTarget()
  const documents = loadCorpus()
  const client = createAdmin(target)
  await seedOrganisations(client)
  for (const orgId of ['org-a', 'org-b'])
    for (const document of documents) {
      const foreign =
        orgId === 'org-b' && document.documentId === 's6'
          ? loadFixture('s6-org-b')
          : null
      const outcome = await importDocument(
        client,
        foreign?.document ?? document,
        {
          orgId,
          manifest: foreign?.manifest ?? loadManifestEntry(document.documentId),
          indexMode: foreign ? 'lexical_only' : 'hybrid',
        },
      )
      console.log(
        JSON.stringify({
          orgId,
          documentId: document.documentId,
          passages: document.passages.length,
          outcome,
        }),
      )
    }
}

await importCorpus()
