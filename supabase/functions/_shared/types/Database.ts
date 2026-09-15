import type { DebitRequestFunction } from './DebitRequestFunction.ts'
import type { DocumentRevisionsTable } from './DocumentRevisionsTable.ts'
import type { DocumentsTable } from './DocumentsTable.ts'
import type { InspectCorpusFunction } from './InspectCorpusFunction.ts'
import type { MembershipsTable } from './MembershipsTable.ts'
import type { OrganisationsTable } from './OrganisationsTable.ts'
import type { PassagesTable } from './PassagesTable.ts'
import type { PublishDocumentFunction } from './PublishDocumentFunction.ts'
import type { QueryEmbeddingsTable } from './QueryEmbeddingsTable.ts'
import type { RecordRequestDiagnosticsFunction } from './RecordRequestDiagnosticsFunction.ts'
import type { RecordRequestUsageFunction } from './RecordRequestUsageFunction.ts'
import type { RequestUsageTable } from './RequestUsageTable.ts'
import type { SearchCandidatesFunction } from './SearchCandidatesFunction.ts'

export type Database = {
  __InternalSupabase: { PostgrestVersion: '14.5' }
  public: {
    Tables: {
      document_revisions: DocumentRevisionsTable
      documents: DocumentsTable
      memberships: MembershipsTable
      organisations: OrganisationsTable
      passages: PassagesTable
      query_embeddings: QueryEmbeddingsTable
      request_usage: RequestUsageTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      debit_request: DebitRequestFunction
      record_request_usage: RecordRequestUsageFunction
      record_request_diagnostics: RecordRequestDiagnosticsFunction
      inspect_corpus: InspectCorpusFunction
      publish_document: PublishDocumentFunction
      search_candidates_scoped: SearchCandidatesFunction
      search_candidates: SearchCandidatesFunction
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
