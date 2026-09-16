import { useOpenRow } from './hooks/useOpenRow'
import { RecentRequestDetail } from './RecentRequestDetail'
import type { RecentRequestRowProps } from './RecentRequestRowProps'
import { RecentRequestSummaryLine } from './RecentRequestSummaryLine'

export function RecentRequestRow({ request }: RecentRequestRowProps) {
  const { isOpen, handleToggle } = useOpenRow()
  return (
    <>
      <RecentRequestSummaryLine
        request={request}
        isOpen={isOpen}
        onToggle={handleToggle}
      />
      {isOpen ? (
        <tr className="bg-muted/30">
          <td colSpan={7} className="px-3 pb-5 pt-2">
            <RecentRequestDetail request={request} />
          </td>
        </tr>
      ) : null}
    </>
  )
}
