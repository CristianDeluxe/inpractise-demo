import type { CitationOrigin } from './CitationOrigin.ts'
import type { DocumentKind } from './DocumentKind.ts'

export type Citation = {
  citationId: string
  documentId: string
  revisionId: string
  passageId: string
  quote: string
  startChar: number
  endChar: number
  title: string
  company: string
  origin: CitationOrigin
  kind: DocumentKind
  speaker: string | null
  speakerRole: string | null
  interviewDate: string | null
  publishedAt: string
  sourceUrl: string | null
  readerPath: string
}
