import type { CorrectionEdit } from '../contracts/CorrectionEdit'

export function editFixture(
  id: string,
  from: string,
  to: string,
  overrides: Partial<CorrectionEdit> = {},
): CorrectionEdit {
  return {
    id,
    paragraphId: 'p0001',
    from,
    to,
    category: 'entity',
    origin: 'model',
    reason: 'Synthetic reason',
    confidence: 0.9,
    ...overrides,
  }
}
