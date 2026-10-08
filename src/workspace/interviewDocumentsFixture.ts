import { companyDocumentFixture } from './companyDocumentFixture'
import type { LibraryDocument } from './LibraryDocument'

export function interviewDocumentsFixture(): LibraryDocument[] {
  return [
    companyDocumentFixture({ document_id: 'a', title: 'Pricing call' }),
    companyDocumentFixture({
      document_id: 'b',
      company: 'Acme',
      title: 'Churn',
    }),
  ]
}
