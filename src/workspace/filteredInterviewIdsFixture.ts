import { filterInterviews } from './filterInterviews'
import { interviewDocumentsFixture } from './interviewDocumentsFixture'

export function filteredInterviewIdsFixture(company: string, text: string) {
  return filterInterviews(interviewDocumentsFixture(), company, text).map(
    (document) => document.document_id,
  )
}
