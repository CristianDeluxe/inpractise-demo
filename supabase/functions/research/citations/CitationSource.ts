export type CitationSource = {
  documentId: string
  revisionId: string
  passageId: string
  text: string
  title: string
  company: string
  origin: string
  kind: string
  speaker: string | null
  speakerRole: string | null
  interviewDate: string | null
  publishedAt: string
  sourceUrl: string | null
}
