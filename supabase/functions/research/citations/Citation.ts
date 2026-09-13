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
  origin: string
  kind: string
  speaker: string | null
  speakerRole: string | null
  interviewDate: string | null
  publishedAt: string
  sourceUrl: string | null
  readerPath: string
}
