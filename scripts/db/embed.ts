import { embedDocuments } from './embedDocuments.ts'
import { loadCorpus } from './loadCorpus.ts'
import { loadTarget } from './loadTarget.ts'

await embedDocuments(loadCorpus(), loadTarget().openaiKey)
