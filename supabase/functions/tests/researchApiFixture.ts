import { branchRowFixture } from '../../../tests/helpers/branchRowFixture.ts'
import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'

export function researchApiFixture(path: string): unknown {
  const source = citationSourceFixture()
  switch (path) {
    case '/rest/v1/rpc/debit_request':
      return '00000000-0000-0000-0000-000000000001'
    case '/rest/v1/rpc/record_request_usage':
      return null
    case '/auth/v1/user':
      return { id: 'test-user' }
    case '/rest/v1/memberships':
      return { org_id: 'org-a', role: 'member', premium: false, active: true }
    case '/rest/v1/rpc/search_candidates_scoped':
    case '/rest/v1/rpc/search_candidates':
      return [
        branchRowFixture({
          document_id: source.documentId,
          revision_id: source.revisionId,
          passage_id: source.passageId,
        }),
      ]
    case '/rest/v1/passages':
      return {
        text_content: source.text,
        token_count: 20,
        speaker: source.speaker,
        speaker_role: source.speakerRole,
      }
    case '/rest/v1/document_revisions':
      return {
        title: source.title,
        company: source.company,
        origin: source.origin,
        kind: source.kind,
        interview_date: source.interviewDate,
        published_at: source.publishedAt,
        source_url: source.sourceUrl,
      }
    default:
      throw new Error(`Unexpected fixture route: ${path}`)
  }
}
