import { citationFixture } from '@/api/citationFixture'
import type { Answer } from '@/contracts/Answer'

export function answeredAnswerFixture(text: string): Answer {
  return {
    status: 'answered',
    claims: [{ text, citationIds: [citationFixture().citationId] }],
    missingEvidence: [],
    citations: [citationFixture()],
    mode: 'hybrid',
    candidateCount: 1,
  }
}
