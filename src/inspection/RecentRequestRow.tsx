import { RecentRequestDetail } from './RecentRequestDetail'
import type { RecentRequestRowProps } from './RecentRequestRowProps'
import { RecentRequestSummaryLine } from './RecentRequestSummaryLine'

export function RecentRequestRow({ request }: RecentRequestRowProps) {
  return (
    <li>
      <details className="group">
        <RecentRequestSummaryLine request={request} />
        <div className="pb-5 pl-2">
          <RecentRequestDetail request={request} />
        </div>
      </details>
    </li>
  )
}
