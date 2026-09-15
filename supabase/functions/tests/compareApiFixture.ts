import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'
import { filingSourceFixture } from '../../../tests/helpers/filingSourceFixture.ts'
import type { CompareFixtureSides } from './CompareFixtureSides.ts'
import { compareRowsFixture } from './compareRowsFixture.ts'

/**
 * The database as a cross-reference sees it: retrieval answers per kind, and
 * passage and revision reads answer for whichever document the query names.
 */
export function compareApiFixture(
  url: URL,
  kind: string | null,
  sides: CompareFixtureSides,
): unknown {
  const source =
    url.searchParams.get('document_id') === 'eq.f1'
      ? filingSourceFixture()
      : citationSourceFixture()
  switch (url.pathname) {
    case '/rest/v1/rpc/debit_request':
      return '00000000-0000-0000-0000-000000000002'
    case '/rest/v1/rpc/record_request_usage':
    case '/rest/v1/rpc/record_request_diagnostics':
      return null
    case '/rest/v1/rpc/search_candidates_scoped':
    case '/rest/v1/rpc/search_candidates':
      return compareRowsFixture(kind, sides)
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
      throw new Error(`Unexpected fixture route: ${url.pathname}`)
  }
}
