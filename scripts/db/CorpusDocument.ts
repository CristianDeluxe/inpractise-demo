import type { z } from 'zod'
import type { CorpusDocumentSchema } from './CorpusDocumentSchema.ts'

export type CorpusDocument = z.infer<typeof CorpusDocumentSchema>
