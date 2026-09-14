import { answerInput } from './answerInput.ts'
import { answerOutput } from './answerOutput.ts'
import { documentsInput } from './documentsInput.ts'
import { documentsOutput } from './documentsOutput.ts'
import { emptyInput } from './emptyInput.ts'
import { healthOutput } from './healthOutput.ts'
import { meInput } from './meInput.ts'
import { meOutput } from './meOutput.ts'
import { passageInput } from './passageInput.ts'
import { passageOutput } from './passageOutput.ts'
import { searchInput } from './searchInput.ts'
import { searchOutput } from './searchOutput.ts'

/**
 * Runtime routing, the typed client and OpenAPI generation share these schemas.
 * Keep evidence consistency checks in the parsers: a JSON schema describes field
 * shapes but cannot prove that claim IDs or reader paths match their evidence.
 */
export const operations = {
  documents: {
    method: 'GET',
    path: '/api/v1/documents',
    action: 'list',
    input: documentsInput,
    output: documentsOutput,
    description:
      'Authorized current revisions; cursor pagination over at most 50 documents. Public filings and synthetic interviews only.',
  },
  passage: {
    method: 'GET',
    path: '/api/v1/documents/{documentId}/revisions/{revisionId}/passages/{passageId}',
    action: 'read',
    input: passageInput,
    output: passageOutput,
    description:
      'Exact server-identified public or synthetic passage and neighbour IDs; access is checked on every request.',
  },
  search: {
    method: 'POST',
    path: '/api/v1/search',
    action: 'search',
    input: searchInput,
    output: searchOutput,
    description: 'Ranked authorized public or synthetic passages.',
  },
  answers: {
    method: 'POST',
    path: '/api/v1/answers',
    action: 'ask',
    input: answerInput,
    output: answerOutput,
    description:
      'Standalone question over public or synthetic evidence; consumes the caller request allowance. Provider failures are errors.',
  },
  me: {
    method: 'GET',
    path: '/api/v1/me',
    action: 'me',
    input: meInput,
    output: meOutput,
    description:
      'Organization, role, and premium entitlement (false means basic).',
  },
  health: {
    method: 'GET',
    path: '/api/v1/health',
    action: null,
    input: emptyInput,
    output: healthOutput,
    description:
      'Public facade liveness only; does not check the research backend.',
  },
} as const
