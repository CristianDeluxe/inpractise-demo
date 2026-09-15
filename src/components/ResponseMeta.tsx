import type { ResponseMetaProps } from './ResponseMetaProps'
import { totalElapsedMs } from './totalElapsedMs'

export function ResponseMeta({
  buildId,
  requestId,
  stages,
}: ResponseMetaProps) {
  const total = totalElapsedMs(stages)
  return (
    <details className="mt-6 text-xs text-muted-foreground">
      <summary className="cursor-pointer">Request details</summary>
      <p className="mt-2 break-all font-mono">
        Build: {buildId}
        <br />
        Request: {requestId}
        {total === undefined ? null : (
          <>
            <br />
            Server time: {total}ms
          </>
        )}
      </p>
    </details>
  )
}
