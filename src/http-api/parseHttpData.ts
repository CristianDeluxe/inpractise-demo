import { parseActionData } from '../api/parseActionData.ts'
import type { ResearchRequest } from '../api/ResearchRequest.ts'
import type { OperationName } from './OperationName.ts'
import type { OperationOutput } from './OperationOutput.ts'
import { operations } from './operations.ts'

export function parseHttpData<K extends OperationName>(
  name: K,
  input: Record<string, unknown>,
  body: unknown,
): OperationOutput<K> {
  const operation = operations[name]
  const parsed = operation.output.parse(body)
  if (operation.action) {
    const fields = Object.fromEntries(
      Object.entries(input).filter(
        ([key]) => key !== 'cursor' && key !== 'pageSize',
      ),
    )
    parseActionData(
      { ...fields, action: operation.action } as ResearchRequest,
      parsed,
      () => parsed,
    )
  }
  return parsed as OperationOutput<K>
}
