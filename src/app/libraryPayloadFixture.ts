import { citationFixture } from '@/api/citationFixture'

export function libraryPayloadFixture() {
  const citation = citationFixture()
  return {
    items: [
      {
        document_id: citation.documentId,
        revision_id: citation.revisionId,
        title: citation.title,
        company: citation.company,
        kind: citation.kind,
        origin: citation.origin,
        interview_date: citation.interviewDate,
        published_at: citation.publishedAt,
        source_url: null,
      },
    ],
  }
}
