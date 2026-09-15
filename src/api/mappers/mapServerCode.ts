import { serverCodeStatuses } from './serverCodeStatuses.ts'

export function mapServerCode(code: string): number {
  return serverCodeStatuses[code] ?? 500
}
