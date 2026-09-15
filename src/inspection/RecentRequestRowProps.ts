import type { Inspection } from '@/contracts/Inspection'

export type RecentRequestRowProps = {
  request: Inspection['recentRequests'][number]
}
