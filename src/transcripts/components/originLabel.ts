import type { EditOrigin } from '../contracts/EditOrigin'

export const originLabel: Record<EditOrigin, string> = {
  memory: 'learned',
  model: 'model',
  rule: 'rule',
}
