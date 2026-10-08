import type { CorrectionResponse } from './CorrectionResponse.ts'

export type ModelEdit =
  CorrectionResponse['paragraphs'][number]['edits'][number]
